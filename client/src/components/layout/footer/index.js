import React from 'react';
import { Grid } from 'semantic-ui-react';

import FooterLink from './footer-link';

import { footer, grid, row } from './footer.module.scss';

const footerLinks = [
  { icon: 'home', path: '/' },
  { icon: 'search', path: '/' },
  { icon: 'plus square outline', path: '/' },
  { icon: 'heart outline', path: '/' },
  { icon: 'user outline', path: '/account/profile' },
];

function InstaFooter() {
  return (
    <footer className={footer}>
      <Grid columns={5} className={grid}>
        <Grid.Row className={row}>
          {footerLinks.map((footerLink, index) => (
            <FooterLink key={index} footerLink={footerLink} />
          ))}
        </Grid.Row>
      </Grid>
    </footer>
  );
}

export default InstaFooter;
