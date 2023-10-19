import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String, 
    required: [true, 'Password is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  }

});

export const UserModel = mongoose.model('User', userSchema );