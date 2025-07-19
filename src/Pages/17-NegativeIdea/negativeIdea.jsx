import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloudShape from "../../components/CloudShape";
import img from '../../assests/svgs/idea.png';
import { toast, ToastContainer } from "react-toastify";
import { Base } from '../../../Api';

const NegativeIdea = () => {
  const navigate = useNavigate();
  const [thought, setThought] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  const handleIdeaPageHome = () => {
    navigate('/Home');
  };

  const handleAction = async (actionType) => {
    if (actionType === "Analyze Thought") {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${Base}ai/predict`,
          { text: thought },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        setAnalysisResult(res.data.prediction);
      } catch (error) {
        console.error("Error analyzing thought:", error);
        toast.error("Failed to analyze the thought. Please try again.");
      }
    } else {
      alert(`Action performed: ${actionType}\nFor the thought:\n"${thought}"`);
    }
  };

  return (
    <div className="bg-white rounded-lg w-full mx-auto text-center relative">
      <ToastContainer />
      <CloudShape />

      {/* Close Button */}
      <div className="absolute z-10" style={{ color: "#FFFFFF", marginTop: "-120px", marginLeft: "40px" }}>
        <div style={{ fontSize: "30px" }} className="w-6 cursor-pointer" onClick={handleIdeaPageHome}>X</div>
      </div>

      <h2 className="text-center text-lg" style={{
        marginTop: "-80px",
        marginRight:"30px",
        fontSize: "2rem",
        marginBottom: "6rem",
        textAlign: "right",
        color: "#0A584F"
      }}>
        Dealing with Negative Thoughts
      </h2>

      {/* Image */}
      <div className="mt-4" style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={img}
          alt="idea"
          style={{ maxWidth: "300px", borderRadius: "20px" }}
        />
      </div>

      {/* Textarea */}
      <div style={{
        padding: "20px",
        width: "22rem",
        height: "190px",
        margin: "50px auto 10px",
        borderTop: "3px solid #eee",
        borderLeft: "3px solid #eee",
        borderRight: "3px solid #eee",
        borderBottom: "3px solid rgb(118, 204, 190)",
        borderRadius: "10px"
      }}>
        <textarea dir='ltr'
          placeholder="Write your thoughts here..."
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            border: "none",
            outline: "none",
            padding: "10px",
            fontSize: "16px",
            textAlign: "left"
          }}
        />
      </div>

      {/* Analysis Result */}
      {analysisResult && (
  <div className="mt-6 mb-8 mx-auto w-[80%] max-w-md bg-[#E0F7F4] border-l-4 border-[#0A584F] p-4 rounded-lg shadow-md flex items-center justify-center text-center">
    <h3 className="text-[#0A584F] font-bold text-xl flex items-center gap-2">
      Analysis Result:
      <span className="text-[#333] text-base leading-relaxed font-normal">{analysisResult}</span>
    </h3>
  </div>
)}


      {/* Buttons */}
      {["Analyze Thought", "Facial Expression", "Guided Meditation & Options", "Breathing Exercises"].map((label) => (
  <button
    key={label}
    onClick={() => {
      if (label === "Facial Expression") {
        navigate('/facial-expression'); // الانتقال للصفحة الجديدة
      } else if (label === "Guided Meditation & Options") {
        navigate('/Home/clear-mind/meditation');
       }  // الانتقال للصفحة الجديدة
       else if (label === "Breathing Exercises") {
        navigate('/Home/clear-mind/breathing');
       }
      else {
        handleAction(label);
      }
    }}
    style={{
      width: "20rem",
      fontSize: "20px",
      margin: "20px auto",
      color: "#FFFFFF",
      backgroundColor: "#75D6C6",
      padding: "10px"
    }}
    className="bg-white text-gray-800 py-3 px-2 rounded-lg font-semibold flex flex-col items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1),_0_6px_10px_rgba(0,0,0,0.15)]"
  >
    {label}
  </button>
))}

    </div>
  );
};

export default NegativeIdea;
