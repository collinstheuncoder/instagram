/* eslint-disable func-names */
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullname: { type: String },
    bio: { type: String },
    imgUrl: { type: String },
    username: {
      type: String,
      unique: true,
      trim: true,
      validate: value =>
        validator.isLength(value, {
          min: 3,
          max: 24,
        }),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: value => validator.isEmail(value),
    },
    website: {
      type: String,
    },
    password: { type: String },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'Prefer Not To Say'],
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    uploadedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    bookmarkedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true,
  }
);

// Encrypt/hash password prior to saving user
UserSchema.pre('save', async function(next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;

  next();
});

// Compare passwords on login
UserSchema.methods.comparePasswords = async function(submittedPassword) {
  const user = this;

  try {
    return await bcrypt.compare(submittedPassword, user.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', UserSchema);

export default User;
