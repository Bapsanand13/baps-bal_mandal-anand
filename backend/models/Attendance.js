import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  mandal: { type: String, required: true },
  status: { type: String, enum: ['present', 'absent'], required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin/volunteer
  notificationSent: { type: Boolean, default: false }
}, { timestamps: true });

attendanceSchema.index({ user: 1, date: 1, mandal: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema); 