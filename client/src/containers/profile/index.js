import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileMain from '../../components/profile';
import LoginPrompt from '../../components/shared/LoginPrompt';
import { fetchPosts } from './actions';
import { followUser } from '../user/actions';

class ProfilePage extends Component {
  constructor(props) {
    super();

    this.state = {
      areSuggestionsDisplayed: false,
    };
  }

  // Fetch Posts
  componentDidMount() {
    const {
      fetchPosts,
      match: {
        params: { handle },
      },
    } = this.props;
    fetchPosts(handle);
  }

  // Toggle 'like' post
  onDisplaySuggestions = () =>
    this.setState(() => ({
      areSuggestionsDisplayed: true,
    })); 

  render() {
    const { areSuggestionsDisplayed } = this.state;
    const { posts, followUser } = this.props;

    return (
      <Fragment>
        <ProfileMain
          followUser={followUser}
          areSuggestionsDisplayed={areSuggestionsDisplayed}
          displaySuggestions={this.onDisplaySuggestions}
          posts={posts}
        />
        <LoginPrompt />
      </Fragment>
    );
  }
}

ProfilePage.defaultProps = {
  posts: [],
};

ProfilePage.propTypes = {
  posts: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

function mapStateToProps({ profile }) {
  return {
    posts: profile.posts,
    error: profile.error,
  };
}

export default connect(mapStateToProps, { 
  fetchPosts, 
  followUser 
})(ProfilePage);
