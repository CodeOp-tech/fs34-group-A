import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import Leaderboard from '../components/Leaderboard';
import SplitType from 'split-type'; // Import SplitType library
import gsap from 'gsap'; // Import gsap library

export const ProfilePage = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const splitText = new SplitType('#text', { types: 'chars' });

    // Callback function to animate characters after SplitType has finished splitting the text
    const onSplitComplete = () => {
      // Select all characters after SplitType has finished splitting the text
      const characters = document.querySelectorAll('.char');

      // Apply animation to each character using gsap with staggered delay
      gsap.from(characters, {
        x: -100, // Start from left
        opacity: 0,
        stagger: 0.05,
        delay: (index) => index * 0.1, // Delay each letter by its index * 0.1 seconds
        duration: 0.5
      });
    };

    // Attach onSplitComplete callback function to SplitType instance
    splitText.onComplete = onSplitComplete;

    // Cleanup function to revert SplitType when component is unmounted
    return () => {
      splitText.revert();
    };
  }, []); 

  const text = "WordQuest";

  const toggleLeaderboard = () => {
    setShowLeaderboard(prevState => !prevState);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center rounded">
      <div className="relative bg-slate-800 p-20 rounded shadow-[0_0_10px_theme('colors.purple.700')] w-full max-h-dvh max-w-screen-md justify-center overflow-hidden inline-block">
        <div className=" mb-4 "> 
          <h2 id="text" className="text-6xl font-semibold mb-9 text-pink-500 opacity-90 bg-clip-text transition duration-150 ease-in-out">
            {/* Map through each character in the text */}
            {text.split('').map((char, index) => (
              <span
                key={index}
                className="char animate-pulse inline-block" // Apply pulse animation to each letter
                style={{ animationDelay: `${index * 0.1}s` }} // Set animation delay based on index
              >
                {char}
              </span>
            ))}
          </h2> 
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
    </div>
  );
};

export default ProfilePage;
