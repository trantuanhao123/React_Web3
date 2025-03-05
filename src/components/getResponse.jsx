// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AskGemini() {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchQuestionsAndAnswers = async () => {
//       setLoading(true);
//       setError("");
  
//       try {
//         const response = await axios.get("https://nodejs-web3.onrender.com/v1/api/getquestion");
//         if (response.data.success) {
//           setQuestions(response.data.data);
  
//           // Thu thập tất cả promise gửi request đến API Gemini
//           const answerPromises = response.data.data.map(async (question) => {
//             const prompt = `${question.cauHoi}. Trả lời thật ngắn gọn, ví dụ: Facebook, HTML, Node.js`;
//             console.log("Gửi prompt đến Gemini:", prompt); // Log prompt trước khi gửi
  
//             try {
//               const answerResponse = await axios.post("https://nodejs-web3.onrender.com/v1/api/ask", {
//                 question: prompt,
//               });
//               console.log("Phản hồi từ Gemini:", answerResponse.data.data.response);
//               return { id: question._id, response: answerResponse.data.data.response };
//             } catch (err) {
//               console.error("Lỗi khi gọi Gemini API:", err);
//               return { id: question._id, response: "Lỗi khi lấy câu trả lời" };
//             }
//           });
//           const answersData = await Promise.all(answerPromises);
//           const newAnswers = answersData.reduce((acc, { id, response }) => {
//             acc[id] = response;
//             return acc;
//           }, {});
//           setAnswers(newAnswers);
//         } else {
//           setError("Không thể lấy dữ liệu câu hỏi.");
//         }
//       } catch (err) {
//         setError("Không thể kết nối đến API câu hỏi.");
//         console.error("Lỗi khi gọi API getquestion:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchQuestionsAndAnswers();
//   }, []);
// }  
