import {sessionReducer} from '../../src/reducers/sessionReducer';
import SessionActions from '../../src/actions/sessionActions';

describe('SessionReducer', () => {

  it('should have an initial state', done => {
    let state = sessionReducer(undefined, {type: 'IGNORED'});

    expect(state).to.deep.equal({
      session: undefined,
      loading: false,
      error: undefined
    });

    done();
  });

  it('should set loading to true and clear any session when getting a token', done => {
    let state = sessionReducer({
        session: {access_token: '70k3n'},
        loading: false,
        error: 'Invalid username or password'
      }, {
        type: SessionActions.Actions.GETTING_TOKEN,
        username: 'andres@email.com'
      }
    );

    expect(state).to.deep.equal({
      session: undefined,
      loading: true,
      error: 'Invalid username or password'
    });

    done();
  });

  it('should set loading to false and clear any session when using an invalid username or password', done => {
    let state = sessionReducer({
        session: {access_token: '70k3n'},
        loading: true,
        error: undefined
      }, {
        type: SessionActions.Actions.INVALID_USERNAME_PASSWORD,
        username: 'andres@email.com'
      }
    );

    expect(state).to.deep.equal({
      session: undefined,
      loading: false,
      error: 'Invalid username or password'
    });

    done();
  });

  it('should set loading to false and set the session when got the token correctly', done => {
    let state = sessionReducer({
        session: undefined,
        loading: true,
        error: 'Invalid username or password'
      }, {
        type: SessionActions.Actions.GOT_TOKEN,
        session: {access_token: '70k3n'}
      }
    );

    expect(state).to.deep.equal({
      session: {access_token: '70k3n'},
      loading: false,
      error: undefined
    });

    done();
  });
});