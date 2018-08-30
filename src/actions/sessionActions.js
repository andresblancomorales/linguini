export default class TokenActions {
  constructor(gusteauClient) {
    this.gusteauClient = gusteauClient;
  }

  creators = {
    getToken: this.getToken.bind(this)
  };

  static Actions = {
    GETTING_TOKEN: 'GETTING_TOKEN',
    INVALID_USERNAME_PASSWORD: 'INVALID_USERNAME_PASSWORD',
    GOT_TOKEN: 'GOT_TOKEN'
  };

  getToken(username, password) {
    return async dispatch => {
      dispatch({
        type: TokenActions.Actions.GETTING_TOKEN,
        username: username
      });

      try {
        let response = await this.gusteauClient.getToken(username, password);
        dispatch({
          type: TokenActions.Actions.GOT_TOKEN,
          session: response.body
        });
      } catch (error) {
        dispatch({
          type: TokenActions.Actions.INVALID_USERNAME_PASSWORD,
          username: username
        });
      }
    }
  }
}