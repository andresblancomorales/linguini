import RecipeActions from '../actions/recipeActions';

const initialState = {
  all: [],
  loading: false,
  error: undefined,
  categories: []
};

export const recipesReducer = (state = initialState, action) => {
  switch(action.type) {
    case RecipeActions.Actions.GETTING_RECIPES:
      state = {
        ...state,
        loading: true,
        error: undefined,
      };
      break;
    case RecipeActions.Actions.GOT_RECIPES:
      if (action.offset) {
        state = {
          ...state,
          all: [...state.all, ...action.recipes],
          loading: false,
          error: undefined,
        };
      } else {
        state = {
          ...state,
          all: action.recipes,
          loading: false,
          error: undefined,
        };
      }
      break;
    case RecipeActions.Actions.GET_RECIPES_FAILED:
      state = {
        ...state,
        loading: false,
        error: 'Failed to load recipes'
      };
      break;
    case RecipeActions.Actions.GOT_CATEGORIES:
      state = {
        ...state,
        categories: action.categories
      };
      break;
  }

  return state;
};
