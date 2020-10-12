import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Grommet } from 'grommet';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import configStore from './store/configStore';
import { theme } from './Grommet/theme'

const store = configStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate}>
      <Grommet theme={theme}>
        <App />
      </Grommet>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
