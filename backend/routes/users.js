import express from 'express';
import { 
  getProfile, 
  updateProfile, 
  getAllUsers, 
  updateUserRole,
  getCommunityMembers,
  listUsers,
  addUser,
  updateUser,
  deleteUser,
  resetPassword,
  getUserProfile
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/community', getCommunityMembers);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin routes
router.get('/list', protect, admin, listUsers);
router.get('/', protect, admin, getAllUsers);
router.post('/', protect, admin, addUser);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);
router.put('/:id/reset-password', protect, admin, resetPassword);
router.get('/:id/profile', protect, admin, getUserProfile);
router.put('/:id/role', protect, admin, updateUserRole);

export default router; 