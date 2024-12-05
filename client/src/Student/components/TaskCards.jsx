import React from "react";
import { FaTasks, FaClipboardList, FaSpinner, FaCheckCircle } from "react-icons/fa"; // Importing icons

const TaskCards = () => {
  // Sample data for the task cards
  const taskData = [
    {
      title: "Total Tasks",
      count: 12,
      icon: <FaTasks className="w-10 h-10 text-white" />,
      bgColor: "bg-gradient-to-r from-gray-700 to-gray-800", // Gradient for total tasks
    },
    {
      title: "To-Do List",
      count: 5,
      icon: <FaClipboardList className="w-10 h-10 text-white" />,
      bgColor: "bg-gradient-to-r from-yellow-400 to-yellow-600", // Gradient for to-do list
    },
    {
      title: "Tasks In Progress",
      count: 3,
      icon: <FaSpinner className="w-10 h-10 text-white animate-spin" />,
      bgColor: "bg-gradient-to-r from-blue-400 to-blue-600", // Gradient for tasks in progress
    },
    {
      title: "Tasks Completed",
      count: 7,
      icon: <FaCheckCircle className="w-10 h-10 text-white" />,
      bgColor: "bg-gradient-to-r from-green-400 to-green-600", // Gradient for completed tasks
    },
  ];

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
            <button className="px-4 py-2 bg-white text-gray-700 font-bold rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCards;
