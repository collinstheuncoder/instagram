import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function noAuthRequired(WrappedComponent) {
  class Authentication extends Component {
    render() {
      if (this.props.isLoggedIn) {
        return <Redirect to="/home" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    return { isLoggedIn: auth.isLoggedIn };
  }

  return connect(mapStateToProps)(Authentication);
}
