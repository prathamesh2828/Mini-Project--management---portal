  import React, { useState } from 'react';
  import Navbar from '../../pages/Navbar';
  import GuideSidebar from '../GuideSidebar';

  function AddTasks() {
    // State to hold task details and selected team
    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [deadline, setDeadline] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    // Sample team data for the dropdown (replace with actual team data from API)
    const teams = [
      { id: '64c9a70bf5b6c2a5d12a8e8f', name: 'Team Alpha' },
      { id: '64c9a71bf5b6c2a5d12a8e90', name: 'Team Beta' },
      { id: '64c9a72bf5b6c2a5d12a8e91', name: 'Team Gamma' },
    ];

    // Function to submit the form data
    const handleSubmit = async () => {
      if (!taskName || !taskDetails || !deadline || !selectedTeam) {
        alert('Please fill in all fields.');
        return;
      }
    
      // Use prj_id instead of teamId to match the backend
      const taskData = { 
        taskName, 
        taskDetails, 
        deadline, 
        prj_id: selectedTeam // Use prj_id here
      };
    
      try {
        console.log('Sending task data:', taskData); // Debugging log
        const response = await fetch('http://localhost:3001/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
    
        if (response.ok) {
          const data = await response.json();
          alert(`Task "${data.task.taskName}" added successfully!`);
          setTaskName('');
          setTaskDetails('');
          setDeadline('');
          setSelectedTeam('');
        } else {
          const errorData = await response.json();
          console.error('Backend returned an error:', errorData);
          alert(`Failed to add task: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error submitting task:', error);
        alert('An error occurred. Please try again later.');
      }
    };
    
    
    
    
    

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />
        <div className="flex">
          <GuideSidebar />

          {/* Main content area */}
          <div className="flex-1 ml-[360px] mt-[56px] p-6 overflow-auto">
            <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-lg transition duration-300 hover:shadow-xl">
              <h1 className="text-2xl font-bold text-gray-800">Add Task</h1>
              <p className="text-gray-600 mt-2">
                Assign a new task to a team.
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
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

              {/* Team Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Team</label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select a Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => {
                    setTaskName('');
                    setTaskDetails('');
                    setDeadline('');
                    setSelectedTeam('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleSubmit}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default AddTasks;
