import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PredictionsList = () => {
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [diaChiViInput, setDiaChiViInput] = useState("");
    const [noWinnerMessage, setNoWinnerMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const response = await axios.get("https://nodejs-web3.onrender.com/v1/api/getwinner");
                console.log("Dữ liệu trả về từ API:", response.data);

                if (!response.data.success || !Array.isArray(response.data.data) || response.data.data.length === 0) {
                    setNoWinnerMessage("Không có người chiến thắng hôm nay.");
                    setPredictions([]);
                    return;
                }
                setPredictions(response.data.data);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu:", err);
                setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
            }
        };
        fetchPredictions();
    }, []);

    const handleConnectPlayer = (player) => {
        setSelectedPlayer(player);
        setDiaChiViInput("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedPlayer && diaChiViInput === selectedPlayer.diaChiVi) {
            sessionStorage.setItem("connectedPlayer", JSON.stringify(selectedPlayer));
            navigate("/getjobs");
        } else {
            alert("Địa chỉ ví không chính xác. Vui lòng thử lại.");
        }
    };

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div>
            <h2>Danh sách người chiến thắng</h2>
            {noWinnerMessage ? (
                <p style={{ color: "gray", fontStyle: "italic" }}>{noWinnerMessage}</p>
            ) : predictions.length === 0 ? (
                <p>Không có dữ liệu.</p>
            ) : (
                <ul>
                    {predictions.map((pred) => (
                        <li key={pred.maNguoiChoi}>
                            <strong>Mã người chơi: </strong> ***{pred.maNguoiChoi.slice(-4)}
                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => handleConnectPlayer(pred)}
                            >
                                Kết nối
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {selectedPlayer && (
                <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
                    <h3>Kết nối với mã người chơi: ***{selectedPlayer.maNguoiChoi.slice(-4)}</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nhập địa chỉ ví đầy đủ:
                            <input
                                type="text"
                                value={diaChiViInput}
                                onChange={(e) => setDiaChiViInput(e.target.value)}
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
