import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // State for role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Updated to match the backend route and include the role
      const response = await axios.post("http://localhost:3001/auth/login", { email, password, role });

      console.log(response); // For debugging purposes

      if (response.data.status === "Success") {
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data in localStorage
        navigate(response.data.dashboard); // Redirect based on the role
      } else {
        alert(response.data.message); // Show error message from backend
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              name="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="role" className="block text-gray-600">Login as</label>
            <select
              name="role"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
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
            Login
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>

        <div className="flex justify-center space-x-4">
          <button aria-label="Log in with Google" className="p-3 rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
          <button aria-label="Log in with Twitter" className="p-3 rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
            </svg>
          </button>
          <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.598 0.111 2.52 1.636 2.52 1.636 2.903 4.963 7.599 3.535 9.469 2.557 0.289-2.102 1.164-3.535 2.117-4.227 0.953-0.682 2.548-0.937 4.434-0.977 0.101-0.328 0.184-0.698 0.276-1.05-1.804-0.081-3.404-0.971-4.016-2.146-0.688-1.021-0.777-2.085-0.383-3.12 0.167-0.355 0.732-0.53 1.057-0.487 1.089 0.084 2.18 0.303 3.303 0.688 0.334-1.01 1.392-1.763 2.53-2.118 1.674-0.523 3.616 0.171 4.136 1.847 0.721 1.424 0.222 3.346-1.206 4.061-0.318 0.234-0.655 0.358-1.028 0.358z"></path>
            </svg>
          </button>
        </div>
        <p className="text-xs text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-violet-600 hover:text-violet-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
