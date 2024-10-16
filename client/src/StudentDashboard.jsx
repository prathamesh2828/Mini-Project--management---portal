import React from "react";
import Navbar from "./Navbar"; // Import the Navbar component

function StudentDashboard() {
  return (
    <div>
      <Navbar /> {/* Include the Navbar at the top */}
      
      {/* Dashboard content here */}
      <div className="container mt-4">
        <h1>Welcome to the Student Dashboard</h1>
        {/* Add the rest of your dashboard content here */}
      </div>
    </div>
  );
}

export default StudentDashboard;
