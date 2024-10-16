import React from "react";
import Navbar from "./Navbar"; // Adjust path as necessary
import Sidebar from "./Sidebar"; // Adjust path as necessary
import './StudentDashboard.css'; // Optional for additional styles

const StudentDashboard = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="main-content"> {/* Add this class for main content styling */}
        <h1>Welcome to the Student Dashboard</h1>
        {/* Your main dashboard content goes here */}
      </div>
    </div>
  );
};

export default StudentDashboard;
