import React from 'react'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';

import SignUpForm from '../../components/auth/SignUpForm';
import { createAccount } from './actions';

const styles = {
  grid: {
    alignItems: 'center',
    minHeight: '100vh',
    margin: '2rem',
  },
  image: {
    width: '12.5rem',
  },
};

export function SignupPage({ createAccount }) {
  return (
    <Grid style={styles.grid}>
      <Grid.Row>
        <Grid.Column>
          <Image
            style={styles.image}
            src="https://imgur.com/3aCDD3O.jpg"
            size="small"
            centered
          />
          <SignUpForm createAccount={createAccount} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

SignupPage.propTypes = {
  createAccount: PropTypes.func.isRequired,
};

export default connect(null, { createAccount })(SignupPage);
