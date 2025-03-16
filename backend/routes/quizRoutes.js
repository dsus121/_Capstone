import express from 'express';

import { 
  getQuiz, 
  submitQuizResult, 
  getLatestQuizResult 
} from '../controllers/quizController.js';

const router = express.Router();

// Get the quiz
router.get('/', getQuiz);

// Submit quiz results (requires authentication)
router.post('/submit', submitQuizResult);

// Get latest quiz result for the user (requires authentication)
router.get('/results/latest', getLatestQuizResult);

export default router;