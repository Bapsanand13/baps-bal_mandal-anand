import express from 'express';
import {
  getMentors,
  getMentor,
  createMentor,
  updateMentor,
  deleteMentor
} from '../controllers/mentorController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getMentors);
router.get('/:id', getMentor);

// Admin routes
router.post('/', protect, admin, createMentor);
router.put('/:id', protect, admin, updateMentor);
router.delete('/:id', protect, admin, deleteMentor);

export default router; 