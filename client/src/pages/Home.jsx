import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


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

  return (
    <> 
    <div className="bg-gray-900 min-h-screen flex items-center justify-center rounded">
    {/* <div className="bg-slate-900 p-20 rounded shadow-[0_0_20px_theme('colors.pink.600')] w-full max-h-dvh max-w-screen-md justify-center"> */}
    <div className="relative bg-slate-800 p-20 rounded shadow-[0_0_10px_theme('colors.purple.700')] w-full max-h-dvh max-w-screen-md justify-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-md mix-blend-overlay opacity-90">
  </div>
  <div className="absolute inset-0 ring ring-pink-500 ring-offset-4 mix-blend-multiply opacity-75">
  </div>
  <div className="z-10 flex items-center justify-center">

  </div>
        <h2 className=" text-2xl font-semibold mb-9 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text ">WordQuest</h2>

        <div id="app" className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-gradient-to-r from-pink-500 to-purple-500 pt-5 pb-5 gap-20 rounded-full items-center mx-auto w-1/2">
          <button
            onClick={handlePlayClick}
            className="font-semibold px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white rounded-full"
          >
            Play
          </button>
          
        </div>
      </div>
      
    </div>
    </>
  );
};

export default Home;
