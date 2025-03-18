import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import JarSelection from '../components/JarSelection';


const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasQuizResults, setHasQuizResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simple check if user is logged in - modify based on how you track login state
        const isLoggedIn = localStorage.getItem('user') || sessionStorage.getItem('user');
        
        if (!isLoggedIn) {
          navigate('/login');
          return;
        }

        // If you store user data in localStorage, parse it
        try {
          const userData = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
          setUserData(userData);
        } catch (e) {
          console.error("Error parsing user data", e);
        }
        
        // Check if user has taken the quiz before
        // This could be a simple localStorage flag or from your backend
        const hasCompletedQuiz = localStorage.getItem('quizCompleted') === 'true';
        setHasQuizResults(hasCompletedQuiz);
        
        setLoading(false);
      } catch (err) {
        setError("Error loading dashboard");
        setLoading(false);
        console.error(err);
      }
    };

    fetchUserData();
  }, [navigate]);

  
  const handleViewResults = () => {
    navigate('/quiz-results');
  };

  const handleTakeQuiz = () => {
    navigate('/quiz');
  };

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading dashboard...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          {error}. Please try again or contact support.
        </Alert>
      </Container>
    );
  }

  console.log("Quiz results status:", hasQuizResults);

  
  return (
    <Container className="my-5">
      <h1 className="mb-4">Welcome, {userData?.email || 'User'}!</h1>
      
      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <Card className="shadow h-100">
            <Card.Body>
              <Card.Title>Guilt Assessment Quiz</Card.Title>
              <Card.Text>
                {hasQuizResults 
                  ? "You've completed the guilt assessment quiz. View your results or take it again to see if your perspective has changed."
                  : "Take our guilt assessment quiz to understand your relationship with guilt and get personalized insights."}
              </Card.Text>
              <div className="d-flex gap-2">
                {hasQuizResults && (
                  <Button variant="primary" onClick={handleViewResults}>
                    View Results
                  </Button>
                )}
                <Button 
                  variant={hasQuizResults ? "outline-primary" : "primary"} 
                  onClick={handleTakeQuiz}
                >
                  {hasQuizResults ? "Take Quiz Again" : "Take Quiz"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-3">
          <Card className="shadow h-100">
            <Card.Body>
              <Card.Title>Recommended Organizations</Card.Title>
              <Card.Text>
                Based on your profile and quiz results, we recommend these organizations that align with your values.
              </Card.Text>
              <Button variant="outline-primary">
                View Recommendations
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <JarSelection />
      <div>
        <p></p>

        <p>{`* add functionality to ignore the quiz ... a toggle?`}</p>
        <p>{`Display cookie jar, cause cookies.
            Display instructions on how to donate to causes.

            Add drag and drop functionality to move cookies to the cookie jar.
            Add functionality to remove cookies from the cookie jar.

            Add functionality to connect to a payment processor.
            Add functionality to donate to causes.`}</p>

        <p>{`STATS
            Display the causes they have donated to. 
            Display the total amount of donations by the user for each cause.
            Display the total amount of donations by the user.
            Display the total amount of donations so far to CJK.`}
        </p>
      </div>
      
</Container>
    );
  };
  
  export default UserDashboard