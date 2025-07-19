// Newgoal.jsx
import React, { useState } from "react";
import CloudShape from "../../components/CloudShape";
import newgoal from "../../assests/svgs/newgoal.svg";
import xmark from "../../assests/svgs/xmark.svg";
import bell from "../../assests/svgs/bell.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base } from "../../../Api";

const Newgoal = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  const handleSave = () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    toast.error("برجاء تسجيل الدخول أولاً.");
    navigate("/login");
    return;
  }

  const trimmedGoal = goal.trim();
  if (!trimmedGoal || !targetDate || !reminderTime) {
    toast.warning("من فضلك ادخل جميع البيانات المطلوبة.");
    return;
  }

  if (/^[.\s\-_,]+$/.test(trimmedGoal)) {
    toast.warning("من فضلك ادخل هدفًا واضحًا وليس فقط رموز.");
    return;
  }

  const newGoal = {
    id: Date.now(), // ID مؤقت محلي
    goalTitle: trimmedGoal,
    targetDate,
    reminderTime,
    userId,
    done: false,
  };

  // إضافة الهدف إلى localStorage
  const existingGoals = JSON.parse(localStorage.getItem("goals")) || [];
  const updatedGoals = [...existingGoals, newGoal];
  localStorage.setItem("goals", JSON.stringify(updatedGoals));
  localStorage.setItem("lastGoal", JSON.stringify(newGoal));

  navigate("/Home/NewGoal/DeterminCopmplete", {
    state: { goalTitle: newGoal.goalTitle, goalId: newGoal.id },
  });
};


  return (
    <div>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <CloudShape />
          <img src={newgoal} alt="New goal" style={{ position: "relative", bottom: "10rem", width: "110px" }} />
        </div>
        <div>
          <img src={xmark} alt="xmark" style={{ cursor: "pointer", position: "relative", left: "80%", paddingTop: "30px", marginBottom: "1rem" }} onClick={() => navigate("/Home")} />
          <h2 style={{ fontSize: "2.6rem", marginBottom: "6rem", paddingRight: "35px" }}>تحديد الهدف</h2>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <textarea
          dir="rtl"
          placeholder="ادخل هدفك ....."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={{ height: "200px", width: "60%", padding: "0.75rem", borderRadius: "10px", border: "1px solid #ccc", marginTop: "1rem", marginBottom: "5rem", boxShadow: "rgb(179 171 171) -6px 7px 12px -5px", outline: "none", fontSize: "18px" }}
        />

        <div style={{ marginTop: "1.5rem", textAlign: "right", marginRight: "35px" }}>
          <p style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>عايز تحقق الهدف ده امتى؟</p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-end", marginBottom: "2rem" }}>
            <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} style={{ fontSize: "1rem", padding: "0.5rem", borderRadius: "8px", border: "1px solid rgb(247 237 237)", direction: "rtl" }} />
            <label style={{ fontSize: "1.1rem" }}>: التاريخ</label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-end", marginBottom: "5rem" }}>
            <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} style={{ fontSize: "1rem", padding: "0.5rem", borderRadius: "8px", border: "1px solid rgb(247 237 237)", direction: "rtl" }} />
            <label style={{ fontSize: "1.1rem" }}>: وقت التذكير</label>
          </div>
        </div>

        <button onClick={handleSave} className="text-black font-semibold py-2 rounded-md mt-4" style={{ backgroundColor: "#75D6C6", padding: "10px 50px", marginBottom: "2rem", fontSize: "25px" }}>حفظ</button>
        <button onClick={() => navigate("/Home/NewGoal/AllGoal")} className="text-black font-semibold py-2 rounded-md mt-2" style={{ backgroundColor: "#75D6C6", padding: "10px 50px", fontSize: "20px", display:'block', margin:'auto' }}>عرض كل الاهداف</button>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <div style={{ border: "2px solid #ccc", padding: "1rem", borderRadius: "10px", display: "flex", justifyContent: "right", alignItems: "center", width: "40%", fontSize: "0.85rem", backgroundColor: "#fff" }}>
            <p style={{ marginRight: "15px", fontSize: "18px" }}>هفكرك بالموعد ف بداية اليوم ال انت حددته</p>
            <img src={bell} alt="bell" style={{ width: "45px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newgoal;
