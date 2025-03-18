import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5013/api/quiz');

        if (!response.ok) {
            throw new Error('Failed to fetch quiz');
        }

        const data = await response.json();
        setQuiz(data);
        // initialize selectedAnswers array with null values for each question
        setSelectedAnswers(new Array(data.questions.length).fill(null));
        setLoading(false);
      } catch (err) {
        setError('Failed to load quiz data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchQuiz();
  }, []);

  // handle option selection
  const handleOptionSelect = (option) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newSelectedAnswers);
  };

  // handle navigation between questions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

// submit quiz
const handleSubmit = async () => {
    try {
      // calculate scores based on selected options
      const answers = quiz.questions.map((question, index) => {
        let scoreEarned = 0;
        if (selectedAnswers[index] === 'A') {
          scoreEarned = question.scoreOptionA;
        } else if (selectedAnswers[index] === 'B') {
          scoreEarned = question.scoreOptionB;
        } else if (selectedAnswers[index] === 'C') {
          scoreEarned = question.scoreOptionC;
        }

        return {
          questionNumber: question.questionNumber,
          keyword: question.keyword,
          selectedOption: selectedAnswers[index],
          scoreEarned
        };
      });

      // calculate total score
      const totalScore = answers.reduce((sum, answer) => sum + answer.scoreEarned, 0);

      // prepare result object
      const quizResult = {
        quizId: quiz._id || quiz.id,
        answers,
        totalScore,
        completedAt: new Date()
      };

      // console.log('Submitting quiz result:', quizResult); 
      
      // submit to backend 
      const response = await fetch('http://localhost:5013/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizResult),
      });

    // get the full response text for de🪲-ing (oh ho this is handy)
    const responseText = await response.text();
    console.log('Response status:', response.status);
    // console.log('Response text:', responseText);

    if (!response.ok) {
      throw new Error(`Failed to submit quiz: ${response.status} ${responseText}`);
    }

// parse the response as JSON (if it is JSON)
let result;
try {
  result = JSON.parse(responseText);
} catch (e) {
  console.warn('Response was not valid JSON:', e);
  // continue with the flow even if response isn't JSON
}

// navigate to results page with data
navigate('/quiz-results', { 
  state: { quizResult }
});
} catch (err) {
setError(`Failed to submit quiz: ${err.message}`);
console.error('Error submitting quiz:', err);
}
};
  

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading quiz...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container className="mt-5">
        <div className="alert alert-warning" role="alert">
          No quiz available.
        </div>
      </Container>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">{quiz.title}</h1>
      {quiz.description && <p className="text-center mb-4">{quiz.description}</p>}
      
      <div className="mb-4">
        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
        <div className="text-end mt-1">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">
            <span className="badge bg-primary me-2">#{currentQuestion.questionNumber}</span>
            {currentQuestion.question}
          </Card.Title>
          
          <Card.Subtitle className="mb-3 text-muted">
            Keyword: {currentQuestion.keyword}
          </Card.Subtitle>
          
          <Form>
            <Form.Group className="mb-3">
              <div className="d-flex flex-column gap-3">
                <Form.Check
                  type="radio"
                  id="option-a"
                  name="quizOption"
                  label={currentQuestion.optionA}
                  checked={selectedAnswers[currentQuestionIndex] === 'A'}
                  onChange={() => handleOptionSelect('A')}
                  className="p-2 border rounded"
                />
                <Form.Check
                  type="radio"
                  id="option-b"
                  name="quizOption"
                  label={currentQuestion.optionB}
                  checked={selectedAnswers[currentQuestionIndex] === 'B'}
                  onChange={() => handleOptionSelect('B')}
                  className="p-2 border rounded"
                />
                <Form.Check
                  type="radio"
                  id="option-c"
                  name="quizOption"
                  label={currentQuestion.optionC}
                  checked={selectedAnswers[currentQuestionIndex] === 'C'}
                  onChange={() => handleOptionSelect('C')}
                  className="p-2 border rounded"
                />
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between mt-4">
        <Button 
          variant="outline-secondary" 
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <Button 
            variant="primary" 
            onClick={goToNextQuestion}
            disabled={selectedAnswers[currentQuestionIndex] === null}
          >
            Next
          </Button>
        ) : (
          <Button 
            variant="warning" 
            onClick={handleSubmit}
            disabled={selectedAnswers.includes(null)}
          >
            Submit Quiz
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Quiz;