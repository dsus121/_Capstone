import mongoose from "mongoose"

// quiz question Schema
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

// quiz Schema
const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [QuizQuestionSchema],
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

// user answer Schema
const UserAnswerSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true },
  keyword: { type: String, required: true },
  selectedOption: { type: String, enum: ['A', 'B', 'C'], required: true },
  scoreEarned: { type: Number, required: true }
});

// quiz result Schema
const QuizResultSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  
    required: false 
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

// models from Schemas
export const Quiz = mongoose.model('Quiz', QuizSchema);
export const QuizResult = mongoose.model('QuizResult', QuizResultSchema);

// named exports for both models
export const QuizModel = Quiz;
export const QuizResultModel = QuizResult;

