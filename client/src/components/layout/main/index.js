import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../../../views/landing';
import HomePage from '../../../views/home';
import NewPostDetailPage from '../../../views/new-post';
import ProfilePage from '../../../views/profile';
import PostDetailPage from '../../../views/post-detail';
import SignupPage from '../../../views/signup';
import LoginPage from '../../../views/login';
import EditProfilePage from '../../../views/edit-profile';
import NotFoundPage from '../../../views/not-found';

// Authorization HOCs
import requireAuth from '../../../hoc/auth';
import noAuthRequired from '../../../hoc/no-auth';

import { main } from './index.module.scss';

function InstaMain() {
  return (
    <main className={main}>
      <Switch>
        <Route exact path='/' component={noAuthRequired(LandingPage)} />
        <Route exact path='/home' component={requireAuth(HomePage)} />
        <Route exact path='/new' component={requireAuth(NewPostDetailPage)} />
        <Route path='/accounts/signup' component={noAuthRequired(SignupPage)} />
        <Route path='/accounts/login' component={noAuthRequired(LoginPage)} />
        <Route exact path='/:handle' component={ProfilePage} />
        <Route path='/:handle/edit' component={requireAuth(EditProfilePage)} />
        <Route path='/:handle/p/:postId' component={PostDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  );
}

export default InstaMain;
