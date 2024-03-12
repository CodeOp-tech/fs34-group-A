import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Game from './pages/Game';
import Profile from './pages/Profile';
import Home from './pages/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login';


function App() {

  return (
    <>
     
      <h1>WordQuest</h1>
      <div>
        <ul>
          <li>
        <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/profile">Profile</Link>
        </li>
        <li>
        <Link to="/game">Game</Link>
        </li>
        <li>
        <Link to="/login">Login</Link>
        </li>
        </ul>
      </div>
      
      <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
