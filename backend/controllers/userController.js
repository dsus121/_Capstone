import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/user.js'; // Import the Mongoose User model

const userController = {
  // Get all users
  getAllUsers: asyncHandler(async (req, res) => {
    const users = await User.find(); // Retrieve all users from the database
    res.json(users); // Send all users as JSON
  }),

  // Register a new user
  registerUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email } });
  }),

  // Sign in an existing user
  signInUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    // Successful sign in
    res.status(200).json({
      message: 'Signed in successfully',
      user: { email: user.email },
    });
  }),

  getUserDashboard: asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Return only the user's email for now
    const userData = {
      email: user.email,
    };

    res.status(200).json({ message: 'User dashboard data retrieved', data: userData });
  }),

};

export default userController;