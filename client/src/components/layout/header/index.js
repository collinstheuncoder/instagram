import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Grid, Icon, Image, Search } from 'semantic-ui-react';

import style from './header.module.scss';

const styles = {
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: '2.5rem',
  },
};

function InstaHeader() {
  const { 
    column, 
    divider, 
    grid, 
    header,
    icon,
    image, 
    link,
    logo
  } = style;

  return (
    <header className={header}>
      <Grid columns={3} className={grid}>
        <Grid.Row style={styles.row}>
          <Grid.Column className={column}>
            <Link to="/" className={logo}>
              <Icon name="instagram" size="large" className={icon} />
              <div className={divider} />
              <Image
                src="https://imgur.com/3aCDD3O.jpg"
                size="small"
                centered
                className={image}
              />
            </Link>
          </Grid.Column>
          <Grid.Column className={`${column} ${style['column--search']}`}>
            <Search />
          </Grid.Column>
          <Grid.Column className={column}>
            <nav>
              <NavLink to="/auth/login" className={link}>Log in</NavLink>
              <NavLink to="/auth/signup">Sign up</NavLink>
            </nav>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </header>
  )
}

export default InstaHeader;
