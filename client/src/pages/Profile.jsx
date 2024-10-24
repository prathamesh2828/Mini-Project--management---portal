import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage or make an API call if needed
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUserData(storedUser);
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

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
            <p className="text-lg text-gray-600">Division: <span className="font-semibold">{userData.div}</span></p>
            <p className="text-lg text-gray-600">Email: <span className="font-semibold">{userData.email}</span></p>
            <p className="text-sm text-gray-500">Student id: <span className="font-medium">{userData.std_id}</span></p>
            <p className="text-sm text-gray-500">Group Number: <span className="font-medium">{userData.grp_no}</span></p>
            {/* <p className="text-sm text-gray-500">Project: <span className="font-medium">{userData.projectName}</span></p>
            <p className="text-sm text-gray-500">Description: <span className="font-medium">{userData.projectDescription}</span></p> */}
          </div>
          <button
            onClick={() => console.log('Edit Profile clicked')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
