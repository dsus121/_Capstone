import mongoose from 'mongoose'
import { QuizModel } from '../models/quiz.js'
import csv from 'csv-parser'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });
const results = [];

console.log('MONGO_URI:', process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // create promise to read CSV data
    const csvReadPromise = new Promise((resolve) => {
      fs.createReadStream('../../data/quiz_questions.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve();
        });
    });
    
    // wait for CSV parsing to finish
    await csvReadPromise;
    
    // transform CSV data to match schema
    const questions = results.map(row => ({
      questionNumber: parseInt(row['#']),
      keyword: row['Keyword'],
      question: row['Question'],
      optionA: row['Option A'],
      scoreOptionA: parseInt(row['Score - Option A']),
      optionB: row['Option B'],
      scoreOptionB: parseInt(row['Score - Option B']),
      optionC: row['Option C'],
      scoreOptionC: parseInt(row['Score - Option C'])
    }));
    
    // create quiz object
    const quizData = {
      title: "Guilt Assessment Quiz",
      description: "Answer these questions to assess your guilt responses",
      questions,
      isActive: true
    };
    
    // clear existing quizzes
    await QuizModel.deleteMany();
    
    // insert new quiz
    await QuizModel.create(quizData);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData()