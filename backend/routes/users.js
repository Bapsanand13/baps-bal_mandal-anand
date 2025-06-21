import express from 'express';
import { 
  getProfile, 
  updateProfile, 
  getAllUsers, 
  updateUserRole 
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin routes
router.get('/', protect, admin, getAllUsers);
router.put('/:id/role', protect, admin, updateUserRole);

export default router; 