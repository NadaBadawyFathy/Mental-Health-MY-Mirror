import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Base } from '../../../Api';

const Music = () => {
  const navigate = useNavigate();
  const [musicList, setMusicList] = useState([]);

  const handlemusicHome = () => {
    navigate('/Home/improveSleep');
  };

  const handleMusicPage = (music) => {
    navigate(`/Home/improveSleep/music/${music.id}`, { state: music });
  };

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Base}music`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMusicList(response.data);
      } catch (error) {
        console.error("حدث خطأ أثناء جلب الموسيقى:", error);
      }
    };

    fetchMusic();
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 w-full mx-auto text-center relative"
      style={{ background: "linear-gradient(to bottom,rgb(79, 138, 130),rgb(24, 90, 82),rgb(14, 73, 66))" }}>
      
      <div className="absolute z-10">
        <div style={{ fontSize: "30px", color: "#FFFFFF" }} className="w-6 cursor-pointer" onClick={handlemusicHome}>X</div>
      </div>

      <h2 style={{ fontSize: "35px", textAlign: "center", color: "#FFFFFF" }}> الموسيقي </h2>
      <p style={{ fontSize: "19px", margin: "30px 0", fontWeight: "400px", color: "#FFFFFF" }} dir="rtl">
        هنا تقدر تلاقي موسيقي هادية تساعدك على الاسترخاء والنوم.
      </p>

      <div style={{ margin: "50px 20px", color: "#FFFFFF" }} dir="rtl">
        {musicList.map((music, index) => (
          <button
            key={index}
            onClick={() => handleMusicPage(music)}
            style={{
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              gap: '20px',
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              const icon = e.currentTarget.querySelector('.play-icon');
              if (icon) icon.style.display = 'block';
            }}
            onMouseLeave={(e) => {
              const icon = e.currentTarget.querySelector('.play-icon');
              if (icon) icon.style.display = 'none';
            }}
          >
            <div style={{ position: "relative", width: "150px", height: "150px" }}>
              <img
                src={music.imageUrl}
                alt={music.title}
                style={{ width: "100%", height: "100%", borderRadius: "20px", padding: "5px", objectFit: "cover" }}
              />
              <div
                className="play-icon fade-in"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "50%",
                  padding: "10px",
                  display: "none",
                  transition: "0.3s",
                  zIndex: 2
                }}
              >
                <Play color="#fff" size={30} />
              </div>
            </div>
            <p style={{ fontSize: "20px", marginLeft: "10px", color: "white" }}>{music.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Music;
