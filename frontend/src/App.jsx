<<<<<<< HEAD
// frontend/src/App.jsx
import React from "react";
import Home from "./Pages/Home";

function App() {
  const handleEnter = () => {
    alert("ENTER clicked");
  };

  const handleLeaderboard = () => {
    alert("LEADERBOARD clicked");
  };

  return <Home onEnter={handleEnter} onLeaderboard={handleLeaderboard} />;
}

export default App;



HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
=======
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';



const App = () => {
  return (
   

      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage/>} />
      </Routes>
   
  );
}

export default App;

