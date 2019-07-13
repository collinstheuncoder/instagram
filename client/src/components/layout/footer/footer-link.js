import React from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Icon } from 'semantic-ui-react';

import { column, link, icon } from './index.module.scss';

function FooterLink({ footerLink }) {  
  return (
    <Grid.Column className={column}>
      <Link to={footerLink.path} className={link}>
        <Icon name={footerLink.icon} size="large" className={icon} />
      </Link>
    </Grid.Column>
  );
}

FooterLink.propTypes = {
  footerLink: object.isRequired,
};

export default FooterLink;
