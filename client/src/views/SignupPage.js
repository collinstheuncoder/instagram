import React from 'react'; 
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Card, Grid, Image } from 'semantic-ui-react';

import SignupForm from '../components/forms/SignupForm';
import LinksToApp from '../components/shared/LinksToApp';

import { createAccount } from '../containers/auth/actions';

import style from './signup.module.scss';

function SignupPage({ createAccount }) {
  const { card, grid, image, link, message, row } = style;
  
  return (
    <Grid className={grid}>
      <Grid.Row className={row}>
        <Grid.Column>
          <Card className={card}>
            <Image
              src="https://imgur.com/3aCDD3O.jpg"
              size="small"
              centered
              className={image}
            />
            <Card.Content className={style['card-content']}>
              <SignupForm createAccount={createAccount} />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Card className={card}>
            <Card.Content>
              <p className={message}>
                Have an account?{' '}
                <Link className={link} to="/accounts/login">
                  Log in
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

SignupPage.propTypes = {
  createAccount: func.isRequired,
};

export default connect(null, { createAccount })(SignupPage);
