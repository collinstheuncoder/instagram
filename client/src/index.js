import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import App from './components/App';
 
// Stylesheets
import 'semantic-ui-css/semantic.min.css';
import './scss/index.scss';

// Store config
import configureStore from './store';
import { LOGIN_SUCCESS } from './store/auth/constants';
import {
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
} from './store/users/constants';

import authRequest from './auth-req';

// Attach token to request headers
const request = authRequest();
  
// Create store
const store = configureStore();

// Retrieve token from browser storage
const token = localStorage.getItem('ig-token');

// Auto login to account
autoLogin(token);

async function autoLogin(token) {
  if (token) {
    store.dispatch({
      type: LOGIN_SUCCESS,
    });

    // Request for current logged in user
    getUserInfo(token);
  }
}

// Get authenticated user's info
async function getUserInfo(token) {  
  try {
    const { data: { user } } = await request.get(`/users/me`);

    if (user) {
      store.dispatch({
        type: FETCH_CURRENT_USER_SUCCESS,
        payload: user,
      });
    }
  } catch (error) {
    store.dispatch({
      type: FETCH_CURRENT_USER_FAILURE,
      payload: error,
    });
  }
}

ReactDOM.render(
  <Provider store={store}> 
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
