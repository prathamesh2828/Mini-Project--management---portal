// StudentDashboard.jsx
import React from "react";
import Navbar from "../pages/Navbar";
import Sidebar from "../Student/Sidebar";
import TaskCards from "./components/TaskCards";
// Adjust path as necessary
import GreetUser from "../Student/components/GreetUser"
import PriorityChart from "./components/PriorityChart";

import '../Student/StudentDashboard.css'; // Optional for additional styles



const StudentDashboard = () => {
  return (
    <div>
    <Navbar />
    <Sidebar />
    <div className="main-content">
      <GreetUser />
      <TaskCards />
      <PriorityChart /> 
    </div>
  </div>
  );
};

export default StudentDashboard;
