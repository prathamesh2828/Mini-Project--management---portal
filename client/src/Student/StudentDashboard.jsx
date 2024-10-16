import React from "react";
// import Navbar from "./pages/Navbar"; // Adjust path as necessary
import Navbar from "../pages/Navbar";
import Sidebar from "../Student/Sidebar"; // Adjust path as necessary
import '../Student/StudentDashboard.css'; // Optional for additional styles

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
