// import BitcoinPredictionForm from "../components/bitcoinPredictionForm";
//import CreateWallet from "../components/createWallet";
import ThongBao from "../components/thongBao";
import AskGemini from "../components/askGemini";
import CreatePlayer from "../components/createPlayer";
import QuestionForm from "../components/questionForm";
// import GetResponse from "../components/getResponse";
export default function BitcoinPrediction() {
  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Mô hình tuyển dụng ngành IT theo Blockchain</h1>
      <AskGemini />
      {/* <CreateWallet/> */}
      <CreatePlayer/>
      <QuestionForm/>
      {/* <GetResponse/> */}
      {/* <BitcoinPredictionForm /> */}
      <ThongBao />
    </div>
  );
}
