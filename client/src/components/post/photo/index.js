import React from 'react';
import { func, string } from 'prop-types';
import { Image } from 'semantic-ui-react';

import { image } from './index.module.scss';

function PostPhoto({ photo, likePost }) {
  return <Image className={image} src={photo} size="huge" />;
}

PostPhoto.propTypes = {
  photo: string,
  likePost: func.isRequired,
};

export default PostPhoto;
