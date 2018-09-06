import {tokenReducer} from '../../src/reducers/tokenReducer';
import * as TokenActions from '../../src/actions/tokenActions';

describe('TokenReducer', () => {

  it('should have an initial state', done => {
    let state = tokenReducer(undefined, {type: 'IGNORED'});

    expect(state).to.deep.equal({decodedToken: undefined});

    done();
  });

  it('should set the decoded token', done => {
    let state = tokenReducer(undefined, {type: TokenActions.Actions.TOKEN_DECODED, decodedToken: {_id: '001', exp: 1000}});

    expect(state).to.deep.equal({decodedToken: {_id:'001', exp: 1000}});

    done();
  });

});