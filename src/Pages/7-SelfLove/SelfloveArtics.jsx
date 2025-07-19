import CloudShape from "../../components/CloudShape";
import selflove from "../../assests/svgs/selflove.svg"; 
import xmark from "../../assests/svgs/xmark.svg"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base } from "../../../Api";

const SelfloveArtics = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null); // لمقال المختار

  const tabs = [
    { name: "التحفيز", route: "/Home/SelfloveIncentivize" },
    { name: "المقالات", route: "/Home/SelfloveArticles" },
    { name: "البودكاست", route: "/Home/SelflovePotcasts" },
  ];

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${Base}self-love/articles`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setArticles(res.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [token]);

  return (
    <div className="relative">
      {/* Overlay Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative text-right overflow-y-auto max-h-[80vh]">
            <img 
              src={xmark} 
              alt="Close" 
              onClick={() => setSelectedArticle(null)}
              style={{
                width: "28px",
                height: "28px",
                position: "absolute",
                top: "16px",
                right: "16px",
                cursor: "pointer"
              }}
            />
            <h2 className="text-[24px] font-bold mb-4 text-[#0A584F] mt-10">{selectedArticle.title}</h2>
            <p className="text-[18px] leading-[2.2] text-gray-800 whitespace-pre-line">{selectedArticle.content}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}> 
        <div>
          <CloudShape />
          <img src={selflove} alt="self love" 
            style={{ position: "relative", bottom: "9.5rem", width: "110px" }}
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
          <h2 style={{ fontSize: "2.6rem", marginBottom: "6rem", paddingRight: "40px" }}>حب النفس</h2>
        </div>
      </div>

      {/* Main Content */}
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

        {/* Articles Grid */}
        <div className="mt-20 space-y-8 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 px-4 sm:px-12">
            {articles.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="py-6 px-6 sm:px-10 rounded-2xl flex justify-center items-center text-[22px] sm:text-[24px] text-[#0A584F] bg-gray-100"
              >
                <p>{article.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfloveArtics;
