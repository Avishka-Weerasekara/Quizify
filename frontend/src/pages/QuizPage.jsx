import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function QuizPage() {
  const location = useLocation();
  const { playerName, quizId, quizTitle } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(10);
  const [scores, setScores] = useState([{ name: playerName, score: 0 }]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetch questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) return;

      const qCol = collection(db, "quiz", quizId, "question-array");
      const snapshot = await getDocs(qCol);

      const fetchedQuestions = snapshot.docs.map((doc) => {
        const data = doc.data();
        const options = [data.option1, data.option2, data.option3, data.option4];
        const correct = options.findIndex((opt) => opt === data.answer);

        return {
          id: doc.id,
          question: data.question,
          options,
          correct,
        };
      });

      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, [quizId]);

  const question = questions[currentQ];

  // Countdown timer
  useEffect(() => {
    if (quizFinished || !question) return;

    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else {
      checkAnswer();
    }
  }, [timer, quizFinished, question]);

  const checkAnswer = () => {
    if (!question) return;

    const correct = selected === question.correct;

    setFeedback(correct ? "✅ Correct" : "❌ Wrong");

    // Update score
    setScores((prev) => {
      const updated = [...prev];
      const idx = updated.findIndex((p) => p.name === playerName);
      if (idx >= 0) {
        if (correct) updated[idx].score += 1;
      } else {
        updated.push({ name: playerName, score: correct ? 1 : 0 });
      }
      return updated;
    });

    // Move to next question or finish quiz
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setFeedback("");
        setTimer(10);
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  const handleAnswerClick = (index) => {
    if (!feedback) setSelected(index);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">{quizTitle}</h2>
      <p className="text-gray-600 mb-4">Player: {playerName}</p>

      {!quizFinished && question ? (
        <>
          <p className="mb-2">⏳ Time left: {timer}s</p>
          <h3 className="text-lg font-semibold mb-3">{question.question}</h3>
          <div className="space-y-2">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswerClick(i)}
                disabled={feedback !== ""}
                className={`w-full p-2 rounded border ${
                  selected === i ? "bg-blue-200" : "bg-white"
                } ${feedback && i === question.correct ? "opacity-50" : ""}`}
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback && (
            <p className="mt-4 text-lg font-bold text-center">{feedback}</p>
          )}

          {/* Live leaderboard */}
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Live Leaderboard</h3>
            <ul className="space-y-1">
              {scores
                .sort((a, b) => b.score - a.score)
                .map((p, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between bg-gray-100 p-2 rounded"
                  >
                    <span>{idx + 1}. {p.name}</span>
                    <span className="font-bold">{p.score}</span>
                  </li>
                ))}
            </ul>
          </div>
        </>
      ) : quizFinished ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">Quiz Finished!</h2>
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Final Leaderboard</h3>
            <ul className="space-y-1">
              {scores
                .sort((a, b) => b.score - a.score)
                .map((p, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between bg-yellow-200 p-2 rounded animate-pulse"
                  >
                    <span>{idx + 1}. {p.name}</span>
                    <span className="font-bold">{p.score}</span>
                  </li>
                ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}
