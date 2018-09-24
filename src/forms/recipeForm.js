import {isArray, isString} from '../utils/utilities';

export const RecipeForm = {
  name: {
    validate: (value) => {
      return Promise.resolve(isString(value) && value.trim().length > 0);
    }
  },
  ingredients: {
    defaultValue: [],
    validate: (value) => {
      return Promise.resolve(isArray(value) && value.length > 0 && value.length <= 10);
    }
  },
  preparation: {
    defaultValue: [],
    validate: (value) => {
      return Promise.resolve(isArray(value) && value.length > 0);
    }
  }
};
