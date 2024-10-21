import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

const GreetUser = () => {
  const [visible, setVisible] = useState(true); // To manage the visibility of the component
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleClick = () => {
    setVisible(false); // Start the animation to hide
    setTimeout(() => navigate("/manage-project"), 500); // Redirect after the animation ends (500ms)
  };

  return (
    <div className={`p-6 transition-opacity duration-500 ${!visible ? 'opacity-0' : 'opacity-100'}`}>
      <div className="p-8 py-12 bg-gray-500 dark:text-gray-50 rounded-lg shadow-lg">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-6xl tracking-tighter font-bold">
              :) Hello There!! <br className="sm:hidden" />
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
