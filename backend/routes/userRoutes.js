import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Route: Sign up a new user
router.post('/signup', userController.registerUser);

// Route: Sign in an existing user
router.post('/signin', userController.signInUser);

// Route: Get user dashboard data
router.get('/userdashboard', userController.getUserDashboard);

// Route: Get all users (for testing purposes)
router.get('/users', userController.getAllUsers);

export default router;