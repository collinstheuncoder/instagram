import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import config from '../config';

import { User } from '../models';

const { facebookId, facebookSecret, port } = config;

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookId,
      clientSecret: facebookSecret,
      callbackURL: `https://localhost:${port}/auth/facebook/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOrCreate(
          { name: profile.displayName },
          { name: profile.displayName, userid: profile.id }
        );

        if (!user) {
          done(null, false);
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
