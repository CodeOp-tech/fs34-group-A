import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { TbUserCircle } from "react-icons/tb";
import WQlogo from '../assets/WQlogo.png'; // Import the full logo
import WQsLogo from '../assets/WQs.png'; // Import the small logo

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
      <div className=" flex justify-between items-center py-3">
        <div className="flex items-center">
          {/* Show full logo on big screens and small logo on small screens */}
          <img src={WQlogo} className="hidden md:block h-8 w-auto mr-6 opacity-50" alt="WordQuest Full Logo" />
          <img src={WQsLogo} className="block md:hidden h-8 w-auto mr-6 opacity-50" alt="WordQuest Small Logo" />
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-slate-800 px-8 py-3"
          >
            Home
          </Link>
        </div>
        
        <div className="flex items-center md:justify-end">
          <div className="md:hidden">
            <button onClick={toggleMenu} className="flex items-center text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <div className={`md:flex md:space-x-4 ${menuOpen ? 'block' : 'hidden'}`}>
            {/* Menu items */}
            <Link to="/profilepage" className="font-semibold px-8 py-3 block md:inline-block text-white hover:text-slate-800">
              Profile
            </Link>
            <button
              className="font-semibold px-8 py-3 block md:inline-block text-white hover:text-slate-800"
              onClick={logout}
            >
              Log out
            </button>
            <Link to="/login" className="font-semibold px-8 py-3 block md:inline-block text-white hover:text-slate-800">
              <span className="flex items-center">
                <TbUserCircle className="mr-2" style={{ fontSize: '1.5em' }} /> Sign In | Sign Up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
