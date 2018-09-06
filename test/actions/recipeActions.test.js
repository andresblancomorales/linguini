import RecipeActions from '../../src/actions/recipeActions';
import GusteauClient from '../../src/clients/gusteauClient';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('RecipeActions', () => {
  it('should get all recipes and dispatch the correct events', done => {
    let gusteauClient = new GusteauClient('http://www.gusteau.com');
    sinon.stub(gusteauClient, 'getRecipes')
      .withArgs()
      .returns(Promise.resolve({status: 200, body: [{_id: '001', name: 'Rice n Beans'}, {_id: '002', name: 'Chifrijo'}]}));

    let expectedActions = [
      {type: RecipeActions.Actions.GETTING_RECIPES, offset: undefined},
      {type: RecipeActions.Actions.GOT_RECIPES, offset: undefined, recipes: [{_id: '001', name: 'Rice n Beans'}, {_id: '002', name: 'Chifrijo'}]}
    ];

    let store = mockStore({});

    let recipeActions = new RecipeActions(gusteauClient);

    store.dispatch(recipeActions.getRecipes())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      });
  });

  it('should get all recipes from an offset and dispatch the correct events', done => {
    let gusteauClient = new GusteauClient('http://www.gusteau.com');
    sinon.stub(gusteauClient, 'getRecipes')
      .withArgs('001')
      .returns(Promise.resolve({status: 200, body: [{_id: '002', name: 'Chifrijo'}]}));

    let expectedActions = [
      {type: RecipeActions.Actions.GETTING_RECIPES, offset: '001'},
      {type: RecipeActions.Actions.GOT_RECIPES, offset: '001', recipes: [{_id: '002', name: 'Chifrijo'}]}
    ];

    let store = mockStore({});

    let recipeActions = new RecipeActions(gusteauClient);

    store.dispatch(recipeActions.getRecipes('001'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      });
  });

  it('should try to get all recipes and dispatch the correct event if it fais', done => {
    let gusteauClient = new GusteauClient('http://www.gusteau.com');
    sinon.stub(gusteauClient, 'getRecipes')
      .withArgs('001')
      .returns(Promise.reject(new Error("Kapow!")));

    let expectedActions = [
      {type: RecipeActions.Actions.GETTING_RECIPES, offset: '001'},
      {type: RecipeActions.Actions.GET_RECIPES_FAILED, offset: '001'}
    ];

    let store = mockStore({});

    let recipeActions = new RecipeActions(gusteauClient);

    store.dispatch(recipeActions.getRecipes('001'))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      });
  });
});