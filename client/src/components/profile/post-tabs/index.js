import React from 'react';
import { NavLink } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';

import { column, icon, link, row } from './index.module.scss';

function PostsTabs({ currentUser }) {
  return (
    <Grid.Row className={row}>
      <Grid.Column className={column}>
        <NavLink
          style={{ margin: '0 2rem 0 0' }}
          className={link}
          activeStyle={{ borderTop: '2px solid #333333' }}
          exact
          to={`/${currentUser.username}`}
        >
          <Icon className={icon} name="grid layout" size="small" /> Posts
        </NavLink>
        <NavLink
          style={{ margin: '0 0 0 2rem' }}
          className={link}
          activeStyle={{ borderTop: '2px solid #333333' }}
          to={`/${currentUser.username}/saved`}
        >
          <Icon className={icon} name="bookmark outline" size="small" /> Saved
        </NavLink>
      </Grid.Column>
    </Grid.Row>
  );
}

PostsTabs.propTypes = {
  currentUser: shape({
    username: string.isRequired,
  }).isRequired,
};

export default PostsTabs;
