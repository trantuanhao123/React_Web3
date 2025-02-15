import { useState } from "react";
import axios from "axios";

export default function BitcoinPredictionForm() {
  const [wallet, setWallet] = useState("");
  const [bank, setBank] = useState("");
  const [btc, setBtc] = useState(""); // Số BTC trong ví (người dùng nhập)
  const [predictPrice, setPredictPrice] = useState("");
  const [price, setPrice] = useState(null);
  const [message, setMessage] = useState("");

  const fetchBitcoinPrice = async () => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
      setPrice(response.data.bitcoin.usd);
    } catch (error) {
      console.error("Lỗi khi lấy giá Bitcoin:", error);
      alert("Không thể lấy giá Bitcoin, vui lòng thử lại!");
    }
  };

  const submitPrediction = async () => {
    
    if (!wallet.trim() || !bank.trim() || !predictPrice.trim() || !btc.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const btcValue = parseFloat(btc);
    const predictPriceValue = parseFloat(predictPrice);

    if (isNaN(btcValue) || btcValue <= 0) {
      alert("Số BTC phải là số hợp lệ và lớn hơn 0!");
      return;
    }

    if (isNaN(predictPriceValue) || predictPriceValue <= 0) {
      alert("Giá dự đoán phải là số hợp lệ và lớn hơn 0!");
      return;
    }

    // Tạo object dữ liệu
    const predictionData = {
      wallet,
      bank,
      btc: btcValue, 
      predictPrice: predictPriceValue,
    };

    console.log("Dữ liệu gửi đi:", predictionData);

    try {
      const response = await axios.post("http://localhost:8080/v1/api/createprediction", predictionData);
      setMessage("Dự đoán đã được lưu thành công, nếu tài khoản của bạn đã dự đoán sẽ được cập nhật với dữ liệu mới nhất");
      alert("Dữ liệu đã được lưu vào cơ sở dữ liệu!");
    } catch (error) {
      console.error("Lỗi khi lưu dự đoán:", error);
      alert("Lưu dữ liệu thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="w-96 p-4 bg-gray-800 shadow-lg rounded-lg text-white">
      <h2 className="text-xl font-semibold text-center">Dự Đoán Giá Bitcoin</h2>
      <div className="flex flex-col gap-3 mt-4">
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="Nhập địa chỉ ví"
          className="p-2 bg-gray-700 rounded-md"
        />
        <input
          type="text"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          placeholder="Nhập tên ngân hàng"
          className="p-2 bg-gray-700 rounded-md"
        />
        <input
          type="number"
          step="0.000001"
          value={btc}
          onChange={(e) => setBtc(e.target.value)}
          placeholder="Số BTC trong ví"
          className="p-2 bg-gray-700 rounded-md"
        />
        <input
          type="number"
          value={predictPrice}
          onChange={(e) => setPredictPrice(e.target.value)}
          placeholder="Nhập dự đoán giá (USD)"
          className="p-2 bg-gray-700 rounded-md"
        />
        <button
          onClick={fetchBitcoinPrice}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Lấy Giá Hiện Tại
        </button>
        {price && <p className="text-lg font-medium">Giá hiện tại: ${price}</p>}
        <button
          onClick={submitPrediction}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Gửi Dự Đoán
        </button>
        {message && <p className="text-center text-sm text-yellow-400">{message}</p>}
      </div>
    </div>
  );
}
