import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <h1>WordQuest</h1>
      
      <Routes> 
      <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
