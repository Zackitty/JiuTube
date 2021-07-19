import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Grommet } from 'grommet';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { theme } from './Grommet/theme'
import { PersistGate } from 'redux-persist/integration/react'

import {store, persistor} from './store/configStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate  loading={null} persistor={persistor}>
      <Grommet theme={theme}>
        <App />
      </Grommet>
      </PersistGate>d
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
