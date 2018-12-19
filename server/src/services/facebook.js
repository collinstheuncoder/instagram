import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import config from '../config';

import { User } from '../models';

const { facebook_id, facebook_secret, port } = config;

passport.use(
  new FacebookStrategy(
    {
      clientID: facebook_id,
      clientSecret: facebook_secret,
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
