import React, { useState } from "react";
import CloudShape from "../../components/CloudShape";
import note from "../../assests/svgs/note.svg";
import xmark from "../../assests/svgs/xmark.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base } from "../../../Api"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Writenote = () => {
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();

const handleSaveNote = async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId || !token) {
    alert("برجاء تسجيل الدخول أولاً.");
    navigate("/login");
    return;
  }

  if (!noteContent.trim()) {
    alert("الملاحظة لا يمكن أن تكون فارغة.");
    return;
  }

  try {
    await axios.post(
      `${Base}personal-notes`,
      {
        content: noteContent,
        userId: parseInt(userId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("تم حفظ الملاحظة بنجاح ✨");
    setNoteContent("");

    // ✅ تحديث localStorage بعد الإضافة
    const response = await axios.get(`${Base}personal-notes/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("personalNotes", JSON.stringify(response.data));
  } catch (error) {
    console.error("Error saving note:", error.response?.data || error.message);
    alert("حدث خطأ أثناء حفظ الملاحظة. حاول مرة أخرى.");
  }
};


  return (
    <div>
            <ToastContainer />
      {/* رأس الصفحة */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <CloudShape />
          <img
            src={note}
            alt="note"
            style={{
              position: "relative",
              bottom: "10rem",
              width: "110px",
            }}
          />
        </div>

        <div>
          <img
            src={xmark}
            alt="xmark"
            style={{
              cursor: "pointer",
              position: "relative",
              left: "80%",
              paddingTop: "30px",
              marginBottom: "1rem",
            }}
            onClick={() => navigate(`/Home`)}
          />
          <h2
            style={{
              fontSize: "2.6rem",
              marginBottom: "6rem",
              paddingRight: "35px",
            }}
          >
            الملاحظات الشخصية
          </h2>
        </div>
      </div>

      {/* محتوى الصفحة */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <textarea
            dir="rtl"
            placeholder="ادخل ملاحظة ....."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            style={{
              height: "200px",
              width: "60%",
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginTop: "1rem",
              marginBottom: "5rem",
              boxShadow: "rgb(59 241 246 / 22%) -6px 7px 12px -5px",
              outline: "none",
              resize: "none",
              fontSize: "18px",
            }}
          />
        </div>

        <button
          className="text-black text-center font-semibold py-2 rounded-md mt-4"
          style={{
            backgroundColor: "#75D6C6",
            padding: "10px 50px",
            marginBottom: "2rem",
            fontSize: "25px",
            width: "fit-content",
          }}
          onClick={handleSaveNote}
        >
          حفظ
        </button>

        <button
          className="text-black text-center font-semibold py-2 rounded-md mt-4"
          style={{
            backgroundColor: "#75D6C6",
            padding: "10px 50px",
            fontSize: "25px",
            width: "fit-content",
          }}
          onClick={() => navigate(`/Home/writenote/allnote`)}
        >
          عرض كل الملاحظات
        </button>
      </div>
    </div>
  );
};

export default Writenote;
