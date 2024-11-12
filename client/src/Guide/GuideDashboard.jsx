import React from 'react';
import GuideSidebar from './GuideSidebar';
import Navbar from '../pages/Navbar';
import './GuideDashboard.css';

function GuideDashboard() {
  // Sample data for teams and their projects
  const teams = [
    {
      name: 'Team Alpha',
      project: 'Project A',
      tasks: [
        { id: 1, title: 'Task 1', status: 'todo' },
        { id: 2, title: 'Task 2', status: 'inprogress' },
        { id: 3, title: 'Task 3', status: 'completed' },
      ],
    },
    {
      name: 'Team Beta',
      project: 'Project B',
      tasks: [
        { id: 4, title: 'Task 4', status: 'todo' },
        { id: 5, title: 'Task 5', status: 'inprogress' },
        { id: 6, title: 'Task 6', status: 'completed' },
      ],
    },
    {
      name: 'Team Gamma',
      project: 'Project C',
      tasks: [
        { id: 7, title: 'Task 7', status: 'todo' },
        { id: 8, title: 'Task 8', status: 'inprogress' },
        { id: 9, title: 'Task 9', status: 'completed' },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navbar (fixed at the top) */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <GuideSidebar />

        {/* Main content area */}
        <div className="flex-1 ml-[360px] mt-[72px] p-6 overflow-auto"> {/* Increased margin-top to 72px */}
          {/* Welcome Message Card */}
          <div className="bg-white border border-gray-300 rounded-lg p-8 mb-6 shadow-lg transition duration-300 hover:shadow-xl greet"> {/* Increased padding */}
            <h1 className="text-3xl font-bold text-gray-800">Welcome to the Guide Dashboard</h1> {/* Increased font size */}
            <p className="text-gray-600 mt-2">
              Here you can manage your teams and their projects efficiently.
            </p>
          </div>

          {/* Team List */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Teams and Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:border-blue-300 transition duration-300"
                >
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{team.name}</h3>
                  <p className="text-gray-600 mb-4">Project: <span className="font-medium">{team.project}</span></p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <h4 className="text-blue-800 font-semibold">To Do</h4>
                      <ul className="mt-2 space-y-2">
                        {team.tasks
                          .filter((task) => task.status === 'todo')
                          .map((task) => (
                            <li
                              key={task.id}
                              className="bg-white rounded-md shadow-sm p-2 text-sm text-gray-700 hover:bg-blue-100 transition"
                            >
                              {task.title}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3">
                      <h4 className="text-yellow-800 font-semibold">In Progress</h4>
                      <ul className="mt-2 space-y-2">
                        {team.tasks
                          .filter((task) => task.status === 'inprogress')
                          .map((task) => (
                            <li
                              key={task.id}
                              className="bg-white rounded-md shadow-sm p-2 text-sm text-gray-700 hover:bg-yellow-100 transition"
                            >
                              {task.title}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="text-green-800 font-semibold">Completed</h4>
                      <ul className="mt-2 space-y-2">
                        {team.tasks
                          .filter((task) => task.status === 'completed')
                          .map((task) => (
                            <li
                              key={task.id}
                              className="bg-white rounded-md shadow-sm p-2 text-sm text-gray-700 hover:bg-green-100 transition"
                            >
                              {task.title}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuideDashboard;
