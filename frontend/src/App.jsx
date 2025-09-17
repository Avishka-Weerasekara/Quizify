import { Routes, Route } from "react-router-dom";  // ✅ add this

import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import NavigatePage from "./Pages/NavigatePage";
import HostPanel from "./Pages/HostPanel";
import PlayerPanel from "./Pages/PlayerPanel";
import QuizPage from "./Pages/QuizPage";
import Leaderboard from "./Pages/LearderBoard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/navigatepage" element={<NavigatePage />} />
      <Route path="/hostpanel" element={<HostPanel />} />
      <Route path="/playerpanel" element={<PlayerPanel />} />
      <Route path="/quizpage" element={<QuizPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};

export default App;
