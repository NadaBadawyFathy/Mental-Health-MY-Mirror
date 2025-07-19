import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CloudShape from '../../components/CloudShape';
import edge from "../../assests/svgs/edge.svg"; 
import logo from "../../assests/svgs/logo Play and ach.svg";
import { Base } from "../../../Api";

function AchievementInfo() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${Base}challenges`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        const resData = await response.json();
        console.log('تحديات السيرفر:', resData);

        let allChallenges = Array.isArray(resData) ? resData : resData.data || [];

        const extraChallenges = [
          { id: 201, name: "ابدأ محادثة مع زميل جديد", category: "تحديات المواقف الاجتماعيه" },
          { id: 202, name: "ساعد أحد أصدقائك إذا لاحظت أنه حزين", category: "تحديات المواقف الاجتماعيه" },
          { id: 203, name: "تحدث أمام مجموعة صغيرة عن شيء تحبه", category: "تحديات المواقف الاجتماعيه" },
          { id: 204, name: "تعلم كيف تقول 'لا' بطريقة لطيفة", category: "تحديات المواقف الاجتماعيه" },
          { id: 301, name: "اختر مهمة واحدة وافعلها دون أن تسعى للكمال فيها", category: "تحديات المثاليه" },
          { id: 302, name: "شارك تجربة أخطأت فيها وتعلمت منها", category: "تحديات المثاليه" },
          { id: 303, name: "ارسم لوحة بدون مسح أو تعديل – فقط استمتع بالرسم", category: "تحديات المثاليه" },
          { id: 304, name: "قل لنفسك 3 جمل إيجابية عن نفسك رغم العيوب", category: "تحديات المثاليه" }
        ];

        allChallenges = [...allChallenges, ...extraChallenges];
        const filtered = allChallenges.filter((item) => item.category === data.category);
        setChallenges(filtered);
      } catch (error) {
        console.error('خطأ في جلب التحديات:', error);
      }
    };

    fetchChallenges();
  }, [data.category]);

  const handleAccept = async (selectedChallenge) => {
  try {
    const userId = 1;
    const challengeId = selectedChallenge.id;
    const token = localStorage.getItem('token');

    if (!token) {
      alert("يجب تسجيل الدخول أولاً.");
      return;
    }

    // لو التحدي رقمه أكبر من 200 يبقى ده تحدي manually مش في الAPI
    const isCustomChallenge = challengeId >= 200;

    if (!isCustomChallenge) {
      const res = await fetch(
        `${Base}challenge-progress/accept?userId=${userId}&challengeId=${challengeId}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('فشل في إرسال القبول');
      }
    }

    const currentDate = new Date().toISOString();
    const achievement = {
      ...data,
      statement: { id: selectedChallenge.id, text: selectedChallenge.name },
      selectedAt: currentDate
    };

    const stored = JSON.parse(localStorage.getItem("achievements")) || [];

    navigate(`/Home/Play&Achievements/AchievementInfo/Complete`, { state: achievement });

  } catch (error) {
    console.error("خطأ في قبول التحدي:", error);
    alert("حدث خطأ أثناء قبول التحدي. حاول مرة أخرى.");
  }
};


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ position: "relative" }}>
          <CloudShape />
          <img
            src={logo}
            alt="New goal"
            style={{ position: "absolute", top: "1rem", left: "50%", transform: "translateX(-50%)", width: "110px" }}
          />
        </div>
        <div>
          <img
            src={edge}
            alt="edge"
            style={{ cursor: "pointer", position: "relative", left: "80%", paddingTop: "30px", marginBottom: "1rem" }}
            onClick={() => navigate(`/Home/Play&Achievements/`)}
          />
          <h2 style={{ fontSize: "2.6rem", marginBottom: "4rem", paddingRight: "30px" }} dir="rtl">
            تحديات اللعب والانجازات
          </h2>
        </div>
      </div>

      <div dir='rtl' className="no-underline" style={{ display: "flex", gap: '10px', alignItems: 'center', marginRight: '20px', marginBottom: '30px' }}>
        <div
          className="bg-secondary w-20 h-20 rounded-full"
          style={{ background: "#56D6C1", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <img src={`/images/${data.img}`} alt="" className="rounded-md w-10 h-object-cover" />
        </div>
        <div className="text-sm font-medium text-center mt-3" style={{ marginBottom: "2rem", fontSize: "25px" }}>
          {data.title}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6" style={{ marginBottom: '200px' }} dir='rtl'>
        {
          challenges.map((state) => (
            <div
              key={state.id}
              className='rounded-lg p-4 flex flex-col items-center justify-between text-center'
              style={{ border: '1px solid black' }}
            >
              <div className="mb-3" style={{ fontSize: '25px' }}>
                {state.name}
              </div>

              <button
                className='bg-[#75D6C6] rounded-lg py-1 p-4'
                onClick={() => handleAccept(state)}
                style={{ fontSize: '20px' }}
              >
                قبول
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default AchievementInfo;
