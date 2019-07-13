import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Divider, Form, Segment } from 'semantic-ui-react';

import FileDrop from './file-drop';

const styles = {
  segment: {
    border: 'none',
    boxShadow: 'none',
    padding: 0,
  },
};

const baseStyle = {
  width: 200,
  height: 200,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
};

const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};

const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};


class NewPostForm extends Component {
  state = {
    url: '',
    caption: '',
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmitPost = e => {
    e.preventDefault();
    const { url, caption } = this.state;
    const { user, uploadPost, history } = this.props;

    if (url) {
    	const userId = user._id;
    	const handle = user.username;

      uploadPost(
        {
          url: url.trim(),
          caption: caption.trim(),
        },
        userId,
        handle,
        history
      );
      this.setState({
        url: '',
        caption: '',
        error: null,
      });
    } else {
      this.setState({
        error: 'Please make sure to enter valid credentials',
      });
    }
  };

  render() {
    const { url, caption } = this.state;

    return (
      <Form onSubmit={this.onSubmitPost}>
        <Segment style={styles.segment}>
          <Form.Field>
            <FileDrop accept="image/*">
              {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                let styles = {...baseStyle};
                // 
                styles = isDragActive ? {...styles, ...activeStyle} : styles;
                //
                styles = isDragReject ? {...styles, ...rejectStyle} : styles;

                return (
                  <div 
                    {...getRootProps()}
                    style={styles}
                  >
                    <input {...getInputProps()} />
                    <div>
                      {isDragAccept ? 'Drop' : 'Drag'} files here...
                    </div>
                    {isDragReject && <div>Unsupported file type...</div>}
                  </div>
                )
              }}
            </FileDrop>
          </Form.Field>
          <Divider horizontal>Or</Divider>
          <Form.Field>
            <input
              type="text"
              name="url"
              value={url}
              placeholder="Image Link"
              onChange={this.onChange}
            />
          </Form.Field>
        </Segment>
        <Form.Field>
          <label>Optional</label>
          <input
            type="text"
            name="caption"
            value={caption}
            placeholder="Caption"
            onChange={this.onChange}
          />
        </Form.Field>
        <Button type="submit" primary fluid>
          Add Post
        </Button>
      </Form>
    );
  }
}

NewPostForm.propTypes = {
  user: object.isRequired,
  uploadPost: func.isRequired,
};

export default withRouter(NewPostForm);
