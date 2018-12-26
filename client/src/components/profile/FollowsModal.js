import React from 'react';
import { array, func, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Header, Image, List, Modal } from 'semantic-ui-react';

import style from './follows-modal.module.scss';
import { text } from './profile-stats.module.scss';


const renderFollowsList = (users, currentUserId, followUser) => {
  // Check if current user follows user
  const usersArr = users.map(user => user._id);
  const isFollowing = usersArr.includes(currentUserId);

  return users ? (
    <List>
      {users.map(user => (
        <List.Item className={style.follows} key={user._id}>
          <Image
            avatar
            src={`/images/profile/${user.imgUrl}`}
            alt={user.fullname}
          />
          <List.Content>
            <List.Header>
              <Link style={{ color: 'inherit' }} to={`/${user.username}`}>
                {user.username}
              </Link>
            </List.Header>
            <List.Description className={style.description}>{user.fullname}</List.Description>
          </List.Content>
          <Button
            style={{ width: 'auto' }}
            className={`${style.button} ${isFollowing &&
                        style['button--is-following']}`}
            primary={!isFollowing}
            onClick={() => followUser(user.username, currentUserId)}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </List.Item>
      ))}
    </List>
  ) : (
    <div>Crickets...</div>
  );
};

function FollowsModal({ follows, title, currentUserId, followUser }) {
  const { close, heading } = style;
  const formatNumber = number => {
    if (number >= 1000000) {
      number = number / 1000000;
      const strgdNum = String(number);
      
      // eslint-disable-next-line
      return strgdNum.charAt(strgdNum.indexOf('.') + 1) == 0
        ? `${Math.floor(number)}m`
        : `${number.toFixed(1)}m`;
    } else if (number >= 10000 && number < 1000000) {
      number = number / 1000;
      const strgdNum = String(number);
      
      // eslint-disable-next-line
      return strgdNum.charAt(strgdNum.indexOf('.') + 1) == 0
        ? `${Math.floor(number)}k`
        : `${number.toFixed(1)}k`;
    } else {
      return number;
    }
  };
  
  return (
    <Modal
      size="mini"
      trigger={
        <div>
          <p style={{ color: 'initial' }} className={text}>
            {formatNumber(follows.length)}
          </p>
          <p className={text}>{title.toLowerCase()}</p>
        </div>
      }
    >
      <Header className={style['follows--header']}>
        <h3 className={heading}>{title}</h3>
        <span
          className={close}
          aria-label="Close Followers List Modal"
        >
          &times;
        </span>
      </Header>
      <Modal.Content className={style['follows--main']}>
        {renderFollowsList(
          follows,
          currentUserId,
          followUser
        )}
      </Modal.Content>
    </Modal>
  )
}

FollowsModal.propTypes = {
  follows: array.isRequired,
  title: string.isRequired,
  currentUserId: string.isRequired,
  followUser: func.isRequired,
}

export default FollowsModal;
