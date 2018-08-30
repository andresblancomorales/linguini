import {createHashHistory} from 'history';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {sessionReducer} from '../../reducers/sessionReducer';
import {redirector} from "../../middlewares/redirector";

export const history = createHashHistory();

const reducers = combineReducers({
  session: sessionReducer
});

const middlewares = applyMiddleware(
  thunk,
  createLogger(),
  routerMiddleware(history),
  redirector
);

export const store = createStore(
  connectRouter(history)(reducers),
  middlewares
);