import {shallow} from 'enzyme';
import React from 'react';
import * as _ from "../../../src/utils/utilities";

describe('<RecipesView/>', () => {
  let RecipesView;

  before(done => {
    sinon.stub(_, 'getLinguiniInstanceProvider')
      .withArgs()
      .returns({
        bearerTokenProvider: {
          getToken: () => {
            return Promise.resolve('70k3n')
          }
        }
      });
    RecipesView = require('../../../src/components/linguini/recipesView').RecipesView;

    done();
  });

  after(() => {
    _.getLinguiniInstanceProvider.restore();
  });

  it('should match the spapshot with no recipes', done => {
    let getRecipes = sinon.spy();
    const wrapper = shallow(<RecipesView recipes={{all: []}} actions={{ getRecipes: getRecipes }}/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should match the spapshot with recipes', done => {
    let getRecipes = sinon.spy();
    const wrapper = shallow(<RecipesView recipes={{all: [
        {
          _id: '001',
          name: 'Rice n Beans',
          pictureUrl: 'http://www.linguini.com/recipe.png',
          ingredients: [
            {
              name: 'Rice',
              amount: '1kg'
            },
            {
              name: 'Beans',
              amount: '2kg'
            }
          ],
          preparation: [
            "Gather",
            "Mix",
            "Cook"
          ]
        }
      ]}} actions={{ getRecipes: getRecipes }}/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should get the recipes when mounting', done => {
    let getRecipes = sinon.spy();
    const wrapper = shallow(<RecipesView recipes={{all: []}} actions={{ getRecipes: getRecipes }}/>);

    expect(getRecipes.called).to.be.true;

    done();
  });

});
