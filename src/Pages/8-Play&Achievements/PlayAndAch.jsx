import CloudShape from '../../components/CloudShape'
import React from 'react'
import logo from "../..//assests/svgs/logo Play and ach.svg"
import xmark from '../..//assests/svgs/xmark.svg';
import { useNavigate } from 'react-router-dom';

const achievements = [
  {id: 1, title: 'تصبح مستقل', img: 'Ach 1.svg', category: "تحديات الاستقلاليه"},
  {id: 2, title: 'معالجة المواقف الاجتماعيه', img: 'Ach 2.svg', category: 'تحديات المواقف الاجتماعيه'},
  {id: 3, title: 'التعامل مع المثالية', img: 'Ach 3.svg', category: 'تحديات المثاليه'},
  {id: 4, title: 'مواجهة المجهول', img: 'Ach 4.svg', category: "تحديات مواجهه المجهول"}
];


function PlayAndAch() {
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/Home');
    };

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
                        src={xmark}
                        alt="xmark"
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
                        تحديات اللعب والانجازات
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-10 p-4 flex-grow place-items-center items-center" dir="rtl">
                {achievements.map((ach) => (
                    <div
                        key={ach.id}
                        className="cursor-pointer no-underline"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={() => {
                                navigate(`/Home/Play&Achievements/AchievementInfo`,{
                                  state: ach, 
                                });
                        }}
                    >
                        <div
                            className="bg-secondary w-24 h-24 rounded-full" 
                            style={{
                              background: "#56D6C1",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                          }}
                        >
                            <img
                                src={`/images/${ach.img}`}
                                alt=""
                                className="rounded-md w-10 h-object-cover"
                            />
                        </div>

                        <div
                            className="text-sm font-medium text-center mt-3"
                            style={{ marginBottom: "2rem", fontSize: "22px" }}
                        >
                            {ach.title}
                        </div>
                    </div>
                ))}
            </div>

            <div
                className="rounded-full text-center p-5 w-fit mx-auto"
                style={{ border: "1px solid black", fontSize: "20px", marginBottom: "50px" , marginTop:'50px'}}
            >
                هل انت مستعد للتعامل مع موقف اجتماعي؟
            </div>

            <button onClick={() => navigate("/Home/Play&Achievements/CompleteAchievement")} className="text-black font-semibold py-2 rounded-md mt-2" style={{ backgroundColor: "#75D6C6", padding: "10px 50px", fontSize: "20px", display:'block', margin:'auto' , marginBottom:'50px'}}> عرض انتصاراتي </button>
            
                
        </div>
    );
}

export default PlayAndAch;
