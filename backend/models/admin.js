import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // 
    role: { type: String, default: 'admin' }, // mayber a superuser role in the future, causeAdmin, etc
    activityLogs: [
      {
        userId: { type: String, required: true }, // 
        action: { type: String, required: true }, // viewed donation history", "updated user profile")
        dateTime: { type: Date, default: Date.now }, // timestamp of the action
        additionalInfo: { type: mongoose.Schema.Types.Mixed }, // flexible field for storing extra details
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }, { timestamps: true });





export default Admin;
