import React, { useState, useEffect } from 'react';

function TaskAssigned() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched tasks:', data); // Log the full response
          
          // Ensure `tasks` exists and is an array
          if (data.tasks && Array.isArray(data.tasks)) {
            setTasks(data.tasks);
          } else {
            console.error('Invalid response format: tasks is not an array or missing');
          }
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchTasks();
  }, []);
  

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

    // Send status update to backend
    const task = tasks[index];
    const updateData = {
      status: 'Completed',
      completedDate: getCurrentDate(),
    };

    fetch(`http://localhost:3001/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
  
      // Remove task from the UI after deletion (optional)
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Your <span className="text-indigo-600">Assigned Tasks</span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task, index) => (
            <div
              key={task._id}
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
                    {task.status || 'Pending'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {task.taskName}
                </h3>
                <p className="text-gray-600 text-lg mb-6">{task.taskDetails}</p>
                <div className="text-gray-500 text-sm mb-4">
                  <span className="font-medium text-gray-700">Deadline: </span>
                  {task.deadline.substring(0, 10)}
                </div>

                {task.status === 'Completed' && task.completedDate && (
                  <div className="text-green-600 text-sm mb-4">
                    <span className="font-medium text-gray-700">Completed on: </span>
                    {task.completedDate}
                  </div>
                )}

                {task.status === 'Pending' && (
                  <>
                    <button
                      className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg w-full shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                      onClick={() => markAsCompleted(index)}
                    >
                      Mark as Completed
                    </button>

                    {/* File input for completed task */}
                    <input
                      type="file"
                      className="mt-4 w-full p-2 border rounded-md"
                      onChange={(e) => handleFileUpload(e, task._id)}
                    />
                  </>
                )}

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete Task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Handle file upload (when a task is marked as completed)
const handleFileUpload = async (event, taskId) => {
  const formData = new FormData();
  formData.append('file', event.target.files[0]);

  try {
    const response = await fetch(`http://localhost:3001/api/tasks/upload/${taskId}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      alert('File uploaded successfully!');
    } else {
      console.error('File upload failed');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

export default TaskAssigned;
