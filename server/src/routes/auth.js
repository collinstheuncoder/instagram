import express from 'express';
import passport from 'passport';

import { authController } from '../controllers';

import '../services/passport';

import passportFacebook from '../services/facebook';

const authRouter = express.Router();

const handleLogin = passport.authenticate('local', { session: false });

authRouter.route('/signup').post(authController.signup);
authRouter.route('/login').post(handleLogin, authController.login);
authRouter.get('/facebook', passportFacebook.authenticate('facebook'));
authRouter.get(
  '/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, reveal message
    res.send({ message: 'Hello' });
  }
);

export default authRouter;
