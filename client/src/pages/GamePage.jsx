import React from 'react';
import Game from '../components/Game';


const GamePage = () => {
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">WordQuest</h2>

        <div className="text-white text-xl mb-6">Welcome to the Game!</div>
        <Game />
      </div>
    </div>
  );
};

export default GamePage;