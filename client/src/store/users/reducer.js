import * as actionTypes from './constants';

const INITIAL_STATE = {
  usersList: [],
  currentUser: {},
  profile: {},
  isLoading: false,
  error: null,
};

function users(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actionTypes.FETCH_ALL_USERS_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersList: [ ...state.usersList, ...payload ],
        error: null
      };
    case actionTypes.FETCH_ALL_USERS_FAILURE:
      return { 
        ...state, 
        isLoading: false,  
        error: payload 
      };
    case actionTypes.FETCH_CURRENT_USER_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: { ...state.currentUser, ...payload },
        error: null
      };
    case actionTypes.FETCH_USER_BY_HANDLE_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_USER_BY_HANDLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: { ...state.profile, ...payload },
        error: null
      };
    case actionTypes.FETCH_USER_BY_HANDLE_FAILURE:
      return { 
      	...state, 
      	isLoading: false, 
      	error: payload 
      };
    case actionTypes.FOLLOW_USER_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: { ...state.user, ...payload },
      };
    case actionTypes.FOLLOW_USER_FAILURE:
      return { 
      	...state, 
      	isLoading: false, 
      	error: payload 
      };
    default:
      return state;
  }
}

export default users;
