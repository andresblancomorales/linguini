import BearerTokenProvider from '../../src/utils/bearerTokenProvider';
import * as _ from '../../src/utils/utilities';
import jwt from 'jsonwebtoken';

describe('BearerTokenProvider', () => {

  before(done => {
    sinon.stub(jwt, 'decode')
      .withArgs('70k3n')
      .returns(Promise.resolve({exp: 1000}));

    sinon.stub(_, 'getCookie')
      .withArgs('gusteau_access_token')
      .returns('70k3n');

    done();
  });

  after(() => {
    jwt.decode.restore();
    _.getCookie.restore();
  });

  it('should get the token from the URL, decode it, set the cookie and return it', async () => {
    global.window = {
      location: {
        href : 'http://www.linguini.com?access_token=70k3n'
      }
    };


    let cookieSpy = sinon.spy(_, 'setCookie');

    let provider = new BearerTokenProvider();

    let token = await provider.getToken();
    expect(token).to.equal('70k3n');
    expect(cookieSpy.calledWith('gusteau_access_token', '70k3n', new Date(1000)));
    cookieSpy.restore();
  });

  it('should get the token from a cookie, decode it and return it', async () => {
    global.window = {
      location: {
        href : 'http://www.linguini.com'
      }
    };

    let provider = new BearerTokenProvider();

    let token = await provider.getToken();
    expect(token).to.equal('70k3n');
  });

  it('should get the token from the URL, decode it, set the cookie, notify the decoded token and return it', async () => {
    global.window = {
      location: {
        href : 'http://www.linguini.com?access_token=70k3n'
      }
    };


    let cookieSpy = sinon.spy(_, 'setCookie');

    let decodedTokenListener = sinon.spy();

    let provider = new BearerTokenProvider(decodedTokenListener);

    let token = await provider.getToken();
    expect(token).to.equal('70k3n');
    expect(cookieSpy.calledWith('gusteau_access_token', '70k3n', new Date(1000)));
    expect(decodedTokenListener.calledWith({exp: 1000})).to.be.true;
    cookieSpy.restore();
  });

  it('should get the token from a cookie, decode it, notify the decoded token and return it', async () => {
    global.window = {
      location: {
        href : 'http://www.linguini.com'
      }
    };

    let decodedTokenListener = sinon.spy();

    let provider = new BearerTokenProvider(decodedTokenListener);

    let token = await provider.getToken(true);
    expect(token).to.equal('70k3n');
    expect(decodedTokenListener.calledWith({exp: 1000})).to.be.true;
  });
});