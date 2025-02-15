import { Routes, Route } from "react-router-dom";
import BitcoinPrediction from "./pages/bitcoinPrediction";
import GetJobs from "./pages/getJob";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BitcoinPrediction />} />
      <Route path="/getjobs" element={<GetJobs />} />
    </Routes>
  );
}
