import FetchClient from './fetchClient';
import {isDefined} from "../utils/utilities";

export default class GusteauClient extends FetchClient {
  constructor(url, bearerTokenProvider, listeners) {
    super(url, bearerTokenProvider, listeners);
  }

  getToken(username, password) {
    let request = {
      path: '/token',
      deserialize: true,
      skipBearer: true,
      body: {
        grant_type: 'implicit',
        client_id: 'gusteau',
        username: username,
        password: password
      }
    };

    return this.doPost(request);
  }

  deleteToken(accessToken) {
    let request = {
      path: '/token',
      deserialize: false,
      skipBearer: true,
      body: {
        access_token: accessToken
      }
    };

    return this.doDelete(request);
  }

  getRecipes(offset) {
    let request = {
      path: !isDefined(offset)? '/recipes': `/recipes?offset=${offset}`,
      deserialize: true,
      cache: offset ? undefined : 'recipes'
    };

    return this.doGet(request);
  }
}