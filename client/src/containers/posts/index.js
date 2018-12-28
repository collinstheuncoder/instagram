import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostMain from '../../components/post';
import {
  fetchPost,
  likePost,
  bookmarkPost,
  commentOnPost,
  deleteComment,
  removePost,
} from './actions';

class InstaPost extends Component {
  constructor(props) {
    super();

    this.state = {
      isLiked: false,
      isCommentSectionDisplayed: false,
      isBookmarked: false,
      commentsLimit: 5,
    };
  }

  // Fetch Post
  componentDidMount() {
    const {
      fetchPost,
      match: {
        params: { postId },
      },
    } = this.props;
    fetchPost(postId);
  }

  // Toggle 'like' post
  onLikePost = () =>
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
    }));

  // Toggle comment section of post
  onShowCommentSection = () =>
    this.setState(prevState => ({
      isCommentSectionDisplayed: !prevState.isCommentSectionDisplayed,
    }));

  // Toggle bookmark post
  onBookmarkPost = () =>
    this.setState(prevState => ({
      isBookmarked: !prevState.isBookmarked,
    }));

  render() {
    const {
      isLiked,
      isCommentSectionDisplayed,
      isBookmarked,
      commentsLimit,
    } = this.state;

    return (
      <PostMain
        isLiked={isLiked}
        isCommentSectionDisplayed={isCommentSectionDisplayed}
        isBookmarked={isBookmarked}
        commentsLimit={commentsLimit}
        {...this.props}
        likePost={this.onLikePost}
        showCommentSection={this.onShowCommentSection}
        bookmarkPost={this.onBookmarkPost}
      />
    );
  }
}

InstaPost.propTypes = {
  post: PropTypes.object.isRequired,
  fetchPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  bookmarkPost: PropTypes.func.isRequired,
  commentOnPost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
};

function mapStateToProps({ post }) {
  return {
    post: post.post,
    error: post.error,
  };
}

export default connect(mapStateToProps, {
  fetchPost,
  likePost,
  bookmarkPost,
  commentOnPost,
  deleteComment,
  removePost,
})(InstaPost);
