import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="home">
      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default Home;