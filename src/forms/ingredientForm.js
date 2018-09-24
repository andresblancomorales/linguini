import {isString} from "../utils/utilities";

export const IngredientForm = {
  name: {
    validate: (value) => {
      return Promise.resolve(isString(value) && value.trim().length > 0);
    }
  },
  amount: {
    validate: (value) => {
      return Promise.resolve(isString(value) && value.trim().length > 0);
    }
  }
};
