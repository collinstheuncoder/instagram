import React, { Component, Fragment } from 'react';
import { func, object } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';

import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileDescription from '../components/profile/ProfileDescription';
import ProfileStats from '../components/profile/ProfileStats';
// eslint-disable-next-line
import Suggestions from '../components/profile/Suggestions';
import PostsTabs from '../components/profile/PostsTabs';
import PostsGrid from '../components/profile/PostsGrid';

import {
  fetchAllUsers,
  fetchUserByHandle,
  followUser,
} from '../containers/users/actions';
import { logout } from '../containers/auth/actions';

import { desc, grid } from './profile-page.module.scss';

class ProfilePage extends Component {
  state = {
    displaySuggestions: false,
  };

  componentDidMount() {
    const {
      fetchAllUsers,
      fetchUserByHandle,
      match: {
        params: { handle },
      },
    } = this.props;

    fetchAllUsers();
    fetchUserByHandle(handle);
  }

  // Toggle 'like' post
  onDisplaySuggestions = () =>
    this.setState(prevState => ({
      displaySuggestions: !prevState.displaySuggestions,
    }));

  render() {
    // eslint-disable-next-line
    const { displaySuggestions } = this.state;
    const { profile, currentUser, usersList, followUser } = this.props;

    // Return list of users who aren't followed by current user
    // eslint-disable-next-line
    const suggestedUsers = usersList
      .filter(user => !user.followers.includes(currentUser._id))
      .filter(user => user._id !== currentUser._id);

    const isEmpty = user => Object.keys(user).length === 0;

    return (
      <Fragment>
        {isEmpty(profile) ? (
          <Grid.Row>
            <Grid.Column>
              <Loader />
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid className={grid}>
            <ProfileHeader
              isCurrentUser={currentUser._id === profile._id}
              currentUserId={currentUser._id || ''}
              followUser={followUser}
              displaySuggestions={this.onDisplaySuggestions}
              {...this.props}
            />
            <div className={desc}>
              <ProfileDescription profile={profile} />
              <ProfileStats profile={profile} currentUserId={currentUser._id} followUser={followUser} />
            </div>
            {currentUser._id === profile._id ? (
              <Fragment>
                <PostsTabs currentUser={currentUser} />
                <Switch>
                  <Route
                    exact
                    path={`/${currentUser.username}`}
                    component={() => (
                      <PostsGrid
                        posts={currentUser.uploadedPosts}
                        handle={currentUser.username}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={`/${currentUser.username}/saved`}
                    component={() => (
                      <PostsGrid
                        posts={currentUser.bookmarkedPosts}
                        handle={currentUser.username}
                      />
                    )}
                  />
                </Switch>
              </Fragment>
            ) : (
              <PostsGrid
                posts={profile.uploadedPosts}
                handle={profile.username}
              />
            )}
          </Grid>
        )}
      </Fragment>
    );
  }
}

ProfilePage.propTypes = {
  profile: object.isRequired,
  fetchAllUsers: func.isRequired,
  fetchUserByHandle: func.isRequired,
  followUser: func.isRequired,
  logout: func.isRequired,
};

function mapStateToProps({ auth, users }) {
  return {
    currentUser: users.currentUser,
    usersList: users.usersList,
    profile: users.profile,
    error: users.error,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAllUsers,
    fetchUserByHandle,
    followUser,
    logout,
  }
)(ProfilePage);
