/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

import { User } from '../models';
import config from '../config';

const { jwtEncryption, jwtExpiration } = config;

// Generate auth token
function authToken(user) {
  return jwt.sign(
    {
      sub: user._id,
      iat: new Date().getTime(),
    },
    jwtEncryption,
    {
      expiresIn: jwtExpiration,
    }
  );
}

export default {
  signup: async (req, res, next) => {
    try {
      const { fullname, username, email, password } = req.body;

      // Check if there is a user with the same email
      const foundUser = await User.findOne({ email });

      if (foundUser) {
        return res.status(409).send({ error: 'Email is already in use' });
      }

      const newUser = await User.create({
        fullname,
        username,
        email,
        password,
      });

      // Assign token to succesfully registered user
      const token = authToken(newUser);

      return res.status(200).send({ token, user: newUser });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { user } = req;

      // Assign token to succesfully logged in user
      const token = authToken(user);

      return res.status(200).json({ token, user });
    } catch (error) {
      next(error);
    }
  },
};
