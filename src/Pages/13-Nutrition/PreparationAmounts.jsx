import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import edge from '../../assests/svgs/edge.svg';

function PreparationAmounts() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  return (
    <div className="mx-auto overflow-hidden p-4 text-right font-sans" style={{ paddingBottom: '300px' }} dir="rtl">
      <div className="relative p-4">
        {/* عنوان الوصفة */}
        <h1 style={{ color: '#664500', fontSize: '35px' }}>{data.name}</h1>

        {/* زر الرجوع */}
        <button
          className="absolute top-4 left-4 rounded-full p-2 text-xl z-10"
          onClick={() => navigate('/Home/Nutrition')}
        >
          <img
            src={edge}
            alt="رجوع"
            style={{
              cursor: "pointer",
              position: "relative",
              top: "-15px",
              padding: "20px",
              backgroundColor: "rgb(210 243 238)",
              width: "28px",
              borderRadius: "50%",
            }}
          />
        </button>

        {/* صورة الوصفة */}
        <div className="flex justify-center">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="object-cover rounded-lg" 
            style={{ marginTop: "80px", width: '100%', maxWidth: '600px', height: 'auto' }}
          />
        </div>
      </div>

      {/* المقادير */}
      <div>
        <h2 style={{ fontSize: '30px', marginTop: '40px', marginBottom: '20px' }}>المقادير لتحضير</h2>
        <p style={{ fontSize: '20px', whiteSpace: 'pre-line', color: '#333', lineHeight: '1.8' }}>
          {data.preparation}
        </p>
      </div>
    </div>
  );
}

export default PreparationAmounts;
