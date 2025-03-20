import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // track login status

  useEffect(() => {
    // check if the user is logged in and persist the state
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  }, []); // runs ONCE when the component mounts

  const navigateToSignUp = () => {
    navigate("/signup", { state: { from: "home" } });
  };

  return (
    <div className="container mt-5">
      <h1>What is it?</h1>
      <p>
        Cookie Jar Karma is a micro-donation platform designed to allow
        individuals to make small contributions to charitable causes, aiming to
        help them alleviate guilt from everyday actions.
      </p>
      <h1>How does it work?</h1>
      <p>
        Set up your cookie jar, fund it with small amounts of money, and donate
        to causes related to your personal guilt triggers.
      </p>
      <h1>Why use it?</h1>
      <p>
        Because in today's society, we don't have many mechanisms to alleviate
        personal guilt. Through small acts of kindness, Cookie Jar Karma
        promotes a cycle of positive behavior, giving, and emotional wellness.
      </p>

      {/* conditionally render the button */}
      {!isLoggedIn && (
        <button className="btn btn-primary" onClick={navigateToSignUp}>
          Let's get this thing going!
        </button>
      )}
    </div>
  );
};

export default Home
