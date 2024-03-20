import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { TbUserCircle } from "react-icons/tb";

function LoginPage() {
  const { isLoggedIn, signIn, signOut } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
      const endpoint = showRegistration
        ? "/api/users/register"
        : "/api/users/login";
      const payload = showRegistration
        ? { username, email, password }
        : { username, password };

      const response = await axios.post(endpoint, payload);

      console.log(response.data);

      if (!showRegistration) {
        signIn();
        // Set isLoggedIn flag in local storage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", response.data.token);
        // Navigate to profile page after successful login
        navigate("/profilepage");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignUpClick = () => {
    setShowRegistration(!showRegistration);
  };

  const handleLogout = () => {
    // Clear authentication state
    signOut();

    // Set a flag in local storage indicating that the user has logged out
    localStorage.setItem("isLoggedIn", "false");

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center rounded">
      <div className="relative bg-slate-800 p-20 rounded shadow-[0_0_10px_theme('colors.purple.700')] w-full max-h-dvh max-w-screen-md justify-center overflow-hidden ">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-md mix-blend-overlay opacity-90 pointer-events-none"></div>

        <h2 className="text-2xl font-semibold mb-9 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          {showRegistration}
        </h2>

        <form onSubmit={handleSubmit}>
          {showRegistration && (
            <div className="mb-4 relative">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-medium mb-2"
              ></label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center ml-3">
                  <FiMail className="h-6 w-6 text-gray-400" />
                </span>
                <input
                  type="email"
                  placeholder="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-4 relative">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium mb-6"
            ></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center ml-3">
                <TbUserCircle className="h-6 w-6 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="username"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            ></label>
            <div className="relative">
              <span
                className="absolute inset-y-0 left-0 flex items-center ml-3 cursor-pointer"
                onClick={handleShowPasswordToggle}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-400" />
                )}
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
            style={{ boxShadow: "0 0 5px white" }}
          >
            {showRegistration ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleSignUpClick}
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            {showRegistration ? "Back to Sign In" : "Or Sign Up"}
          </button>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-indigo-500 hover:underline focus:outline-none ml-4"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
