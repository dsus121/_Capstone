import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container mt-5">
      <h1>Access Denied</h1>
      <p>You must be logged in to access this page.</p>
      <Link to="/signin" className="btn btn-primary">
        Go to Sign In
      </Link>
    </div>
  );
};

export default ErrorPage;