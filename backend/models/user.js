import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // For password hashing

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  causes: [
    { 
      type: String,
      enum: ['Health', 'Education', 'Environment', 'Animal Welfare', 'Community', 'Other'], // Example causes
    }
  ],
  paymentProcessor: { 
    type: String, 
    enum: ['Stripe', 'PayPal', 'Other'],  
  },
  paymentDetails: {
    processorName: { type: String },   // Stripe, PayPal, etc.
    processorData: { type: mongoose.Schema.Types.Mixed },  // store payment processor-specific data here
  },
  donationHistory: [
    {
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      cause: { type: String, required: true },
    }
  ],
  cookieJarBalance: { type: Number, default: 0 },  // store the amount of money in the cookie jar
}, { timestamps: true });

// authentication -- password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// compare passwords function
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
