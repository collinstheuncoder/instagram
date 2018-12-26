import React from 'react';
import { array, func, shape, string } from 'prop-types';
import { Grid } from 'semantic-ui-react';

import FollowsModal from './FollowsModal';

import { column, row, text } from './profile-stats.module.scss';

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

function ProfileStats({ profile, currentUserId, followUser }) {
  return (
    <Grid.Row className={row} columns={3}>
      <Grid.Column className={column}>
        <p style={{ color: 'initial' }} className={text}>
          {formatNumber(profile.uploadedPosts.length)}
        </p>
        <p className={text}>posts</p>
      </Grid.Column>
      <Grid.Column className={column}>
        <FollowsModal
          follows={profile.followers}
          title="Followers"
          currentUserId={currentUserId}
          followUser={followUser}
        />
      </Grid.Column>
      <Grid.Column className={column}>
        <FollowsModal
          follows={profile.following}
          title="Following"
          currentUserId={currentUserId}
          followUser={followUser}
        />
      </Grid.Column>
    </Grid.Row>
  );
}

ProfileStats.propTypes = {
  profile: shape({
    uploadedPosts: array.isRequired,
    followers: array.isRequired,
    following: array.isRequired,
  }).isRequired,
  currentUserId: string.isRequired,
  followUser: func.isRequired,
};

export default ProfileStats;
