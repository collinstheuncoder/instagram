import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { Card, Grid, Image } from 'semantic-ui-react';

import SignupForm from '../forms/SignupForm';
import LoginForm from '../forms/LoginForm';
import LinksToApp from '../shared/LinksToApp';

import style from './landing.module.scss';

class InstAuth extends Component {
  state = {
    displaySignupForm: true,
  };

  onChangeAuthType = () =>
    this.setState(prevState => ({
      displaySignupForm: !prevState.displaySignupForm,
    }));

  render() {
    const { displaySignupForm } = this.state;
    const { card, column, grid, image, link, message, row } = style;

    return (
      <div className={grid}>
        <div className="row">
          <div className={column}>
            <Card className={card}>
              <Image
                src="https://imgur.com/3aCDD3O.jpg"
                size="small"
                centered
                className={image}
              />
              <Card.Content className={style['card-content']}>
                {displaySignupForm ? (
                  <SignupForm {...this.props} />
                ) : (
                  <LoginForm {...this.props} />
                )}
              </Card.Content>
            </Card>
          </div>
        </div>
        <Grid.Row style={{ marginTop: '2rem' }} className={row}>
          <Grid.Column>
            <Card className={card}>
              <Card.Content>
                {displaySignupForm ? (
                  <p className={message}>
                    Have an account?{' '}
                    <span className={link} onClick={this.onChangeAuthType}>
                      Log in
                    </span>
                  </p>
                ) : (
                  <p className={message}>
                    Don't have an account?{' '}
                    <span className={link} onClick={this.onChangeAuthType}>
                      Sign up
                    </span>
                  </p>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ paddingTop: '0.375rem' }} className={row}>
          <Grid.Column>
            <LinksToApp />
          </Grid.Column>
        </Grid.Row>
      </div>
    );
  }
}

InstAuth.defaultProps = {
  createAccount: () => 'Create Account',
  loginUser: () => 'Login to Account',
  isLoading: false,
};

InstAuth.propTypes = {
  createAccount: func.isRequired,
  loginUser: func.isRequired,
  isLoading: bool.isRequired,
  error: string,
};

export default InstAuth;
