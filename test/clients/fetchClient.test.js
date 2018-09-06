import FetchClient from '../../src/clients/fetchClient';
import fetchMock from 'fetch-mock';
import {NoTokenProvidedException} from '../../src/clients/fetchClient';

describe('FetchClient', () => {

  before(done => {
    fetchMock.mock((url, opts) => {
      return url === 'http://www.linguini.com/recipes' &&
        opts.method === 'POST' &&
        opts.headers['Content-Type'] === 'application/json'
        && opts.body === JSON.stringify({chef: 'Andres'})
    }, {status: 200});
    fetchMock.get('http://www.linguini.com/recipes', {
      status: 200,
      body: JSON.stringify({username: 'andres@email.com'})
    });
    fetchMock.get('http://www.linguini.com/unauthorizedWithBody', {status: 401, body: {error: 'Unauthorized'}});
    fetchMock.get('http://www.linguini.com/unauthorized', {status: 401});
    fetchMock.get('http://www.linguini.com/forbidden', {status: 403});
    fetchMock.delete('http://www.linguini.com/delete', {status: 200});
    fetchMock.put('http://www.linguini.com/put', {status: 200});
    done();
  });

  after(() => {
    fetchMock.restore();
  });

  it('should configure the request with the Bearer token if a provider is configured', async () => {
    let baseClient = new FetchClient('http://www.linguini.com', {
      getToken: () => {
        return Promise.resolve('70k3n')
      }
    });

    let fetchSpy = sinon.spy(baseClient, 'executeFetch');

    let request = {
      path: '/recipes',
      deserialize: true
    };

    await baseClient.configureAndFetch(request, 'GET');

    expect(fetchSpy.calledWith(
      {path: '/recipes', deserialize: true, headers: {Authorization: 'Bearer 70k3n'}},
      'GET'
    )).to.be.true;
  });

  it('should configure the request without the Bearer token if no provider is configured', async () => {
    let baseClient = new FetchClient('http://www.linguini.com');

    let fetchSpy = sinon.spy(baseClient, 'executeFetch');

    let request = {
      path: '/recipes',
      deserialize: true
    };

    await baseClient.configureAndFetch(request, 'GET');

    expect(fetchSpy.calledWith(
      {path: '/recipes', deserialize: true},
      'GET'
    )).to.be.true;
  });

  it('should try to send the request with a Bearer Token and throw a NoTokenProvidedException', done => {
    let baseClient = new FetchClient('http://www.linguini.com', {
      getToken: () => {
        return Promise.reject(new Error("Kapow"));
      }
    });

    let request = {
      path: '/recipes',
      deserialize: true
    };

    baseClient.configureAndFetch(request, 'GET')
      .catch(error => {
        expect(error.name).to.equal(NoTokenProvidedException.Name);
        done();
      });
  });

  it('should configure the request without the Bearer token if a provider is configured but the request asks to skip it', async () => {
    let baseClient = new FetchClient('http://www.linguini.com', {
      getToken: () => {
        return Promise.resolve('70k3n')
      }
    });

    let fetchSpy = sinon.spy(baseClient, 'executeFetch');

    let request = {
      path: '/recipes',
      deserialize: true,
      skipBearer: true
    };

    await baseClient.configureAndFetch(request, 'GET');

    expect(fetchSpy.calledWith(
      {path: '/recipes', deserialize: true, skipBearer: true},
      'GET'
    )).to.be.true;
  });

  it('should send the request with the defined body', async () => {
    let baseClient = new FetchClient('http://www.linguini.com');

    let request = {
      path: '/recipes',
      deserialize: false,
      body: {chef: 'Andres'}
    };

    let result = await baseClient.executeFetch(request, 'POST');

    expect(result).to.deep.equal({status: 200});
  });

  it('should send the request without body and deserialize the response', async () => {
    let baseClient = new FetchClient('http://www.linguini.com');

    let request = {
      path: '/recipes',
      deserialize: true
    };

    let result = await baseClient.executeFetch(request, 'GET');

    expect(result).to.deep.equal({status: 200, body: {username: 'andres@email.com'}});
  });

  it('should send the request and if it fails reject it and return the error', done => {
    let baseClient = new FetchClient('http://www.linguini.com');

    let request = {
      path: '/unauthorizedWithBody',
      deserialize: false
    };

    baseClient.executeFetch(request, 'GET')
      .catch(error => {
        expect(error).to.deep.equal({status: 401, error: {error: 'Unauthorized'}});
        done();
      });
  });

  it('should send the request and if it fails reject it without error if no body is defined', done => {
    let baseClient = new FetchClient('http://www.linguini.com');

    let request = {
      path: '/unauthorized',
      deserialize: false
    };

    baseClient.executeFetch(request, 'GET')
      .catch(error => {
        expect(error).to.deep.equal({status: 401});
        done();
      });
  });

  it('should call the authentication listener if the request fails with a 401', done => {
    let authenticationListener = sinon.spy();
    let baseClient = new FetchClient(
      'http://www.linguini.com',
      undefined,
      {
        authenticationListener: authenticationListener
      }
    );

    let request = {
      path: '/unauthorized',
      deserialize: false
    };

    baseClient.executeFetch(request, 'GET')
      .catch(error => {
        expect(error).to.deep.equal({status: 401});
        authenticationListener.called;
        done();
      });
  });

  it('should call the authentication listener if the request fails with a 401', done => {
    let authorizationListener = sinon.spy();
    let baseClient = new FetchClient(
      'http://www.linguini.com',
      undefined,
      {
        authorizationListener: authorizationListener
      }
    );

    let request = {
      path: '/forbidden',
      deserialize: false
    };

    baseClient.executeFetch(request, 'GET')
      .catch(error => {
        expect(error).to.deep.equal({status: 403});
        authorizationListener.called;
        done();
      });
  });

  it('should send a GET request', async () => {
    let baseClient = new FetchClient('http://www.linguini.com');

    let fetchSpy = sinon.spy(baseClient, 'configureAndFetch');

    let request = {
      path: '/recipes',
      deserialize: false
    };

    await baseClient.doGet(request);

    expect(fetchSpy.calledWith(
      {path: '/recipes', deserialize: false},
      'GET'
    )).to.be.true;
  });

  it('should send a POST request', async () => {
    let baseClient = new FetchClient('http://www.linguini.com');

    let fetchSpy = sinon.spy(baseClient, 'configureAndFetch');

    let request = {
      path: '/recipes',
      deserialize: false,
      body: {chef: 'Andres'}
    };

    await baseClient.doPost(request);

    expect(fetchSpy.calledWith(
      {path: '/recipes', deserialize: false, body: {chef: 'Andres'}},
      'POST'
    )).to.be.true;
  });

  it('should send a DELETE request', async () => {
    let baseClient = new FetchClient('http://www.linguini.com');

    let fetchSpy = sinon.spy(baseClient, 'configureAndFetch');

    let request = {
      path: '/delete',
      deserialize: false
    };

    await baseClient.doDelete(request);

    expect(fetchSpy.calledWith(
      {path: '/delete', deserialize: false},
      'DELETE'
    )).to.be.true;
  });

  it('should send a PUT request', async () => {
    let baseClient = new FetchClient('http://www.linguini.com');

    let fetchSpy = sinon.spy(baseClient, 'configureAndFetch');

    let request = {
      path: '/put',
      deserialize: false
    };

    await baseClient.doPut(request);

    expect(fetchSpy.calledWith(
      {path: '/put', deserialize: false},
      'PUT'
    )).to.be.true;
  });
});