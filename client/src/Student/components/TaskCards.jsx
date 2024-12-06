import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTasks, FaClipboardList, FaSpinner, FaCheckCircle } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const TaskCards = () => {
  const [taskStats, setTaskStats] = useState(null); // Ensure initial state is null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/kanbans/stats");
        setTaskStats(response.data);
      } catch (err) {
        setError("Error fetching task stats");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskStats();
  }, []);

  // If loading or error, return early
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // If taskStats is null or undefined, return an error or fallback UI
  if (!taskStats) return <div>No task stats available</div>;

  const taskData = [
    {
      title: "Total Tasks",
      count: taskStats.total,
      icon: <FaTasks className="w-10 h-10 text-white" />,
      bgColor: "bg-gradient-to-r from-gray-700 to-gray-800",
    },
    {
      title: "To-Do List",
      count: taskStats.toDo,
      icon: <FaClipboardList className="w-10 h-10 text-white" />,
      bgColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    },
    {
      title: "Tasks In Progress",
      count: taskStats.inProgress,
      icon: <FaSpinner className="w-10 h-10 text-white animate-spin" />,
      bgColor: "bg-gradient-to-r from-blue-400 to-blue-600",
    },
    {
      title: "Tasks Completed",
      count: taskStats.completed,
      icon: <FaCheckCircle className="w-10 h-10 text-white" />,
      bgColor: "bg-gradient-to-r from-green-400 to-green-600",
    },
  ];

  const handleViewDetails = () => {
    navigate("/manage-project"); // Navigate to the ManageProject page
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {taskData.map((task, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ${task.bgColor} transform hover:scale-105`}
        >
          <div className="mb-4">
            {task.icon}
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-white">{task.title}</h3>
          <p className="text-4xl font-bold text-white">{task.count}</p>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-white text-gray-700 font-bold rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={handleViewDetails} // Add onClick handler
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCards;
