import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function requireAuth(WrappedComponent) {
  class Authentication extends Component {
    render() {
      if (!this.props.isLoggedIn) {
        return <Redirect to='/accounts/login' />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    return { isLoggedIn: auth.isLoggedIn };
  }

  return connect(mapStateToProps)(Authentication);
}
