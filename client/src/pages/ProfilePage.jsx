import React from 'react'
import Profile from '../components/Profile';

export const ProfilePage = () => {
    return (
      <div className="h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-20 rounded shadow-[0_0_20px_theme('colors.pink.600')] w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">WordQuest</h2>

            <div className="text-white text-xl mb-6">Welcome to your Profile!</div>
            <Profile />
          </div>
        </div>
      );
    };
export default ProfilePage;