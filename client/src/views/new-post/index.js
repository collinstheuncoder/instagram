import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import NewPostForm from '../../components/forms/new-post';

import { uploadPost } from '../../store/posts/actions';

const styles = {
  grid: {
    margin: '4rem 0',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    minHeight: '35rem',
  },
  column: {
    padding: 0,
    flexBasis: '60%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
};

class NewPostPage extends Component {
  state = {
    isOpen: false,
  };

  onOpenModal = () => {
    this.setState({ isOpen: true });
  };

  onCloseModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <Grid style={styles.grid}>
        <Grid.Row>
          <Grid.Column>
            {this.props.currentUser && (
              <NewPostForm user={this.props.currentUser} uploadPost={uploadPost} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

NewPostPage.propTypes = {
  uploadPost: func.isRequired,
};

function mapStateToProps({ auth, users }) {
  return {
    currentUser: users.currentUser,
    error: auth.error,
  };
}

export default connect(
  mapStateToProps,
  { uploadPost }
)(NewPostPage);
