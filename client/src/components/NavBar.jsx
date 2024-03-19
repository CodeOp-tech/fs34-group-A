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
          <img src='./src/assets/WQlogo.png' className="hidden md:block h-8 w-auto mr-6 opacity-50" alt="WordQuest Full Logo" />
          <img src='./src/assets/WQs.png' className="block md:hidden h-8 w-auto mr-6 opacity-50" alt="WordQuest Small Logo" />
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-pink-500 px-8 py-3"
          >
            Home
          </Link>


          <Link
            to="/about"
            className="text-white text-lg font-semibold hover:text-pink-500 px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white rounded-full mb-4 md:mb-0"
          >
            About
          </Link>

        </div>
        
        <div className="flex items-center">
          <div className="md:hidden">
            <button onClick={toggleMenu} className="flex items-center text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Menu
            </button>
          </div>

          <div className={`md:flex md:space-x-4 ${menuOpen ? 'block' : 'hidden'}`}>
            {isLoggedIn && (
              <>
                <Link to="/profilepage" className="font-semibold  px-8 py-3 block md:inline-block text-white hover:text-pink-500">
                  Profile
                </Link>
                <Link to="/gamepage/:id" className="font-semibold  px-8 py-3 block md:inline-block text-white hover:text-pink-500">
                  Game
                </Link>
                <button
                  className="font-semibold  px-8 py-3 block md:inline-block text-white hover:text-pink-500"
                  onClick={logout}
                >
                  Log out
                </button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <div className="flex items-center"> {/* Wrap with flex to align icon and text */}
                  <span className="text-white text-xl mr-2" style={{ color: 'white' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </span>
                  <Link to="/login" className="font-semibold  px-8 py-3 block md:inline-block text-white hover:text-slate-800">
                    Sign In | Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
