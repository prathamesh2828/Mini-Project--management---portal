import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GreetUser = () => {
  const [visible, setVisible] = useState(true); // To manage the visibility of the component
  const [projectName, setProjectName] = useState(""); // To store the project name
  const navigate = useNavigate();

  // Fetch the user's project name
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage
        if (!storedUser) {
          console.error("No user data found.");
          return;
        }

        const response = await fetch("http://localhost:3001/api/getUserProfile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: storedUser._id, role: storedUser.role }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === "Success" && storedUser.role === "student") {
          setProjectName(data.user.prj_name || "Welcome!"); // Default message if no project name
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (err) {
        console.error("Error fetching project name:", err.message);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = () => {
    setVisible(false); // Start the animation to hide
    setTimeout(() => navigate("/tasks-assigned"), 500); // Redirect after the animation ends (500ms)
  };

  return (
    <div className={`p-6 transition-opacity duration-500 ${!visible ? "opacity-0" : "opacity-100"}`}>
      <div className="p-8 py-12 bg-gray-500 dark:text-gray-50 rounded-lg shadow-lg">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-6xl tracking-tighter font-bold">
              {projectName} <br className="sm:hidden" />
            </h2>
            <button
              onClick={handleClick}
              className="px-8 py-4 mt-4 lg:mt-0 text-lg font-bold rounded-md border block bg-gray-900 text-gray-50 border-gray-600 transition duration-300 hover:bg-gray-700 hover:border-transparent"
            >
              See Assigned Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetUser;