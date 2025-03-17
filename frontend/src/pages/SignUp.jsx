import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SignUp = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  useEffect(() => {
    // check if the quiz has been taken
    const quizCompleted = localStorage.getItem('quizCompleted') === 'true';

    // check if the non-user came from home
    const comingFromHome = location.state?.from === 'home';

    // if came from home, treat as new non-user
    if (comingFromHome) {
      setHasCompletedQuiz(false);
    } else {
    setHasCompletedQuiz(quizCompleted);
  }
  
    // de🪲 info
    console.log('Coming from home:', comingFromHome);
    console.log('Quiz completed flag:', quizCompleted);
    console.log('Set hasCompletedQuiz to:', comingFromHome ? false : quizCompleted);
    
  }, [location]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5013/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign-up successful:', data);

        // update login state and navigate to the dashboard
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user)); // save user data
        navigate("/userdashboard");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Failed to sign up.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };



  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4">Sign Up</h1>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              
              {!hasCompletedQuiz && (
                <div className="alert alert-secondary mb-4">
                  <p className="mb-2">Want to see what we're about first?</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/quiz")}
                  >
                    Take the Quiz
                  </button>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
              </form>
              
              <div className="mt-4 text-center">
                <p>Already have an account? <a href="/signin">Log in</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
