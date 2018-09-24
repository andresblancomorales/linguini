import {isString} from "../utils/utilities";

export const IngredientForm = {
  name: {
    validate: (value) => {
      return Promise.resolve(isString(value) && value.trim().length > 0);
    }
  },
  quantity: {
    validate: (value) => {
      return Promise.resolve(isString(value) && value.trim().length > 0);
    }
  }
};
