import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Get user data from LocalStorage
    const userData = localStorage.getItem("user");

    // 2. If no user data, kick them back to login (Protected Route)
    if (!userData) {
      navigate("/login");
    } else {
      // 3. If user exists, save to state so we can display it
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // 1. Clear the storage
    localStorage.removeItem("user");
    // 2. Redirect to login
    navigate("/login");
  };

  // Prevent flashing the dashboard before redirect happens
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        
        <div className="mb-6">
            <p className="text-gray-500">Welcome back,</p>
            {/* Display the name from the saved user data */}
            <h2 className="text-2xl font-semibold text-blue-600">
                {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{user.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Logout
        </button>
        
      </div>
    </div>
  );
};

export default Dashboard;