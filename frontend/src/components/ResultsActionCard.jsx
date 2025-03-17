import { Card, Button } from 'react-bootstrap';

const ResultsActionCard = ({ isLoggedIn, onSignUp }) => {
  // only show content and signup button if user is not logged in
  if (isLoggedIn) {
    return null; // don't render this component at all for logged-in users
  }

  return (
    <Card className="shadow mb-4">
      <Card.Body>
        <Card.Title>Ready to Take Action?</Card.Title>
        <Card.Text>
          Explore charitable organizations that align with your values and transform your awareness into meaningful change.
        </Card.Text>
        <div className="text-center mt-3">
          <Button variant="primary" onClick={onSignUp} className="me-2">
            Sign Up Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ResultsActionCard