import * as _ from "../../src/utils/utilities";

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
});