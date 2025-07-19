import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloudShape from "../../components/CloudShape";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Base } from '../../../Api';

const FacialExpression = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      toast.error("Please upload an image first.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await axios.post(`${Base}ai/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` 
        }
      });

      const moodType = res.data.prediction;
      setResult(moodType);

      // 2. حفظ المزاج في السيرفر
     await axios.post(`${Base}mood/track`, {
      userId: userId,
      moodType: moodType
     }, {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
     }
     });

    } catch (error) {
      console.error("Error analyzing facial expression:", error);
      toast.error("Failed to analyze facial expression.");
    }
  };

  return (
    <div className="bg-white rounded-lg w-full mx-auto text-center relative">
      <ToastContainer />
      <CloudShape />

      {/* زر الرجوع */}
      <div className="absolute z-10" style={{ color: "#FFFFFF", marginTop: "-120px", marginLeft: "40px" }}>
        <div style={{ fontSize: "30px" }} className="w-6 cursor-pointer" onClick={handleBack}>X</div>
      </div>

      <h2 className="text-center text-lg" style={{
        marginTop: "-80px",
        marginRight: "30px",
        fontSize: "2rem",
        marginBottom: "4rem",
        textAlign: "right",
        color: "#0A584F"
      }}>
        Facial Expression
      </h2>

      {/* رفع الصورة */}
      <div className="flex justify-center mb-6">
        <label
          htmlFor="upload"
          className="w-64 h-64 border-4 border-dashed border-[#75D6C6] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#f0fdfa] transition duration-300"
        >
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-[#75D6C6] text-5xl font-bold">+</div>
          )}
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* عرض النتيجة */}
      {result && (
        <div className="mt-6 mb-8 mx-auto w-[80%] max-w-md bg-[#E0F7F4] border-l-4 border-[#0A584F] p-4 rounded-lg shadow-md flex items-center justify-center text-center">
          <h3 className="text-[#0A584F] font-bold text-xl flex items-center gap-2">
            Facial Expression Result:
            <span className="text-[#333] text-base leading-relaxed font-normal">{result}</span>
          </h3>
        </div>
      )}

      {/* زر التحليل */}
      <button
        onClick={handleAnalyze}
        style={{
          width: "20rem",
          fontSize: "20px",
          color: "#FFFFFF",
          backgroundColor: "#75D6C6",
          padding: "10px",
          margin: "20px auto"
        }}
        className="bg-white text-gray-800 py-3 px-2 rounded-lg font-semibold flex flex-col items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1),_0_6px_10px_rgba(0,0,0,0.15)]"
      >
        Analyze Facial Expression
      </button>
    </div>
  );
};

export default FacialExpression;
