import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

  return (
    <>
     
      <h1>WordQuest</h1>
      <div>
        <Link className="nav-link" to="/">
          Home
        </Link>
      </div>
      
      <Routes> 
      <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App
