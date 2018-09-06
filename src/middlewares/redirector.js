import SessionActions from '../actions/sessionActions';
import * as _ from '../utils/utilities';

export const redirector = store => next => action => {
  switch (action.type) {
    case SessionActions.Actions.GOT_TOKEN:
      let session = action.session;
      _.navigateTo(`${session.redirectUrl}?access_token=${session.accessToken}`);
      break;
    case SessionActions.Actions.LOGGED_OUT:
      console.log('LOGGED OUT, REDIRECTING');
      _.navigateTo('/login');
    default:
      return next(action);
  }
};