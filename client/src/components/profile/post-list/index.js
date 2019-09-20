import React from 'react';
import { Link } from 'react-router-dom';
import { array, string } from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';

import style from './index.module.scss';

function PostList({ posts, handle }) {
  const { column, row, stats } = style;

  return (
    <Grid.Row className={row}>
      {posts.map(post => (
        <Link
          to={`/${handle}/p/${post._id}`}
          key={post._id}
          style={{ backgroundImage: `url(${post.url})` }}
          className={style['post-column']}
        >
          <Grid.Column className={column}>
            <div className={stats}>
              <span>
                <Icon name='heart' size='large' /> {post.likedBy.length}
              </span>
              <span>
                <Icon name='comment' size='large' /> {post.comments.length}
              </span>
            </div>
          </Grid.Column>
        </Link>
      ))}
    </Grid.Row>
  );
}

PostList.propTypes = {
  posts: array.isRequired,
  handle: string.isRequired,
};

export default PostList;
