import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed

function AddTask({ isOpen, onClose, onAddTask }) {
  const [taskName, setTaskName] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddTask = async () => {
    if (taskName.trim() === '' || taskDetails.trim() === '' || deadline.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Create a task object
      const newTask = { taskName, taskDetails, deadline };

      // Send POST request to backend
      const response = await axios.post('/api/tasks', newTask); // Adjust the URL to match your backend route

      if (response.status === 201) {
        alert('Task added successfully!');
        onAddTask(response.data.task); // Pass the newly added task back to the parent component if needed
        // Clear input fields
        setTaskName('');
        setTaskDetails('');
        setDeadline('');
        onClose();
      } else {
        alert('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('There was an error adding the task.');
    }
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Assign a New Task</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Task Details</label>
          <textarea
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            placeholder="Enter task details"
            className="w-full p-2 border rounded-md"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
