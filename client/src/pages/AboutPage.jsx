import React from 'react';

const AboutPage = () => {
  const text = "WordQuest"; // Define the text variable

  return (
    <div className="min h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-20 rounded shadow-[0_0_20px_theme('colors.pink.600')] w-full max-w-3xl">
        <div className="mb-4">
        <h1 className="text-3xl font-bold mb-4 text-white">About</h1>
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
         
          <p className="text-lg mb-4 text-white">
            Welcome to WordQuest, a fun word-guessing game where you can test your vocabulary skills!
          </p>
          <p className="text-lg mb-4 text-white text-left">
             Here's how to play:
        </p>
        <ol className="list-decimal list-inside mb-4 text-white text-left">
  <li>Guess the Word: Figure out the hidden word by typing your guesses in the box.</li>
  <li>Submit Your Guess: Type your guess and hit "Enter" or click "Submit Guess."</li>
  <li>Attempts Left: You've got a limited number of tries. Each wrong guess brings you closer to running out of attempts.</li>
  <li>Feedback: If you guess right, you earn points. If not, we'll let you know and show you the correct word.</li>
  <li>Guessed Words: See all your guesses listed below the box.</li>
  <li>Points: Keep track of your points.</li>
</ol>
          <p className="text-lg mb-4 text-white">
            Have fun playing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
