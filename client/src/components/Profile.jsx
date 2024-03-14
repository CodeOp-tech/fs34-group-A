import React from 'react'
import { useState } from 'react';
import axios from 'axios';//

/*
  1. Need a "Create Group" button, so when clicked : 
      (a) Input Containers to Add Email Address (Add email buttons)
      (b) Send Invitation button like a handlesubmit button, so when clicked: 
          - Sends a post request to endpoint=>  router.post("/", userShouldBeLoggedIn, async (req, res, next). & send invitation also!


*/


const ProfilePage = () => {
  const [emails, setEmails] = useState([]);
  const [groupCreated, setGroupCreated] = useState(false);


  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Profile</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Quests played
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Score
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
         
        </form>
      </div>
      </div>
  );
};

export default ProfilePage;