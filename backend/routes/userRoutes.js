import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router(); // new instance

// define routes

// register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    //  find the user by email
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // check validity
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // successful login
    res.status(200).json({
      message: 'Login successful',
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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