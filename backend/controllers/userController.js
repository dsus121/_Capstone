import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/user.js'; // import the Mongoose User model

const userController = {
  // get all users
  getAllUsers: asyncHandler(async (req, res) => {
    const users = await User.find(); // retrieve all users from the database
    res.json(users); // send all users as JSON
  }),

  // register a new user
  registerUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    // hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email } });
  }),

  // sign in an existing user
  signInUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    // successful sign in
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

    // return only the user's email for now
    const userData = {
      email: user.email,
    };

    res.status(200).json({ message: 'User dashboard data retrieved', data: userData });
  }),

  // Save user jars
  saveUserJars: asyncHandler(async (req, res) => {
    const { jars } = req.body; // Expecting an array of jars in the request body
    const userId = req.user.id; // Assuming user ID is available from authentication middleware

    if (!jars || !Array.isArray(jars)) {
      res.status(400);
      throw new Error('Invalid jars data');
    }

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Save the jars to the user's profile
    user.jars = jars; // Assuming the User model has a `jars` field
    await user.save();

    res.status(200).json({ message: 'Jars saved successfully', jars: user.jars });
  }),
};

export default userController