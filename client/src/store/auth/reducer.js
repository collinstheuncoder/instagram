import * as actionTypes from './constants';

const INITIAL_STATE = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

function auth(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actionTypes.CREATE_ACCOUNT_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: null,
      };
    case actionTypes.CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: payload,
      };
    case actionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: null,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: payload,
      };
    case actionTypes.LOGOUT_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: null,
      };
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: payload,
      };
    default:
      return state;
  }
}

export default auth;
