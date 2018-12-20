import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../../../views/LandingPage';
import HomePage from '../../../views/HomePage';
import NewPostPage from '../../../views/NewPostPage';
import ProfilePage from '../../../views/ProfilePage';
import PostPage from '../../../views/PostPage';
import SignupPage from '../../../views/SignupPage';
import LoginPage from '../../../views/LoginPage';
import EditProfilePage from '../../../views/EditProfilePage';
import NotFoundPage from '../../../views/NotFoundPage';

function InstaMain() {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/new" component={NewPostPage} />
        <Route path="/accounts/signup" component={SignupPage} />
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route exact path="/:handle" component={ProfilePage} />
        <Route path="/:handle/p/:postId" component={PostPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  );
}

export default InstaMain;
