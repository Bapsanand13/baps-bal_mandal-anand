import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  mandal: { type: String, required: true },
  guardianName: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, default: '' }, 
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

export default mongoose.model('User', userSchema); 