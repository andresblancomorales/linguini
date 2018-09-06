import {recipesReducer} from '../../src/reducers/recipesReducer';
import RecipeActions from '../../src/actions/recipeActions';

describe('RecipesReducer', () =>{

  it('should have an initial state', done => {
    let state = recipesReducer(undefined, {type: 'IGNORED'});

    expect(state).to.deep.equal({
      all: [],
      loading: false,
      error: undefined
    });

    done();
  });

  it('should set the state when getting the recipes', done => {
    let state = recipesReducer({
      all: [{_id: '001', name: 'Rice n Beans'}],
      loading: false,
      error: 'Failed to load recipes'
    }, {type: RecipeActions.Actions.GETTING_RECIPES});

    expect(state).to.deep.equal({
      all: [{_id: '001', name: 'Rice n Beans'}],
      loading: true,
      error: undefined
    });

    done();
  });

  it('should set the state when it gets the recipes', done => {
    let state = recipesReducer({
      all: [{_id: '001', name: 'Rice n Beans'}],
      loading: true,
      error: 'Failed to load recipes'
    }, {type: RecipeActions.Actions.GOT_RECIPES, recipes: [{_id: '002', name: 'Chifrijo'}]});

    expect(state).to.deep.equal({
      all: [{_id: '002', name: 'Chifrijo'}],
      loading: false,
      error: undefined
    });

    done();
  });

  it('should set the state when it fails to get the recipes', done => {
    let state = recipesReducer({
      all: [{_id: '001', name: 'Rice n Beans'}],
      loading: true,
      error: undefined
    }, {type: RecipeActions.Actions.GET_RECIPES_FAILED});

    expect(state).to.deep.equal({
      all: [{_id: '001', name: 'Rice n Beans'}],
      loading: false,
      error: 'Failed to load recipes'
    });

    done();
  });
});