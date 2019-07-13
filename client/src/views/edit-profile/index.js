import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { Card, Grid } from 'semantic-ui-react';

import GeneralInfo from './edit-account/general-info';
import ChangePassword from './edit-account/change-password';

import style from './index.module.scss';

import {
  fetchCurrentUser, 
  updateUserInfo,
  changePassword,
  deleteAccount,
} from '../../store/users/actions';

class EditProfilePage extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) this.props.fetchCurrentUser(token);
  }

  render() {
    const { currentUser, updateUserInfo, deleteAccount } = this.props;
    const { card, grid, link, row } = style;

    return (
      <Grid className={grid}>
        <Card className={card}>
          <Grid.Row className={row} columns={2} divided>
            <Grid.Column className={style['column-left']}>
              <NavLink
                className={link}
                activeStyle={{
                  borderLeft: '0.125rem solid #333333',
                  fontWeight: 600,
                  backgroundColor: '#fafafa',
                }}
                to={`/${currentUser.username}/edit`}
                exact
              >
                Edit Profile
              </NavLink>
              <NavLink
                className={link}
                activeStyle={{
                  borderLeft: '0.125rem solid #333333',
                  fontWeight: 600,
                  backgroundColor: '#fafafa',
                }}
                to={`/${currentUser.username}/edit/change-password`}
              >
                Change Password
              </NavLink>
            </Grid.Column>
            <Grid.Column className={style['column-right']} width={12}>
              <Switch>
                <Route
                  path="/:handle/edit"
                  exact
                  component={() => (
                    <GeneralInfo
                      updateUserInfo={updateUserInfo}
                      deleteAccount={deleteAccount}
                      currentUser={currentUser}
                    />
                  )}
                />
                <Route
                  path="/:handle/edit/change-password"
                  component={() => (
                    <ChangePassword
                      changePassword={changePassword}
                      currentUser={currentUser}
                    />
                  )}
                />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Card>
      </Grid>
    );
  }
}

EditProfilePage.propTypes = {
  currentUser: object.isRequired,
  fetchCurrentUser: func.isRequired,
  updateUserInfo: func.isRequired,
  changePassword: func.isRequired,
  deleteAccount: func.isRequired,
};

function mapStateToProps({ users }) {
  return {
    currentUser: users.currentUser,
    error: users.error,
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentUser, updateUserInfo, changePassword, deleteAccount }
)(EditProfilePage);
