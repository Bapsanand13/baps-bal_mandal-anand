import express from 'express';
import {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  sendAnnouncement
} from '../controllers/notificationController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', protect, getNotifications);
router.get('/unread-count', protect, getUnreadCount);
router.get('/:id', protect, getNotification);
router.put('/:id/read', protect, markAsRead);
router.put('/read-all', protect, markAllAsRead);

// Admin routes
router.post('/', protect, admin, createNotification);
router.post('/announcement', protect, admin, sendAnnouncement);
router.put('/:id', protect, admin, updateNotification);
router.delete('/:id', protect, admin, deleteNotification);

export default router; 