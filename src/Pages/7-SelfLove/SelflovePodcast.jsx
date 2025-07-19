import CloudShape from "../../components/CloudShape";
import selflove from "../../assests/svgs/selflove.svg"; 
import xmark from "../../assests/svgs/xmark.svg"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base } from "../../../Api";

const SelflovePodcast = () => {
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState([]);

  const tabs = [
    { name: "التحفيز", route: "/Home/SelfloveIncentivize" },
    { name: "المقالات", route: "/Home/SelfloveArticles" },
    { name: "البودكاست", route: "/Home/SelflovePotcasts" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // تأكدي إنه موجود
        const response = await axios.get(`${Base}self-love/podcasts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPodcasts(response.data);
      } catch (error) {
        console.error("فشل تحميل البودكاست:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <CloudShape />
          <img
            src={selflove}
            alt="selslove"
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
          <h2 style={{ fontSize: "2.6rem", marginBottom: "6rem", paddingRight: "40px" }}>
            حب النفس
          </h2>
        </div>
      </div>

      <div className="bg-white min-h-screen px-4 sm:px-8 md:px-16 py-6 mx-auto">
        {/* Tabs */}
        <div className="w-full overflow-x-auto" dir="rtl">
          <div className="flex justify-between gap-4 text-[22px] sm:text-[24px] md:text-[28px] font-bold border-b-2 border-gray-200 pb-4 mb-16 min-w-[400px]">
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
                    <span className="absolute left-1/2 -translate-x-1/2 h-1 bg-teal-500 rounded-full bottom-[-15px] w-[90%] transition-all duration-300"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col items-center mb-24" dir="rtl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-24">
            {podcasts.map((podcast, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-2 flex flex-col items-center text-center w-full max-w-[300px] sm:max-w-[320px]"
              >
                <img
                  src={podcast.imageUrl}
                  alt="Podcast"
                  className="object-cover rounded-md mb-6" 
                  style={{ height: "180px", width: "100%" }}
                />
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  {podcast.name}
                </h2>
                <a
                  href={podcast.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-teal-500 text-white rounded-full px-6 py-2 text-lg flex items-center justify-center"
                  style={{ margin: "15px" }}
                >
                  مشاهدة
                  <span className="ml-2 text-2xl">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelflovePodcast;
