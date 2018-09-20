require('offline-plugin/runtime').install();
import './assets/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store, history} from './components/linguini/redux';
import {ConnectedRouter} from 'connected-react-router';
import Shell from './components/linguini/layout/shell';

import * as _ from './utils/utilities';


const sessionActions = _.getLinguiniInstanceProvider().sessionActions;

if (typeof window.navigator.onLine !== 'undefined') {
  store.dispatch(sessionActions.toggleConnectivity(window.navigator.onLine));

  window.addEventListener('offline', () => {
    store.dispatch(sessionActions.toggleConnectivity(false));
  });

  window.addEventListener('online', () => {
    store.dispatch(sessionActions.toggleConnectivity(true));
  });
} else {
  store.dispatch(sessionActions.toggleConnectivity(true));
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Shell/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);