import jwt from 'jsonwebtoken';
import multer from 'multer';

import User from '../models/user';
import config from '../config';

const { jwtEncryption } = config;

// const uploadDir =
//   process.env.NODE_ENV === 'development'
//     ? '/server/src/public/uploads'
//     : '/server/build/public/uploads';
const uploadDir = '/server/src/public/uploads';

// Profile Pic Storage Options
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
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

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default {
  // eslint-disable-next-line
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({}, { password: 0 }).populate(
        'uploadedPosts'
      );

      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  },

  getCurrentUser: async (req, res) => {
    let token = req.headers['x-access-token'] || req.headers.authorization;

    try {
      // Check for auth scheme and slice it from string
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }

      const { sub } = jwt.decode(token, jwtEncryption);

      const user = await User.findById(sub, { password: 0 }).populate([
        'uploadedPosts',
        'bookmarkedPosts',
        'followers',
        'following',
      ]);

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getUserByHandle: async (req, res) => {
    const { handle } = req.params;

    if (!handle) {
      return res
        .status(401)
        .json({ success: false, message: 'No username provided.' });
    }

    try {
      const user = await User.find(
        { username: handle },
        { password: 0 }
      ).populate(['uploadedPosts', 'followers', 'following']);

      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  followUser: async (req, res) => {
    const { userId } = req.body; /* Current user ID */
    const { handle } = req.params; /* Handle of user to follow/unfollow */

    if (!userId) {
      return res
        .status(401)
        .json({ message: 'You must be logged in to follow users' });
    }

    try {
      // User to follow/unfollow
      const user = await User.findOne({ username: handle });

      // ID of user to follow/unfollow
      const userToFollowId = user._id;

      // Check if current user is already following
      // found user (corresponding to handle)
      const isFollowing = user.followers.some(foundUser =>
        foundUser.equals(userId)
      );

      const response = {};

      // Unfollow user if already followed by current user, otherwise follow
      if (isFollowing) {
        response.me = await User.findByIdAndUpdate(
          userId,
          { $pull: { following: userToFollowId } },
          { new: true }
        );
        response.handle = await User.findOneAndUpdate(
          { username: handle },
          { $pull: { followers: userId } },
          { new: true }
        );
      } else {
        response.me = await User.findByIdAndUpdate(
          userId,
          { $push: { following: userToFollowId } },
          { new: true }
        );
        response.handle = await User.findOneAndUpdate(
          { username: handle },
          { $push: { followers: userId } },
          { new: true }
        );
      }

      return res.status(200).json({ message: 'Successful follow', response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // eslint-disable-next-line
  updateUserInfo: async (req, res, next) => {
    const { filename } = req.file;
    const { handle } = req.params;
    let { updateInfo } = req.body;
    let imgUrl;

    if (filename) {
      const url = `${req.protocol}://${req.get('host')}`;
      imgUrl = `${url}${uploadDir}/${filename}`;

      updateInfo = { ...updateInfo, imgUrl };
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { username: handle },
        updateInfo,
        { new: true, runValidators: true }
      );

      return res.status(200).json({ updatedUser });
    } catch (error) {
      next(error);
    }
  },

  // eslint-disable-next-line
  deleteAccount: async (req, res, next) => {
    const { handle } = req.params;

    try {
      // Check if current user corresponds to user to be deleted
      await User.findOneAndRemove({ username: handle });

      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },
};
