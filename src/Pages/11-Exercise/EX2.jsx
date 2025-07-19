import { useNavigate } from 'react-router-dom';
import EXimg from '../../assests/svgs/ex.svg';
import CloudShape from "../../components/CloudShape";
import xmark from '../../assests/svgs/xmark.svg';
import img from '/images/exercise.png';

const EX2 = () => {
  const navigate = useNavigate();

  const handleChooseExersise = () => {
    navigate('/Home/exercise');
  };

  const handleNavigateToHome = () => {
    navigate('/Home');
  };

  return (
    <div className="bg-white rounded-lg w-full min-h-screen relative overflow-hidden text-right font-cairo">
      
      <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ position: "relative" }}>
                    <CloudShape />
                    <img
                        src={EXimg}
                        alt="New goal"
                        style={{
                            position: "absolute",
                            top: "1rem",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "110px",
                        }}
                    />
                </div>
                <div>
                    <img
                        src={xmark}
                        alt="edge"
                        style={{
                            cursor: "pointer",
                            position: "relative",
                            left: "80%",
                            paddingTop: "30px",
                            marginBottom: "1rem",
                        }}
                        onClick={() => navigate(`/Home`)}
                    />
                    <h2 style={{ fontSize: "2.6rem", marginBottom: "4rem", paddingRight: "30px" }} dir="rtl">
                    التمارين الرياضية
                    </h2>
                </div>
            </div>

      {/* محتوى مركزي */}
      <div className="flex flex-col items-center justify-center  mt-24">
        <img
          src={img}
          alt="exercise"
          style={{
            width: "500px",
            borderRadius: "106px",
            marginBottom:"10px"
          }}
        />
        <p className="text-2xl text-center">سجل تمرينك واضبط الوقت المناسب</p>
        </div>

        <div className='text-center m-10' >
        <button
          onClick={handleChooseExersise}
          className="bg-[#75D6C6] hover:bg-[#5bc4b2] transition px-4 py-2 rounded w-[100px] text-center font-semibold m-5"
        >
          ابدأ
        </button>
      </div>
    </div>
  );
};

export default EX2;
