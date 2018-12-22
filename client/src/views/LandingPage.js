import React from 'react';
import { Grid } from 'semantic-ui-react';

import InstaBgImg from '../components/landing/InstaBgImg';
import InstaAuth from '../components/landing/InstaAuth';

import style from './landing-page.module.scss';

function LandingPage() {
  return (
    <Grid className={style.grid}>
      <Grid.Row className={style.row} columns={2}>
        <Grid.Column className={`${style.column} ${style['column--bg-img']}`}>
          <InstaBgImg />
        </Grid.Column>
        <Grid.Column className={`${style.column} ${style['column--auth']}`}>
          <InstaAuth />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default LandingPage;
