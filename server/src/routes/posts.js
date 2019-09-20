import express from 'express';
import passport from 'passport';

import '../services/passport';

import { postsController } from '../controllers';

const postsRouter = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

postsRouter.route('/').get(postsController.fetchAllPosts);
postsRouter.route('/:handle').get(postsController.fetchPostsByHandle);
postsRouter.route('/upload').post(requireAuth, postsController.uploadPost);
postsRouter.route('/:handle/:postId').get(postsController.fetchSpecificPost);
postsRouter
  .route('/:postId/update')
  .patch(requireAuth, postsController.updatePost);
postsRouter
  .route('/:postId/remove')
  .delete(requireAuth, postsController.removePost);

export default postsRouter;
