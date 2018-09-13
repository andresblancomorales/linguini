export default class RecipeActions {
  constructor(gusteauClient) {
    this.gusteauClient = gusteauClient;
  }

  creators = {
    getRecipes: this.getRecipes.bind(this),
    getCategories: this.getCategories.bind(this)
  };

  static Actions = {
    GETTING_RECIPES: 'GETTING_RECIPES',
    GOT_RECIPES: 'GOT_RECIPES',
    GET_RECIPES_FAILED: 'GET_RECIPES_FAILED',
    GETTING_CATEGORIES: 'GETTING_CATEGORIES',
    GOT_CATEGORIES: 'GOT_CATEGORIES',
    GET_CATEGORIES_FAILED: 'GET_CATEGORIES_FAILED'
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

  getCategories() {
    return async dispatch => {
      dispatch({
        type: RecipeActions.Actions.GETTING_CATEGORIES
      });

      try {
        let response = await this.gusteauClient.getCategories();
        dispatch({
          type: RecipeActions.Actions.GOT_CATEGORIES,
          categories: response.body
        });
      } catch (error) {
        dispatch({
          type: RecipeActions.Actions.GET_CATEGORIES_FAILED
        })
      }
    }
  }
}