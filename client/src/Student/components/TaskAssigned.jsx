import React, { useState } from 'react';

function TaskAssigned() {
  const [tasks, setTasks] = useState([
    {
      taskName: 'Build the frontend UI',
      taskDetails: 'Create a user-friendly UI for the project dashboard with smooth navigation and polished visuals.',
      deadline: '2024-10-25',
      status: 'Pending',
      completedDate: null,
    },
    {
      taskName: 'Set up MongoDB',
      taskDetails: 'Configure the database schema and ensure all collections are properly indexed.',
      deadline: '2024-10-28',
      status: 'Pending',
      completedDate: null,
    },
    {
      taskName: 'Create API Endpoints',
      taskDetails: 'Develop the necessary API routes for secure data communication between frontend and backend.',
      deadline: '2024-11-01',
      status: 'Pending',
      completedDate: null,
    },
  ]);

  // Function to format the current date (YYYY-MM-DD)
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Mark task as completed and set the completion date
  const markAsCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, status: 'Completed', completedDate: getCurrentDate() };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Your <span className="text-indigo-600">Assigned Tasks</span>
      </h2>
      
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div className="p-6 relative">
                <div className="absolute top-4 right-4">
                  <span
                    className={`font-semibold px-4 py-2 rounded-full text-sm ${
                      task.status === 'Pending'
                        ? 'bg-yellow-400 text-yellow-900'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {task.taskName}
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  {task.taskDetails}
                </p>
                <div className="text-gray-500 text-sm mb-4">
                  <span className="font-medium text-gray-700">Deadline: </span>
                  {task.deadline}
                </div>

                {task.status === 'Completed' && task.completedDate && (
                  <div className="text-green-600 text-sm mb-4">
                    <span className="font-medium text-gray-700">Completed on: </span>
                    {task.completedDate}
                  </div>
                )}

                {task.status === 'Pending' && (
                  <button
                    className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg w-full shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                    onClick={() => markAsCompleted(index)}
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskAssigned;
