import React, { useEffect, useState } from "react";
import CloudShape from "../../components/CloudShape";
import selflove from "../../assests/svgs/selflove.svg";
import xmark from "../../assests/svgs/xmark.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base } from "../../../Api";

const SelfloveIncentivize = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);

  const tabs = [
    { name: "التحفيز", route: "/Home/SelfloveIncentivize" },
    { name: "المقالات", route: "/Home/SelfloveArticles" },
    { name: "البودكاست", route: "/Home/SelflovePotcasts" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${Base}self-love/motivation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setQuotes(res.data))
      .catch((err) => {
        console.error("فشل تحميل الاقتباسات:", err);
      });
  }, [navigate]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <CloudShape />
          <img
            src={selflove}
            alt="New goal"
            style={{
              position: "relative",
              bottom: "9.5rem",
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
              left: "70%",
              paddingTop: "30px",
              marginBottom: "1rem",
            }}
            onClick={() => navigate(`/Home`)}
          />
          <h2
            style={{
              fontSize: "2.6rem",
              marginBottom: "6rem",
              paddingRight: "40px",
            }}
          >
            حب النفس
          </h2>
        </div>
      </div>

      <div className="bg-white min-h-screen px-4 md:px-16 py-6">
        {/* Tabs Section */}
        <div className="w-full overflow-x-auto" dir="rtl">
          <div className="flex justify-between gap-4 text-xl font-bold text-[22px] sm:text-[24px] md:text-[28px] border-b-2 border-gray-200 pb-4 mb-10 min-w-[400px]">
            {tabs.map((tab, index) => {
              const isActive = window.location.pathname === tab.route;
              return (
                <button
                  key={index}
                  onClick={() => navigate(tab.route)}
                  className={`relative pb-2 whitespace-nowrap transition hover:text-teal-500 ${
                    isActive ? "text-teal-500" : ""
                  }`}
                >
                  {tab.name}
                  {isActive && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 h-1 bg-teal-500 rounded-full bottom-[-15px] w-[90%]"
                      style={{ transition: "all 0.3s ease-in-out" }}
                    ></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col items-center gap-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="rounded-xl shadow-lg p-6 sm:p-8 text-center border border-gray-100 w-full max-w-xl text-[25px] sm:text-[22px]"
              style={{ boxShadow: "rgb(0 180 180 / 29%) 0px 5px 2px" }}
            >
              <p className="text-gray-700 font-medium leading-7">
                {quote.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelfloveIncentivize;
