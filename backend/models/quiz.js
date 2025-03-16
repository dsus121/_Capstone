import mongoose from "mongoose"

// Quiz Question Schema
const QuizQuestionSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true },
  keyword: { type: String, required: true },
  question: { type: String, required: true },
  optionA: { type: String, required: true },
  scoreOptionA: { type: Number, required: true },
  optionB: { type: String, required: true },
  scoreOptionB: { type: Number, required: true },
  optionC: { type: String, required: true },
  scoreOptionC: { type: Number, required: true }
});

// Quiz Schema
const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [QuizQuestionSchema],
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

// User Answer Schema
const UserAnswerSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true },
  keyword: { type: String, required: true },
  selectedOption: { type: String, enum: ['A', 'B', 'C'], required: true },
  scoreEarned: { type: Number, required: true }
});

// Quiz Result Schema
const QuizResultSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // If you have a User model
    required: true 
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  answers: [UserAnswerSchema],
  totalScore: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now }
});

// Create models from schemas
const Quiz = mongoose.model('Quiz', QuizSchema);
const QuizResult = mongoose.model('QuizResult', QuizResultSchema);

// Export both models
export const Quiz = Quiz;
export const QuizResult = QuizResult;
