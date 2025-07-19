import React from "react";
import CloudShape from "../../components/CloudShape";
import newgoal from "../../assests/svgs/newgoal.svg";
import edge from "../../assests/svgs/edge.svg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Base } from "../../../Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeterminCopmlete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { goalTitle, goalId } = location.state || {};

  const rawGoal = localStorage.getItem("lastGoal");
  let lastGoal = null;

  try {
    lastGoal = JSON.parse(rawGoal);
  } catch (e) {
    console.error("❌ Error parsing lastGoal:", e);
  }

  const idToUse = goalId || (lastGoal && lastGoal.goalId);

 const handleUpdateStatus = (status) => {
  const existingGoals = JSON.parse(localStorage.getItem("goals")) || [];
  const updatedGoals = existingGoals.map((goal) => {
    if (goal.id === idToUse) {
      return { ...goal, done: status === "complete" };
    }
    return goal;
  });

  localStorage.setItem("goals", JSON.stringify(updatedGoals));

  toast.success(
    status === "complete"
      ? "تم تحديد الهدف كمكتمل"
      : "تم تحديد الهدف كغير مكتمل"
  );

  if (status === "complete") {
    navigate("/Home/NewGoal/CopmpleteGoal");
  } else {
    navigate("/Home/NewGoal/AllGoal");
  }
};


  return (
    <div>
      <ToastContainer />
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <CloudShape />
          <img
            src={newgoal}
            alt="New goal"
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
            alt="back"
            style={{
              cursor: "pointer",
              position: "relative",
              left: "72%",
              paddingTop: "30px",
              marginBottom: "1rem",
              width: "45px",
            }}
            onClick={() => navigate("/Home/NewGoal")}
          />
          <h2
            style={{
              fontSize: "2.6rem",
              marginBottom: "6rem",
              paddingRight: "35px",
            }}
          >
            تحديد الهدف
          </h2>
        </div>
      </div>

      {/* Goal Display */}
      <div
        style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
      >
        <p
          style={{
            height: "60%",
            width: "50%",
            padding: "1rem",
            borderRadius: "10px",
            backgroundColor: "#F8F8F8",
            marginTop: "1rem",
            marginBottom: "10rem",
            fontSize: "25px",
          }}
        >
          {goalTitle || "لا يوجد هدف"}
        </p>
      </div>

      {/* Actions */}
      <div
        className="flex items-center justify-center"
        style={{ paddingBottom: "8rem" }}
      >
        <form
          className="flex flex-col gap-3 text-right items-center"
          style={{ fontSize: "25px", width: "60%", textAlign: "center" }}
        >
          <button
            className="text-black text-center font-semibold py-2 rounded-md mt-4"
            style={{
              backgroundColor: "#F8F8F8",
              fontWeight: "300",
              padding: "5px 70px",
            }}
            type="button"
            onClick={() => handleUpdateStatus("complete")}
          >
            !اكتمال
          </button>
          <button
            className="text-black text-center font-semibold py-2 rounded-md mt-4"
            style={{
              backgroundColor: "#F8F8F8",
              fontWeight: "300",
              padding: "5px 45px",
            }}
            type="button"
            onClick={() => handleUpdateStatus("not-complete")}
          >
            !عدم اكتمال
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeterminCopmlete;
