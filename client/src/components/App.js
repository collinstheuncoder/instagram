import React, { Fragment } from 'react';

import InstaHeader from './layout/InstaHeader';
import InstaMain from './layout/InstaMain';
import InstaFooter from './layout/InstaFooter';

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
