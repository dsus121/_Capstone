import React, { useEffect, useState } from 'react';
import { Container, Card, Alert, Button, ProgressBar } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // check if results were passed via navigation state
    if (location.state && location.state.quizResult) {
      setQuizResult(location.state.quizResult);
      setLoading(false);
    } else {
      // then try to get from localStorage
      const storedScore = parseInt(localStorage.getItem("quizScore"), 10);
      if (!isNaN(storedScore)) {
        setQuizResult({ totalScore: storedScore });
        setLoading(false);
      } else {
        // finally try to fetch from API if neither of the above worked
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
    }
  }, [location.state]);

  // change the scoring back after testing
  const getScoreInterpretation = (score) => {
    if (score <= 2) {
      return "Low guilt level - You feel minimal guilt. Consider small steps to make a positive impact!";
    } else if (score <=5) {
      return "Moderate guilt level - Let's explore ways to channel that into meaningful actions.";
    } else if (score <= 8) {
      return "Significant guilt level - Don't worry, we can help you make a big difference!";
    } else {
      return "High guilt level - Your concern shows you care deeply. Let's transform that into positive change.";
    }
  };

  const handleRetakeQuiz = () => {
    navigate('/quiz');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/signup');
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

  const score = quizResult.totalScore;
  const maxScore = 30; // Assuming maximum score is 30

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Quiz Results</h1>
      
      <Card className="shadow mb-4">
        <Card.Body className="text-center">
          <h2 className="display-4 mb-3">{score} points</h2>
          <h3 className="mb-4">{getScoreInterpretation(score)}</h3>
          
          <ProgressBar 
            now={(score / maxScore) * 100} 
            label={`${score}/${maxScore}`} 
            className="mb-4" 
            style={{ height: '2rem' }} 
          />
        </Card.Body>
      </Card>

      <Card className="shadow mb-4">
        <Card.Body>
          <Card.Title>Understanding Your Results</Card.Title>
          <Card.Text className="mb-3">
            The total score reflects your guilt level; higher scores suggest more guilt. Your responses 
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

      <Card className="shadow mb-4">
        <Card.Body>
          <Card.Title>Ready to Take Action?</Card.Title>
          <Card.Text>
            Explore charitable organizations that align with your values and transform your awareness into meaningful change.
          </Card.Text>
          <div className="text-center mt-3">
            <Button variant="primary" onClick={handleSignUp} className="me-2">
              Sign Up Now
            </Button>
          </div>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button variant="outline-secondary" onClick={handleGoHome}>
          Return Home
        </Button>
        <Button variant="outline-primary" onClick={handleRetakeQuiz}>
          Take Quiz Again
        </Button>
      </div>
    </Container>
  );
};

export default QuizResults;