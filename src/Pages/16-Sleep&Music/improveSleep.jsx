
import { useNavigate } from 'react-router-dom';

import img from "../..//assests/svgs/improvesleep.svg";
import img1 from "../..//assests/svgs/musicIcon.svg";
import img2 from "../..//assests/svgs/sleepIcon.svg";
import ellips from '../..//assests/svgs/ellips.svg';


const ImproveSleep = ()  => {
  const navigate = useNavigate();

  const handleimproveHome = () => {
    navigate('/Home');
  };

  const handleImproveSleep = () => {
    navigate('/Home/improveSleep/sleep');
  };

  const handleImproveMusic = () => {
    navigate('/Home/improveSleep/music');
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full mx-auto text-center relative">
      <div className="absolute  z-10">
        <div style={{fontSize: "30px"}}
          className="w-6 cursor-pointer"
          onClick={handleimproveHome}>X</div>
      </div>

      <h2   style={{fontSize:"35px", marginTop: "px", textAlign: "right"}}>تحسين النوم </h2>

      <div className="mt-4"    style={{
          display:"flex",
          justifyContent:"center"
          }}>
        <img
          src={img}
          alt="mirror reflection"
          style={{
            width: "400px",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-12" style={{fontSize:"30px"}}>
        <button
          className="bg-white text-gray-800 py-3 px-2 rounded-lg font-semibold flex flex-col items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1),_0_6px_10px_rgba(0,0,0,0.15)]"
          onClick={handleImproveMusic}
        >
          الموسيقى
          <img src={img1} alt="music" className="w-170 mt-2 relative z-10" style={{borderRadius: "50%",marginTop: "20px"}} />
          <img src={ellips} alt="mood 2" className="w-[50px] mt-2 absolute bottom-10 right-50 z-0" />
        </button>

        <button
          className="bg-white text-gray-800 py-3 px-2 rounded-lg font-semibold flex flex-col items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1),_0_6px_10px_rgba(0,0,0,0.15)]"
          onClick={handleImproveSleep}
        >
          النوم
          <img src={img2} alt="sleep" className="w-170 mt-2 relative z-10" style={{borderRadius: "50%",marginTop: "20px"}} />
          <img src={ellips} alt="mood 2" className="w-[50px] mt-2 absolute bottom-10 right-50 z-0" />
        </button>
      </div>
    </div>
  );
};

export default ImproveSleep;











