import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
  moderatePost,
  getPendingPosts,
  approvePost,
  rejectPost,
  markInappropriate,
  listPosts
} from '../controllers/postController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/list', protect, admin, listPosts);
router.get('/pending', protect, admin, getPendingPosts);
router.get('/', getPosts);
router.get('/:id', getPost);

// Protected routes
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/comments', protect, addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);

// Admin/Moderator routes
router.put('/:id/moderate', protect, admin, moderatePost);

// Admin routes
router.put('/:id/approve', protect, admin, approvePost);
router.put('/:id/reject', protect, admin, rejectPost);
router.put('/:id/inappropriate', protect, admin, markInappropriate);

export default router; 