// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// export default function PlayerPanel() {
//   const [playerName, setPlayerName] = useState("");
//   const [gameCode, setGameCode] = useState("");
//   const [question, setQuestion] = useState({});
//   const [scores, setScores] = useState({});

//   useEffect(() => {
//     socket.on("nextQuestion", ({ questionIndex }) => {
//       // In real app, fetch question by index from backend or server state
//       setQuestion({ question: Question ${questionIndex + 1}?, options: ["A", "B", "C", "D"] });
//     });

//     socket.on("scoreUpdate", ({ scores }) => setScores(scores));

//     return () => socket.off();
//   }, []);

//   const joinGame = () => {
//     socket.emit("joinGame", { gameCode, playerName });
//   };

//   const submitAnswer = (answer) => {
//     socket.emit("submitAnswer", { gameCode, answer });
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Player Panel</h1>

//       <input
//         type="text"
//         placeholder="Your Name"
//         value={playerName}
//         onChange={(e) => setPlayerName(e.target.value)}
//         className="border p-2 rounded w-full mb-2"
//       />
//       <input
//         type="text"
//         placeholder="Game Code"
//         value={gameCode}
//         onChange={(e) => setGameCode(e.target.value)}
//         className="border p-2 rounded w-full mb-4"
//       />
//       <button onClick={joinGame} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
//         Join Game
//       </button>

//       {question.question && (
//         <div className="border p-4 rounded mb-4">
//           <h2 className="text-xl mb-2">{question.question}</h2>
//           {question.options?.map((opt, i) => (
//             <button
//               key={i}
//               onClick={() => submitAnswer(opt)}
//               className="block w-full mb-2 p-2 border rounded hover:bg-gray-200"
//             >
//               {opt}
//             </button>
//           ))}
//         </div>
//       )}

//       <div>
//         <h2 className="text-xl font-bold">Scores:</h2>
//         <ul>
//           {Object.values(scores).map((p, i) => (
//             <li key={i}>
//               {p.name}: {p.score}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }