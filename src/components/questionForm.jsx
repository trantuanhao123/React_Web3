import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../css/QuestionForm.module.css";

function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [maNguoiChoi, setMaNguoiChoi] = useState("");
  const [walletAddress, setWalletAddress] = useState(""); // Thêm state cho địa chỉ ví
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get("https://nodejs-web3.onrender.com/v1/api/generateQuestion")
      .then((response) => {
        if (response.data.success) {
          setQuestions(response.data.data);
          const initialAnswers = {};
          response.data.data.forEach((_, index) => {
            initialAnswers[index] = "";
          });
          setAnswers(initialAnswers);
        }
      })
      .catch((error) => console.error("Lỗi tải câu hỏi:", error));
  }, []);

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      maNguoiChoi: maNguoiChoi,
      diaChiVi: walletAddress, // Gửi địa chỉ ví
      questions: questions.map((q) => q.cauHoi),
      answers: Object.values(answers),
    };
    console.log("Dữ liệu gửi đi:", data);
    console.log(data);
    axios
      .post("https://nodejs-web3.onrender.com/v1/api/kiemtra", data)
      .then((response) => {
        if (response.data.success || response.data.isTrue) {
          setMessage("Gửi câu trả lời thành công! Hãy đợi giây lát để kiểm tra.");
        } else {
          setMessage(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại!");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gửi câu trả lời:", error);
        setMessage("Bạn hãy kiểm tra xem tên người chơi đã được tạo chưa hoặc là bạn đã submit form rồi!");
      });
  };

  return (
    <div className={styles.questionContainer}>
      <h2>Kiểm tra kiến thức</h2>
      <h2>Danh sách câu hỏi</h2>
      <p>Lưu ý: Bạn hãy đợi ít phút để đợi phản hồi về kết quả của chúng tôi, nếu bạn vượt qua bạn sẽ được xuất hiện trong danh sách người chiến thắng</p>
      {questions.length > 0 ? (
        <form onSubmit={handleSubmit} className={styles.questionList}>
          <div className={styles.playerName}>
            <label htmlFor="maNguoiChoi">Tên người chơi:</label>
            <input
              type="text"
              id="maNguoiChoi"
              value={maNguoiChoi}
              onChange={(e) => setMaNguoiChoi(e.target.value)}
              required
            />
          </div>

          <div className={styles.walletAddress}>
            <label htmlFor="walletAddress">Địa chỉ ví:</label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
              placeholder="Nhập địa chỉ ví của bạn..."
            />
          </div>

          {questions.map((question, index) => (
            <div key={index} className={styles.questionItem}>
              <div className={styles.questionContent}>
                <p>
                  <strong>Câu hỏi:</strong> {question.cauHoi}
                </p>
              </div>
              <div className={styles.answerSection}>
                <textarea
                  value={answers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Nhập câu trả lời của bạn..."
                  rows="3"
                  style={{ width: "100%", marginTop: "10px" }}
                  required
                />
              </div>
            </div>
          ))}
          <button type="submit" className={styles.submitButton}>
            Gửi câu trả lời
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      ) : (
        <p>Đang tải câu hỏi...</p>
      )}
    </div>
  );
}

export default QuestionForm;
