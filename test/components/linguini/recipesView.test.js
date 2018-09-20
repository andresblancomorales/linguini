import {shallow, mount} from 'enzyme';
import React from 'react';
import * as _ from "../../../src/utils/utilities";
import Spinner from "../../../src/components/linguini/layout/spinner";

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

    sinon.stub(_, 'reduxConnect')
      .returns(Spinner);

    RecipesView = require('../../../src/components/linguini/recipesView').RecipesView;

    done();
  });

  after(() => {
    _.getLinguiniInstanceProvider.restore();
    _.reduxConnect.restore();
  });

  it('should match the snapshot with no recipes', done => {
    let getRecipes = sinon.spy();
    const wrapper =shallow(<RecipesView recipes={[]} actions={{ getRecipes: getRecipes }}/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should match the snapshot with recipes', done => {
    let getRecipes = sinon.spy();
    const wrapper = shallow(<RecipesView recipes={[
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
      ]} actions={{ getRecipes: getRecipes }}/>);

    expect(wrapper).to.matchSnapshot();

    done();
  });

  it('should get the recipes when mounting', done => {
    let getRecipes = sinon.spy();

    shallow(<RecipesView recipes={[]} actions={{ getRecipes: getRecipes }}/>);

    expect(getRecipes.called).to.be.true;

    done();
  });

  it('should get more recipes when scrolling to the bottom', done => {
    let getRecipes = (offset) => {
      if (offset) {
        expect(offset).to.equal('001');
        done();
      }
    };

    const wrapper = mount(<RecipesView recipes={[{
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
    }]} actions={{ getRecipes: getRecipes }}/>);

    let recipes = wrapper.find('div.recipes');

    recipes.simulate('scroll', { currentTarget: { scrollTop: 0 }});

  });

});
