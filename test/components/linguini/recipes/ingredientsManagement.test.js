import {shallow} from 'enzyme';
import React from 'react';
import IngredientsManagement from '../../../../src/components/linguini/recipes/ingredientsManagement';

describe('<IngredientsManagement/>', () => {

  it('should match the snapshot', done => {
    let wrapper = shallow(<IngredientsManagement recipeName='Awesome Pizza!'
                                                 ingredients={[{name: 'Rice', quantity: '1 cup'}]}/>);

    expect(wrapper).to.matchSnapshot();
    done();
  });

  it('should match the snapshot when 10 ingredients are added', done => {
    let wrapper = shallow(<IngredientsManagement recipeName='Awesome Pizza!'
                                                 ingredients={[
                                                   {name: 'Rice', amount: '1 cup'},
                                                   {name: 'Salt', amount: '1 tbsp'},
                                                   {name: 'Water', amount: '1/2 cup'},
                                                   {name: 'Pepper', amount: '1 tbsp'},
                                                   {name: 'Paprika', amount: '1 tbsp'},
                                                   {name: 'Onion', amount: '1 unit'},
                                                   {name: 'Garlic', amount: '1 unit'},
                                                   {name: 'Chicken', amount: '1 whole chicken'},
                                                   {name: 'Chilli', amount: '1 tbsp'},
                                                   {name: 'Oregano', amount: '1 unit'}
                                                 ]}/>);

    expect(wrapper).to.matchSnapshot();
    done();
  });

  it('should notify that an ingredient was added', done => {
    let onIngredientAdded = sinon.spy();
    let wrapper = shallow(<IngredientsManagement recipeName='Awesome Pizza!'
                                                 ingredients={[{name: 'Rice', amount: '1 cup'}]}
                                                 onIngredientAdded={onIngredientAdded}/>);

    wrapper.find('NewIngredient').simulate('submit', {name: 'Salt', amount: '1 tbsp'});

    expect(onIngredientAdded.calledWith({name: 'Salt', amount: '1 tbsp'})).to.be.true;
    done();
  });

  it('should notify that an ingredient was deleted', done => {
    let onIngredientRemoved = sinon.spy();
    let wrapper = shallow(<IngredientsManagement recipeName='Awesome Pizza!'
                                                 ingredients={[{name: 'Rice', amount: '1 cup'}]}
                                                 onIngredientRemoved={onIngredientRemoved}/>);

    wrapper.findWhere(control => control.key() === 'ingredient_0').find('button').simulate('click');

    expect(onIngredientRemoved.calledWith({name: 'Rice', amount: '1 cup'})).to.be.true;
    done();
  });

  it('should notify when the form is submitted', done => {
    let onSubmit = sinon.spy();
    let wrapper = shallow(<IngredientsManagement recipeName='Awesome Pizza!'
                                                 ingredients={[{name: 'Rice', amount: '1 cup'}]}
                                                 onSubmit={onSubmit}/>);

    wrapper.find('a').at(1).simulate('click');

    expect(onSubmit.called).to.be.true;
    done();
  });
});