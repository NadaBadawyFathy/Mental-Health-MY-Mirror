import { useNavigate } from 'react-router-dom';
import breath from '../../assests/svgs/breath.svg';
import med from '../../assests/svgs/med.svg';
import xmark from '../../assests/svgs/xmark.svg';
import img from '/images/mind4.jpg';
import ellips from '../../assests/svgs/ellips.svg';
import meditationIcon2 from '../../assests/svgs/med2.svg'; // أيقونة التأمل
import meditationIcon3 from '../../assests/svgs/med3.svg'; // أيقونة التأمل


const ClearMind = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/Home');
  };

  const handleNavigatebreath = () => {
    navigate('/Home/clear-mind/breathing');
  };

  const handleNavigatemediation = () => {
    navigate('/Home/clear-mind/meditation');
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full mx-auto text-center relative">
      <div className="absolute  z-10">
        <img
          src={xmark}
          alt="x mark"
          className="w-6 cursor-pointer"
          onClick={handleNavigateHome}
        />
      </div>

      <h2 className="text-lg font-bold text-right mt-2"  style={{fontSize:"40px"}}> صفي ذهنك</h2>

      <div className="mt-4"    style={{
          display:"flex",
          justifyContent:"center"
          }}>
        <img
          src={img}
          alt="mirror reflection"
          style={{
            width: "400px",
            borderRadius: "106px",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-12 " style={{fontSize:"30px"}}>
      <button
  className="bg-white text-gray-800 py-3 px-2 rounded-lg font-semibold relative flex flex-col items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1),_0_6px_10px_rgba(0,0,0,0.15)]"
  onClick={handleNavigatebreath}
>
  التنفس

  {/* صورة التنفس */}
  <img src={breath} alt="mood 2" className="w-[170px] mt-2 relative z-10" />

  {/* صورة الإيلبس تحت صورة التنفس باستخدام z-index */}
  <img src={ellips} alt="mood 2" className="w-[50px] mt-2 absolute bottom-10 right-50 z-0" />
</button>

        <button
  className="bg-white text-gray-800 py-3 px-2  relative rounded-lg font-semibold flex flex-col items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1),_0_6px_10px_rgba(0,0,0,0.15)]"
  onClick={handleNavigatemediation}
>
  التأمل
  <img src={med} alt="mood 1" className="w-15 mt-2 relative z-10 " />
   <img
            src={meditationIcon2}
            alt="med face"
            className="w-[100px] absolute top-[90px] right-[140px] transform -translate-x-1/2"
          />
             <img
            src={meditationIcon3}
            alt="med face"
            className="w-[100px] absolute top-[90px] right-[220px] transform -translate-x-1/2"
          />
  
  
  <img src={ellips} alt="mood 2" className="w-[40px] mt-2  bottom-20  relative z-0" />
</button>

      </div>
    </div>
  );
};

export default ClearMind;
