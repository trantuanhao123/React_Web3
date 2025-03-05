import React, { useState } from "react";
import axios from "axios";

export default function AskGemini() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError("Vui lòng nhập câu hỏi!");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
        const response = await axios.post("https://nodejs-web3.onrender.com/v1/api/ask", {
            question, 
          });
      setAnswer(response.data.data.response);
    } catch (err) {
      setError("Không thể lấy câu trả lời. Vui lòng thử lại!");
      console.error("Lỗi khi gọi Gemini API:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold">Bạn muốn truy vấn AI?</h2>
      <p className="text-sm text-gray-400">Hãy đặt câu hỏi bên dưới</p>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-gray-800 shadow-lg rounded-lg">
        <div className="flex flex-col gap-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Nhập câu hỏi của bạn"
            className="p-2 bg-gray-700 rounded-md text-white w-full h-24 resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-500"
          >
            {loading ? "Đang xử lý..." : "Gửi câu hỏi"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {answer && (
        <div className="w-full max-w-md p-4 bg-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold">Câu trả lời từ Gemini:</h2>
          <p className="mt-2">{answer}</p>
        </div>
      )}
    </div>
  );
}