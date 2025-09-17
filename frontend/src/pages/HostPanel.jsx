import { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function HostPanel() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [gameCode, setGameCode] = useState("");
  const [players, setPlayers] = useState([]);

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

  const createGame = async () => {
    if (!quizTitle) {
      alert("Please enter a quiz title.");
      return;
    }

    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGameCode(code);

    try {
      // 1️⃣ Create main quiz document
      const quizRef = doc(collection(db, "quiz")); // Auto-ID
      await setDoc(quizRef, {
        title: quizTitle,
        createdAt: serverTimestamp(),
        gameCode: code,
      });

      // 2️⃣ Create subcollection 'question-array' for each question
      for (const q of questions) {
        await addDoc(collection(quizRef, "question-array"), {
          question: q.question,
          option1: q.options[0],
          option2: q.options[1],
          option3: q.options[2],
          option4: q.options[3],
          answer: q.answer,
        });
      }

      alert("Game Created! Share this code with players: " + code);
    } catch (err) {
      console.error("Error creating quiz:", err);
      alert("Failed to create quiz. See console for details.");
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

      <div className="flex gap-2">
        <button
          onClick={addQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Question
        </button>
        <button
          onClick={createGame}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Game
        </button>
      </div>

      {gameCode && <p className="mt-4 text-xl">Game Code: {gameCode}</p>}
    </div>
  );
}
