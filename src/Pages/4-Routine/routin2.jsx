import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base } from "../../../Api";
import { useNavigate } from "react-router-dom";

function Routin2() {
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/Home/routine");
  };

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const res = await axios.get(`${Base}routines/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.routines && Array.isArray(res.data.routines)) {
          setRoutines(res.data.routines);
        } else {
          setRoutines([]);
        }
      } catch (error) {
        console.error("Error fetching routines:", error);
        alert("حدث خطأ أثناء تحميل الروتينات");
      }
    };

    fetchRoutines();
  }, []);

  return (
    <div className="font-cairo flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 w-full shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button className="text-4xl text-gray-600 hover:text-black" onClick={handleReturn}>
            ←
          </button>
          <h2 className="text-2xl font-bold text-gray-800">جميع الروتين الخاص بك</h2>
        </div>

        {routines.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">لا يوجد روتينات محفوظة</p>
        ) : (
          routines.map((routine, index) => (
            <div key={index} className="mb-6">
              {/* عنوان نوع الروتين */}
              <h3 className="text-xl font-semibold text-[#2d3748] mb-3 text-right border-r-4 border-[#75D6C6] pr-4">
                {routine.routineType}
              </h3>

                <p className="text-right text-gray-600 mb-3 pr-4" dir="rtl">تفاصيل الروتين:</p>
              {/* تفاصيل الروتين */}
              <div className="space-y-3">
                {routine.details.map((d, i) => (
                  <div dir="rtl"
                    key={i}
                    className="bg-[#f1f5f9] border border-gray-300 rounded-md p-3 text-right text-[#333]"
                  >
                    <span className="font-medium text-[#75D6C6]" style={{fontWeight:'bold', fontSize:'18px'}}>{i + 1}. </span>
                    {d.detail}
                  </div>
                ))}
              </div>

              {/* فاصل بين كل روتين */}
              {index !== routines.length - 1 && (
                <hr className="my-6 border-t border-gray-300" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Routin2;
