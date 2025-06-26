import express from 'express';
import {
  markAttendance,
  getAttendance,
  updateAttendance,
  exportAttendance,
  attendanceSummary,
  sendAbsentNotification
} from '../controllers/attendanceController.js';
import { protect, admin, volunteer } from '../middleware/auth.js';

const router = express.Router();

// Mark attendance (bulk/individual)
router.post('/mark', protect, volunteer, markAttendance);

// Get attendance (by user, mandal, date)
router.get('/', protect, admin, getAttendance);

// Update/correct attendance
router.put('/:id', protect, admin, updateAttendance);

// Export attendance
router.get('/export', protect, admin, exportAttendance);

// Attendance summary (dashboard/profile)
router.get('/summary', protect, admin, attendanceSummary);

// Send absent notification (stub)
router.post('/notify', protect, admin, sendAbsentNotification);

export default router; 