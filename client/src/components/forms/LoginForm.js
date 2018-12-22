import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';

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

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmitForm = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { loginUser, history } = this.props;

    if (username && password) {
      loginUser(
        username.trim(),
        password.trim(),
        history
      );
      this.setState({
        username: '',
        password: '',
        error: null,
      });
    } else {
      this.setState({
        error: 'Please make sure to enter valid credentials',
      });
    }
  };

  render() {
  	const { username, password } = this.state;
    const { isLoading, error } = this.props;

    return (
      <Segment style={styles.segment}>
        <Form onSubmit={this.onSubmitForm}>
          <Form.Field>
            <input
              name="username"
              value={username}
              placeholder="Username or email"
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
            Log in
          </Button>
        </Form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={{ textAlign: 'center', padding: '1rem' }}>Forgot password?</p>
      </Segment>
    );
  }
}

LoginForm.defaultProps = {
  isLoading: false,
  error: null,
};

LoginForm.propTypes = {
  loginUser: func.isRequired,
  isLoading: bool.isRequired,
  error: string,
};

export default withRouter(LoginForm);
