import express from 'express'

import { 
  getQuiz, 
  submitQuizResult, 
  getLatestQuizResult 
} from '../controllers/quizController.js';

const router = express.Router();

// get the quiz
router.get('/', getQuiz);

// submit quiz results 
router.post('/submit', submitQuizResult);

// get latest quiz result for the user 
router.get('/results/latest', getLatestQuizResult);

export default router