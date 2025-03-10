import React, { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const storedWinner = sessionStorage.getItem("connectedPlayer");
    if (!storedWinner) {
      setWinner(null);
      setLoading(false);
      return;
    }

    setWinner(JSON.parse(storedWinner));

    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://nodejs-web3.onrender.com/v1/api/getjob");
        if (response.data.success) {
          setJobs(response.data.data);
        } else {
          throw new Error("Dữ liệu không hợp lệ");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
    setAnswer("");
    setErrorMessage("");
  };

  const handleSubmitAnswer = async () => {
    if (!selectedJob || !winner) return;
  
    const userAnswer = answer.trim().toLowerCase().replace(/\.$/, ""); 
    const correctAnswer = selectedJob.correctAnswer.trim().toLowerCase().replace(/\.$/, "");
  
    if (userAnswer !== correctAnswer) {
      setErrorMessage("Câu trả lời chưa chính xác. Vui lòng thử lại!");
      return;
    }
  
    const dataToSend = {
      jobTitle: selectedJob.title,
      userAnswer: answer,
      maNguoiChoi: winner.maNguoiChoi,
      diaChiVi: winner.diaChiVi,
    };
  
    try {
      const response = await axios.post("https://nodejs-web3.onrender.com/v1/api/createwinner", dataToSend);
      if (response.data.success) {
        alert(`Ứng tuyển thành công cho công việc: ${selectedJob.title}`);
        setSelectedJob(null);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (err) {
      alert(`Lỗi: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!winner) return <p style={{ color: "gray", fontStyle: "italic" }}>Bạn không chiến thắng</p>;
  if (error) return <p style={{ color: "red" }}>Lỗi: {error}</p>;

  return (
    <div>
      <h2>Danh sách công việc</h2>
      <h3>Lưu ý: Bạn chỉ có thể ứng tuyển một lần, việc lặp lại sẽ cập nhật đơn ứng tuyển của bạn</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Ứng tuyển</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>
                <button onClick={() => handleApply(job)}>Ứng tuyển</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedJob && (
        <div className="modal">
          <div className="modal-content">
            <h3>Ứng tuyển: {selectedJob.title}</h3>
            <p><strong>Câu hỏi:</strong> {selectedJob.question}</p>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Nhập câu trả lời của bạn..."
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="modal-actions">
              <button onClick={handleSubmitAnswer}>Gửi</button>
              <button onClick={() => setSelectedJob(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          width: 300px;
        }
        .modal-actions {
          margin-top: 10px;
          display: flex;
          justify-content: space-around;
        }
        textarea {
          width: 100%;
          height: 80px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default JobList;
