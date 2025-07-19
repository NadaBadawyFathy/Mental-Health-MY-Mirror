import React, { useEffect, useState } from "react";
import CloudShape from "../../components/CloudShape";
import mood from "../../assests/svgs/grattiude.svg";
import edge from "../../assests/svgs/edge2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base } from "../../../Api";

const AllGrat = () => {
  const [gratitudes, setGratitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log("AllGrat component rendered", gratitudes);
  useEffect(() => {
    const fetchGratitudes = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        alert("برجاء تسجيل الدخول أولاً.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`${Base}gratitude/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGratitudes(res.data);
      } catch (error) {
        console.error("فشل في جلب الامتنانات:", error);
        alert("حدث خطأ أثناء تحميل الامتنانات.");
      } finally {
        setLoading(false);
      }
    };

    fetchGratitudes();
  }, [navigate]);

  const handleBack = () => {
    navigate("/Home/grateful-mood/gratitude");
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full min-h-[90vh] relative overflow-hidden text-right rtl">

      {/* السحابة والوجه */}
      <div className="absolute top-0 left-0 w-[120px] h-[120px] z-10">
        <CloudShape />
        <img
          src={mood}
          alt="mood face"
          className="w-[100px] absolute top-[5px] left-1/2 transform -translate-x-1/2"
        />
      </div>

      {/* رأس الصفحة */}
      <div className="absolute top-4 right-4 flex flex-col items-center z-10">
        <img
          src={edge}
          alt="رجوع"
          className="w-10 cursor-pointer mb-3"
          onClick={handleBack}
        />
        <h2 className="text-3xl font-semibold text-gray-700 pt-4">كل الامتنان</h2>
      </div>

    {gratitudes.map((grat, index) => (
  <div key={index} className="relative" dir="rtl" style={{ top:'200px' }}>
    <div className=" p-4 shadow-sm min-h-[120px] flex justify-between items-center">
      {/* النص مع صورة القلب */}
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={solidHeart} className="text-[#75D6C6] text-2xl ml-2" />
        <p className="text-lg font-semibold text-gray-800 leading-relaxed">
          {grat.text}
        </p>
      </div>

      {/* التاريخ والوقت */}
      <div className="text-sm text-gray-500 text-left rtl:text-right whitespace-nowrap">
        {new Date(grat.timestamp || grat.createdAt || Date.now()).toLocaleString("ar-EG", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </div>
    </div>

    {/* خط فاصل */}
    {index < gratitudes.length - 1 && (
      <hr className="my-4 border-t border-gray-300" />
    )}
  </div>
))}


    </div>
  );
};

export default AllGrat;
