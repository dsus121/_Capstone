import express from 'express';

const router = express.Router(); // new instance of express router

// define routes
// router.post('/register', (req, res) => {
//     res.send('Register a user');
//   });;  // register a user

router.get('/users', (req, res) => {
    res.send('Get all users');
  });  // get all users

// router.get('/:id', (req,res) => {
//     res.send('Get a user by ID');
//   });  // get a user by ID

// router.put('/:id', (req, res) => {
//     res.send('Update user details');
//   });  // update user details

// router.delete('/:id', (req, res) => {
//     res.send('Delete a user');
// });  // delete a user


export default router