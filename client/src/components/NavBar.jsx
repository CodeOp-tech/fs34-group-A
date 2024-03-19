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
            className="text-white text-lg font-semibold hover:text-slate-800 px-8 py-3"
          >
            Home
          </Link>

        </div>
        
        <div className="flex items-center">
          <div className="md:hidden">
            <button onClick={toggleMenu} className="flex items-center text-white focus:outline-none">
            <div className="flex items-center"> {/* Wrap with flex to align icon and text */}
                <span className="text-white text-xl mr-2" style={{ color: 'white' }}>
               
                  </span>
                  </div>
              Menu
            </button>
          </div>

          <div className={`md:flex md:space-x-4 ${menuOpen ? 'block' : 'hidden'}`}>
            {isLoggedIn && (
              <>
                <Link to="/profilepage" className="font-semibold  px-8 py-3 block md:inline-block text-white hover:text-slate-800">
                  Profile
                </Link>
             
                <button
                  className="font-semibold  px-8 py-3 block md:inline-block text-white hover:text-slate-800"
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
