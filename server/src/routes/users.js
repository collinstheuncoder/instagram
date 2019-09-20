import express from 'express';
import passport from 'passport';

import '../services/passport';

import usersController, { upload } from '../controllers/users';

const userRouter = express.Router();
const handleAuth = passport.authenticate('jwt', { session: false });

userRouter.route('/').get(usersController.getAllUsers);
userRouter.route('/me').get(handleAuth, usersController.getCurrentUser);
userRouter.route('/:handle').get(usersController.getUserByHandle);
userRouter
  .route('/:handle/update')
  .patch(
    [handleAuth, upload.single('profileImg')],
    usersController.updateUserInfo
  );
userRouter
  .route('/:handle/follow')
  .patch(handleAuth, usersController.followUser);
userRouter
  .route('/:handle/delete')
  .delete(handleAuth, usersController.deleteAccount);

export default userRouter;
