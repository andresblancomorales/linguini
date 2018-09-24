export default class RecipeActions {
  constructor(gusteauClient) {
    this.gusteauClient = gusteauClient;
  }

  creators = {
    getRecipes: this.getRecipes.bind(this),
    getCategories: this.getCategories.bind(this),
    saveRecipe: this.saveRecipe.bind(this)
  };

  static Actions = {
    GETTING_RECIPES: 'GETTING_RECIPES',
    GOT_RECIPES: 'GOT_RECIPES',
    GET_RECIPES_FAILED: 'GET_RECIPES_FAILED',
    GETTING_CATEGORIES: 'GETTING_CATEGORIES',
    GOT_CATEGORIES: 'GOT_CATEGORIES',
    GET_CATEGORIES_FAILED: 'GET_CATEGORIES_FAILED',
    SAVING_RECIPE: 'SAVING_RECIPE',
    RECIPE_SAVED: 'RECIPE_SAVED',
    DUPLICATE_RECIPE: 'DUPLICATE_RECIPE',
    RECIPE_SAVING_FAILED: 'RECIPE_SAVING_FAILED'
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
        });
      }
    }
  }

  saveRecipe(recipe) {
    return async dispatch => {
      dispatch({
        type: RecipeActions.Actions.SAVING_RECIPE,
        recipe: recipe,
      });

      try {
        let response = await this.gusteauClient.postRecipe(recipe);
        dispatch({
          type: RecipeActions.Actions.RECIPE_SAVED,
          recipe: response.body
        });
      } catch (error) {
        if (error.status === 400) {
          switch (error.error.name) {
            case 'RecipeExistsException':
              dispatch({
                type: RecipeActions.Actions.DUPLICATE_RECIPE,
                recipe: recipe
              });
              break;
            default:
              dispatch({
                type: RecipeActions.Actions.RECIPE_SAVING_FAILED,
                recipe: recipe
              });
              break;
          }
        } else {
          dispatch({
            type: RecipeActions.Actions.RECIPE_SAVING_FAILED,
            recipe: recipe
          });
        }
      }

    }
  }
}