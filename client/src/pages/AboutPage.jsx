import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const AboutPage = () => {
  const text = "WordQuest"; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="relative bg-gray-800 p-20 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-md mix-blend-overlay opacity-90 rounded-lg"></div>
        <div className="absolute inset-0 ring ring-pink-500 ring-offset-4 mix-blend-multiply opacity-75 rounded-lg"></div>
        <div className="z-10 flex flex-col items-center justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-pink-500">About</h1>
            <h2 id="text" className="text-6xl font-semibold mb-6 text-pink-400 opacity-90 bg-clip-text transition duration-150 ease-in-out">
              {/* Map through each character in the text */}
              {text.split('').map((char, index) => (
                <span
                  key={index}
                  className="char animate-pulse inline-block" 
                  style={{ animationDelay: `${index * 0.1}s` }} 
                >
                  {char}
                </span>
              ))}
            </h2>
            <p className="text-lg mb-4">
              Welcome to WordQuest! Dive into a world of words by playing by yourself or with your friends.
            </p>
            <ul className="list-disc list-inside mb-6">
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
            <p className="text-lg mb-4">Enjoy the game!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
