import React from 'react';
import Navbar from './Navbar';

function Profile() {
  // Replace these with actual user data
  const userData = {
    name: 'Leroy Jenkins',
    class: '4th Year',
    branch: 'Computer Science and Engineering',
    guideName: 'Dr. Smith',
    teamName: 'Team Alpha',
    projectName: 'AI Chatbot',
    projectDescription: 'An interactive chatbot for the Department of Justice.',
  };

  const handleEditProfile = () => {
    // Implement the logic to navigate to the edit profile page or open a modal
    console.log('Edit Profile clicked');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col justify-center max-w-md p-8 shadow-lg rounded-2xl bg-white">
      <img
  src="https://randomuser.me/api/portraits/men/0.jpg"
  alt="User Avatar"
  className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 shadow-lg"
/>


        <div className="space-y-4 text-center divide-y dark:divide-gray-300 mt-4">
          <div className="my-2 space-y-1">
            <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-lg text-gray-600">Class: <span className="font-semibold">{userData.class}</span></p>
            <p className="text-lg text-gray-600">Branch: <span className="font-semibold">{userData.branch}</span></p>
            <p className="text-sm text-gray-500">Guide: <span className="font-medium">{userData.guideName}</span></p>
            <p className="text-sm text-gray-500">Team: <span className="font-medium">{userData.teamName}</span></p>
            <p className="text-sm text-gray-500">Project: <span className="font-medium">{userData.projectName}</span></p>
            <p className="text-sm text-gray-500">Description: <span className="font-medium">{userData.projectDescription}</span></p>
          </div>
          <button
            onClick={handleEditProfile}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-lg"
          >
            Edit Profile
          </button>
          <div className="flex justify-center pt-4 space-x-4 align-center">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="GitHub"
              className="p-2 rounded-md hover:text-blue-500 transition duration-200"
            >
              {/* GitHub Icon */}
              <svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Dribble"
              className="p-2 rounded-md hover:text-blue-500 transition duration-200"
            >
              {/* Dribble Icon */}
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
                <path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.205 47.369 131.719 0 50.514-17.866 95.684-47.369 131.73-1.247 1.492-2.502 2.93-3.746 4.35-2.724 1.577-5.32 2.715-8.041 3.31-10.897 2.332-23.149 4.362-34.778 4.362-9.96 0-19.268-1.919-27.89-5.652-1.53-.683-3.033-1.432-4.502-2.152-8.171-3.528-16.55-6.73-23.638-8.16-10.587-2.121-19.794-2.119-28.54.053-2.263.273-4.492.645-6.688 1.182-1.418.204-2.777.47-4.12.713-4.004.335-8.234-.517-12.346-2.319-1.006-.496-2.094-.84-3.148-1.379-.566-.302-1.057-.697-1.528-1.049-.367-.283-.678-.664-.928-1.095-.665-1.304-1.121-2.892-1.121-4.429 0-12.024 7.661-22.676 20.582-30.619 1.746-1.026 3.536-1.934 5.428-2.645 1.124-.455 2.513-1.05 4.378-1.05 1.16 0 2.402.295 3.565 1.093 1.363 1.016 2.758 2.325 4.321 3.563 4.144 2.917 8.203 4.996 12.868 4.996 4.664 0 8.384-1.83 11.362-3.941 6.176-3.765 10.174-7.805 10.174-11.869 0-5.898-5.169-9.982-11.863-12.166-1.477-.4-2.858-.758-4.214-1.186-6.54-1.628-13.16-3.493-19.365-5.934-1.75-.747-3.33-1.63-4.943-2.581-10.394-5.434-19.036-12.569-25.906-22.213C138.934 267.853 176 194.51 228 176.093c2.647-2.002 5.362-3.921 8.182-5.497 10.556-6.15 21.01-12.131 32.543-16.203 1.183-.292 2.373-.569 3.544-.851 1.903-2.05 3.891-3.98 5.927-5.686C249.054 152.762 223.232 145.56 204 132.576c-23.26-19.468-41.736-31.978-48.453-53.157-1.262-4.028-6.01-4.232-6.126-.006C139.586 52.979 146 92.942 165 128.557c12.678 26.826 27.703 40.503 47 49.89 2.75 1.168 5.537 2.071 8.344 2.89 22.158 4.679 42.273 11.456 61.891 18.415zM216 232c-33.008 0-60 26.992-60 60s26.992 60 60 60 60-26.992 60-60-26.992-60-60-60z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
