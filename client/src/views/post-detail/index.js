import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Card, Grid, Loader } from 'semantic-ui-react';

import PostHeader from '../../components/post/header';
import PostMain from '../../components/post/main';

import { followUser } from '../../store/users/actions';
import {
  fetchPost, 
  likePost,
  bookmarkPost,
  commentOnPost,
  deleteComment,
  removePost,
} from '../../store/posts/actions';
  
import style from './index.module.scss';

class PostDetailPage extends Component {
  // Fetch Post
  componentDidMount() {
    const {
      fetchPost,
      match: {
        params: { handle, postId },
      },
    } = this.props;
    fetchPost(handle, postId);
  }

  render() {
    const {
      currentUser,
      post,
      match: {
        params: { handle },
      },
    } = this.props;

    const isEmpty = post => Object.keys(post).length === 0;
    
    const { card, column, grid, row } = style;
    
    return (
      <Grid className={grid}>
        {(isEmpty(post) || isEmpty(currentUser)) ? (
          <Grid.Row>
            <Grid.Column>
              <Loader />
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Card className={card}>
            <Grid.Row className={row} columns={2}>
              <div className={style['header-small']}>
                <PostHeader
                  handle={handle}
                  isHomepage={false}
                  {...this.props}
                />
              </div>
              <Grid.Column
                style={{
                  backgroundImage: `url(${post.url})`,
                }}
                className={`${column} ${style['column--image']}`}
              />
              <Grid.Column className={`${column} ${style['column--desc']}`}>
                <div className={style['header-large']}>
                  <PostHeader
                    handle={handle}
                    isHomepage={false}
                    {...this.props}
                  />
                </div>
                <PostMain
                  handle={handle}
                  isHomepage={false}
                  {...this.props}
                />
              </Grid.Column>
            </Grid.Row>
          </Card>
        )}
      </Grid>
    );
  }
}

PostDetailPage.propTypes = {
  followUser: func.isRequired,
  fetchPost: func.isRequired,
  likePost: func.isRequired,
  bookmarkPost: func.isRequired,
  commentOnPost: func.isRequired,
  deleteComment: func.isRequired,
  removePost: func.isRequired,
};

function mapStateToProps({ posts, auth, users }) {
  return {
    post: posts.post,
    isLoggedIn: auth.isLoggedIn,
    currentUser: users.currentUser,
    profile: users.profile,
    error: posts.error,
  };
}

export default connect(
  mapStateToProps,
  {
    followUser,
    fetchPost,
    likePost,
    bookmarkPost,
    commentOnPost,
    deleteComment,
    removePost,
  }
)(PostDetailPage);
