import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  image: { type: String, default: '' },
  maxAttendees: { type: Number, required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  category: { type: String, enum: ['spiritual', 'cultural', 'sports', 'educational'], default: 'spiritual' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema); 