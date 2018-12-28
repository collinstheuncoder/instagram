import React, { Fragment } from 'react';
import { array, bool, func } from 'prop-types';
import { Icon } from 'semantic-ui-react';

import style from './post-desc.module.scss';

function PostDescription({
  isLiked,
  isBookmarked,
  likedBy,
  likePost,
  showCommentSection,
  bookmarkPost,
}) {
  const { desc, bookmark, likes } = style;
  
  return (
    <Fragment>
      <div className={desc}>
        <Icon
          className={style['main-icon']}
          name={isLiked ? 'heart' : 'empty heart'}
          color={isLiked ? 'red' : false}
          onClick={likePost}
        />
        <Icon
          className={`${style['main-icon']} ${style['comment-icon']}`}
          name="comment outline"
          onClick={showCommentSection}
        />
        <Icon
          className={`${style['main-icon']} ${bookmark}`}
          name={isBookmarked ? 'bookmark' : 'bookmark outline'}
          onClick={bookmarkPost}
        />
      </div>
      <p className={likes}>
        <strong>
          {likedBy.length} like
          {likedBy.length > 1 ? 's' : ''}
        </strong>
      </p>
    </Fragment>
  );
}

PostDescription.defaultProps = {
  isLiked: false,
  isBookmarked: false,
  likedBy: [],
};

PostDescription.propTypes = {
  isLiked: bool.isRequired,
  isBookmarked: bool.isRequired,
  likedBy: array.isRequired,
  likePost: func.isRequired,
  showCommentSection: func.isRequired,
  bookmarkPost: func.isRequired,
};

export default PostDescription;
