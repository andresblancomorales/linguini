import * as _ from '../utils/utilities';

class NoTokenProvidedException extends Error {
  constructor() {
    super('No Bearer token was provided');
  }
}
NoTokenProvidedException.Name = 'NoTokenProvidedException';

export default class FetchClient {
  constructor(url,
              bearerTokenProvider,
              listeners) {
    this.url = url;

    this.bearerTokenProvider = bearerTokenProvider;

    if (listeners) {
      this.authenticationListener = listeners.authenticationListener;
      this.authorizationListener = listeners.authorizationListener;
    }
  }

  async configureAndFetch(request, method) {
    if (_.isDefined(this.bearerTokenProvider) && !request.skipBearer) {
        let token = await this.bearerTokenProvider.getToken();

        if (!_.isDefined(token)) {
          if (_.isDefined(this.authenticationListener)) {
            this.authenticationListener();
          }

          throw new NoTokenProvidedException();
        }

        request.headers = {
          ...request.headers,
          'Authorization': `Bearer ${token}`
        };

        return this.executeFetch(request, method);
    } else {
      return this.executeFetch(request, method);
    }
  }

  async executeFetch(request, method) {
    let fetchRequest = {method: method, headers: request.headers};
    if (request.body) {
      fetchRequest = {
        ...fetchRequest,
        body: JSON.stringify(request.body),
      };
      // if (!(request.body instanceof FormData)) {
        fetchRequest.headers = {
          ...request.headers,
          'Content-Type': 'application/json',
        }
      // }
    }

    let response = await fetch(this.url + request.path, fetchRequest);
    if (response.ok) {
      if (request.deserialize) {
        let body = await response.json();
        return { status: response.status, body: body};
      } else {
        return { status: response.status };
      }
    } else {
      switch(response.status) {
        case 401:
          if (_.isFunction(this.authenticationListener)) {
            this.authenticationListener();
          }
          break;
        case 403:
          if (_.isFunction(this.authorizationListener)) {
            this.authorizationListener();
          }
          break;
      }

      try {
        let error = await response.json();
        return Promise.reject({status: response.status, error: error});
      } catch(error) {
        return Promise.reject({status: response.status})
      }
    }
  }

  doGet(request) {
    return this.configureAndFetch(request, 'GET');
  }

  doPost(request) {
    return this.configureAndFetch(request, 'POST');
  }

  doDelete(request) {
    return this.configureAndFetch(request, 'DELETE');
  }

  doPut(request) {
    return this.configureAndFetch(request, 'PUT');
  }
}
