import React from 'react';
import { func, string } from 'prop-types';
import { Image } from 'semantic-ui-react';

const styles = {
  image: {
    cursor: 'pointer',
  },
};

function PostPhoto({ photo, likePost }) {
  return <Image style={styles.image} src={photo} size="huge" />;
}

PostPhoto.propTypes = {
  photo: string,
  likePost: func.isRequired,
};

export default PostPhoto;
