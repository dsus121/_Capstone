import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/connectDB.js'
import quizRoutes from './routes/quizRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8080 // Use the PORT variable from .env

// consistently use the correct variable name for the port ... use 'port'

app.use(express.json())
app.use(cors()) // middleware for handling cross-origin requests

// the /api prefix typically signifies a logical grouping of routes that 
// belong to a specific section of your API (in this case, user-related 
// routes), which is why it’s a common practice to use '/api' as a base 
// route in RESTful APIs.
app.use('/api/users', userRoutes);  // user routes under the "/api" path
app.use('/api/quiz', quizRoutes); // user quiz

app.use('/api/products', productRoutes);  // product routes 




// testing the server   
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// handle undefined routes
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
  });

// start the server
app.listen(port, () => {
    console.log(`Server is reciprocating on port ${port}`);
    connectDB()
});