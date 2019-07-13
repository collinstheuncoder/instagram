import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Form, Icon, Image, Modal, Select } from 'semantic-ui-react';

import FormField from '../../../../components/edit-profile/form-field';

import style from './index.module.scss';

const selectOptions = [
  { key: 'M', value: 'Male', text: 'Male' },
  { key: 'F', value: 'Female', text: 'Female' },
  { key: 'O', value: 'Other', text: 'Other' },
  { key: 'N/A', value: 'Prefer Not To Say', text: 'Prefer Not To Say' },
];

class GeneralInfo extends Component {
  state = {
    imgUrl: this.props.currentUser.imgUrl || '',
    fullname: this.props.currentUser.fullname || '',
    username: this.props.currentUser.username || '',
    website: this.props.currentUser.website || '',
    bio: this.props.currentUser.bio || '',
    email: this.props.currentUser.email || '',
    gender: this.props.currentUser.gender || 'Male',
    isOpen: false,
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSelect = (e, { value, gender }) => {
    this.setState({
      gender: value,
    });
  };

  onOpenModal = () =>
    this.setState({
      isOpen: true,
    });

  onCloseModal = () =>
    this.setState({
      isOpen: false,
    });

  onUpdateUserInfo = e => {
    e.preventDefault();

    const { imgUrl, fullname, website, bio, email, gender } = this.state;

    const {
      updateUserInfo,
      currentUser: { username },
      history,
    } = this.props;

    updateUserInfo(
      username,
      {
        imgUrl,
        fullname,
        website,
        bio,
        email,
        gender,
      },
      history
    );
  };

  onDeleteAccount = () => {
    const { deleteAccount, currentUser, history } = this.props;

    // Send delete request
    deleteAccount(currentUser.username, history);

    // Close Modal
    this.onCloseModal();
  };

  render() {
    const {
      imgUrl,
      fullname,
      username,
      website,
      bio,
      email,
      gender,
    } = this.state;
    const { currentUser } = this.props;

    const { field, form, image, input, label, modal } = style;

    return (
      <Form className={form} onSubmit={this.onUpdateUserInfo}>
        <Form.Field className={field}>
          <label className={label}>
            <Image
              className={image}
              src={
                `/images/profile/${currentUser.imgUrl}` || '/images/gsw-kd.png'
              }
              alt={fullname}
            />
          </label>
          <div style={{ marginTop: '-1rem' }} className={input}>
            <p style={{ margin: 0, fontSize: '1.25rem' }}>{username}</p>
            <Modal
              trigger={
                <p className={style['change-photo']}>Change Profile Photo</p>
              }
              size="tiny"
            >
              <Modal.Header>Enter new photo URL</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field className={field}>
                    <input
                      style={{ flexBasis: '100%' }}
                      className={input}
                      type="text"
                      name="imgUrl"
                      value={imgUrl}
                      onChange={this.onChange}
                    />
                  </Form.Field>
                </Form>
              </Modal.Content>
            </Modal>
          </div>
        </Form.Field>
        <FormField name="fullname" value={fullname} onChange={this.onChange} />
        <FormField
          name="username"
          value={username}
          disabled={true}
          onChange={this.onChange}
        />
        <FormField name="website" value={website} onChange={this.onChange} />
        <FormField name="bio" value={bio} onChange={this.onChange} />
        <Form.Field className={field}>
          <div className={label} />
          <p style={{ color: '#cdcdcd', fontWeight: 600 }} className={input}>
            Private Information
          </p>
        </Form.Field>
        <FormField
          type="email"
          name="email"
          value={email}
          onChange={this.onChange}
        />
        <Form.Field className={field}>
          <label className={label}>Gender</label>
          <Select
            className={input}
            placeholder="Select Gender"
            options={selectOptions}
            value={gender}
            onChange={this.onSelect}
          />
        </Form.Field>
        <Form.Field className={field}>
          <div className={label} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
            }}
            className={input}
          >
            <Button primary>Update</Button>
            <Modal
              className={modal}
              size="mini"
              trigger={
                <Button negative onClick={this.onOpenModal}>
                  Delete Account
                </Button>
              }
            >
              <Modal.Header className={style['modal-header']}>
                Delete Account?
              </Modal.Header>
              <Modal.Content className={style['modal-content']}>
                <p>
                  This process <strong>cannot</strong> be reversed
                </p>
              </Modal.Content>
              <Modal.Actions className={style['modal-actions']}>
                <Button basic icon negative onClick={this.onCloseModal}>
                  <Icon name="close" /> No
                </Button>
                <Button basic icon positive onClick={this.onDeleteAccount}>
                  <Icon name="check" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
        </Form.Field>
      </Form>
    );
  }
}

GeneralInfo.propTypes = {
  updateUserInfo: func.isRequired,
  deleteAccount: func.isRequired,
  currentUser: shape({
    fullname: string.isRequired,
    username: string.isRequired,
    bio: string,
    email: string.isRequired,
    imgUrl: string.isRequired,
    website: string,
  }).isRequired,
};

export default withRouter(GeneralInfo);
