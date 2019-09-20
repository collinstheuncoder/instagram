import * as actionTypes from './constants';
import { FETCH_CURRENT_USER_SUCCESS } from '../users/constants';

import authRequest from '../../auth-req';

const request = authRequest();

// Create account
export const createAccount = (
  fullname,
  username,
  email,
  password
) => async dispatch => {
  dispatch({
    type: actionTypes.CREATE_ACCOUNT_REQUEST,
  });

  try {
    const {
      data: {
        newUser: { token, user },
      },
    } = await request.post('/auth/signup', {
      fullname,
      username,
      email,
      password,
    });

    // Save token to localStorage
    localStorage.setItem('ig-token', token);

    dispatch({
      type: actionTypes.CREATE_ACCOUNT_SUCCESS,
    });
    dispatch({
      type: FETCH_CURRENT_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_ACCOUNT_FAILURE, payload: error });
  }
};

// Login to account
export const loginUser = (username, password) => async dispatch => {
  dispatch({
    type: actionTypes.LOGIN_REQUEST,
  });

  try {
    const {
      data: { token, user },
    } = await request.post('/auth/login', {
      username,
      password,
    });

    // Save token to localStorage
    localStorage.setItem('ig-token', token);

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
    });
    dispatch({
      type: FETCH_CURRENT_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error.message });
  }
};

//Logout
export const logout = history => async dispatch => {
  dispatch({ type: actionTypes.LOGOUT_REQUEST });

  try {
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });

    localStorage.removeItem('ig-token');

    history.push('/');
  } catch (error) {
    dispatch({ type: actionTypes.LOGOUT_FAILURE, payload: error.message });
  }
};
