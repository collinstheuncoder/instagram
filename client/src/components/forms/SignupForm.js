import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Divider, Form, Icon, Segment } from 'semantic-ui-react';

const styles = {
  segment: {
    border: 'none',
    boxShadow: 'none',
  },
  error: {
    color: '#ff0000',
    marginTop: '0.5rem',
  },
};

class SignupForm extends Component {
  state = {
    email: '',
    fullname: '',
    username: '',
    password: '',
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmitForm = e => {
    e.preventDefault();
    const { fullname, username, email, password } = this.state;
    const { createAccount, history } = this.props;

    if (fullname && username && email && password) {
      createAccount(
        fullname.trim(),
        username.trim(),
        email.trim(),
        password.trim(),
        history
      );
      this.setState({
        fullname: '',
        username: '',
        email: '',
        password: '',
      });
    } else {
      this.setState({
        error: 'Please make sure to enter valid credentials',
      });
    }
  };

  render() {
    const { email, fullname, username, password } = this.state;
    const { isLoading, error } = this.props;

    return (
      <Segment style={styles.segment}>
        <Button primary fluid>
          <Icon name="facebook" /> Log in with Facebook
        </Button>
        <Divider horizontal>Or</Divider>
        <Form onSubmit={this.onSubmitForm}>
          <Form.Field>
            <input 
              name="email" 
              value={email} 
              placeholder="Email" 
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              name="fullname"
              value={fullname}
              placeholder="Full Name"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              name="username"
              value={username}
              placeholder="Username"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.onChange}
            />
          </Form.Field>
          <Button type="submit" primary fluid loading={isLoading}>
            Sign up
          </Button> 
        </Form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={{ textAlign: 'center', padding: '1rem' }}>
          By signing up, you agree to our <strong>Terms</strong> &{' '}
          <strong>Privacy Policy</strong>.
        </p>
      </Segment>
    );
  }
}

SignupForm.defaultProps = {
  isLoading: false,
  error: null,
};

SignupForm.propTypes = {
  createAccount: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default withRouter(SignupForm);
