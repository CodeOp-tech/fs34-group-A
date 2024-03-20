import React, { useEffect } from 'react';
import Game from '../components/Game';
import SplitType from 'split-type'; // Import SplitType library
import gsap from 'gsap'; // Import gsap library

const GamePage = () => {
   // Initialize SplitType after component is mounted
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
  
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center rounded">
    <div className="relative bg-slate-800 p-10 md:p-20 rounded shadow-[0_0_10px_theme('colors.purple.700')] w-full min-h-dvh max-w-screen-md justify-center overflow-hidden">
    
    <div className="z-10 flex-col items-center  min-w-screen min-h-screen">
      <div className=" mb-4 "> 
      <h2 id="text" className="text-4xl md:text-6xl font-semibold mb-4 md:mb-9 text-pink-500 opacity-90 bg-clip-text transition duration-150 ease-in-out">
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
</div>
        <Game />
      </div>
    </div>
    </div>
  );
};

export default GamePage;
