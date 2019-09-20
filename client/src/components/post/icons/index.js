import React from 'react';
import { bool, func } from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';

import style from './index.module.scss';

function PostIcons({
  isLiked,
  isBookmarked,
  onLikePost,
  onBookmarkPost,
  onShowCommentSection,
}) {
  const { bookmark } = style;

  return (
    <Grid.Row columns={2} className={style.row}>
      <Grid.Column>
        <Icon
          className={`${style['main-icon']} ${style['like-icon']}`}
          name={isLiked ? 'heart' : 'empty heart'}
          color={isLiked ? 'red' : false}
          onClick={onLikePost}
        />
        <Icon
          className={`${style['main-icon']} ${style['comment-icon']}`}
          name='comment outline'
          onClick={onShowCommentSection}
        />
      </Grid.Column>
      <Grid.Column>
        <Icon
          className={`${style['main-icon']} ${bookmark}`}
          name={isBookmarked ? 'bookmark' : 'bookmark outline'}
          onClick={onBookmarkPost}
        />
      </Grid.Column>
    </Grid.Row>
  );
}

PostIcons.defaultProps = {
  isLiked: false,
  isBookmarked: false,
};

PostIcons.propTypes = {
  isLiked: bool.isRequired,
  isBookmarked: bool.isRequired,
  onLikePost: func.isRequired,
  onBookmarkPost: func.isRequired,
  onShowCommentSection: func.isRequired,
};

export default PostIcons;
