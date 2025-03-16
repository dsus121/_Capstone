import React, { useEffect, useState } from 'react';
import { Container, Card, Alert, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if results were passed via navigation state
    if (location.state && location.state.quizResult) {
      setQuizResult(location.state.quizResult);
      setLoading(false);
    } else {
      // If no results in state, try to fetch the latest result
      const fetchResults = async () => {
        try {
          const response = await fetch('http://localhost:5013/api/quiz/results/latest');
          
          if (!response.ok) {
            throw new Error('Failed to fetch results');
          }
          
          const data = await response.json();
          setQuizResult(data);
          setLoading(false);
        } catch (err) {
          setError('Unable to load quiz results. Please try again.');
          setLoading(false);
          console.error(err);
        }
      };
      
      fetchResults();
      
    }
  }, [location.state]);

  const getScoreInterpretation = (score) => {
    // This is a placeholder - customize based on your scoring system
    if (score > 20) {
      return "High guilt level";
    } else if (score > 10) {
      return "Moderate guilt level";
    } else {
      return "Low guilt level";
    }
  };

  const handleRetakeQuiz = () => {
    navigate('/quiz');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading results...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleRetakeQuiz}>Take Quiz Again</Button>
        </div>
      </Container>
    );
  }

  if (!quizResult) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No quiz results found.</Alert>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleRetakeQuiz}>Take Quiz</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Quiz Results</h1>
      
      <Card className="shadow mb-4">
        <Card.Body className="text-center">
          <h2 className="display-4 mb-3">{quizResult.totalScore} points</h2>
          <h3 className="mb-4">{getScoreInterpretation(quizResult.totalScore)}</h3>
          
          <div className="progress mb-4" style={{ height: '2rem' }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${(quizResult.totalScore / 30) * 100}%` }} 
              aria-valuenow={quizResult.totalScore} 
              aria-valuemin="0" 
              aria-valuemax="30"
            >
              {quizResult.totalScore}/30
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="shadow mb-4">
        <Card.Body>
          <Card.Title>Understanding Your Results</Card.Title>
          <Card.Text className="mb-3">
            The total score reflects the guilt level; higher scores suggest more guilt. Your responses 
            to the various scenarios presented in the quiz help identify patterns in how you process and 
            experience guilt in different situations.
          </Card.Text>
          <Card.Text className="mb-3">
            Guilt is a complex emotion that can be both constructive and destructive. Constructive guilt 
            helps us recognize when we've violated our own moral code and motivates positive change. 
            Destructive guilt, however, may lead to excessive self-blame and rumination without productive outcomes.
          </Card.Text>
          <Card.Text>
            Remember that this quiz is meant to provide insight rather than a clinical assessment. If you're 
            concerned about how guilt is affecting your life, consider speaking with a mental health professional 
            who can provide personalized guidance.
          </Card.Text>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button variant="outline-secondary" onClick={handleGoHome}>
          Return Home
        </Button>
        <Button variant="primary" onClick={handleRetakeQuiz}>
          Take Quiz Again
        </Button>
      </div>
    </Container>
  );
};

export default QuizResults;