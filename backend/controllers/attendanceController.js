import Attendance from '../models/Attendance.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// Mark attendance (bulk or individual)
export const markAttendance = async (req, res) => {
  try {
    const { date, mandal, records } = req.body; // records: [{ user, status }]
    const markedBy = req.user.userId;
    const attendanceDocs = [];
    for (const record of records) {
      const { user, status } = record;
      const filter = { user, date, mandal };
      const update = { status, markedBy };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const doc = await Attendance.findOneAndUpdate(filter, update, options);
      attendanceDocs.push(doc);
    }
    res.json({ message: 'Attendance marked successfully', attendance: attendanceDocs });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get attendance by user, mandal, or date
export const getAttendance = async (req, res) => {
  try {
    const { user, mandal, date } = req.query;
    const filter = {};
    if (user) filter.user = user;
    if (mandal) filter.mandal = mandal;
    if (date) filter.date = new Date(date);
    const attendance = await Attendance.find(filter).populate('user', 'name mandal age guardianName phone photo');
    res.json(attendance);
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update/correct attendance
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const attendance = await Attendance.findByIdAndUpdate(id, { status }, { new: true });
    if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
    res.json({ message: 'Attendance updated', attendance });
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export attendance (CSV/Excel-ready JSON)
export const exportAttendance = async (req, res) => {
  try {
    const { mandal, from, to } = req.query;
    const filter = {};
    if (mandal) filter.mandal = mandal;
    if (from && to) filter.date = { $gte: new Date(from), $lte: new Date(to) };
    const attendance = await Attendance.find(filter).populate('user', 'name mandal age guardianName phone');
    res.json(attendance); // Frontend can convert to CSV/Excel
  } catch (error) {
    console.error('Export attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Attendance summary (for dashboard/profile)
export const attendanceSummary = async (req, res) => {
  try {
    const { mandal, date, user } = req.query;
    let match = {};
    if (mandal) match.mandal = mandal;
    if (date) match.date = new Date(date);
    if (user) match.user = new mongoose.Types.ObjectId(user);
    const total = await Attendance.countDocuments(match);
    const present = await Attendance.countDocuments({ ...match, status: 'present' });
    const absent = await Attendance.countDocuments({ ...match, status: 'absent' });
    res.json({ total, present, absent, percentage: total ? (present / total) * 100 : 0 });
  } catch (error) {
    console.error('Attendance summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send absent notification (stub)
export const sendAbsentNotification = async (req, res) => {
  try {
    // Integrate with SMS/Push here (Twilio, etc.)
    res.json({ message: 'Absent notification sent (stub)' });
  } catch (error) {
    console.error('Send absent notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 