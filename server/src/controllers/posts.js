import Post from '../models/post';
import User from '../models/user';
import Comment from '../models/comment';

export default {
  fetchAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .sort('-createdAt')
        .populate([
          {
            path: 'uploadedBy',
            select: 'fullname username _id imgUrl',
          },
          {
            path: 'comments',
            select: 'body addedBy _id',
            populate: {
              path: 'addedBy',
              select: 'username',
            },
          }
        ]);

      res.status(200).json({ success: true, posts });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  fetchPostsByHandle: async (req, res) => {
    try {
      const { handle } = req.params;

      const posts = await Post.find({ username: handle })
        .sort('-createdAt')
        .populate([
          {
            path: 'uploadedBy',
            select: 'fullname username _id imgUrl',
          },
          {
            path: 'comments',
            select: 'body addedBy _id',
            populate: {
              path: 'addedBy',
              select: 'username',
            },
          },
          {
            path: 'followers',
            select: 'username firstname lastname _id',
          },
          {
            path: 'following',
            select: 'username firstname lastname _id',
          },
        ]);

      res.status(200).json({ success: true, posts });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  fetchSpecificPost: async (req, res) => {
    try {
      const { postId } = req.params;

      const post = await Post.findById(postId).populate([
        {
          path: 'uploadedBy',
          select: 'fullname username _id imgUrl',
        },
        {
          path: 'comments',
          select: 'body addedBy _id',
          populate: {
            path: 'addedBy',
            select: 'username',
          },
        },
      ]);

      res.status(200).json({ success: true, post });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  uploadPost: async (req, res) => {
    const { post, userId } = req.body;

    try {
      const newPost = await Post.create({
        url: post.url,
        caption: post.caption,
        uploadedBy: userId,
      });

      await User.findByIdAndUpdate(userId, {
        $push: { uploadedPosts: newPost._id },
      });

      res.status(200).json({ success: true, newPost });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { action, userId } = req.body;
      const { postId } = req.params;

      switch (action) {
        case 'commentOnPost':
          await commentOnPost(req, res, userId, postId, req.body.comment, Post);
          break;
        case 'deleteComment':
          await deleteComment(req, res, userId, postId, commentId, model);
          break;
        case 'likePost':
          await likePost(req, res, userId, postId, User, Post);
          break;
        case 'bookmarkPost':
          await bookmarkPost(req, res, userId, postId, User, Post);
          break;
        default:
          false;
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  removePost: async (req, res) => {
    const { userId, postId } = req.body;

    try {
      // Remove post whose _id in DB corresponds to postId
      const post = await findById(postId);

      if (post.addedBy !== userId) {
        return res
          .status(403)
          .json({ message: 'Only the uploader can remove this post' });
      } else {
        await Post.remove({ _id: postId });
        return res
          .status(200)
          .json({ message: 'Post has been successfully removed' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

// Leave a comment on correspondin post
async function commentOnPost(req, res, userId, postId, comment, model) {
  if (!userId) {
    return res
      .status(403)
      .json({ message: 'You must be logged in to leave a comment' });
  } else {
    const newComment = await Comment.create({ body: comment, addedBy: userId });
    const updatedPost = await model.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true, safe: true, upsert: false }
    );
    return res.status(200).json({ updatedPost });
  }
}

// Delete comment from corresponding post
async function deleteComment(req, res, userId, postId, commentId, model) {
  if (post.addedBy !== userId) {
    return res
      .status(403)
      .json({ message: 'You must be logged in to delete comments' });
  } else {
    const response = await model.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { safe: true, upsert: true }
    );
    return res.status(200).json({ response });
  }
}

// Like post
async function likePost(req, res, userId, postId, user_model, post_model) {
  if (!userId) {
    return res
      .status(403)
      .json({ message: 'You must be logged in to like post' });
  } else {
    const post = await post_model.findById(postId);

    // Check if user has already liked post
    const hasLiked = post.likedBy.some(user => user.equals(userId));

    let response;

    if (hasLiked) {
      await user_model.findByIdAndUpdate(
        userId,
        { $pull: { likedPosts: postId } },
        { safe: true, upsert: true }
      );

      response = await post_model.findByIdAndUpdate(
        postId,
        { $pull: { likedBy: userId } },
        { safe: true, upsert: true }
      );
    } else {
      await user_model.findByIdAndUpdate(
        userId,
        { $push: { likedPosts: postId } },
        { safe: true, upsert: true }
      );

      response = await post_model.findByIdAndUpdate(
        postId,
        { $push: { likedBy: userId } },
        { safe: true, upsert: true }
      );
    }
    return res.status(200).json({ response });
  }
}

// Bookmark post
async function bookmarkPost(req, res, userId, postId, user_model, post_model) {
  if (!userId) {
    return res
      .status(403)
      .json({ message: 'You must be logged in to bookmark post' });
  } else {
    const post = await post_model.findById(postId);

    // Check if user has already liked post
    const hasBookmarked = post.bookmarkedBy.some(user => user.equals(userId));

    let response;

    if (hasBookmarked) {
      await user_model.findByIdAndUpdate(
        userId,
        { $pull: { bookmarkedPosts: postId } },
        { safe: true, upsert: true }
      );

      response = await post_model.findByIdAndUpdate(
        postId,
        { $pull: { bookmarkedBy: userId } },
        { safe: true, upsert: true }
      );
    } else {
      await user_model.findByIdAndUpdate(
        userId,
        { $push: { bookmarkedPosts: postId } },
        { safe: true, upsert: true }
      );

      response = await post_model.findByIdAndUpdate(
        postId,
        { $push: { bookmarkedBy: userId } },
        { safe: true, upsert: true }
      );
    }
    return res.status(200).json({ response });
  }
}
