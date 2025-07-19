import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base } from "../../../Api";

import xmark from '../../assests/svgs/xmark.svg';
import { toast, ToastContainer } from "react-toastify";

const routineTypes = [
  "روتين الصباح",
  "روتين الليل",
  "روتين دراسي",
  "روتين رياضي",
  "روتين العناية بالبشرة",
  "روتين العمل",
  "روتين ضوء الشمس",
];

function Routine() {
  const [selectedRoutine, setSelectedRoutine] = useState("");
  const [details, setDetails] = useState(["", ""]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddDetail = () => {
    setDetails([...details, ""]);
  };

  const handleChangeDetail = (index, value) => {
    const updated = [...details];
    updated[index] = value;
    setDetails(updated);
  };

  const handleClose = () => {
    navigate("/Home");
  };

  const handleViewAllRoutines = () => {
    navigate("/Home/routine/routin2");
  };

  const handleSave = async () => {
    if (!selectedRoutine || details.some((d) => d.trim() === "")) {
      toast.warning("من فضلك اختر نوع الروتين واملأ جميع التفاصيل");
      return;
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.warning("من فضلك سجل الدخول أولاً");
      navigate("/login");
      return;
    }

    const payload = {
      routineType: selectedRoutine,
      details: details.map((detail) => ({ detail }))
    };

    try {
      const res = await axios.post(`${Base}routines/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Routine Saved:", res.data);
      toast.success("تم حفظ الروتين بنجاح");
    } catch (error) {
      console.error("Save Routine Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "حدث خطأ أثناء الحفظ");
    }
  };

  return (
    <div className="font-cairo flex items-center justify-center p-4">
                <ToastContainer />
      <div className="bg-white min-h-[90vh] p-6 rounded-lg overflow-visible w-full">
        <div className="flex justify-between items-center mb-20">
          <img src={xmark} alt="xmark" style={{ cursor: "pointer" }} onClick={handleClose} />
          <h2 className="font-bold text-[40px]">الروتين</h2>
        </div>

        <div className="mb-16 relative">
          <div
            className="border p-2 rounded cursor-pointer bg-white flex justify-between items-center text-right h-[60px]"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="text-l font-bold">{dropdownOpen ? "˄" : "˅"}</span>
            <span className="text-[#7E7E7E] ml-2">
              {selectedRoutine || "اختر نوع الروتين بتاعك"}
            </span>
          </div>

          {dropdownOpen && (
            <div className="border mt-1 rounded bg-white absolute w-full z-10 shadow text-right">
              {routineTypes.map((type, idx) => (
                <div
                  key={idx}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSelectedRoutine(type);
                    setDropdownOpen(false);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        {dropdownOpen && <div className="h-72"></div>}

        <h3 className="text-right text-[22px] mb-5">تفاصيل الروتين</h3>

        {details.map((d, i) => (
  <div key={i} className="flex items-center gap-2 mb-2">
    <input
      className="flex-1 border p-2 rounded text-right"
      placeholder="..."
      value={d}
      onChange={(e) => handleChangeDetail(i, e.target.value)}
    />
    <span className="text-black font-bold text-[22px]">{i + 1}</span>

    {details.length > 2 && i >= 2 && (
      <button
        onClick={() => {
          const updated = details.filter((_, index) => index !== i);
          setDetails(updated);
        }}
        className="text-red-500 font-bold text-[20px]"
      >
        حذف
      </button>
    )}
  </div>
))}


        <div className="flex justify-between gap-4 mt-20" dir="rtl">
          <button
            className="text-[22px] text-black font-semibold py-2 rounded-[13.52px] w-[100px]"
            style={{ backgroundColor: "#75D6C6" , textAlign: 'center'}}
            onClick={handleAddDetail}
          >
            إضافة +
          </button>

          <button
            className="text-[22px] text-black font-semibold py-2 rounded-[13.52px] w-[100px]"
            style={{ backgroundColor: "#75D6C6", textAlign: 'center' }}
            onClick={handleSave}
          >
            حفظ
          </button>
        </div>

        <button
          className="mt-6 py-2 text-center mx-auto block font-semibold text-[22px] w-[200px] rounded-[13.52px]"
          style={{ backgroundColor: "#75D6C6" }}
          onClick={handleViewAllRoutines}
        >
          عرض كل الروتين
        </button>
      </div>
    </div>
  );
}

export default Routine;
