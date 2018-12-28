import * as actionTypes from './constants';

const INITIAL_STATE = {
  posts: [],
  post: {},
  isLoading: false,
  isBookmarked: false,
  error: null,
};

function posts(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actionTypes.ADD_POST_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, payload],
        error: null,
      };
    case actionTypes.ADD_POST_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case actionTypes.FETCH_POSTS_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: payload,
        error: null,
      };
    case actionTypes.FETCH_POSTS_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case actionTypes.FETCH_POST_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: { ...state.post, ...payload },
        error: null,
      };
    case actionTypes.FETCH_POST_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case actionTypes.BOOKMARK_POST_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.BOOKMARK_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isBookmarked: !state.isBookmarked,
        post: { ...state.post, ...payload },
        error: null,
      };
    case actionTypes.BOOKMARK_POST_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case actionTypes.LIKE_POST_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.LIKE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: { ...state.post, ...payload },
      };
    case actionTypes.LIKE_POST_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case actionTypes.COMMENT_ON_POST_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.COMMENT_ON_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: { ...state.post, ...payload },
      };
    case actionTypes.COMMENT_ON_POST_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case actionTypes.REMOVE_POST_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.REMOVE_POST_SUCCESS:
      return { ...state, isLoading: false };
    case actionTypes.REMOVE_POST_FAILURE:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
}

export default posts;
