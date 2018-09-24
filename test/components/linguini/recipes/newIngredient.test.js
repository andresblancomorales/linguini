import {shallow} from 'enzyme';
import React from 'react';
import NewIngredient from '../../../../src/components/linguini/recipes/newIngredient';

describe('<NewIngredient/>', () => {

  it('should match the snapshot', done => {
    let wrapper = shallow(<NewIngredient/>);

    expect(wrapper).to.matchSnapshot();
    done();
  });

  it('should match the snapshot when there are errors', done => {
    let wrapper = shallow(<NewIngredient/>);

    wrapper.find({placeholder: 'Name'}).simulate('change', '');

    setTimeout(() => {
      //we wait because form validation are promises
      expect(wrapper).to.matchSnapshot();
      done();
    }, 10);
  });

  it('should match the snapshot when there are no errors', done => {
    let wrapper = shallow(<NewIngredient/>);

    wrapper.find({placeholder: 'Name'}).simulate('change', 'Rice');
    wrapper.find({placeholder: 'Quantity'}).simulate('change', '1 cup');

    setTimeout(() => {
      //we wait because form validation are promises
      expect(wrapper).to.matchSnapshot();
      done();
    }, 10);
  });

  it('should provide the form data when submitted', done => {
    let onSubmit = sinon.spy();

    let wrapper = shallow(<NewIngredient onSubmit={onSubmit}/>);

    wrapper.find({placeholder: 'Name'}).simulate('change', 'Rice');
    wrapper.find({placeholder: 'Quantity'}).simulate('change', '1 cup');

    setTimeout(() => {
      //we wait because form validation are promises
      wrapper.find('button').simulate('click');
      expect(onSubmit.calledWith({name: 'Rice', quantity: '1 cup'})).to.be.equal;
      done();
    }, 10);
  });

});