export default class RecipeActions {
  constructor(gusteauClient) {
    this.gusteauClient = gusteauClient;
  }

  creators = {
    getRecipes: this.getRecipes.bind(this)
  };

  static Actions = {
    GETTING_RECIPES: 'GETTING_RECIPES',
    GOT_RECIPES: 'GOT_RECIPES',
    GET_RECIPES_FAILED: 'GET_RECIPES_FAILED'
  };

  getRecipes(offset) {
    return async dispatch => {
      dispatch({
        type: RecipeActions.Actions.GETTING_RECIPES,
        offset: offset
      });

      try {
        let response = await this.gusteauClient.getRecipes(offset);
        dispatch({
          type: RecipeActions.Actions.GOT_RECIPES,
          offset: offset,
          recipes: response.body
        });
      } catch (error) {
        dispatch({
          type: RecipeActions.Actions.GET_RECIPES_FAILED,
          offset: offset
        });
      }
    }
  }
}