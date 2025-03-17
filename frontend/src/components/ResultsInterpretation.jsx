import { Card } from 'react-bootstrap';

const ResultsInterpretation = () => {
  return (
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
  );
};

export default ResultsInterpretation