import BitcoinPredictionForm from "../components/bitcoinPredictionForm";
import CreateWallet from "../components/createWallet";
import ThongBao from "../components/thongBao";
export default function BitcoinPrediction() {
  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Dự Đoán Giá Bitcoin</h1>
      <CreateWallet/>
      <BitcoinPredictionForm />
      <ThongBao />
    </div>
  );
}
