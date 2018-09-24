import {shallow} from 'enzyme';
import React from 'react';
import NewStep from '../../../../src/components/linguini/recipes/newStep';

describe('<NewStep/>', () => {
  it('should match the snapshot', done => {
    let wrapper = shallow(<NewStep/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should match the snapshot when there are errors', done => {
    let wrapper = shallow(<NewStep/>);

    wrapper.find('FormField').simulate('change', '');

    setTimeout(() => {
      //we wait because form validation are promises
      expect(wrapper).to.matchSnapshot();
      done();
    }, 10);
  });

  it('should match the snapshot when data is valid', done => {
    let wrapper = shallow(<NewStep/>);

    wrapper.find('FormField').simulate('change', 'Mix the ingredients');

    setTimeout(() => {
      //we wait because form validation are promises
      expect(wrapper).to.matchSnapshot();
      done();
    }, 10);
  });

  it('should provide the form data when submitted', done => {
    let onSubmit = sinon.spy();

    let wrapper = shallow(<NewStep onSubmit={onSubmit}/>);

    wrapper.find('FormField').simulate('change', 'Mix the ingredients');

    setTimeout(() => {
      //we wait because form validation are promises
      wrapper.find('button').simulate('click');
      expect(onSubmit.calledWith({step: 'Mix the ingredients'})).to.be.true;
      done();
    }, 100);
  });
});