import * as actionTypes from './constants';

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
  error: null,
};

const profile = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_POSTS_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...payload],
        isLoading: false,
        error: null,
      };
    case actionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        posts: [...state.posts],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default profile;
