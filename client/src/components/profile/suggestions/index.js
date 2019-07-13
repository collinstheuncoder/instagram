import React from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Header, Icon, Image } from 'semantic-ui-react';

import style from './index.module.scss';

function Suggestions({ suggestedUsers }) {
  const { avatar, card, column, handle, row } = style;
  
  return (
    <Grid.Row className={row}>
      <Header size="tiny">Suggestions</Header>
      <div className={style['users-list']}>
        {suggestedUsers.map(user => (
          <Grid.Column className={column} key={user._id}>
            <Card className={card}>
              <div style={{ display: 'flex', padding: '1rem' }}>
                <Image
                  className={avatar}
                  floated="left"
                  size="mini"
                  src={`/images/profile/${user.imgUrl}`}
                  alt={user.fullname}
                />
                <Icon name="close" size="large" />
              </div>
              <Card.Content>
                <p className={handle}>
                  <Link to={`/${user.username}`}>{user.username}</Link>
                </p>
                <p
                  style={{
                    color: 'rgba(0, 0, 0, 0.8)',
                    margin: '0.5rem 0',
                  }}
                  className={handle}
                >
                  {user.fullname}
                </p>
                <Button style={{ width: '100%' }} content="Follow" primary />
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </div>
    </Grid.Row>
  );
}

Suggestions.defaultProps = {
  suggestedUsers: [],
};

Suggestions.propTypes = {
  suggestedUsers: array.isRequired,
};

export default Suggestions;
