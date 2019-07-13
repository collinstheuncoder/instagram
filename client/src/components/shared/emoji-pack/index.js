import React, { Component } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class EmojiPack extends Component {
  state = {
    emoji: '',
  }

  onSelectEmoji = emoji =>
    this.setState({
      emoji: emoji.native,
    })

  render() {
    return (
      <Picker set='emojione' onSelect={this.onSelectEmoji} />
    )
  }
}

export default EmojiPack;
