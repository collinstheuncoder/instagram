import React, { Fragment } from 'react';
import { Image } from 'semantic-ui-react';

import style from './links-to-app.module.scss';

function LinksToApp() {
  return (
    <Fragment>
      <p className={style['get-app']}>Get the app</p>
      <div className={style['link-group']}>
        <a
          className={style.link}
          href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.signupPage.badge&mt=8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://imgur.com/SrKB9mF.png"
            size="small"
            centered
            className={style.image}
          />
        </a>
        <a
          className={style.link}
          href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26utm_medium%3Dbadge"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://imgur.com/fWVPG5Q.png"
            size="small"
            centered
            className={style.image}
          />
        </a>
      </div>
    </Fragment>
  );
}

export default LinksToApp;
