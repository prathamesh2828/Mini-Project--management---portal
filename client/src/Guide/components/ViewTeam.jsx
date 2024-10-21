import React, { useState } from 'react';
import Navbar from '../../pages/Navbar';
import GuideSidebar from '../GuideSidebar';
import AddTask from './AddTask';

// Sample data for teams with member avatars
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
    tasks: [],
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
    tasks: [],
  },
  {
    name: 'Team Gamma',
    project: 'Project C',
    status: 'Pending',
    members: [
      { name: 'Grace', imgSrc: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { name: 'Heidi', imgSrc: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { name: 'Ivan', imgSrc: 'https://randomuser.me/api/portraits/men/4.jpg' },
    ],
    tasks: [],
  },
];

function ViewTeam() {
  const [teams, setTeams] = useState(teamsData);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(null);

  // Function to handle opening the AddTask modal for a specific team
  const openAddTaskModal = (teamIndex) => {
    setCurrentTeamIndex(teamIndex);
    setIsAddTaskOpen(true);
  };

  // Function to handle adding a new task to the selected team
  const handleAddTask = (newTask) => {
    if (currentTeamIndex === null) return;

    const updatedTeams = [...teams];
    updatedTeams[currentTeamIndex].tasks.push(newTask);

    setTeams(updatedTeams);
    setIsAddTaskOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navbar (fixed at the top) */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <GuideSidebar />

        {/* Main content area */}
        <div className="flex-1 ml-[360px] mt-[56px] p-6 overflow-auto">
          <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-lg transition duration-300 hover:shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800">View Teams</h1>
            <p className="text-gray-600 mt-2">
              Below is the list of teams, their projects, members, and current status.
            </p>
          </div>

          {/* Team List */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Teams Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:border-blue-300 transition duration-300"
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
                    <button
                      onClick={() => openAddTaskModal(index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
                    >
                      Assign Task
                    </button>

                    {/* Display Tasks */}
                    {team.tasks.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-gray-700 font-semibold mb-2">Assigned Tasks</h4>
                        <ul className="space-y-1">
                          {team.tasks.map((task, taskIdx) => (
                            <li
                              key={taskIdx}
                              className="text-gray-800 bg-white rounded-md p-2 shadow-sm"
                            >
                              <strong>{task.taskName}</strong>: {task.taskDetails} - <span className="text-gray-500">Due: {task.deadline}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTask
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

export default ViewTeam;
