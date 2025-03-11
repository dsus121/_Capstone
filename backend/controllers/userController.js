// for all user-related actions

import User from '../models/user.js';  // import the Mongoose User model

const userController = {
// controller function to get all users
    async getAllUsers(req, res) {
  try {
    const users = await User.find();  // retrieve all users from the database
    res.json(users);  // send all users as JSON 
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
},

    // function to register a new user
    async registerUser(req, res) {
  const { name, email, password } = req.body;
  try {
    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

// create a new user
    const newUser = new User({ 
        name, 
        email, 
        password });
        
    // save user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
},

  

// other controller functions needed
// getUserById, updateUser, deleteUser

};

export default userController