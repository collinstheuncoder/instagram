import React from 'react';
import { array, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import style from './index.module.scss';

function ProfileDescription({ profile }) {
  // Reformat website link if not absolute
  const webLink = website => {
    if (!website) return '';
    else if (website.includes('http')) return website;
    else return `http://${website}`;
  };

  return (
    <Grid.Row className={style.row}>
      <Grid.Column>
        <p className={`${style.text} ${style['text--name']}`}>
          <Link to={`/${profile.username}`} className={style.link}>
            {profile.fullname}
          </Link>
        </p>
        <p className={style.text}>{profile.bio}</p>
        <p className={style.text}>
          <a
            href={webLink(profile.website)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.website}
          </a>
        </p>
        <p className={style.text}>
          Followed by{' '}
          <Link
            to="/accounts/easymoneysniper"
            className={`${style.link} ${style['link--follower']}`}
          >
            easymoneysniper
          </Link>{' '}
          and{' '}
          <Link
            to="/accounts/russwb"
            className={`${style.link} ${style['link--follower']}`}
          >
            russwb
          </Link>
        </p>
      </Grid.Column>
    </Grid.Row>
  );
}

ProfileDescription.propTypes = {
  profile: shape({
    fullname: string.isRequired,
    username: string.isRequired,
    bio: string,
    website: string,
    followers: array.isRequired,
  }).isRequired,
};

export default ProfileDescription;
