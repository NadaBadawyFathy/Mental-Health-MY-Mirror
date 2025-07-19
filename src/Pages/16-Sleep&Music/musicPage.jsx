import { useNavigate, useParams } from 'react-router-dom';
import { ChevronFirst, Repeat, ChevronLast, CirclePlay, PauseCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const musicData = [
  { id: "1", title: "الزهور البرية", audioUrl: "/audio/mus-1.mp3", imageUrl: "https://cdn.pixabay.com/photo/2016/11/19/12/50/poppies-1839120_640.jpg" },
  { id: "2", title: "سطح القاعات", audioUrl: "/audio/mus-2.mp3", imageUrl: "https://images.pexels.com/photos/2781593/pexels-photo-2781593.jpeg" },
  { id: "3", title: "إدراك عميق", audioUrl: "/audio/mus-3.mp3", imageUrl: "https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg" },
  { id: "4", title: "لحظات سحرية", audioUrl: "/audio/mus-4.mp3", imageUrl: "https://cdn.pixabay.com/photo/2024/02/05/12/26/ai-generated-8554468_640.png" },
  { id: "5", title: "لحن الطبيعة", audioUrl: "/audio/mus-5.mp3", imageUrl: "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg" },
  { id: "6", title: "بلا قلق", audioUrl: "/audio/mus-6.mp3", imageUrl: "https://images.unsplash.com/photo-1487164697898-db7bfc2b7bf5" },
  { id: "7", title: "ذكريات دافئة – بيانو عاطفي وملهم", audioUrl: "/audio/mus-7.mp3", imageUrl: "https://cdn.pixabay.com/photo/2016/03/07/17/22/postcard-1242616_640.jpg" },
  { id: "8", title: "روتين الصباح [موسيقى لوفاي للدراسة]", audioUrl: "/audio/mus-8.mp3", imageUrl: "https://cdn.pixabay.com/photo/2020/12/15/16/50/book-5834253_640.jpg" },
  { id: "9", title: "استرخاء", audioUrl: "/audio/mus-9.mp3", imageUrl: "https://images.pexels.com/photos/321576/pexels-photo-321576.jpeg" },
  { id: "10", title: "رصيف القمر – لحظة تأملية تحت ضوء القمر", audioUrl: "/audio/mus-10.mp3", imageUrl: "https://cdn.pixabay.com/photo/2024/03/29/12/03/ai-generated-8662734_640.jpg" },
  { id: "11", title: "ارتجال مسائي (مع إيثيرا)", audioUrl: "/audio/mus-11.mp3", imageUrl: "https://cdn.pixabay.com/photo/2016/10/20/17/41/hot-air-balloon-1756150_640.jpg" }
];


const MusicPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [music, setMusic] = useState({ title: "", audioUrl: "", imageUrl: "" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const handleBack = () => {
    navigate('/Home/improveSleep/music');
  };

  useEffect(() => {
    const selectedMusic = musicData.find((item) => item.id === id);
    if (selectedMusic) {
      setMusic(selectedMusic);
    }
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full mx-auto text-center relative"
      style={{ paddingBottom: '200px', background: "linear-gradient(to bottom,rgb(79, 138, 130),rgb(24, 90, 82),rgb(14, 73, 66))" }}>

      <div className="absolute z-10">
        <div
          style={{ fontSize: "30px", color: "#FFFFFF" }}
          className="w-6 cursor-pointer"
          onClick={handleBack}
        >
          ←
        </div>
      </div>

      <h2 style={{ fontSize: "35px", textAlign: "center", color: "#FFFFFF", marginBottom: '30px' }}> الموسيقي </h2>

      {music.imageUrl && (
        <img src={music.imageUrl} alt={music.title} className="mx-auto rounded-lg mb-4" style={{ width: "250px", height: "250px", objectFit: "cover" }} />
      )}

      <p style={{ fontSize: "20px", margin: "30px 0 10px 0", color: "#FFFFFF" }}>{music.title}</p>

      <audio ref={audioRef} src={music.audioUrl} preload="metadata" />

      <form style={{ width: "80%", maxWidth: "300px", margin: "auto" }}>
        <input
          type="range"
          min="0"
          max={duration}
          step="1"
          value={currentTime}
          onChange={handleSliderChange}
          style={{ width: "100%" }}
        />
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#FFFFFF",
          fontSize: "14px"
        }}>
          <p>{formatTime(currentTime)}</p>
          <p>{formatTime(duration)}</p>
        </div>
      </form>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "20px"
      }}>
        <ChevronFirst onClick={skipBackward} className="h-8 w-8 cursor-pointer" style={{ marginLeft: "10px", color: "#FFFFFF" }} />
        {isPlaying ? (
          <PauseCircle onClick={togglePlay} className="h-10 w-10 cursor-pointer" style={{ marginLeft: "5px", color: "#FFFFFF" }} />
        ) : (
          <CirclePlay onClick={togglePlay} className="h-10 w-10 cursor-pointer" style={{ marginLeft: "5px", color: "#FFFFFF" }} />
        )}
        <ChevronLast onClick={skipForward} className="h-8 w-8 cursor-pointer" style={{ marginLeft: "5px", color: "#FFFFFF" }} />
        <Repeat className="h-4 w-4" style={{ marginLeft: "5px", color: "rgb(34, 119, 109)" }} />
      </div>
    </div>
  );
};

export default MusicPage;
