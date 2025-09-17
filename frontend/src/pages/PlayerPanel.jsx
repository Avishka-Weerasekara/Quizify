import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data for demo (replace with backend API later)
const mockGames = {
  "123456": { title: "General Knowledge Quiz" },
  "654321": { title: "Science Quiz" },
};

export default function PlayerPanel() {
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [error, setError] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [joined, setJoined] = useState(false);

  const navigate = useNavigate();

  const joinGame = () => {
    if (!playerName) {
      setError("Please enter your name.");
      return;
    }

    // Check if the game code exists
    if (!mockGames[gameCode]) {
      setError("Invalid game code. Please try again.");
      return;
    }

    setError("");
    setQuizTitle(mockGames[gameCode].title);
    setJoined(true);
  };

  const startQuiz = () => {
    // Navigate to the Quiz page with state
    navigate("/quiz", { state: { playerName, gameCode, quizTitle } });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Player Panel</h1>

      {!joined ? (
        <>
          <input
            type="text"
            placeholder="Your Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Game Code"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <button
            onClick={joinGame}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Join Game
          </button>
        </>
      ) : (
        <>
          <p className="mb-4 text-lg">
            You are joining: <strong>{quizTitle}</strong>
          </p>
          <button
            onClick={startQuiz}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Start Quiz
          </button>
        </>
      )}
    </div>
  );
}
