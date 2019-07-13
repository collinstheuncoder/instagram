import React, { Fragment } from 'react';
import { array, number } from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, List } from 'semantic-ui-react';

import style from './index.module.scss';

function PostComments({ comments, commentsLimit }) {  
  return (
    <Grid>
      <Grid.Row style={{ paddingTop: '0.5rem', paddingBottom: 0 }}>
        <Grid.Column className={style.comments}>
          {comments.length > 0 && (
            <Fragment>
              {comments.length >= 5 && (
                <p className={style.load}>Load more comments</p>
              )}
              <List>
                {comments.map(comment => (
                  <List.Item key={comment._id}>
                    <Link className={style['added-by']} to={`/${comment.addedBy.username}`}>
                      <strong>{comment.addedBy.username}</strong>
                    </Link>{' '}
                    {comment.body}
                  </List.Item>
                ))}
              </List>
            </Fragment>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

PostComments.defaultProps = {
  comments: [],
  commentsLimit: 5,
};

PostComments.propTypes = {
  comments: array.isRequired,
  commentsLimit: number.isRequired,
};

export default PostComments;
