import axios from 'axios';
import * as actionTypes from './constants';

// Add new post
export const uploadPost = (post, userId, handle, history) => async dispatch => {
  dispatch({
    type: actionTypes.ADD_POST_REQUEST,
  });

  try {
    const response = await axios.post(`/posts/upload`, {
      post,
      userId,
    }); 

    dispatch({
      type: actionTypes.ADD_POST_SUCCESS,
      payload: response.data.post,
    });

    // Redirect to Home page upon successful registration
    history.push(`/${handle}`);
  } catch (error) {
    dispatch({ type: actionTypes.ADD_POST_FAILURE, payload: error });
  }
};

// Fetch specific post i.e. photo (or video) corresponding to Instagram handle
export const fetchPosts = () => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_POSTS_REQUEST,
  });

  try {
    const response = await axios.get(`/posts`);

    dispatch({
      type: actionTypes.FETCH_POSTS_SUCCESS,
      payload: response.data.posts,
    });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_POSTS_FAILURE, payload: error });
  }
};

// Fetch specific post i.e. photo (or video) corresponding to Instagram handle
export const fetchPost = (handle, postId) => async dispatch => {
  dispatch({
    type: actionTypes.FETCH_POST_REQUEST,
  });

  try {
    const response = await axios.get(
      `/posts/${handle}/${postId}`
    );

    dispatch({
      type: actionTypes.FETCH_POST_SUCCESS,
      payload: response.data.post,
    });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_POST_FAILURE, payload: error });
  }
};

// Like specific post corresponding to Instagram handle
export const likePost = (userId, postId) => async dispatch => {
  const action = 'likePost';

  dispatch({
    type: actionTypes.LIKE_POST_REQUEST,
  });

  try {
    const response = await axios.patch(
      `/posts/${postId}/update`,
      { action, userId }
    );
    console.log(response);
    dispatch({
      type: actionTypes.LIKE_POST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.LIKE_POST_FAILURE, payload: error });
  }
};

// Bookmark specific post corresponding to Instagram handle
export const bookmarkPost = (userId, postId) => async dispatch => {
  const action = 'bookmarkPost';

  dispatch({
    type: actionTypes.BOOKMARK_POST_REQUEST,
  });

  try {
    const response = await axios.patch(
      `/posts/${postId}/update`,
      { action, userId }
    );

    dispatch({
      type: actionTypes.BOOKMARK_POST_SUCCESS,
      payload: response.data.post,
    });
  } catch (error) {
    dispatch({ type: actionTypes.BOOKMARK_POST_FAILURE, payload: error });
  }
};

// Comment on specific post corresponding to Instagram handle
export const commentOnPost = (userId, postId, comment) => async dispatch => {
  const action = 'commentOnPost';

  dispatch({
    type: actionTypes.COMMENT_ON_POST_REQUEST,
  });

  try {
    const response = await axios.patch(
      `/posts/${postId}/update`,
      { action, userId, comment }
    );

    dispatch({
      type: actionTypes.COMMENT_ON_POST_SUCCESS,
      payload: response.data.post,
    });
  } catch (error) {
    dispatch({ type: actionTypes.COMMENT_ON_POST_FAILURE, payload: error });
  }
};

// Delete comments posted by self on different posts
// or by others on own posts
export const deleteComment = (handle, postId) => async dispatch => {
  const action = 'deleteComment';

  dispatch({
    type: actionTypes.DELETE_COMMENT_REQUEST,
  });

  try {
    const response = await axios.patch(
      `/posts/${handle}/${postId}`,
      { action }
    );

    dispatch({
      type: actionTypes.DELETE_COMMENT_SUCCESS,
      payload: response.data.post,
    });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_COMMENT_FAILURE, payload: error });
  }
};

// Remove/delete post from collection
export const removePost = (userId, postId) => async dispatch => {
  dispatch({
    type: actionTypes.REMOVE_POST_REQUEST,
  });

  try {
    await axios.delete(
      `/posts/${userId}/${postId}/remove`
    );
    dispatch({ type: actionTypes.REMOVE_POST_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_POST_FAILURE, payload: error });
  }
};
