
import React from "react";

const Home = ( ) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
      <h1 className="text-5xl font-bold mb-16 drop-shadow-lg">Welcome to the Game</h1>
      <div className="flex gap-8">
        <button
          className="px-10 py-4 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition"
         
        >
          ENTER
        </button>
        <button
          className="px-10 py-4 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition"
          
        >
          LEADERBOARD
        </button>
      </div>
    </div>
  );
};

export default Home;
