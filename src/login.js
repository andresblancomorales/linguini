import './assets/styles/login.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store, history} from './components/login/redux';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from 'react-router';
import LoginForm from './components/login/loginForm';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/' render={() => (<LoginForm/>)} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);