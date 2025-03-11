import express from 'express';

const router = express.Router(); // new instance of express router

// define routes
router.get('/', (req, res) => {
    res.send('Get all products');
  });  // get all products  

//   router.get('/:id', (req,res) => {
//     res.send('Get a product by ID');
//   });  // get a product by ID


export default router