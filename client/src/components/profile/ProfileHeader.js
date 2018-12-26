import React, { Component, Fragment } from 'react';
import { array, func, shape, string } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Button, Grid, Icon, Image, Modal } from 'semantic-ui-react';

import ProfileStats from './ProfileStats';
import ProfileDescription from './ProfileDescription';

import style from './profile-header.module.scss';

const ModalButton = ({ action, label }) => (
  <Button
    style={{
      width: '100%',
      backgroundColor: 'transparent',
      color: '#333333',
      fontWeight: 400,
      margin: 0,
      padding: '1rem 0',
      borderBottom: '1px solid #dedede',
    }}
    onClick={action}
  >
    {label}
  </Button>
);

class ProfileHeader extends Component {
  state = {
    isOpen: false,
  };

  onOpenModal = () =>
    this.setState({
      isOpen: true,
    });

  onCloseModal = () =>
    this.setState({
      isOpen: false,
    });

  render() {
    const { button, column, desc, handle, image, row } = style;

    const {
      followUser,
      logout,
      // eslint-disable-next-line
      displaySuggestions,
      currentUserId,
      profile,
      history,
    } = this.props;

    // Check if profile corresponds to current (authenticated) user
    const isCurrentUser = currentUserId === profile._id;

    // Check if current user follows user corresponding to profile
    const followersArr = profile.followers.map(follower => follower._id);
    const isFollowing = followersArr.includes(currentUserId);

    return (
      <Grid.Row className={style['row--main']}>
        <Grid.Column className={style['column--image']}>
          <Image
            src={`/images/profile/${profile.imgUrl}` || '/images/gsw-kd.png'}
            alt={profile.fullname}
            size="huge"
            className={image}
          />
        </Grid.Column>
        <Grid.Column className={style['column--handle']}>
          <div className={style['row--handle']}>
            <p className={handle}>{profile.username}</p>
            <Grid.Row style={{ padding: 0 }} className={row} columns={2}>
              {isCurrentUser ? (
                <Fragment>
                  <Link className={style['edit-link']} to="/accounts/edit">
                    Edit Profile
                  </Link>
                  <Modal
                    size="mini"
                    trigger={
                      <Icon
                        className={style['settings-icon']}
                        size="large"
                        name="setting"
                      />
                    }
                  >
                    <Modal.Actions style={{ padding: 0 }}>
                      <ModalButton
                        action={() =>
                          history.push('/accounts/edit/change-password')
                        }
                        label="Change Password"
                      />
                      <ModalButton
                        action={() => history.push('/notifications')}
                        label="Notifications"
                      />
                      <ModalButton action={logout} label="Logout" />
                      <ModalButton action={this.onCloseModal} label="Cancel" />
                    </Modal.Actions>
                  </Modal>
                </Fragment>
              ) : (
                <Fragment>
                  <Grid.Column style={{ flexBasis: '80%' }} className={column}>
                    <Button
                      style={{ padding: '0.65rem 1.5rem' }}
                      className={`${button} ${isFollowing &&
                        style['button--is-following']}`}
                      onClick={() =>
                        followUser(profile.username, currentUserId)
                      }
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </Grid.Column>
                  <Grid.Column
                    style={{ flexBasis: '20%', marginLeft: '1rem' }}
                    className={column}
                  >
                    <Button
                      style={{ padding: '0.65rem' }}
                      icon
                      className={`${button} ${isFollowing &&
                        style['button--is-following']}`}
                    >
                      <Icon name="caret down" />
                    </Button>
                  </Grid.Column>
                </Fragment>
              )}
            </Grid.Row>
          </div>
          <div className={desc}>
            <ProfileStats profile={profile} currentUserId={currentUserId} followUser={followUser} />
            <ProfileDescription profile={profile} />
          </div>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

ProfileHeader.propTypes = {
  followUser: func.isRequired,
  logout: func.isRequired,
  displaySuggestions: func.isRequired,
  currentUserId: string.isRequired,
  profile: shape({
    fullname: string.isRequired,
    username: string.isRequired,
    bio: string,
    website: string,
    imgUrl: string,
    uploadedPosts: array.isRequired,
    followers: array.isRequired,
    following: array.isRequired,
  }).isRequired,
};

export default withRouter(ProfileHeader);
