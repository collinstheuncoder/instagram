import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Card, Grid, Image, Loader } from 'semantic-ui-react';
import LazyLoad from 'react-lazy-load';

import PostHeader from '../../components/post/header';
import PostMain from '../../components/post/main';

import style from './index.module.scss';

import {
  fetchPosts,
  likePost,
  bookmarkPost,
  commentOnPost,
  deleteComment, 
  removePost,
} from '../../store/posts/actions';

class HomePage extends Component {
  // Fetch Posts
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, currentUser } = this.props;
    const isEmpty = post => Object.keys(post).length === 0;

    return (
      <div className={style.home}>
        <section className={style.posts}>
          <Grid className={style.grid}>
            {(posts.length === 0 || isEmpty(currentUser)) ? (
              <Grid.Row className={style['posts-row']}>
                <Grid.Column>
                  <Loader />
                </Grid.Column>
              </Grid.Row>
            ) : (
              <Grid.Row className={style['posts-row']}>
                {posts.map(post => (
                  <LazyLoad className={style.post} offsetVertical={300} key={post._id}>
                    <Card className={style.card}>
                      <PostHeader
                        handle={post.uploadedBy.username}
                        imgUrl={post.uploadedBy.imgUrl}
                        isHomepage={true}
                      />
                      <Grid.Column
                        style={{
                          backgroundImage: `url(${post.url})`,
                        }}
                        className={style['col-image']}
                      />
                      <PostMain post={post} {...this.props} isHomepage={true} />
                    </Card>
                  </LazyLoad>
                ))}
              </Grid.Row>
            )}
          </Grid>
        </section>
        <aside className={style.aside}>
          <Grid>
            <Grid.Row className={style['aside-row']}>
              <Grid.Column style={{ flex: 3, paddingRight: 0 }}>
                <Link to={`/${currentUser.username}`} className={style.link}>
                  <Image
                    floated="left"
                    size="mini"
                    src={
                      `/images/profile/${currentUser.imgUrl}` ||
                      'images/gsw-kd.png'
                    }
                    className={style.image}
                  />
                </Link>
              </Grid.Column>
              <Grid.Column style={{ flex: 9, marginTop: '-0.5rem' }}>
                <Link to={`/${currentUser.username}`} className={style.link}>
                  {currentUser.username}
                </Link>
                <p className={style.name}>{currentUser.fullname}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </aside>
      </div>
    );
  }
}

HomePage.defaultProps = {
  posts: [],
};

HomePage.propTypes = {
  fetchPosts: func.isRequired,
  likePost: func.isRequired,
  bookmarkPost: func.isRequired,
  commentOnPost: func.isRequired,
  deleteComment: func.isRequired,
  removePost: func.isRequired,
};

function mapStateToProps({ posts, auth, users }) {
  return {
    posts: posts.posts,
    currentUser: users.currentUser,
    isLoggedIn: auth.isLoggedIn,
    error: posts.error,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchPosts,
    likePost,
    bookmarkPost,
    commentOnPost,
    deleteComment,
    removePost,
  }
)(HomePage);
