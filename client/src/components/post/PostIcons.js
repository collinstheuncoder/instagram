import React from 'react';
import { bool, func } from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';

import style from './post-icons.module.scss';

function PostIcons({
  isLiked,
  isBookmarked,
  likePost,
  bookmarkPost,
  isCommentSectionDisplayed,
}) {
  const { bookmark } = style;
  
  return (
    <Grid.Row columns={2} className={style.row}>
      <Grid.Column>
        <Icon
          className={`${style['main-icon']} ${style['like-icon']}`}
          name={isLiked ? 'heart' : 'empty heart'}
          color={isLiked ? 'red' : false}
          onClick={likePost}
        />
        <Icon
          className={`${style['main-icon']} ${style['comment-icon']}`}
          name="comment outline"
          onClick={isCommentSectionDisplayed}
        />
      </Grid.Column>
      <Grid.Column>
        <Icon
          className={`${style['main-icon']} ${bookmark}`}
          name={isBookmarked ? 'bookmark' : 'bookmark outline'}
          onClick={bookmarkPost}
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
  likePost: func.isRequired,
  bookmarkPost: func.isRequired,
  isCommentSectionDisplayed: func.isRequired,
};

export default PostIcons;
