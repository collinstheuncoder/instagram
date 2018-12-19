import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';

const { jwt_encryption, jwt_expiration } = config;

export default {
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

  getCurrentUser: async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    try {
      // Check for auth scheme and slice it from string
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }

      const { sub } = jwt.decode(token, jwt_encryption);

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

  getUserByHandle: async (req, res, next) => {
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
        .json({ message: `You must be logged in to follow users` });
    }

    try {
      // User to follow/unfollow
      const user = await User.findOne({ username: handle });

      // ID of user to follow/unfollow
      const userToFollowId = user._id;

      // Check if current user is already following 
      // found user (corresponding to handle)
      const isFollowing = user.followers.some(user => user.equals(userId));

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

  updateUserInfo: async (req, res, next) => {
    const { updateInfo } = req.body;
    const { handle } = req.params;

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

  deleteAccount: async (req, res, next) => {
    const { handle } = req.params;
    
    try {
      // Check if current user corresponds to user to be deleted
      const response = await User.findOneAndRemove({ username: handle });

      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },
};
