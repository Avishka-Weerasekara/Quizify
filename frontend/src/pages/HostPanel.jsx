import { useState } from "react";

export default function HostPanel() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [players, setPlayers] = useState([
    { name: "Player 1", score: 0 },
    { name: "Player 2", score: 0 },
  ]);
  const [gameCode, setGameCode] = useState("");

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "question" || field === "answer") {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setQuestions(updated);
  };

  const createGame = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGameCode(code);
    alert("Game Created! Share this code with players: " + code);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert("Quiz Ended!");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Host Panel</h1>

      <input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {questions.map((q, idx) => (
        <div key={idx} className="border p-4 rounded mb-4">
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          {q.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleQuestionChange(idx, i, e.target.value)}
              className="border p-2 rounded w-full mb-1"
            />
          ))}
          <input
            type="text"
            placeholder="Answer"
            value={q.answer}
            onChange={(e) => handleQuestionChange(idx, "answer", e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        Add Question
      </button>
      <button
        onClick={createGame}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Game
      </button>

      {gameCode && <p className="mt-4 text-xl">Game Code: {gameCode}</p>}

      <div className="mt-6">
        <h2 className="text-xl font-bold">Players Joined:</h2>
        <ul>
          {players.map((p, i) => (
            <li key={i}>{p.name}</li>
          ))}
        </ul>

        {questions.length > 0 && currentQuestion < questions.length && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Current Question: {questions[currentQuestion].question}
            </h3>
            <button
              onClick={nextQuestion}
              className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
