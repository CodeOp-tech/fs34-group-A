import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Username = () => {
  const [username, setUsername] = useState(null); // Initially set username to null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage.');
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get(`/api/users/username`, config);
        setUsername(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-lg flex items-center justify-center">
      <div className="w-full max-w-md overflow-hidden inline-block">
        {/* Welcome section */}
        <div className="mb-4">
          {username ? ( // Check if username is available
            <p>Welcome {username}!</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Username;