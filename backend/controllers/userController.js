import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/user.js'; // import the Mongoose User model

const userController = {
  // get all users
  getAllUsers: asyncHandler(async (req, res) => {
    try {
      const users = await User.find(); // retrieve all users from the database
      res.status(200).json(users); // send all users as JSON
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
  }),

  // update user
  updateUser: asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the user ID from the URL parameters
    const { email } = req.body; // Get the new email from the request body

    if (!email) {
      res.status(400);
      throw new Error('Email is required to update the user');
    }

    // Find the user by ID and update the email
    const updatedUser = await User.findByIdAndUpdate(
      id, // The user ID
      { email }, // The fields to update
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  }),

  // delete user
  deleteUser: asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the user ID from the URL parameters

    // Find the user by ID and delete them
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
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
    const { jars } = req.body; // expecting an array of jars in the request body
    const { email } = req.params; // use email from URL parameter

    console.log("Received email:", email);
    console.log("Received jars data:", jars);

    if (!jars || !Array.isArray(jars)) {
      res.status(400);
      throw new Error('Invalid jars data');
    }

    // validate each jar object against the schema requirements
    const validJars = jars.filter(jar => {
      return (
        jar.causeType && 
        ['cr', 'ea', 'hh', 'pde'].includes(jar.causeType) &&
        jar.organizationId && 
        jar.organizationName
      );
    });

    console.log("Valid jars after filtering:", validJars);

    if (validJars.length === 0) {
      res.status(400);
      throw new Error('No valid jar data provided');
    }

    // find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // log before saving
    console.log("User before save:", user);

    // assign the validated jars
    user.selectedJars = validJars;

    console.log("User after assignment:", user);

    console.log("Data being saved to selectedJars:", user.selectedJars);

    // save the user
    await user.save();
    console.log("Data in selectedJars after save:", user.selectedJars);
    console.log("User after save:", user);

    const savedUser = await user.save();
    console.log("Saved user:", savedUser);

    res.status(200).json({ message: 'Jars saved successfully', selectedJars: user.selectedJars });
  }),
};

export default userController;