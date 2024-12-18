import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link from react-router-dom
import "../Student/Sidebar"; // Assuming the same CSS as used for Student Sidebar

const GuideSidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li>
          <Link to="/guide-dashboard" className="sidebar-item">
            <i className="bi bi-house"></i> Dashboard
          </Link>
        </li>
        {/* <li>
          <Link to="/assign-tasks" className="sidebar-item">
            <i className="bi bi-check-circle"></i> Assign Tasks
          </Link>
        </li>
        <li>
          <Link to="/manage-tasks" className="sidebar-item">
            <i className="bi bi-list-check"></i> Manage Tasks
          </Link>
        </li> */}
        <li>
          <Link to="/addtasks" className="sidebar-item">
            <i className="bi bi-people"></i> Add Tasks
          </Link>
        </li>
        <li>
          <Link to="/messages" className="sidebar-item">
            <i className="bi bi-chat-dots"></i> Messages
          </Link>
        </li>
     
      </ul>

     
    </div>
  );
};

export default GuideSidebar;