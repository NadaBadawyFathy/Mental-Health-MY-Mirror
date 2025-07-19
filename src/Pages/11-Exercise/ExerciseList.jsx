// ExerciseList.jsx
import React, { useEffect, useState } from 'react';
import CloudShape from '../../components/CloudShape';
import { useNavigate } from 'react-router-dom';
import edge from '../../assests/svgs/edge.svg';
import EX from '../../assests/svgs/ex.svg';
import axios from 'axios';
import { Base } from "../../../Api";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  const sportIcons = {
    "الجري": "🏃‍♀️",
    "السباحة": "🏊‍♂️",
    "كرة القدم": "⚽",
    "كرة السلة": "🏀",
    "كرة الطائرة": "🏐",
    "ركوب الدراجة": "🚴",
    "التزلج على الجليد": "⛸️",
    "الرقص": "💃",
    "الجمباز": "🤸",
    "كرة اليد": "🤾",
    "الجولف": "⛳",
    "التنس": "🎾",
    "رفع الأثقال": "🏋️",
    "الفروسية": "🏇",
    "تسلق الجبال": "🧗",
    "التايكوندو": "🥋",
    "اليوغا": "🧘",
    "التجديف": "🚣",
    "تنس الطاولة": "🏓",
    "الملاكمة": "🥊"
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`${Base}exercises/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExercises(res.data);
      } catch (err) {
        console.error("خطأ في جلب التمارين:", err);
      }
    };

    fetchExercises();
  }, [navigate]);

  return (
    <div>
      {/* العنوان */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ position: "relative" }}>
          <CloudShape />
          <img
            src={EX}
            alt="Exercise Logo"
            style={{
              position: "absolute",
              top: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
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
            onClick={() => navigate(`/Home`)}
          />
          <h2 style={{ fontSize: "2.6rem", marginBottom: "4rem", paddingRight: "30px" }} dir="rtl">
            تمارينك الرياضية
          </h2>
        </div>
      </div>

      <h1 style={{ fontSize: "40px", color: "#56D6C1", marginRight: '30px', marginBottom: '30px' }} dir="rtl">أنشطتك</h1>

      {exercises.length === 0 ? (
        <p style={{ fontSize: '22px', textAlign: 'center' }} dir="rtl">لا توجد تمارين محفوظة بعد.</p>
      ) : (
        exercises.map((exercise, idx) => {
          const formattedDate = new Date(exercise.exerciseDate).toLocaleDateString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          const type = exercise.exerciseType;
          const icon = sportIcons[type] || "💪";

          return (
            <div key={idx} dir="rtl" style={{ display: "flex", justifyContent: 'space-between', marginBottom: '30px' }}>
              <div
                style={{
                  display: "flex",
                  gap: '10px',
                  alignItems: 'center',
                  marginRight: '20px',
                }}
              >
                <div
                  className="bg-secondary w-20 h-20 rounded-full"
                  style={{
                    background: "#75D6C6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <h1 className="text-sm font-medium" style={{ fontSize: "25px" }}>{type}</h1>
                  <p style={{ marginTop: '10px', marginRight: '10px', fontSize: '18px' }}>
                    المدة: {exercise.duration} دقيقة
                    <i className="fa-solid fa-check" style={{ fontSize: "20px", color: "green", marginRight: '8px' }}></i>
                  </p>
                </div>
              </div>

              <p style={{ color: '#6E6A6A', marginLeft: '30px', fontSize: '18px' }}>{formattedDate}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ExerciseList;
