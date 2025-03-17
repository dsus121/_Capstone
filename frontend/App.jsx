import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import QuizResults from './components/quizResults';

const App = () => {
  const isAuthenticated = true; // Replace with actual authentication logic
  const token = 'your-newly-generated-token'; // Replace with actual token logic

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} token={token}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-results"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} token={token}>
              <QuizResults />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
