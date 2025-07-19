import React, { useEffect, useState } from "react";
import CloudShape from "../../components/CloudShape";
import newgoal from "../../assests/svgs/newgoal.svg"; 
import edge from "../../assests/svgs/edge.svg"; 
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AllGoal = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [goals, setGoals] = useState([]);

  useEffect(() => {
  const existingGoals = JSON.parse(localStorage.getItem("goals")) || [];
  setGoals(existingGoals);
}, [location]);


  return (
    <div>
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
            alt="edge"
            style={{
              cursor: "pointer",
              position: "relative",
              left: "72%",
              paddingTop: "30px",
              marginBottom: "1rem",
              width: "45px",
            }}
            onClick={() => navigate(`/Home/NewGoal`)}
          />
          <h2
            style={{
              fontSize: "2.6rem",
              marginBottom: "6rem",
              paddingRight: "35px",
            }}
          >
            عرض كل الأهداف
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="flex justify-center items-center mb-4">
        <div className="flex flex-col gap-9 w-full px-8">
          {goals.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                fontSize: "22px",
                color: "#666",
                marginTop: "4rem",
              }}
            >
              لا يوجد أهداف تم تحديدها حتى الآن.
            </p>
          ) : (
            goals.map((goal, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
                style={{ direction: "rtl" }}
              >
                <div
                  className="flex flex-row-reverse justify-start items-center gap-3 w-full"
                  style={{ justifyContent: "center" }}
                >
                  <p
                    style={{
                      fontSize: "27px",
                      textAlign: "right",
                      margin: 0,
                      paddingBottom: "15px",
                    }}
                  >
                    {goal.goalTitle}
                  </p>
                  {goal.done ? (
                    <div>
                      <i
                        className="fa-solid fa-check"
                        style={{
                          fontSize: "45px",
                          backgroundColor: "#75D6C6",
                          color: "white",
                          padding: "10px",
                          borderRadius: "50%",
                        }}
                      ></i>
                    </div>
                  ) : (
                    <div>
                      <i
                        className="fa-solid fa-xmark"
                        style={{
                          fontSize: "45px",
                          backgroundColor: "red",
                          color: "white",
                          padding: "10px",
                          borderRadius: "50%",
                        }}
                      ></i>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllGoal;
