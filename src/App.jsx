import { Routes, Route } from "react-router-dom";
import Game from "./pages/game";
import GetJobs from "./pages/getJob";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/getjobs" element={<GetJobs />} />
    </Routes>
  );
}