import React, { useState } from 'react';
import axios from 'axios';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import useAuth from '../hooks/useAuth';

const AuthPage = () => {
  const { isLoggedIn, signIn } = useAuth();
  const [isRegistering, setIsRegistering] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match for registration
    if (isRegistering && password !== confirmPassword) {
      console.error('Passwords do not match');

      return;
    }

    try {
      const endpoint = isRegistering ? '/api/users/register' : '/api/users/login';
      const payload = isRegistering
        ? { username, email, password }
        : { username, password };

      const response = await axios.post(endpoint, payload);

      console.log(response.data);

      if (!isRegistering) {
        signIn();
      }
    } catch (error) {
      
      console.error(isRegistering ? 'Error during registration:' : 'Error during login:', error);
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">
          {isRegistering ? 'Register' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          )}

          <div className="mb-4 relative">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
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
              Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
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
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>
          </div>

          {isRegistering && (
            <div className="mb-4 relative">
              <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="flex items-center">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  required
                />
                <span
                  className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                  onClick={handleShowConfirmPasswordToggle}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span
            className="text-indigo-500 cursor-pointer hover:underline"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Already have an account? Login here.' : 'Don\'t have an account? Register here.'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;