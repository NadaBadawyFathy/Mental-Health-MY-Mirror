import { useState, useEffect } from 'react';
import CloudShape from "../../components/CloudShape";
import mood from '../../assests/svgs/grattiude.svg';
import edge from '../../assests/svgs/edge2.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base } from "../../../Api"; 

const GratitudePage = () => {
  const [gratitudeList, setGratitudeList] = useState([""]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("يجب تسجيل الدخول أولاً");
      navigate("/login");
    }
  }, [navigate]);

  const handleAddInput = () => {
    setGratitudeList([...gratitudeList, ""]);
  };

  const handleNavigateToGratefulMood = () => {
    navigate('/Home/grateful-mood');
  };

  const handleShowAllGratitude = () => {
    navigate('/Home/grateful-mood/gratitude/all-grat');
  };

  const handleSaveGratitude = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const nonEmptyGratitudes = gratitudeList.filter(g => g.trim() !== '');

    if (!token || !userId) {
      toast.error("يجب تسجيل الدخول أولاً");
      navigate("/login");
      return;
    }

    if (nonEmptyGratitudes.length === 0) {
      toast.error('من فضلك اكتب حاجة ممتن ليها قبل الحفظ');
      return;
    }

    try {
      for (const gratitudeText of nonEmptyGratitudes) {
        const response = await fetch(`${Base}gratitude`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            text: gratitudeText,
            userId: Number(userId)
          })
        });

        if (!response.ok) {
          throw new Error('فشل في حفظ الامتنان');
        }
      }

      toast.success('تم حفظ الامتنان بنجاح');
      setGratitudeList([""]);
    } catch (error) {
      toast.error('حصل خطأ أثناء الحفظ، حاول تاني');
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full min-h-[90vh] relative overflow-hidden text-right">
      <ToastContainer />
      
      {/* الرسمة والمود */}
      <div className="absolute top-0 left-0 w-[120px] h-[120px] z-10">
        <CloudShape />
        <img
          src={mood}
          alt="mood face"
          className="w-[100px] absolute top-[5px] left-1/2 transform -translate-x-1/2"
        />
      </div>

      {/* العنوان */}
      <div className="absolute top-4 right-4 flex flex-col items-center z-10">
        <img
          src={edge}
          alt="x mark"
          className="w-10 cursor-pointer mb-3"
          onClick={handleNavigateToGratefulMood}
        />
        <h2 className="text-lg font-bold" style={{ fontSize: "35px", paddingTop: "15px" }}>
          الامتنان
        </h2>
      </div>

      {/* المدخلات */}
      <div className="space-y-4 text-center" style={{ marginTop: "12rem" }}>
        <label className="block text-right font-medium text-gray-800" style={{ fontSize: "25px", paddingBottom: "15px" }}>
          إيه اللي ممتن ليه؟
        </label>

        {gratitudeList.map((gratitude, index) => (
          <div key={index} style={{ marginBottom: "2rem" }}>
            <div className="flex gap-2 justify-center items-center">
              <input
                type="text"
                value={gratitude}
                onChange={(e) => {
                  const updated = [...gratitudeList];
                  updated[index] = e.target.value;
                  setGratitudeList(updated);
                }}
                placeholder="أنا ممتن لـ..."
                className="w-full py-2 px-4 text-right focus:outline-none"
                style={{ border: "none", backgroundColor: "transparent", fontSize: "20px" }}
              />
              <FontAwesomeIcon icon={regularHeart} className="text-[#75D6C6] text-2xl ml-2" />
            </div>
            {index < gratitudeList.length - 1 && <hr className="border-t my-2" />}
          </div>
        ))}

        {/* الأزرار */}
        <div className="flex flex-col space-y-4 mt-6 justify-center items-center" style={{ marginBottom: "5rem" }}>
          <button
            onClick={handleAddInput}
            style={{ backgroundColor: "#75D6C6", padding: "8px 16px", borderRadius: "13.52px", width: "200px", fontSize: "22px" }}
          >
            إضافة
          </button>

          <button
            onClick={handleSaveGratitude}
            style={{ backgroundColor: "#75D6C6", padding: "8px 16px", borderRadius: "13.52px", width: "200px", fontSize: "22px" }}
          >
            حفظ
          </button>

          <button
            onClick={handleShowAllGratitude}
            style={{ backgroundColor: "#75D6C6", padding: "8px 16px", borderRadius: "13.52px", width: "200px", fontSize: "22px" }}
            className="mt-4"
          >
            عرض كل الامتنان
          </button>
        </div>
      </div>
    </div>
  );
};

export default GratitudePage;
