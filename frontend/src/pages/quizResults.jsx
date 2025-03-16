import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizResults = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Retrieve the quiz score from localStorage
    const storedScore = parseInt(localStorage.getItem("quizScore"), 10) || 0;
    setScore(storedScore);
  }, []);

  const getExplanation = () => {
    if (score <= 4) {
      return "You feel minimal guilt. Consider small steps to make a positive impact!";
    } else if (score <= 8) {
      return "You feel moderate guilt. Let's explore ways to channel that into meaningful actions.";
    } else {
      return "You feel significant guilt. Don't worry, we can help you make a big difference!";
    }
  };

  return (
    <div className="container mt-5">
      <h1>Quiz Results</h1>
      <div className="alert alert-info mt-4">
        <h4>Your Quiz Score: {score}</h4>
        <p>{getExplanation()}</p>
      </div>
      <div className="mt-4">
        <p>Ready to take action? Explore charitable organizations that align with your values.</p>
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("/signup")}
        >
          Sign Up Now
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/quiz")}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResults;