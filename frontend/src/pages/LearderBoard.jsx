import { useState, useEffect } from "react";

// Mock data for demo
const mockScores = [
  { name: "Alice", score: 5, fastest: true },
  { name: "Bob", score: 4, fastest: false },
  { name: "Charlie", score: 3, fastest: false },
];

export default function Leaderboard({ scores = mockScores, final = false }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Sort by score descending
    const sorted = [...scores].sort((a, b) => b.score - a.score);
    setLeaderboard(sorted);
  }, [scores]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {final ? "Final Leaderboard" : "Live Leaderboard"}
      </h1>

      <ul className="space-y-2">
        {leaderboard.map((player, index) => (
          <li
            key={index}
            className={`flex justify-between p-2 rounded ${
              player.fastest ? "bg-yellow-200 animate-pulse" : "bg-gray-100"
            }`}
          >
            <span className="font-semibold">{index + 1}. {player.name}</span>
            <span className="font-bold">{player.score}</span>
          </li>
        ))}
      </ul>

      {final && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">🏆 Congratulations to the winner!</p>
        </div>
      )}
    </div>
  );
}