// for all user-related actions

import bcrypt from 'bcrypt';
import User from '../models/user.js'; // Import the Mongoose User model

const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find(); // Retrieve all users from the database
      res.json(users); // Send all users as JSON
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  },

  // Register a new user
  async registerUser(req, res) {
    const { email, password } = req.body;
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password and create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email } });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  },

  // Sign in an existing user
  async signInUser(req, res) {
    const { email, password } = req.body;
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the password is valid
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Successful sign in
      res.status(200).json({
        message: 'Signed in successfully',
        user: { email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },

  // Get user dashboard data
  async getUserDashboard(req, res) {
    try {
      // Simulate user-specific data for the dashboard
      const userData = {
        email: 'test@testing.org',
        stats: {
          donations: 5,
          totalAmount: 100,
        },
      };

      res.status(200).json({ message: 'User dashboard data retrieved', data: userData });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving dashboard data', error });
    }
  },
};

export default userController;