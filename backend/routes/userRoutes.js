import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// sign up a new user
router.post('/signup', userController.registerUser);

// sign in an existing user
router.post('/signin', userController.signInUser);

// get user dashboard data
router.get('/userdashboard', userController.getUserDashboard);

// get all users (for testing, admins at some point)
router.get('/users', userController.getAllUsers);

// save jars
router.put('/jars', userController.saveUserJars);

export default router;