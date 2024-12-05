import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        console.error('No user data found.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/getUserProfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: storedUser._id, role: storedUser.role })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === "Success") {
          if (storedUser.role === 'student') {
            setUserData({
              name: data.user.name,
              email: data.user.email,
              class: data.user.class,
              div: data.user.div,
              std_id: data.user.std_id,
              grp_no: data.user.grp_no,
              prj_name: data.user.prj_name, // Add project name
              description: data.user.description, // Add description
            });
          } else if (storedUser.role === 'guide') {
            setUserData({
              name: data.user.name,
              email: data.user.email,
            });
          }
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (err) {
        console.error('Error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
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
            <p className="text-lg text-gray-600">Email: <span className="font-semibold">{userData.email}</span></p>
            {userData.class && (
              <>
                <p className="text-lg text-gray-600">Class: <span className="font-semibold">{userData.class}</span></p>
                <p className="text-lg text-gray-600">Division: <span className="font-semibold">{userData.div}</span></p>
                <p className="text-sm text-gray-500">Student ID: <span className="font-medium">{userData.std_id}</span></p>
                <p className="text-sm text-gray-500">Group Number: <span className="font-medium">{userData.grp_no}</span></p>
                <p className="text-lg text-gray-600">Project Name: <span className="font-semibold">{userData.prj_name}</span></p>
                <p className="text-lg text-gray-600">Description: <span className="font-semibold">{userData.description}</span></p>
              </>
            )}
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
