import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Divider } from 'semantic-ui-react';

import PostIcons from './PostIcons';
import PostComments from './PostComments';
import CommentForm from '../forms/CommentForm';

import style from './post-main.module.scss';

class PostMain extends Component {
  state = {
    isLiked: false,
    isCommentSectionDisplayed: false,
    isBookmarked: false,
    commentsLimit: 5,
  };

  // Toggle like post
  onLikePost = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
    }));

    const { currentUser, post, likePost } = this.props;

    likePost(currentUser._id, post._id);
  };

  // Toggle comment section of post
  onShowCommentSection = () =>
    this.setState(prevState => ({
      isCommentSectionDisplayed: !prevState.isCommentSectionDisplayed,
    }));

  // Toggle bookmark post
  onBookmarkPost = () => {
    this.setState(prevState => ({
      isBookmarked: !prevState.isBookmarked,
    }));

    const { currentUser, post, bookmarkPost } = this.props;

    bookmarkPost(currentUser._id, post._id);
  };

  render() {
    const {
      post,
      currentUser,
      handle,
      isHomepage,
      isLoggedIn,
      commentOnPost,
    } = this.props;

    const { isLiked, isBookmarked, commentsLimit, isCommentSectionDisplayed } = this.state;

    // Time elapsed since post creation
    const timeSincePostCreation = createdAt => {
      const formattedDate = date => new Date(date).toLocaleDateString();

      return moment(formattedDate(createdAt), 'MM/DD/YYYY').fromNow();
    }; 
    
    const {
      caption,
      date,
      divider,
      likes
    } = style;

    return (
      <Fragment>
        <div className={style['icons--small']}>
          <PostIcons 
            isLiked={isLiked} 
            isBookmarked={isBookmarked} 
            likePost={this.onLikePost} 
            bookmarkPost={this.onBookmarkPost} 
            isCommentSectionDisplayed={isCommentSectionDisplayed}
          />
        </div>
        <p className={`${likes} ${style['likes--small']}`}>
          <strong>
            {post.likedBy.length} like
            {post.likedBy.length > 1 ? 's' : ''}
          </strong>
        </p>
        {!isHomepage && <Divider className={divider} />}
        {post.caption && (
          <p style={isHomepage ? { padding: '0 1rem' } : {}} className={caption}>
            <Link
              to={`/${handle || post.uploadedBy.username}`}
              style={{ color: 'inherit' }}
            >
              <strong>{handle || post.uploadedBy.username}</strong>
            </Link>{' '}
            {post.caption}
          </p>
        )}
        <PostComments
          comments={post.comments}
          commentsLimit={commentsLimit}
        />
        <div className={style['icons--large']}>
          <PostIcons 
            isLiked={isLiked} 
            isBookmarked={isBookmarked} 
            likePost={this.onLikePost} 
            bookmarkPost={this.onBookmarkPost} 
            isCommentSectionDisplayed={isCommentSectionDisplayed}
          />
        </div>
        <p className={`${likes} ${style['likes--large']}`}>
          <strong>
            {post.likedBy.length} like
            {post.likedBy.length > 1 ? 's' : ''}
          </strong>
        </p>
        <p style={isHomepage ? { padding: '1rem 1rem 0' } : {}} className={date}>
          {timeSincePostCreation(post.createdAt)}
        </p>
        {isLoggedIn ? (
          <CommentForm
            commentOnPost={commentOnPost}
            userId={currentUser._id}
            postId={post._id}
          />
        ) : (
          <p style={{ margin: '0 1rem 1.25rem' }}>
            <Link to="/accounts/login">Log in</Link> to like or comment.
          </p>
        )}
      </Fragment>
    );
  }
}

PostMain.propTypes = {
  currentUser: object.isRequired,
  post: object.isRequired,
};

export default PostMain;

//class PostMain extends Component {
//  state = {
//    isLiked: false,
//    isCommentSectionDisplayed: false,
//    isBookmarked: false,
//    commentsLimit: 5,
//  };
//
//  // Toggle 'like' post
//  onLikePost = () => {
//    this.setState(prevState => ({
//      isLiked: !prevState.isLiked,
//    }));
//
//    const { currentUser, post, likePost } = this.props;
//
//    likePost(currentUser._id, post._id);
//  };
//
//  // Toggle comment section of post
//  onShowCommentSection = () =>
//    this.setState(prevState => ({
//      isCommentSectionDisplayed: !prevState.isCommentSectionDisplayed,
//    }));
//
//  // Toggle bookmark post
//  onBookmarkPost = () => {
//    this.setState(prevState => ({
//      isBookmarked: !prevState.isBookmarked,
//    }));
//
//    const { currentUser, post, bookmarkPost } = this.props;
//
//    bookmarkPost(currentUser._id, post._id);
//  };
//
//  render() {
//    const {
//      post,
//      currentUser,
//      handle,
//      isHomepage,
//      isLoggedIn,
//      commentOnPost,
//    } = this.props;
//
//    const { isLiked, isBookmarked, commentsLimit } = this.state;
//
//    // Time elapsed since post creation
//    const timeSincePostCreation = createdAt => {
//      const formattedDate = date => new Date(date).toLocaleDateString();
//
//      return moment(formattedDate(createdAt), 'MM/DD/YYYY').fromNow();
//    };
//
//    return (
//      <Fragment>
//        {!isHomepage && <Divider className={divider} />}
//        {post.caption && (
//          <p style={isHomepage && { padding: '0 1rem' }} className={caption}>
//            <Link
//              to={`/${handle || post.uploadedBy.username}`}
//              style={{ color: 'inherit' }}
//            >
//              <strong>{handle || post.uploadedBy.username}</strong>
//            </Link>{' '}
//            {post.caption}
//          </p>
//        )}
//        {!isHomepage && (
//          <PostComments
//            comments={post.comments}
//            commentsLimit={commentsLimit}
//          />
//        )}
//        <PostDescription
//          isLiked={isLiked}
//          isBookmarked={isBookmarked}
//          likePost={this.onLikePost}
//          showCommentSection={this.onShowCommentSection}
//          bookmarkPost={this.onBookmarkPost}
//        />
//        {isHomepage && (
//          <PostComments
//            comments={post.comments}
//            commentsLimit={commentsLimit}
//          />
//        )}
//        <p style={isHomepage && { padding: '1rem 1rem 0' }} className={date}>
//          {timeSincePostCreation(post.createdAt)}
//        </p>
//        <Divider className={divider} />
//        {isLoggedIn ? (
//          <CommentForm
//            commentOnPost={commentOnPost}
//            userId={currentUser._id}
//            postId={post._id}
//          />
//        ) : (
//          <p style={{ margin: '0 1rem 1.25rem' }}>
//            <Link to="/accounts/login">Log in</Link> to like or comment.
//          </p>
//        )}
//      </Fragment>
//    );
//  }
//}