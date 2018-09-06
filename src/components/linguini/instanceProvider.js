import RecipeActions from '../../actions/recipeActions';
import GusteauClient from '../../clients/gusteauClient';
import BearerTokenProvider from '../../utils/bearerTokenProvider';
import {store} from './redux';
import SessionActions from "../../actions/sessionActions";
import {tokenDecoded} from "../../actions/tokenActions";

const decodedTokenListener = (decodedToken) => {
  store.dispatch(tokenDecoded(decodedToken));
};

export const bearerTokenProvider = new BearerTokenProvider(decodedTokenListener);
bearerTokenProvider.getToken(true).catch(error => {
  console.log('pending redirect');
});

const gusteauClient = new GusteauClient(GUSTEAU_URL, bearerTokenProvider);

export const sessionActions = new SessionActions(gusteauClient);
export const recipeActions = new RecipeActions(gusteauClient);