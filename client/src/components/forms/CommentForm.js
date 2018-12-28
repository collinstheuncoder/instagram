import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { Form, Icon, Input } from 'semantic-ui-react';

import EmojiPack from '../shared/EmojiPack';

import { form, icon, input } from './comment-form.module.scss';

class CommentForm extends Component {
  state = {
    comment: '',
    user: '',
    displayEmojisList: false,
    error: null,
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onToggleEmojisList = () =>
    this.setState(prevState => ({
      displayEmojisList: !prevState.displayEmojisList,
    }));

  onLeaveComment = e => {
    e.preventDefault();
    const { comment, error } = this.state;
    const { commentOnPost, userId, postId } = this.props;

    if (comment || !error) {
      commentOnPost(userId, postId, comment);

      this.setState({ comment: '', error: null });
    } else {
      this.setState({ error: 'Please enter a valid comment' });
    }
  };

  render() {
    const { comment, displayEmojisList } = this.state;

    return (
      <Form className={form} onSubmit={this.onLeaveComment}>
        <Input
          className={`comment-input ${input}`}
          icon={
            <Icon
              className={icon}
              size="large"
              name="smile outline"
              link
              onClick={this.onToggleEmojisList}
            />
          }
          name="comment"
          value={comment}
          placeholder="Add a comment..."
          onChange={this.onChange}
        />
        {displayEmojisList && <EmojiPack />}
      </Form>
    );
  }
}

CommentForm.propTypes = {
  commentOnPost: func.isRequired,
  postId: string.isRequired,
  userId: string.isRequired,
};

export default CommentForm;
