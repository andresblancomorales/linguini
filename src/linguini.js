import './assets/styles/main.scss';
require('offline-plugin/runtime').install();

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store, history} from './components/linguini/redux';
import {ConnectedRouter} from 'connected-react-router';
import Shell from './components/linguini/layout/shell';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Shell/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);