import * as actionTypes from './constants';

import clientReq from '../../auth';

const request = clientReq();

// Fetch all users
export const fetchAllUsers = token => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_ALL_USERS_REQUEST,
  });

  try {
    const { data: { users } } = await request.get(`/users`);

    dispatch({
      type: actionTypes.FETCH_ALL_USERS_SUCCESS,
      payload: users,
    });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_ALL_USERS_FAILURE, payload: error });
  }
};

// Fetch current (logged in) user profile
export const fetchCurrentUser = token => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_CURRENT_USER_REQUEST,
  });

  try {
    const { data: { user } } = await request.get(`/users/me`);

    dispatch({
      type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_CURRENT_USER_FAILURE, payload: error });
  }
};

// Fetch user profile
export const fetchUserByHandle = handle => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_USER_BY_HANDLE_REQUEST,
  });

  try {
    const { data: { user } } = await request.get(`/users/${handle}`);

    dispatch({
      type: actionTypes.FETCH_USER_BY_HANDLE_SUCCESS,
      payload: user[0],
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_USER_BY_HANDLE_FAILURE,
      payload: error,
    });
  }
};

// Edit and update user profile
export const updateUserInfo = (handle, updateInfo, history) => async dispatch => {
  dispatch({
    type: actionTypes.EDIT_USER_REQUEST,
  });

  try {
    const { data }  = await request.patch(`/users/${handle}/update`, {
      updateInfo
    });

    dispatch({
      type: actionTypes.EDIT_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.EDIT_USER_FAILURE,
      payload: error,
    });
  }
};

// Change password
export const changePassword = (handle, passwordInfo, history) => async dispatch => {
  dispatch({
    type: actionTypes.CHANGE_PASSWORD_REQUEST,
  });

  try {
    const { data } = await request.patch(`/users/${handle}/change-pwd`, {
      passwordInfo
    });

    dispatch({
      type: actionTypes.CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CHANGE_PASSWORD_FAILURE,
      payload: error,
    });
  }
};

// Follow user
export const followUser = (handle, userId) => async dispatch => {
  dispatch({
    type: actionTypes.FOLLOW_USER_REQUEST,
  });

  try {
    const response = await request.patch(`/users/${handle}/follow`, {
      userId,
    });

    dispatch({
      type: actionTypes.FOLLOW_USER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({ type: actionTypes.FOLLOW_USER_FAILURE, payload: error });
  }
};

// Delete account
export const deleteAccount = (handle, history) => async dispatch => {
  dispatch({
    type: actionTypes.DELETE_ACCOUNT_REQUEST,
  });

  try {
    const response = await request.delete(`/users/${handle}/delete`);

    dispatch({
      type: actionTypes.DELETE_ACCOUNT_SUCCESS,
      payload: response,
    });

    localStorage.removeItem('token');

    history.push('/');
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_ACCOUNT_FAILURE, payload: error });
  }
};
