import express from 'express';

const router = express.Router(); // new instance of express router

// define routes
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

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