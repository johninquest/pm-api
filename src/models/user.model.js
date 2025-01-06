// src/models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  googleId: { type: String, required: true, unique: true },
  avatar: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { 
  timestamps: true 
});

export const User = mongoose.model('User', userSchema);