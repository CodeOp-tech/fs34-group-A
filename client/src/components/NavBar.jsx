import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';

export default function NavBar() {
  const { isLoggedIn, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    signOut();
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-500 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className="flex items-center">
          <img src='./src/assets/WQlogo.png' className="hidden md:block h-8 w-auto mr-6" alt="WordQuest Full Logo" />
          <img src='./src/assets/WQs.png' className="block md:hidden h-8 w-auto mr-6" alt="WordQuest Small Logo" />
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-pink-500 px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white rounded-full mb-4 md:mb-0"
          >
            Home
          </Link>
        </div>
        
        <div className="flex items-center">
          <div className="md:hidden">
            <button onClick={toggleMenu} className="block text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          <div className={`md:flex md:space-x-4 ${menuOpen ? 'block' : 'hidden'}`}>
            {isLoggedIn && (
              <>
                <Link to="/profilepage" className="font-semibold  px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-indigo-800 hover:text-white">
                  Profile
                </Link>
                <Link to="/gamepage/:id" className="font-semibold  px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-indigo-800 hover:text-white">
                  Game
                </Link>
                <button
                  className="font-semibold  px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white"
                  onClick={logout}
                >
                  Log out
                </button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link to="/login" className="font-semibold  px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white">
                  Sign In | Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}