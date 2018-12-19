import jwt from 'jsonwebtoken';
import multer from 'multer';

import { User } from '../models';
import config from '../config';

const { jwt_encryption, jwt_expiration } = config;

// Profile Pic Storage Options
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './profileImages/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

// Check for valid image file
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadImg = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

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

      return res.status(200).send({ token });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const user = req.user;

      // Assign token to succesfully logged in user
      const token = authToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },
};

// Generate auth token
function authToken(user) {
  return jwt.sign(
    {
      sub: user._id,
      iat: new Date().getTime(),
    },
    jwt_encryption,
    {
      expiresIn: jwt_expiration,
    }
  );
}
