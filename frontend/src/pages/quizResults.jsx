import React, { useEffect, useState } from "react";
import { Container, Card, Alert, Button, ProgressBar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ResultsInterpretation from "../components/ResultsInterpretation";
import ResultsActionCard from "../components/ResultsActionCard";

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

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
        fetchResults();
      }
    }
  }, [location.state]);

  const fetchResults = async () => {
    try {
      const response = await fetch(
        "http://localhost:5013/api/quiz/results/latest"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await response.json();
      setQuizResult(data);
      setLoading(false);
    } catch (err) {
      setError("Unable to load quiz results.");
      setLoading(false);
      console.error(err);
    }
  };

  // change the scoring back after testing
  const getScoreInterpretation = (score) => {
    if (score <= 2) {
      return "Low guilt level - You feel minimal guilt. Consider small steps to make a positive impact!";
    } else if (score <= 5) {
      return "Moderate guilt level - Let's explore ways to channel that into meaningful actions.";
    } else if (score <= 8) {
      return "Significant guilt level - Don't worry, we can help you make a big difference!";
    } else {
      return "High guilt level - Your concern shows you care deeply. Let's transform that into positive change.";
    }
  };

  const handleRetakeQuiz = () => {
    navigate("/quiz");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleSignUp = () => {
    navigate("/signup");
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
          <Button variant="primary" onClick={handleRetakeQuiz}>
            Take Quiz Again
          </Button>
        </div>
      </Container>
    );
  }

  if (!quizResult) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No quiz results found.</Alert>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleRetakeQuiz}>
            Take Quiz
          </Button>
        </div>
      </Container>
    );
  }

  const score = quizResult.totalScore;
  const maxScore = 9; // change this back after testing

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
            style={{ height: "2rem" }}
          />
        </Card.Body>
      </Card>

      {/* using the recently extracted component */}
      <ResultsInterpretation />

      {/* conditionally render action card per login status */}
      <ResultsActionCard isLoggedIn={isLoggedIn} onSignUp={handleSignUp} />

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
