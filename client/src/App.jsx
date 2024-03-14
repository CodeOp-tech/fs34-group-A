
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile';
import Game from './components/Game';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './context/AuthContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function signIn() {
    setIsLoggedIn(true);
  }

  function signOut() {
    setIsLoggedIn(false);
  }

  const authObject = {
    isLoggedIn,
    signIn,
    signOut,
  };
  
  return (
    
    <AuthContext.Provider value={authObject}>
    <div>
      <div className="container text-center">
        <NavBar />

        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gamepage" element={<GamePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/register" element={<RegistrationPage />} /> 
            <Route path="/game" element={<Game />} /> 
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

