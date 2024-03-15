
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function NavBar() {
  const { isLoggedIn, signOut } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    signOut();
  };

  return (
    <div className="fixed top-0 w-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-md">
      <div className="container mx-auto py-2 text-white">
        {isLoggedIn ? (
          <div className="">You are logged in</div>
        ) : (
          <div className="">You are logged out</div>
        )}
      </div>

      <nav className="bg-gradient-to-r from-pink-500 to-purple-500 shadow-md">
        <div className="container mx-auto flex justify-between items-center py-2">
        <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-pink-500 px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white rounded-full"
          >
            Home
          </Link>

          <div className="space-x-4">
            {isLoggedIn && (
              <>
                <Link to="/profile" className="text-white hover:text-pink-500">
                  Profile
                </Link>
                <Link to="/gamepage/:id" className="text-white hover:text-pink-500">
                  Game
                </Link>
                <button
                  className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
                  onClick={logout}
                >
                  Log out
                </button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link to="/login" className="px-8 py-3 relative before:absolute before:w-2/3 before:h-2/3 before:top-0 before:left-0 before:border-t before:border-l before:border-pink before:border-solid after:absolute after:w-2/3 after:h-2/3 after:right-0 after:bottom-0 after:border-b after:border-r after:border-pink after:border-solid hover:after:w-full hover:after:h-full hover:before:w-full hover:before:h-full before:duration-300 after:duration-300 text-grey-500 hover:text-white">
                  Sign In | Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}