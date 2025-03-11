import mongoose from 'mongoose' 

const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

export default User