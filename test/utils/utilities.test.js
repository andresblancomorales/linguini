import * as _ from "../../src/utils/utilities";
import Cookies from 'js-cookie';

describe('Utilities', () => {
  it('should validate correctly if something is not undefined', done => {
    expect(_.isDefined({})).to.be.true;
    done();
  });

  it('should validate correctly if something is undefined', done => {
    expect(_.isDefined(undefined)).to.be.false;
    done();
  });

  it('should validate correctly if something is a function', done => {
    expect(_.isFunction(() => {})).to.be.true;
    done();
  });

  it('should validate correctly if something is not a function', done => {
    expect(_.isFunction({})).to.be.false;
    done();
  });

  it('should navigate to the specified url', done => {
    let replace = sinon.spy();
    global.window = {
      location: {
        replace: replace
      }
    };

    _.navigateTo('http://www.gusteau.com');

    expect(replace.calledWith('http://www.gusteau.com')).to.be.true;

    global.window = undefined;
    done();
  });

  it('should set a cookie', done => {
    let spy = sinon.spy(Cookies, 'set');

    _.setCookie('test', 'value', new Date(1000));

    expect(spy.calledWith('test', 'value', {expires: new Date(1000)})).to.be.true;

    spy.restore();
    done();
  });

  it('should get a cookie', done => {
    sinon.stub(Cookies, 'get')
      .withArgs('test')
      .returns('value');

    let cookieValue = _.getCookie('test');

    expect(cookieValue).to.equal('value');

    Cookies.get.restore();
    done();
  });

  it('should delete a cookie', done => {
    let spy = sinon.spy(Cookies, 'remove');

    _.deleteCookie('test');

    expect(spy.calledWith('test')).to.be.true;

    spy.restore();
    done();
  });

  it('should get a query param', done => {
    global.window = {
      location: {
        href : 'http://www.linguini.com?access_token=70k3n%21'
      }
    };

    let token = _.getQueryParam('access_token');

    expect(token).to.equal('70k3n!');

    global.window = undefined;
    done();
  });
});