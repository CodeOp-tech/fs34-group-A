import React from 'react'
import { useState } from 'react';
import Profile from '../components/Profile';
import Leaderboard from '../components/Leaderboard';

export const ProfilePage = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const toggleLeaderboard = () => {
    setShowLeaderboard(prevState => !prevState);
  };

  return (
    <div className="min h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-20 rounded shadow-[0_0_20px_theme('colors.pink.600')] w-full max-w-3xl">
        <h2 className="text-3xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">WordQuest</h2>

        <div className="text-2xl font-semibold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">Welcome to your Profile!</div>
        <Profile />

                {/* View Leaderboard Button */}
                <button onClick={toggleLeaderboard} className="bg-transparent hover:bg-purple-700 text-purple-400 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                    {showLeaderboard ? "Hide Leaderboard" : "View Leaderboard"}
                </button>

                {/* Render Leaderboard only if showLeaderboard is true */}
                {showLeaderboard && <Leaderboard />}
            </div>
        </div>
    );
};


export default ProfilePage;