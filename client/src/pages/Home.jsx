import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import SplitType from 'split-type'; 
import gsap from 'gsap'; 
import video from "/src/assets/WQmov.mov";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext); 
  const handlePlayClick = () => {
    // Redirect to the profile page if the user is logged in
    if (isLoggedIn) {
      navigate('/profilepage');
    } else {
      // Redirect to the login page if the user is not logged in
      navigate('/login');
    }
  };

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
      <>
      
        <div className="bg-gray-900 min-h-screen flex items-center justify-center rounded">
          <div className="relative bg-slate-800 p-10 md:p-20 rounded shadow-[0_0_10px_theme('colors.purple.700')] w-full min-h-dvh max-w-screen-md justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-md mix-blend-overlay opacity-90"></div>
            <div className="absolute inset-0 ring ring-pink-500 ring-offset-4 mix-blend-multiply opacity-75"></div>
  
            <div className="z-10 flex flex-col items-center justify-center min-w-screen min-h-screen">
              <div className="mb-4">
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
              {/* play button */}
              <div id="app" className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-gradient-to-r from-pink-500 to-purple-500 p-3 md:pt-5 md:pb-5 gap-4 md:gap-20 rounded-full items-center mx-auto md:w-1/2" style={{ boxShadow: "0 0 10px white, inset 0 0 0 2px rgba(255, 255, 255, 0.6)" }}>
                <button
                  onClick={handlePlayClick}
                  className="font-semibold px-6 py-2 md:px-8 md:py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white rounded-full"
                >
                  Play
                </button>
              </div>
              <div className="z-100 mb-6 flex items-center justify-center mt-8 md:mt-16 bg-gray-900 p-3 md:p-6 rounded-lg">
                {/* Video Player */}
                <video
                  controls
                  autoPlay
                  loop
                  className="rounded-lg"
                  style={{ maxWidth: "100%", height: "auto" }} // Adjust width and height as needed
                >
                  <source src={video} type="video/mp4" /> {/* Add your video source */}
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* How to play section */}
              <div className="mb-10 md:mb-20 overflow-y-auto ">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-pink-500">How to play</h1>
                <p className="text-md md:text-lg mb-4 text-white">
                  Welcome to WordQuest! Dive into a world of words by playing by yourself or with your friends.
                </p>
                <ul className="list-disc list-inside mb-6 text-white">
                  <li className="mb-2">
                    <span className="font-semibold text-pink-500">Uncover the Mystery Word:</span> Guess the secret word by entering your guesses.
                  </li>
                  <li className="mb-2">
                    <span className="font-semibold text-pink-500">Submit Your Guess:</span> Type your guess and press "Enter" or click "Submit."
                  </li>
                  <li className="mb-2">
                    <span className="font-semibold text-pink-500">Watch Your Attempts:</span> Each incorrect guess brings you closer to revealing the word.
                  </li>
                  <li className="mb-2">
                    <span className="font-semibold text-pink-500">Receive Feedback:</span> We'll let you know if your guess is correct and show the word if not.
                  </li>
                  <li className="mb-2">
                    <span className="font-semibold text-pink-500">Track Your Progress:</span> View all your guesses and earn points for correct ones.
                  </li>
                  <li>
                    <span className="font-semibold text-pink-500">Compete for Points:</span> See how many points you can rack up!
                  </li>
                </ul>
                <p className="text-md md:text-lg mb-10 text-white ">Enjoy the game!</p>
              </div>
            </div>
          </div>
  </div>
      </>
    );
  };
  
  export default Home;