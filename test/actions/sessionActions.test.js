import SessionActions from '../../src/actions/sessionActions';
import GusteauClient from '../../src/clients/gusteauClient';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SessionActions', () => {

  it('should get a token and dispatch the correct events if successful', done => {
    let gusteauClient = new GusteauClient('http://www.gusteau.com');
    sinon.stub(gusteauClient, 'getToken')
      .withArgs('andres@email.com', 'password')
      .returns(Promise.resolve({status: 201, body: {access_token: '70k3n'}}));

    let expectedActions = [
      {type: SessionActions.Actions.GETTING_TOKEN, username: 'andres@email.com'},
      {type: SessionActions.Actions.GOT_TOKEN, session: {access_token: '70k3n'}}
    ];

    let store = mockStore({});

    let sessionActions = new SessionActions(gusteauClient);

    store.dispatch(sessionActions.getToken('andres@email.com', 'password'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      });
  });

  it('should try to get a token and dispatch the correct events if it fails', done => {
    let gusteauClient = new GusteauClient('http://www.gusteau.com');
    sinon.stub(gusteauClient, 'getToken')
      .withArgs('andres@email.com', 'password')
      .returns(Promise.reject({status: 401}));

    let expectedActions = [
      {type: SessionActions.Actions.GETTING_TOKEN, username: 'andres@email.com'},
      {type: SessionActions.Actions.INVALID_USERNAME_PASSWORD, username: 'andres@email.com'}
    ];

    let store = mockStore({});

    let sessionActions = new SessionActions(gusteauClient);

    store.dispatch(sessionActions.getToken('andres@email.com', 'password'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      });
  });

});