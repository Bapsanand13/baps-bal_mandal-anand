import express from 'express';
import {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getRecentAchievements
} from '../controllers/achievementController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAchievements);
router.get('/recent', getRecentAchievements);
router.get('/:id', getAchievement);

// Protected routes (Admin only)
router.post('/', protect, admin, createAchievement);
router.put('/:id', protect, admin, updateAchievement);
router.delete('/:id', protect, admin, deleteAchievement);

export default router; 