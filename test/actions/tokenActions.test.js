import * as TokenActions from '../../src/actions/tokenActions';

describe('TokenActions', () => {

  it('should return the correct action when the token is decoded', done => {

    let action = TokenActions.tokenDecoded({_id: '001', exp: 1000});

    expect(action).to.deep.equal({
      type: TokenActions.Actions.TOKEN_DECODED,
      decodedToken: {_id: '001', exp: 1000}
    });

    done();
  });
});