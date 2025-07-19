import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Moon } from 'lucide-react';
import axios from 'axios';
import { Base } from '../../../Api';

const Sleep = () => {
  const navigate = useNavigate();
  const [sleepStories, setSleepStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Base}categories`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const apiData = response.data;

        const formattedStories = apiData.map((item) => ({
          id: item.id,
          name: item.name,
          imageUrl: item.imageUrl
        }));

        setSleepStories(formattedStories);
      } catch (error) {
        console.error("فشل في جلب بيانات القصص:", error);
      }
    };

    fetchStories();
  }, []);

  const handleStoryClick = (story) => {
    navigate('/Home/improveSleep/sleep/sleepPage', {
      state: { story }
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full mx-auto text-center relative"
         style={{ background: "linear-gradient(to bottom,rgb(141, 172, 168),rgb(32, 138, 125),rgb(14, 73, 66))" }}>

      <div className="absolute z-10" style={{ color: "#FFFFFF" }}>
        <div style={{ fontSize: "30px" }} className="w-6 cursor-pointer" onClick={() => navigate('/Home/improveSleep')}>X</div>
      </div>

      <h2 className="text-lg font-bold text-right mt-2" style={{ fontSize: "35px", color: "#FFFFFF" }}>قصص النوم</h2>

      <div className="flex justify-evenly items-center my-24">
        <div className="text-[#0A584F] text-right space-y-4 w-[500px]" dir="rtl">
          <p className="bg-white p-4 rounded-xl">النوم بوقت كافٍ يحسن المزاج</p>
          <p className="bg-white p-4 rounded-xl">نم مبكرًا لتحصل على يوم نشيط.</p>
          <p className="bg-white p-4 rounded-xl">الاسترخاء يساعد على نوم عميق</p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <Star className="h-10 w-10 text-[#065B51] bg-white rounded-full p-2" />
          <Clock className="h-10 w-10 text-white" />
          <Moon className="h-10 w-10 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-12">
        {sleepStories.map(story => (
          <button key={story.id}
                  className="text-white py-3 px-2 rounded-lg font-semibold flex flex-col items-center justify-center shadow-md transition duration-300 hover:scale-105"
                  onClick={() => handleStoryClick(story)}>
            <img src={story.imageUrl} alt={story.name}
                 className="w-[150px] h-[120px] rounded-xl p-2" />
            {story.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sleep;
