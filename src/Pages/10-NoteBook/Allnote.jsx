import React, { useEffect, useState } from "react";
import CloudShape from "../../components/CloudShape";
import note from "../../assests/svgs/note.svg";
import edge from "../../assests/svgs/edge.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base } from "../../../Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Allnote = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    const localNotes = localStorage.getItem("personalNotes");
    if (localNotes) {
      setNotes(JSON.parse(localNotes));
      setLoading(false);
    } else {
      axios
        .get(`${Base}personal-notes/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setNotes(res.data);
          localStorage.setItem("personalNotes", JSON.stringify(res.data));
        })
        .catch((error) => {
          toast.error("حدث خطأ أثناء تحميل الملاحظات");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleDelete = (noteId) => {
    toast.info(
      <div>
        <p style={{ marginBottom: "10px" }}>هل أنت متأكد من حذف الملاحظة؟</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => {
              confirmDelete(noteId);
              toast.dismiss(); // إغلاق التوست
            }}
            style={{
              padding: "5px 15px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            نعم
          </button>
          <button
            onClick={() => toast.dismiss()}
          >
            إلغاء
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const confirmDelete = (noteId) => {
    const updatedNotes = notes.filter((n) => n.id !== noteId);
    setNotes(updatedNotes);
            localStorage.setItem("personalNotes", JSON.stringify(updatedNotes));
    toast.success("تم حذف الملاحظة بنجاح ✅", {
      position: "bottom-center",
    });
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
            src={edge}
            alt="edge"
            style={{
              cursor: "pointer",
              position: "relative",
              left: "80%",
              paddingTop: "30px",
              marginBottom: "1rem",
            }}
            onClick={() => navigate(`/Home/writenote`)}
          />
          <h2
            style={{
              fontSize: "2.6rem",
              marginBottom: "6rem",
              paddingRight: "35px",
            }}
          >
            كل الملاحظات
          </h2>
        </div>
      </div>

      {/* المحتوى */}
      <div
        style={{
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <p style={{ fontSize: "24px", marginTop: "100px" }}>جاري التحميل...</p>
        ) : notes.length === 0 ? (
          <p style={{ fontSize: "24px", color: "#888", marginTop: "100px" }}>
            لا يوجد ملاحظات مضافة
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            {notes.map((note) => (
              <div
                key={note.id}
                style={{
                  background: "#FCFCFC",
                  borderRadius: "10px",
                  border: "1px solid #D6D1D1",
                  padding: "2rem 1rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "250px",
                  position: "relative",
                }}
              >
                <p style={{ fontWeight: "bold", flex: 1 }}>{note.content}</p>

                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    border: "1px solid #D6D1D1",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1rem",
                    position: "relative",
                    bottom: "-30%",
                  }}
                >
                  <button
                    onClick={() => handleDelete(note.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "red", fontSize: "25px" }}
                    ></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Allnote;
