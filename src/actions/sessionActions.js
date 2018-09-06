export default class SessionActions {
  constructor(gusteauClient) {
    this.gusteauClient = gusteauClient;
  }

  creators = {
    getToken: this.getToken.bind(this),
    logout: this.logout.bind(this)
  };

  static Actions = {
    GETTING_TOKEN: 'GETTING_TOKEN',
    INVALID_USERNAME_PASSWORD: 'INVALID_USERNAME_PASSWORD',
    GOT_TOKEN: 'GOT_TOKEN',
    LOGGING_OUT: 'LOGGING_OUT',
    LOGGED_OUT: 'LOGGED_OUT',
    LOG_OUT_FAILED: 'LOG_OUT_FAILED'
  };

  getToken(username, password) {
    return async dispatch => {
      dispatch({
        type: SessionActions.Actions.GETTING_TOKEN,
        username: username
      });

      try {
        let response = await this.gusteauClient.getToken(username, password);
        dispatch({
          type: SessionActions.Actions.GOT_TOKEN,
          session: response.body
        });
      } catch (error) {
        dispatch({
          type: SessionActions.Actions.INVALID_USERNAME_PASSWORD,
          username: username
        });
      }
    }
  }

  logout(accessToken) {
    return async dispatch => {
      dispatch({
        type: SessionActions.Actions.LOGGING_OUT
      });

      try {
        await this.gusteauClient.deleteToken(accessToken);
        dispatch({
          type: SessionActions.Actions.LOGGED_OUT
        });
      } catch (error) {
        dispatch({
          type: SessionActions.Actions.LOG_OUT_FAILED
        });
      }
    }
  }
}