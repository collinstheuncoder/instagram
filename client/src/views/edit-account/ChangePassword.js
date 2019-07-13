import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Form, Image } from 'semantic-ui-react';

import PasswordField from '../../components/shared/PasswordField';

import { form, field, image, label, input } from './chngpassword.module.scss';

class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
    errors: {},
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmitPasswordInfo = e => {
    e.preventDefault();

    const { oldPassword, newPassword, newPasswordConfirm, errors } = this.state;

    if (!oldPassword || !newPassword) {
      errors.emptyField = 'Please enter password';
    } else if (newPassword !== newPasswordConfirm) {
      errors.pwdMatch = 'The new passwords do not match';
    } else {
      const passwords = {
        old: this.state.oldPassword,
        new: this.state.newPassword,
      };

      this.props.changePassword(passwords, this.props.history);

      this.setState({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
    }
  };

  render() {
    const { oldPassword, newPassword, newPasswordConfirm, errors } = this.state;
    const {
      currentUser: { username, fullname, imgUrl },
    } = this.props;
    const isEmpty = errObj => Object.entries(errors).length === 0;

    return (
      <Form className={form} onSubmit={this.onchangePassword}>
        <Form.Field className={field}>
          <div className={label}>
            <Image
              className={image}
              src={`/images/profile/${imgUrl}` || '/images/gsw-kd.png'}
              alt={fullname}
            />
          </div>
          <p style={{ fontSize: '1.25rem' }} className={input}>
            {username}
          </p>
        </Form.Field>
        <PasswordField
          name="oldPassword"
          value={oldPassword}
          label="Old Password"
          onChange={this.onChange}
        />
        <PasswordField
          name="newPassword"
          value={newPassword}
          label="New Password"
          onChange={this.onChange}
        />
        <PasswordField
          name="newPasswordConfirm"
          value={newPasswordConfirm}
          label="Confirm New Password"
          onChange={this.onChange}
        />
        <Form.Field className={field}>
          <div className={label} />
          <Button
            style={{ marginLeft: '-0.4rem' }}
            type="submit"
            primary
            disabled={!isEmpty(errors)}
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: func.isRequired,
  currentUser: shape({
    username: string.isRequired,
    fullname: string.isRequired,
    imgUrl: string.isRequired,
  }).isRequired,
};

export default withRouter(ChangePassword);
