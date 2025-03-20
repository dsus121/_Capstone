import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import connectDB from './config/connectDB.js'
import quizRoutes from './routes/quizRoutes.js'
import orgsRoutes from './routes/orgsRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8080 // Use the PORT variable from .env

// consistently use the correct variable name for the port ... use 'port'

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})); // middleware for handling cross-origin requests

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/organizations', orgsRoutes);
app.use('/api/products', productRoutes);

// testing the server   
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// app.get('/api/users', (req, res) => {
//     res.send('Hello from users!')
// });

// Serve frontend (fallback route)
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
  });

// start the server
app.listen(port, () => {
    console.log(`Server is reciprocating on port ${port}`);
    connectDB()
});