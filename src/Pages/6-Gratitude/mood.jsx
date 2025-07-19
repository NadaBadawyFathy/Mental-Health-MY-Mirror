import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CloudShape from "../../components/CloudShape";
import moodFace from "../../assests/svgs/mood.svg";
import edge from '../../assests/svgs/edge2.svg';
import { Base } from '../../../Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MoodPage = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      toast.error("برجاء تسجيل الدخول أولاً.");
      navigate("/login");
    }
  }, [navigate]);

  const goToGratefullMood = () => {
    navigate('/Home/grateful-mood');
  };

  const moods = [
    { label: "كويس", emoji: "🙂" },
    { label: "مبسوط", emoji: "😄" },
    { label: "متضايق", emoji: "😞" },
    { label: "عادي", emoji: "😐" },
    { label: "كئيب", emoji: "😔" },
    { label: "وحش جدًا", emoji: "😭" },
  ];

  const handleSave = async () => {
    if (!selectedMood) {
      toast.error("من فضلك اختر حالتك المزاجية.");
      return;
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      await axios.post(`${Base}mood/track`, {
        userId: Number(userId),
        moodType: selectedMood,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast.success('تم حفظ حالتك المزاجية بنجاح');
      setSelectedMood(null);
    } catch (error) {
      console.error("فشل في إرسال الحالة المزاجية:", error);
      toast.error("حدث خطأ أثناء الحفظ. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full min-h-[90vh] relative overflow-hidden text-right">
      <ToastContainer />
      {/* السحابة والوجه */}
      <div className="absolute top-0 left-0 w-[120px] h-[120px] z-10">
        <CloudShape />
        <img
          src={moodFace}
          alt="mood face"
          className="w-[100px] absolute top-[5px] left-1/2 transform -translate-x-1/2"
        />
      </div>

      {/* العنوان والزر */}
      <div className="absolute top-4 right-4 flex flex-col items-center z-10">
        <img
          src={edge}
          alt="السهم"
          className="w-10 cursor-pointer mb-3"
          onClick={goToGratefullMood}
        />
        <h2 className="text-lg font-bold" style={{ fontSize: "35px", paddingTop: "15px", marginBottom: "5rem" }}>
          الحالة المزاجية
        </h2>
      </div>

      {/* السؤال واختيارات الحالة */}
      <div className="space-y-8 text-center" style={{ marginTop: "12rem" }}>
        <p className="text-gray-800 font-medium" style={{ fontSize: "25px" }}>إي أخبار مزاجك؟</p>

        <div className="grid grid-cols-2 gap-10 text-center">
          {moods.map((mood, index) => (
            <button
              key={index}
              onClick={() => setSelectedMood(mood.label)}
              className={`py-2 px-4 rounded-full flex justify-between items-center gap-2 text-white ${selectedMood === mood.label ? 'bg-[#4BB8A9]' : 'bg-[#75D6C6]'}`}
              style={{ fontSize: "25px" }}
            >
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#75D6C6] text-white py-2 rounded-full w-[200px] mx-auto font-bold"
          style={{ fontSize: "25px", marginTop: "4rem", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "جارٍ الحفظ..." : "حفظ"}
        </button>
      </div>
    </div>
  );
};

export default MoodPage;
