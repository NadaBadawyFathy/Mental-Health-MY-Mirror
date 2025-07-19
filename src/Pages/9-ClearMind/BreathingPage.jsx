import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import edge from '../../assests/svgs/edge.svg';
import axios from 'axios';
import { Base } from '../../../Api';

const BreathingPage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  const handleNavigateToClearMind = () => {
    navigate('/Home/clear-mind');
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); // تأكد من وجود التوكن

    if (!token) {
      navigate('/login'); // لو مفيش توكن روح يسجل دخول
      return;
    }

    axios
      .get(`${Base}breathing-videos`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => setVideos(res.data))
      .catch((err) => console.error('فشل تحميل الفيديوهات', err));
  }, [navigate]);

  const handlePlayVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="bg-white min-h-screen px-4 pt-6 pb-10 text-right font-cairo">
      {/* Header */}
      <div className="flex justify-between items-center pt-3" style={{ marginBottom: "6rem" }}>
        <img
          src={edge}
          alt="x mark"
          className="w-12 h-12 cursor-pointer"
          onClick={handleNavigateToClearMind}
        />
        <h2 className="text-lg font-bold text-right mt-2" style={{ fontSize: "35px" }}>
          التنفس
        </h2>
      </div>

      {/* Videos */}
      <div className="space-y-4 flex flex-col items-center">
        {videos.map((exercise, index) => (
          <div
            key={exercise.id}
            className={`flex items-center justify-center mb-10 p-4 rounded-lg shadow bg-gray-100`}
            style={{ width: "80%" }}
          >
            <div className="text-right flex-1">
              <h2 className="text-2xl font-bold mb-1">{exercise.name}</h2>
              <p className="text-sm text-gray-600">⏱ دقيقتين</p>
            </div>

            <div className="flex-shrink-0 ml-4 text-center">
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                className="mt-2 flex items-center justify-center gap-2 text-white px-4 py-2 rounded-full font-semibold text-base shadow"
                style={{ backgroundColor: "#75D6C6", width: "110px" }}
                onClick={() => handlePlayVideo(exercise.videoUrl)}
              >
                <FontAwesomeIcon icon={faPlayCircle} className="text-white text-lg" />
                ابدأ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreathingPage;
