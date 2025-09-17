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



