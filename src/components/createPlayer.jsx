import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

export default function CreatePlayer() {
  const [error, setError] = useState(null);
  const [name, setName] = useState(""); // Tên người chơi
  const [wallet, setWallet] = useState(null);

  const createPlayer = async () => {
    if (!name.trim()) {
      setError("Vui lòng nhập tên người chơi!");
      setWallet(null);
      return;
    }

    try {
      const newWallet = ethers.Wallet.createRandom();

      const playerData = {
        name: name, 
        walletAddress: newWallet.address, 
        tokenBalance: 0,
      };
      const response = await axios.post(
        "https://nodejs-web3.onrender.com/v1/api/createplayer",
        playerData
      );
      setWallet(response.data.data);
      console.log("Dữ liệu post: ", wallet);
      setError(null);
      alert("Ví đã được lưu vào cơ sở dữ liệu!");
    } 
    catch (err) {
      console.error("Lỗi khi lưu ví:", err);
      setError("Lưu ví thất bại, có thể do tên người chơi đã tồn tại");
      setWallet(null);
    }
  };
  return (
    <div className="w-96 p-4 bg-gray-800 shadow-lg rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-xl font-semibold text-white">Khai báo thông tin</h2>
        <p className="text-white">Lưu ý: Bạn không cần nhập thông tin cá nhân</p>
        <p className="text-white">Lưu ý: Đảm bảo bạn ghi chú lại địa chỉ ví của mình</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên người chơi"
          className="p-2 bg-gray-700 rounded-md text-white w-full"
        />
        <button
          onClick={createPlayer}
          disabled={!name.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-500"
        >
          Tạo tài khoản
        </button>
        {error && <p className="text-red-500">{error}</p>}

        {wallet && !error && (
          <div className="break-all text-left text-sm bg-gray-700 p-2 rounded-md w-full text-white">
            <p><strong>Người Chơi:</strong> {wallet.name || "Không có dữ liệu"}</p>
            <p><strong>Địa Chỉ Ví:</strong> {wallet.walletAddress || "Không có dữ liệu"}</p>
            <p><strong>Số Dư:</strong> {wallet.tokenBalance !== undefined ? `${wallet.tokenBalance} Token` : "Không có dữ liệu"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
