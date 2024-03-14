import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); 

  const handlePlayClick = () => {
    // Redirect to the login page when the "Play" button is clicked
    navigate('/login');
  };

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">WordQuest</h2>

          <div id="app" className="flex flex-col bg-gradient-to-r from-pink-500 to-purple-500 pt-5 pb-5 items-center gap-20 rounded-full">
            <button
              onClick={handlePlayClick}
              className="px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white rounded-full"
            >
              Play
            </button>
          </div>
       
      </div>
    </div>
  );
};

export default Home;