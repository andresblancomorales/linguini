import SessionActions from '../actions/sessionActions';

const initialState = {
  session: undefined,
  loading: false,
  error: undefined,
  isOnline: true,
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SessionActions.Actions.GETTING_TOKEN:
      state = {
        ...state,
        session: undefined,
        loading: true,
      };
      break;
    case SessionActions.Actions.INVALID_USERNAME_PASSWORD:
      state = {
        ...state,
        session: undefined,
        loading: false,
        error: 'Invalid username or password'
      };
      break;
    case SessionActions.Actions.GOT_TOKEN:
      state = {
        ...state,
        session: action.session,
        loading: false,
        error: undefined
      };
      break;
    case SessionActions.Actions.TOGGLE_CONNECTIVITY:
      state = {
        ...state,
        isOnline: action.online
      };
      break;
  }

  return state;
};