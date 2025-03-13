import { useNavigate } from "react-router-dom"
import { useState } from "react"

const SignIn = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value.trim(),
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5173/login", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

    const data = await response.json();
    if (response.ok) {
      console.log("Login success:", data);
      setIsLoggedIn(true);
      navigate('/userdashboard');
    } else {
      alert(data.message || 'Invalid email or password');
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again later.");
  }
};

  return (
    <div className="container mt-5">
      <h1>Sign In</h1>
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
        </div>test@testing.org
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
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn