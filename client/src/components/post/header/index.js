import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { bool, func, object, string } from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';

import { avatar, content, follow, link } from './index.module.scss';

function PostHeader({
  currentUser,
  profile,
  handle,
  imgUrl,
  isHomepage,
  followUser,
}) {
  const isFollowing = (user, profile) => profile.followers.includes(user._id);

  return (
    <Card.Content className={content}>
      <Link to={`/${handle}`} className={link}>
        <Image
          className={avatar}
          floated='left'
          size='mini'
          src={
            `/images/profile/${imgUrl || profile.imgUrl}` || 'images/gsw-kd.png'
          }
        />
        <Card.Header className={handle}>
          <strong>{handle}</strong>
        </Card.Header>
      </Link>
      {!isHomepage && (
        <Fragment>
          <Icon name='circle' size='tiny' />
          {(currentUser.username !== handle ||
            !isFollowing(currentUser, profile)) && (
            <p
              className={follow}
              onClick={() => followUser(handle, currentUser._id)}
            >
              Follow
            </p>
          )}
        </Fragment>
      )}
    </Card.Content>
  );
}

PostHeader.propTypes = {
  currentUser: object,
  profile: object,
  handle: string.isRequired,
  imgUrl: string,
  isHomepage: bool.isRequired,
  followUser: func,
};

export default PostHeader;
