import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import edge from '../../assests/svgs/edge.svg';

const videosData = [
  {
    id: 1,
    title: "تأمل صباحي هادئ",
    duration: "3 دقائق",
    url: "https://www.youtube.com/embed/inpok4MKVLM"
  },
  {
  id: 2,
  title: "تأمل التنفس الهادئ",
  duration: "4 دقائق",
  url: "https://www.youtube.com/embed/INxb0UO7yGY"
},
  {
    id: 3,
    title: "راحة ذهنية قبل النوم",
    duration: "4 دقائق",
    url: "https://www.youtube.com/embed/ZToicYcHIOU"
  },
  {
    id: 4,
    title: "تأمل لتهدئة القلق",
    duration: "2 دقائق",
    url: "https://www.youtube.com/embed/MIr3RsUWrdo"
  },
];

const Mediation2 = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigatemediation = () => {
    navigate('/Home/clear-mind/meditation');
  };

  const filteredVideos = videosData.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg p-6 w-full mx-auto text-center relative font-cairo min-h-screen">
      {/* زر الإغلاق */}
      <div className="absolute z-10 right-4 top-4">
        <img
          src={edge}
          alt="x mark"
          className="w-10 cursor-pointer"
          onClick={handleNavigatemediation}
        />
      </div>

      {/* العنوان */}
      <h2 className="text-lg font-bold text-right mt-10" style={{ fontSize: '40px' }}>
        التأمل
      </h2>

      {/* حقل البحث */}
      <div className="flex items-center justify-center mt-6 max-w-md mx-auto border border-gray-300 rounded-full px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder="ابحث عن فيديوهاتك"
          className="flex-1 outline-none text-right px-2 bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search text-gray-500"></i>
      </div>

      {/* عرض الفيديوهات */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-gray-100 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
            <p className="text-gray-600 mb-2">المدة: {video.duration}</p>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded"
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ))}
        {filteredVideos.length === 0 && (
          <p className="col-span-2 text-gray-500 text-xl text-center mt-6">لا توجد نتائج مطابقة</p>
        )}
      </div>
    </div>
  );
};

export default Mediation2;
