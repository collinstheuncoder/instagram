import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Icon, Image, Modal, Search } from 'semantic-ui-react';

import NewPostForm from '../../forms/new-post';

import { uploadPost } from '../../../store/posts/actions';

import style from './index.module.scss';

function InstaHeader({ isLoggedIn, currentUser }) {
  const { column, divider, grid, header, icon, image, link, logo, row } = style;

  return (
    <header className={header}>
      <Grid columns={3} className={grid}>
        <Grid.Row className={row}>
          <Grid.Column className={column}>
            <Link to='/' className={logo}>
              <Icon name='instagram' size='large' className={icon} />
              <div className={divider} />
              <Image
                src='https://imgur.com/3aCDD3O.jpg'
                size='small'
                centered
                className={image}
              />
            </Link>
          </Grid.Column>
          <Grid.Column className={`${column} ${style['column--search']}`}>
            <Search />
          </Grid.Column>
          <Grid.Column className={column}>
            {isLoggedIn ? (
              <nav>
                <Modal
                  size='tiny'
                  trigger={
                    <Image
                      style={{
                        marginRight: '1.75rem',
                        width: '1.65rem',
                        display: 'inline',
                        cursor: 'pointer',
                      }}
                      src='/images/add.png'
                      size='small'
                    />
                  }
                >
                  <Modal.Header>Add Post</Modal.Header>
                  <Modal.Content>
                    <NewPostForm user={currentUser} uploadPost={uploadPost} />
                  </Modal.Content>
                </Modal>
                <Link
                  to={`/${currentUser.username}`}
                  style={{ color: 'inherit' }}
                >
                  <Icon
                    style={{ marginRight: '1.75rem' }}
                    name='heart outline'
                    size='large'
                  />
                </Link>
                <Link
                  to={`/${currentUser.username}`}
                  style={{ color: 'inherit' }}
                >
                  <Icon name='user outline' size='large' />
                </Link>
              </nav>
            ) : (
              <nav>
                <NavLink to='/accounts/login' className={link}>
                  Log in
                </NavLink>
                <span className={style['link-separator']} />
                <NavLink to='/accounts/signup'>Sign up</NavLink>
              </nav>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </header>
  );
}

function mapStateToProps({ auth, users }) {
  return {
    isLoggedIn: auth.isLoggedIn,
    currentUser: users.currentUser,
  };
}

export default connect(
  mapStateToProps,
  { uploadPost }
)(InstaHeader);
