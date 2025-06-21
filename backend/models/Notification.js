import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['important', 'event', 'success', 'reminder', 'info'], 
    default: 'info' 
  },
  priority: { 
    type: String, 
    enum: ['high', 'medium', 'low'], 
    default: 'medium' 
  },
  isRead: { type: Boolean, default: false },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Empty array means all users
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema); 