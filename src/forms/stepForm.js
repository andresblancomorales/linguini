import {isString} from '../utils/utilities';

export const StepForm = {
  step: {
    validate: (value) => {
      return Promise.resolve(isString(value) && value.trim().length > 0);
    }
  }
};
