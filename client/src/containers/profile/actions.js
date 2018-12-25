import * as actionTypes from './constants';

import clientReq from '../../auth';

const request = clientReq();

// Fetch posts i.e. photos (or videos) corresponding to Instagram handle from server
export const fetchPosts = handle => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_POSTS_REQUEST,
  });

  try {
    const response = await request.get(
      `/posts/${handle}`
    );

    dispatch({
      type: actionTypes.FETCH_POSTS_SUCCESS,
      payload: response.data.posts,
    });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_POSTS_FAILURE, payload: error });
  }
}; 
