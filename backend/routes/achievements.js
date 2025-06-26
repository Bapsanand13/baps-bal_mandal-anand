import express from 'express';
import {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getRecentAchievements,
  verifyAchievement,
  rejectAchievement,
  userAchievements
} from '../controllers/achievementController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/recent', getRecentAchievements);
router.get('/', getAchievements);
router.get('/:id', getAchievement);

// Protected routes (Admin only)
router.post('/', protect, admin, createAchievement);
router.put('/:id', protect, admin, updateAchievement);
router.delete('/:id', protect, admin, deleteAchievement);

// Admin routes
// router.get('/list', protect, admin, listAchievements); // Removed, not implemented
router.put('/:id/verify', protect, admin, verifyAchievement);
router.put('/:id/reject', protect, admin, rejectAchievement);
router.get('/user/:userId', protect, admin, userAchievements);

export default router; 