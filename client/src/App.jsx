import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';

import Game from './components/Game';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './context/AuthContext';
import AboutPage from './pages/AboutPage';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate ()

  
  function signIn() {
    setIsLoggedIn(true);
  }

  function signOut() {
    setIsLoggedIn(false);
    navigate("/")
  }

  const authObject = {
    isLoggedIn,
    signIn,
    signOut,
  };

    // Function to simulate loading
    const simulateLoading = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulate loading for 2 seconds
    };
  
     // Simulate loading when the component mounts
  useEffect(() => {
    simulateLoading();
  }, []);
  
    return (
      <AuthContext.Provider value={authObject}>
        <div className="bg-gray-900 min-w-screen min-h-screen items-center justify-center">
          <div className="text-center">
            <NavBar />
            {isLoading ? ( // Conditionally render loading spinner
              <LoadingSpinner />
            ) : (
              <div className="container mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/about" element={<AboutPage />} />

                  <Route path="/game/:id" element={<GamePage />} />

                  <Route path="/profilepage" element={<ProfilePage />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </div>
            )}
          </div>
        </div>
      </AuthContext.Provider>
    );
  }

