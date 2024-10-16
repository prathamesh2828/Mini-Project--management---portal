import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li>
          <Link to="/student-dashboard" className="sidebar-item">
            <i className="bi bi-house"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/tasks-assigned" className="sidebar-item">
            <i className="bi bi-check-circle"></i> Task Assigned
          </Link>
        </li>
        <li>
          <Link to="/ManageTask" className="sidebar-item">
            <i className="bi bi-list-check"></i> Manage Task
          </Link>
        </li>
        <li>
          <Link to="/team" className="sidebar-item">
            <i className="bi bi-people"></i> Team
          </Link>
        </li>
        <li>
          <Link to="/messages" className="sidebar-item">
            <i className="bi bi-chat-dots"></i> Message
          </Link>
        </li>
        <li>
          <Link to="/trash" className="sidebar-item">
            <i className="bi bi-trash"></i> Trash
          </Link>
        </li>
      </ul>

      <div className="sidebar-settings">
        <Link to="/settings" className="sidebar-item">
          <i className="bi bi-gear"></i> Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
