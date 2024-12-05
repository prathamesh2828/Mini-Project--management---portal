import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./Navbar.css"; // Create a separate CSS file for Navbar styles

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after logout
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Handle search logic
  };

  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/student-dashboard">
          <img
            src="https://w7.pngwing.com/pngs/996/190/png-transparent-deogiri-institute-of-engineering-and-management-studies-logo-brand-associate-professor-arogya-yoga-school-200-hour-yoga-teacher-training-blue-text-logo.png"
            alt="Logo"
            width="90"
            height="40"
            className="d-inline-block align-text-top"
          />
          Mini Project Portal
        </Link>

        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        


{/* inbox */}
        <button type="button" class=" btn btn-light position-relative">
                 <i class="bi bi-bell-fill"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            9+
            <span class="visually-hidden">unread messages</span>
            </span>
          </button>


{/* profile drope down */}
        <DropdownButton
          align="end"
          title={
            <div className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </div>
          }
          id="dropdown-menu-align-right"
          drop="down"
        >
          <Dropdown.Item as={Link} to="/profile">
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
        </DropdownButton>
      </div>
    </nav>
  );
};

export default Navbar;