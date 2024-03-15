import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';



function LoginPage() {
  const { isLoggedIn, signIn, signOut } = useAuth(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = showRegistration ? '/api/users/register' : '/api/users/login';
      const payload = showRegistration
        ? { username, email, password }
        : { username, password };
  
      const response = await axios.post(endpoint, payload);
  
      console.log(response.data);

      if (!showRegistration) {
        signIn();
        // Set isLoggedIn flag in local storage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', response.data.token);
        // Navigate to profile page after successful login
        navigate('/profilepage');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignUpClick = () => {
    setShowRegistration(!showRegistration);
  };
 

  const handleLogout = () => {
    // Clear authentication state
    signOut();
    
    // Set a flag in local storage indicating that the user has logged out
    localStorage.setItem('isLoggedIn', 'false');
  
     // Redirect to home page
     navigate('/');
   
  };



  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="p-20 rounded shadow-[0_0_20px_theme('colors.pink.600')] w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-9 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">{showRegistration ? 'Sign Up' : 'Sign In'}</h2>

        <form onSubmit={handleSubmit}>
          {showRegistration && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                
              </label>
              <input
                type="email"
                placeholder='email'
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
             
            </label>
            <input
              type="text"
              placeholder='username'
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
             
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <span
                className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                onClick={handleShowPasswordToggle}
              >
                {showPassword ? 'Hide Password 🔒' : 'Show Password 🔓'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
          >
            {showRegistration ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={handleSignUpClick} className="text-indigo-500 hover:underline focus:outline-none">
            {showRegistration ? 'Back to Sign In' : 'Or Sign Up'}
          </button>
          {isLoggedIn && (
            <button onClick={handleLogout} className="text-indigo-500 hover:underline focus:outline-none ml-4">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
