import { shallow, mount } from 'enzyme';
import React from 'react';
import FormField from '../../../src/components/misc/formField';

describe('<FormField />', () => {
  it('should match snapshot', done => {
    const wrapper = shallow(<FormField/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should set all properties', done => {
    const wrapper = shallow(<FormField autoComplete='username' placeholder='Username' type='text' value='user@email.com' disabled={false}/>);

    let inputProps = wrapper.find('input').props();
    expect(inputProps['placeholder']).to.equal('Username');
    expect(inputProps['autoComplete']).to.equal('username');
    expect(inputProps['type']).to.equal('text');
    expect(inputProps['value']).to.equal('user@email.com');
    expect(inputProps['disabled']).to.be.false;

    let underlineProps = wrapper.find('div.underline').props();
    expect(underlineProps['data-placeholder']).to.equal('Username');
    done();
  });

  it('should trigger onChange event', done => {
    let onChange = sinon.spy();
    const wrapper = shallow(<FormField onChange={onChange}/>);

    wrapper.find('input').simulate('change', { target: {value: 'hola'}});

    setTimeout(() => {
      expect(onChange.calledWith('hola')).to.be.true;
      done();
    }, 350)
  });
});