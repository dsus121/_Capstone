import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Quiz from "./pages/Quiz";
import QuizResults from './pages/quizResults';

import "./styles/App.css";
import "./styles/custom.scss"; // Bootstrap custom css 

// I find myself NOT commenting when in JSX, so I will comment here ...
// conditionally render the quiz and quiz results buttons based on the quizCompleted flag
// conditionally rendered the signin and signup buttons based on the isLoggedIn flag
// protected routes for user and admin dashboards
// navbar is also conditionally rendered based on the isLoggedIn flag

const App = () => {
  // check if this is the first load of the day
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('lastVisit');
  
  // if it's a new day or first visit ever, clear the quiz flag
  if (lastVisit !== today) {
    localStorage.setItem('quizCompleted', 'false');
    localStorage.setItem('lastVisit', today);
    console.log('New day detected - reset quiz completion flag');
  }
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}> 
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz-results" element={<QuizResults />} />
      </Routes>
    </Router>
  );
};

export default App;
