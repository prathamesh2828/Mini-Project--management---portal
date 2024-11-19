import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to register
      const response = await axios.post("http://localhost:3001/auth/register", { name, email, password, role });

      if (response.data.status === "Success") {
        alert("Registration successful! Please log in.");
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        alert(response.data.message); // Show error message from the backend
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Check for detailed error message
      if (error.response) {
        console.error("Error Response:", error.response.data);
        alert(`An error occurred: ${error.response.data.message}`);
      } else {
        alert("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="role" className="block text-gray-600">Register as</label>
            <select
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              name="role"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="guide">Guide</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button
            type="submit"
            className="block w-full p-3 text-center rounded-md bg-violet-600 text-gray-50 hover:bg-violet-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">Already have an account?</p>
        <Link
          to="/login"
          className="block mt-2 text-center border border-gray-300 bg-gray-100 text-gray-700 rounded py-2 hover:bg-gray-200 transition duration-200"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
