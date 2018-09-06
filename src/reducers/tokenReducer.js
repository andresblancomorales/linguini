import * as TokenActions from '../../src/actions/tokenActions';

const initialState = {
  decodedToken: undefined
};

export const tokenReducer = (state = initialState, action) => {
  switch(action.type) {
    case TokenActions.Actions.TOKEN_DECODED:
      state = {
        ...state,
        decodedToken: action.decodedToken
      };
      break;
  }

  return state;
};
