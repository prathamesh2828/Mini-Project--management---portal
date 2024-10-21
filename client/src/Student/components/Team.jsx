import React from 'react';
import Navbar from '../../pages/Navbar';
import Sidebar from '../Sidebar';

// Sample data for the team (only one team)
const team = {
  teamName: "Design Team",
  projectName: "Website Redesign",
  details: "Working on a complete overhaul of the company website to improve user experience and engagement.",
  status: "In Progress",
  members: [
    { name: "Leroy Jenkins", role: "Visual Designer", imgSrc: "https://randomuser.me/api/portraits/men/0.jpg" },
    { name: "Alex Smith", role: "UX Researcher", imgSrc: "https://randomuser.me/api/portraits/women/0.jpg" },
    { name: "Emma Brown", role: "Frontend Developer", imgSrc: "https://randomuser.me/api/portraits/women/1.jpg" },
  ],
};

function Team() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="mt-5 p-4">
        <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
          <div className="container flex flex-col items-center justify-center mx-auto space-y-8 sm:p-10">
            <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">Our Team</h1>
            <p className="max-w-2xl text-center dark:text-gray-600">
              Meet our dedicated team working on various projects to deliver exceptional results.
            </p>

            {/* Team Information */}
            <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-3xl font-bold mb-2">{team.teamName}</h2>
              <h3 className="text-xl font-semibold mb-1">{team.projectName}</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-800">{team.details}</p>
              <p className={`mb-4 font-semibold text-${team.status === 'In Progress' ? 'yellow-600' : 'red-600'}`}>
                Status: {team.status}
              </p>
              <h4 className="font-semibold mb-2">Team Members:</h4>
              <div className="flex flex-row flex-wrap justify-center">
                {team.members.map((member, idx) => (
                  <div key={idx} className="flex flex-col items-center m-4 text-center p-2 bg-gray-100 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    <img 
                      alt={member.name} 
                      className="self-center flex-shrink-0 w-28 h-28 mb-2 bg-center bg-cover rounded-full border-4 border-white shadow-lg" 
                      src={member.imgSrc} 
                    />
                    <p className="text-lg font-semibold leading-tight">{member.name}</p>
                    <p className="text-gray-600 dark:text-gray-700">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Team;
