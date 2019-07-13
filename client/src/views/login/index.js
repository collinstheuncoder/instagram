import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Card, Grid, Image } from 'semantic-ui-react';

import LoginForm from '../../components/forms/login';
import LinksToApp from '../../components/shared/links-to-app';

import { loginUser } from '../../store/auth/actions';

import style from './index.module.scss';

function LoginPage(props) {
  const { card, grid, image, link, message, row } = style;

  return (
    <Grid className={grid}>
      <Grid.Row className={row}>
        <Grid.Column>
          <Card className={card}>
            <Image
              className={image}
              src="https://imgur.com/3aCDD3O.jpg"
              size="small"
              centered
            />
            <Card.Content className={style['card-content']}>
              <LoginForm {...props} />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Card style={{ margin: '0 auto' }} className={card}>
            <Card.Content>
              <p className={message}>
                Don't have an account?{' '}
                <Link className={link} to="/accounts/signup">
                  Sign up
                </Link>
              </p>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ paddingTop: '0.375rem' }}>
        <Grid.Column>
          <LinksToApp />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

LoginPage.propTypes = {
  loginUser: func.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    isLoading: auth.isLoading,
    error: auth.error,
  };
}

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
