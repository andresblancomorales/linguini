import { shallow } from 'enzyme';
import React from 'react';
import {LoginForm} from '../../../src/components/login/loginForm';

describe('<LoginForm />', () => {

  it('should match the snapshot', done => {
    const wrapper  = shallow(<LoginForm session={{error: undefined, loading: false} }/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should match the error snapshot', done => {
    const wrapper  = shallow(<LoginForm session={{error: 'Invalid username or password'}} />);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should match the progress snapshot', done => {
    const wrapper  = shallow(<LoginForm session={{error: undefined, loading: true}} />);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should not show an error if none is present', done => {
    const wrapper = shallow(<LoginForm session={{error: undefined, loading: false}}/>);

    let errorField = wrapper.find('div.error');
    expect(errorField.children()).to.have.lengthOf(0);

    done();
  });

  it('should not show an error if the session is loading', done => {
    const wrapper = shallow(<LoginForm session={{error: 'Invalid username or password', loading: true}} />);

    let errorField = wrapper.find('div.error');
    expect(errorField.children()).to.have.lengthOf(0);

    done();
  });

  it('should show an error if defined', done => {
    const wrapper = shallow(<LoginForm session={{error: 'Invalid username or password', loading: false}} />);

    let errorText = wrapper.find('div.error p').map(node => node.text());

    expect(errorText).to.deep.equal(['Invalid username or password']);

    done();
  });

  it('should set the username', done => {
    const wrapper = shallow(<LoginForm session={{error: undefined}}/>);

    let usernameField = wrapper.findWhere(node => {
      return node.props().autoComplete === 'username'
    });

    usernameField.simulate('change', 'andres@email.com');

    expect(wrapper.state().username).to.equal('andres@email.com');
    done();
  });

  it('should set the password', done => {
    const wrapper = shallow(<LoginForm session={{error: undefined}}/>);

    let usernameField = wrapper.findWhere(node => {
      return node.props().type === 'password'
    });

    usernameField.simulate('change', 'password');

    expect(wrapper.state().password).to.equal('password');
    done();
  });

  it('should call getToken when clicking the login button', done => {
    let getToken = sinon.spy();
    const wrapper = shallow(<LoginForm session={{error: undefined}} actions={{getToken: getToken}}/>);

    wrapper.setState({username: 'andres@email.com', password: 'password'});

    wrapper.find('button').simulate('click');

    expect(getToken.calledWith('andres@email.com', 'password')).to.be.true;
    done();
  });

});