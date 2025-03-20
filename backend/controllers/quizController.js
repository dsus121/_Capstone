import asyncHandler from 'express-async-handler' // trying to use this to condense try/catches
import { Quiz, QuizResult } from '../models/quiz.js'

// get quiz questions
// route = GET /api/quiz
const getQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findOne({ isActive: true });
  
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// submit quiz result
// route =  POST /api/quiz/submit
const submitQuizResult = asyncHandler(async (req, res) => {
  const { quizId, answers, totalScore } = req.body;
  
  const quizResult = await QuizResult.create({
    // user: req.user._id,
    quizId,
    answers,
    totalScore
  });
  
  if (quizResult) {
    res.status(201).json(quizResult);
  } else {
    res.status(400);
    throw new Error('Invalid quiz result data');
  }
});

// get user's latest quiz result
// route =   GET /api/quiz/results/latest
const getLatestQuizResult = asyncHandler(async (req, res) => {
  const latestResult = await QuizResult.findOne({ 
    // user: req.user._id 
  }).sort({ completedAt: -1 });
  
  if (latestResult) {
    res.json(latestResult);
  } else {
    res.status(404);
    throw new Error('No quiz results found');
  }
});

export {
  getQuiz,
  submitQuizResult,
  getLatestQuizResult
}