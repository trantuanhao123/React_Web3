import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

export default function CreateWallet() {
  const [wallet, setWallet] = useState(null);
  const [walletName, setWalletName] = useState("");
  const [error, setError] = useState(null);

  const createWallet = async () => {
    console.log("Hàm createWallet được gọi");

    if (!walletName.trim()) {
      setError("Vui lòng nhập tên ví!");
      setWallet(null);
      return;
    }

    try {
      const newWallet = ethers.Wallet.createRandom();
      const balance = Math.floor(100000 + Math.random() * 900000);

      const walletData = {
        wallet: newWallet.address,
        bank: walletName,
        mnemonic: newWallet.mnemonic.phrase,
        btc: balance,
      };

      // Gửi dữ liệu lên MongoDB
      const response = await axios.post(
        "http://localhost:8080/v1/api/createwallet",
        walletData
      );

      // ✅ Đảm bảo dữ liệu hiển thị không bị mất
      setWallet({
        wallet: response.data.wallet || walletData.wallet,
        bank: response.data.bank || walletData.bank,
        mnemonic: response.data.mnemonic || walletData.mnemonic,
        btc: response.data.btc || walletData.btc,
      });

      setError(null);
      alert("Ví đã được lưu vào cơ sở dữ liệu!");
    } catch (err) {
      console.error("Lỗi khi lưu ví:", err);
      setError("Lưu ví thất bại có thể do tên ví đã tồn tại");
      setWallet(null);
    }
  };

  return (
    <div className="w-96 p-4 bg-gray-800 shadow-lg rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-xl font-semibold">Tạo Ví</h2>
        <input
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          placeholder="Nhập tên ví của bạn"
          className="p-2 bg-gray-700 rounded-md text-white w-full"
        />
        <button onClick={createWallet} disabled={!walletName.trim()}>
          Tạo Ví
        </button>
        {error && <p className="text-red-500">{error}</p>}

        {wallet && !error && (
          <div className="break-all text-left text-sm bg-gray-700 p-2 rounded-md w-full">
            <p><strong>Bitcoin Wallet:</strong> {wallet.wallet || "Không có dữ liệu"}</p>
            <p><strong>Tài Khoản Ngân Hàng:</strong> {wallet.bank || "Không có dữ liệu"}</p>
            <p><strong>Mnemonic:</strong> {wallet.mnemonic || "Không có dữ liệu"}</p>
            <p><strong>Số Dư:</strong> {wallet.btc !== undefined ? `${wallet.btc} BTC` : "Không có dữ liệu"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
