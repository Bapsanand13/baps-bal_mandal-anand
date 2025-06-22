import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['academic', 'cultural', 'sports', 'spiritual', 'community', 'other'],
    default: 'other'
  },
  level: { 
    type: String, 
    enum: ['local', 'regional', 'state', 'national', 'international'],
    default: 'local'
  },
  position: { type: String, default: '' }, // e.g., "First Prize", "Runner Up"
  date: { type: Date, required: true },
  participants: [{ 
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  image: { type: String, default: '' },
  certificate: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Achievement', achievementSchema); 