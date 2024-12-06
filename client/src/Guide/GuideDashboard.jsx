import React, { useState, useEffect } from 'react';
import Navbar from '../pages/Navbar';
import GuideSidebar from './GuideSidebar';

import './GuideDashboard.css';

const teamsData = [
  {
    name: 'Team Alpha',
    project: 'Project A',
    status: 'In Progress',
    members: [
      { name: 'Alice', imgSrc: 'https://randomuser.me/api/portraits/women/0.jpg' },
      { name: 'Bob', imgSrc: 'https://randomuser.me/api/portraits/men/0.jpg' },
      { name: 'Charlie', imgSrc: 'https://randomuser.me/api/portraits/men/1.jpg' },
    ],
  },
  {
    name: 'Team Beta',
    project: 'Project B',
    status: 'Completed',
    members: [
      { name: 'David', imgSrc: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { name: 'Eve', imgSrc: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { name: 'Frank', imgSrc: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ],
  },
];

function GuideDashboard() {
  const [teams, setTeams] = useState(teamsData);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <div className="flex">
        <GuideSidebar />
        <div className="flex-1 ml-[360px] mt-[72px] p-6 overflow-auto">
          <div className="bg-white p-6 rounded-md shadow-lg mb-6 max-w-md w-full">
            <h1 className="text-xl font-bold mb-4">Welcome to the Guide Dashboard</h1>
            <p className="text-gray-600">
              Manage your teams, projects, and tasks efficiently.
            </p>
          </div>

          {/* Team List */}
          <div className="flex flex-wrap justify-start gap-6">
            {teams.map((team, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:border-blue-300 transition duration-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <h3 className="text-xl font-bold text-blue-800 mb-2">{team.name}</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Project:</strong> <span className="font-medium">{team.project}</span>
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Status:</strong>{' '}
                  <span
                    className={`font-medium ${
                      team.status === 'Completed'
                        ? 'text-green-600'
                        : team.status === 'In Progress'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {team.status}
                  </span>
                </p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-gray-700 font-semibold mb-2">Team Members</h4>
                  <div className="flex flex-row flex-wrap justify-center">
                    {team.members.map((member, idx) => (
                      <div key={idx} className="flex flex-col items-center m-2">
                        <img
                          alt={member.name}
                          className="self-center flex-shrink-0 w-24 h-24 mb-1 bg-center bg-cover rounded-full border-2 border-blue-300"
                          src={member.imgSrc}
                        />
                        <p className="text-gray-800 font-semibold">{member.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tasks Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Assigned Tasks</h2>
            {loadingTasks ? (
              <p className="text-center text-gray-500">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-center text-gray-500">No tasks assigned yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white shadow-lg rounded-xl overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{task.taskName}</h3>
                      <p className="text-gray-600 mb-4">{task.taskDetails}</p>
                      <p className="text-sm text-gray-500">
                        <strong>Deadline:</strong> {task.deadline.substring(0, 10)}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Status:</strong> {task.status || 'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideDashboard;