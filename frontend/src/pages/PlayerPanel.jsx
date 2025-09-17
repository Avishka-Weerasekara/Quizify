import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function PlayerPanel() {
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [error, setError] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizId, setQuizId] = useState(""); // store Firestore doc ID
  const [joined, setJoined] = useState(false);

  const navigate = useNavigate();

  const joinGame = async () => {
    if (!playerName) {
      setError("Please enter your name.");
      return;
    }

    if (!gameCode) {
      setError("Please enter the game code.");
      return;
    }

    try {
      const q = query(
        collection(db, "quiz"),
        where("gameCode", "==", gameCode)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid game code. Please try again.");
        return;
      }

      // If game exists, get its title and Firestore doc ID
      const quizDoc = querySnapshot.docs[0];
      setQuizTitle(quizDoc.data().title);
      setQuizId(quizDoc.id);
      setError("");
      setJoined(true);
    } catch (err) {
      console.error("Error checking game code:", err);
      setError("Failed to join game. Try again later.");
    }
  };

  const startQuiz = () => {
    // Navigate to the Quiz page with state
    navigate("/quizpage", { state: { playerName, gameCode, quizTitle, quizId } });
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
