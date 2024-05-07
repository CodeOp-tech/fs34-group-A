import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import Leaderboard from '../components/Leaderboard';
import SplitType from 'split-type'; // Import SplitType library
import gsap from 'gsap'; // Import gsap library
import axios from 'axios';

import { TbUserCircle } from "react-icons/tb";
import Username from '../components/Username';
import Avatar from '../components/Avatar';

// Import SVG files manually
import avatar1 from '../assets/bottts/bottts-1713890313431.svg';
import avatar2 from '../assets/bottts/bottts-1714748859006.svg';
import avatar3 from '../assets/bottts/bottts-1714748864813.svg';
import avatar4 from '../assets/bottts/bottts-1714748868177.svg';
import avatar5 from '../assets/bottts/bottts-1714748872022.svg';
import avatar6 from '../assets/bottts/bottts-1714748876521.svg';


const avatarSVGs = {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6
  // Add other SVG files here
};

export const ProfilePage = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(Object.keys(avatarSVGs)[0]); // State to manage selected avatar
  const [showAvatarThumbnails, setShowAvatarThumbnails] = useState(false); // State to manage thumbnail view visibility

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

    // Function to handle avatar selection
    const handleAvatarSelect = (event) => {
      setSelectedAvatar(event.target.value);
    };  
  
     // Function to toggle visibility of avatar thumbnails
  const toggleAvatarThumbnails = () => {
    setShowAvatarThumbnails(prevState => !prevState);
  };
 
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center rounded">
       <div className="relative bg-slate-800 p-20 rounded shadow-[0_0_10px_theme('colors.purple.700')] w-full  max-w-screen-md justify-center overflow-hidden ">
       <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-md mix-blend-overlay opacity-90 pointer-events-none"></div>

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
          <div className="text-2xl font-semibold mb-2 text-white flex flex-col items-center justify-center">
          <Username />
          <div className="mb-6 flex justify-center">
              {/* Render selected avatar */}
              {selectedAvatar && (
                <img
                  src={avatarSVGs[selectedAvatar]}
                  alt={`Avatar ${selectedAvatar}`}
                  className="w-24 h-24 rounded-full mt-2"
                  onClick={toggleAvatarThumbnails} // Toggle thumbnail view on clicking the avatar
                />
              )}
              
              {/* Render avatar thumbnails when showAvatarThumbnails is true */}
             
              {showAvatarThumbnails && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  
                  {Object.keys(avatarSVGs).map((avatar, index) => (
                    <img
                      key={index}
                      src={avatarSVGs[avatar]}
                      alt={`Avatar ${index + 1}`}
                      className="w-16 h-16 rounded-full cursor-pointer"
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        toggleAvatarThumbnails(); // Hide thumbnail view on selecting an avatar
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
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
