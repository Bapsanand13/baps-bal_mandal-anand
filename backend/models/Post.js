import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String, default: '' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  isApproved: { type: Boolean, default: true }, // For admin moderation
}, { timestamps: true });

export default mongoose.model('Post', postSchema); 