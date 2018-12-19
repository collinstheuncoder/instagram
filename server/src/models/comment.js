import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Post comments schema 
const CommentSchema = new Schema({
  body: { type: String },
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
