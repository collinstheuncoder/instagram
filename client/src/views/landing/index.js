import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import InstaBgImg from '../../components/landing/bg-image';
import InstaAuth from '../../components/landing/auth';

import { createAccount, loginUser } from '../../store/auth/actions';

import style from './index.module.scss';

function LandingPage(props) {
  return (
    <Grid className={style.grid}>
      <Grid.Row className={style.row} columns={2}>
        <Grid.Column className={`${style.column} ${style['column--bg-img']}`}>
          <InstaBgImg {...props}  />
        </Grid.Column>
        <Grid.Column className={`${style.column} ${style['column--auth']}`}>
          <InstaAuth {...props} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function mapStateToProps({ auth }) {
  return {
    isLoggedIn: auth.isLoggedIn,
    isLoading: auth.isLoading,
    error: auth.error,
  };
}

export default connect(mapStateToProps, { createAccount, loginUser })(LandingPage);
 