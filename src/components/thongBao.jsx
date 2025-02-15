import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PredictionsList = () => {
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [walletInput, setWalletInput] = useState("");
    const [noWinnerMessage, setNoWinnerMessage] = useState(""); // Trạng thái để lưu thông báo không có người thắng
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const response = await axios.get("http://localhost:8080/v1/api/winner");
                console.log("Dữ liệu trả về từ API:", response.data);
                
                if (response.data.message === "Không có người chiến thắng hôm qua") {
                    setNoWinnerMessage("Không có người chiến thắng hôm qua.");
                    setPredictions([]); // Đảm bảo không hiển thị danh sách trống
                    return;
                }

                const data = response.data.data;
                if (!Array.isArray(data)) {
                    throw new Error("Dữ liệu không phải là mảng!");
                }
                setPredictions(data);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu:", err);
                setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
            }
        };
        fetchPredictions();
    }, []);

    const handleConnectWallet = (player) => {
        setSelectedPlayer(player);
        setWalletInput("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (walletInput === selectedPlayer.wallet) {
            sessionStorage.setItem("connectedPlayer", JSON.stringify(selectedPlayer));
            navigate("/getjobs");
        } else {
            alert("Wallet không chính xác. Vui lòng thử lại.");
        }
    };

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div>
            <h2>Danh sách người chiến thắng hôm qua</h2>
            {noWinnerMessage ? (
                <p style={{ color: "gray", fontStyle: "italic" }}>{noWinnerMessage}</p>
            ) : predictions.length === 0 ? (
                <p>Không có dữ liệu.</p>
            ) : (
                <ul>
                    {predictions.map((pred) => (
                        <li key={pred.id || Math.random()}>
                            <strong>Người chơi: </strong> {pred.bank}
                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => handleConnectWallet(pred)}
                            >
                                Kết nối ví
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {selectedPlayer && (
                <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
                    <h3>Kết nối ví cho: {selectedPlayer.bank}</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nhập wallet:
                            <input
                                type="text"
                                value={walletInput}
                                onChange={(e) => setWalletInput(e.target.value)}
                                style={{ marginLeft: "10px" }}
                            />
                        </label>
                        <button type="submit" style={{ marginLeft: "10px" }}>
                            Xác nhận
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PredictionsList;
