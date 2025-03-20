import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router();

// sign up a new user
router.post('/signup', userController.registerUser);

// sign in an existing user
router.post('/signin', userController.signInUser);

// get user dashboard data
router.get('/userdashboard', userController.getUserDashboard);

// get admin dashboard data
// router.get('/admindashboard', userController.getAdminDashboard);

// get all users (for testing, admins at some point)
router.get('/', userController.getAllUsers);

// edit user (specifically email in this case)
router.put('/:id', userController.updateUser);

// delete user
router.delete('/:id', userController.deleteUser);

////////////////////////////////
// save jars
router.put('/:email/jars', (req, res, next) => {
    console.log("PUT /:email/jars route hit");
    console.log("Email parameter:", req.params.email);
    next();
  }, userController.saveUserJars);

export default router