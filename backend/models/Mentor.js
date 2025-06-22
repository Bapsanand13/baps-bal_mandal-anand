import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  email: { type: String },
  phone: { type: String },
  specialization: [{ type: String }],
  experience: { type: Number }, // years of experience
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 } // for sorting
}, { timestamps: true });

export default mongoose.model('Mentor', mentorSchema); 