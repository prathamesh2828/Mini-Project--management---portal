import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      

      <ul className="sidebar-list">
      <li>
      <Link to="/student-dashboard" className="sidebar-item">
            <i className=" bi bi-list-task"></i> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/tasks-assigned" className="sidebar-item">Task Assigned</Link>
        </li>
        <li>
          <Link to="/to-do" className="sidebar-item">To Do</Link>
        </li>
        <li>
          <Link to="/in-progress" className="sidebar-item">In Progress</Link>
        </li>
        <li>
          <Link to="/completed" className="sidebar-item">Completed</Link>
        </li>
        <li>
          <Link to="/team" className="sidebar-item">Team</Link>
        </li>
        <li>
          <Link to="/messages" className="sidebar-item">Message</Link>
        </li>
        <li>
          <Link to="/trash" className="sidebar-item">Trash</Link>
        </li>
      </ul>

      <div className="sidebar-settings">
        <Link to="/settings" className="sidebar-item">Settings</Link>
      </div>
    </div>
  );
};

export default Sidebar;
