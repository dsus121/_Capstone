import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDashboard";
import "./styles/App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userdashboard"
        element={isLoggedIn ? <UserDashboard /> : <Navigate to="/signin" />}
/>        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
