import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function LoginPage() {
  const { isLoggedIn, signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', {
        username,
        password,
      });

      console.log(response.data);

      signIn();

      // Redirect to the profile page after successful login
      navigate('/profilepage');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;