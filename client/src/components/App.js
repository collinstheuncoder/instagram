import React, { Fragment } from 'react';

import InstaHeader from './layout/header';
import InstaMain from './layout/main';
import InstaFooter from './layout/footer';

function InstaApp() {
  return (
    <Fragment>
      <InstaHeader />
      <InstaMain />
      <InstaFooter />
    </Fragment>
  );
}

export default InstaApp;
