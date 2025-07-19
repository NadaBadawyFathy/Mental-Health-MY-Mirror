
import CloudShape from '../../components/CloudShape'
import React from 'react'
import edge from "../..//assests/svgs/edge.svg"; 
import logo from "../..//assests/svgs/logo Play and ach.svg"
import { useNavigate,useLocation } from "react-router-dom";
import refresh from "../..//assests/svgs/refresh-cw.svg"
function Complete() {
    // const [searchParams] = useSearchParams();
    // const link = searchParams.get('link');

    const location = useLocation();
    const data = location.state
    const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ position: "relative" }}>
                    <CloudShape />
                    <img
                        src={logo}
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
  src={edge}
  alt="edge"
  style={{
    cursor: "pointer",
    position: "relative",
    left: "80%",
    paddingTop: "30px",
    marginBottom: "1rem",
  }}
  onClick={() =>
    navigate(`/Home/Play&Achievements/AchievementInfo`, {
      state: data  
    })
  }
/>
                    <h2 style={{ fontSize: "2.6rem", marginBottom: "4rem", paddingRight: "30px" }} dir="rtl">
                        تحديات اللعب والانجازات
                    </h2>
                </div>
            </div>

            <div className='text-center' style={{marginTop:'50px', marginBottom:'200px'}}> 
                <div className='flex items-center justify-center gap-2' dir="rtl">
                    <img src={refresh} alt="" style={{marginTop:'-20px'}}/>
                    <h1 style={{fontSize:'30px', marginBottom:'30px'}}>التحدي الحالي</h1>
                </div>

                <p style={{fontSize:'30px', marginBottom:'20px'}}>{data.statement.text}</p>
                
                <button
  className='text-white text-center font-semibold py-2 rounded-md mt-4'
  style={{ background: '#C62828', width: '300px', fontSize: '23px' }}
  onClick={() => {
    const currentDate = new Date().toISOString();
    const achievement = { ...data, selectedAt: currentDate };

    // قراءة الإنجازات السابقة (لو فيه)
    const stored = JSON.parse(localStorage.getItem("achievements")) || [];

    // إضافة الإنجاز الجديد
    const updatedAchievements = [...stored, achievement];

    // حفظهم مرة تانية في localStorage
    localStorage.setItem("achievements", JSON.stringify(updatedAchievements));

    // الانتقال لصفحة عرض الانتصارات
    navigate(`/Home/Play&Achievements/CompleteAchievement`, {
      state: achievement,
    });
  }}
>
  !اكتمال
</button>

            </div>
    </div>
  )
}

export default Complete
