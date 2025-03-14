import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // retrieve user data from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
        navigate('/signup') // redirect the unauthorized user
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
      <div className="container mt-5">
      <h1>User Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p>
        <p>{`This is where the user can take a quiz to find out which causes will best 
            help alleviate their guilt. 
            Add functionality to ignore.`}</p>
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
    );
  };
  
  export default UserDashboard