import SessionActions from '../../src/actions/sessionActions';
import {redirector} from '../../src/middlewares/redirector';
import configureMockStore from 'redux-mock-store';
import * as _ from '../../src/utils/utilities';

describe('Redirector', () => {

  before(done => {
    global.window = {
      location: {
        replace: () => {}
      }
    };

    sinon.spy(_, 'navigateTo');
    done();
  });

  after(() => {
    global.window = undefined;
    _.navigateTo.restore();
  });

  it('should redirect to where the session points', done => {
    const mockStore = configureMockStore([redirector]);

    let store = mockStore({});
    store.dispatch({
      type: SessionActions.Actions.GOT_TOKEN,
      session: {
        redirectUrl: 'http://www.somewhere.com',
        accessToken: '70k3n'
      }
    });

    _.navigateTo.calledWith('http://www.somewhere.com?access_token=70k3n');
    done();
  });
});