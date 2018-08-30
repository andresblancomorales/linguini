import FetchClient from './fetchClient';

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
}