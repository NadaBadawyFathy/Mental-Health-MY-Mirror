import CloudShape from "../../components/CloudShape";
import logo from "../..//assests/svgs/logo Play and ach.svg"
import { useNavigate,useLocation } from "react-router-dom";


const Congrats = () => {

    
  const location = useLocation();
  const data = location.state
  const navigate = useNavigate();
  
  return (
    <div>

<div style={{ display: "flex", justifyContent: "space-between"}}>
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
                    <h2 style={{ fontSize: "2.6rem", marginBottom: "4rem", paddingRight: "30px", paddingTop:'30px' }} dir="rtl">
                        تحديات اللعب والانجازات
                    </h2>
                </div>
            </div>


 <div style={{display:"flex",justifyContent:"center",textAlign:"center" }}>

    <img src="https://media.istockphoto.com/id/183810277/photo/close-up-of-silver-trophy-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=h0QrotiLOATGmhqi0Zb3_tjRkBbI64tgAVvU-G19XbQ=" alt=""
    
    style={{height: "285px",
        padding:" 20px",
        width: "210px",
       borderRadius:" 50%",
        border: "2px solid #ccc",}}
    />
    </div>

 <div style={{display:"flex",justifyContent:"center",textAlign:"center" }}>

   
  <p
    style={{
      height: "60%",
      width: "50%",
      padding: "1rem",
      borderRadius: "10px",
     
      marginTop: "1rem",
      marginBottom: "3rem",
      fontSize:"25px"
    }}
  >  مبروك 🌟 حققت انجازا جديدا  </p>

  



</div>

<div
  className="flex flex-col gap-2 items-center justify-center "
  style={{paddingBottom:"8rem" }} // لو حابة تضيفي خلفية
>
<button
      className="text-black text-center font-semibold py-2 rounded-md mt-4"
      style={{ backgroundColor: "#75D6C6" ,fontWeight:"600",padding:"5px 45px",fontSize:"30px" }}
      onClick={() => navigate(`/Home/Play&Achievements`) }
    >
   إغلاق
    </button>
<button
      className="text-black text-center font-semibold py-2 rounded-md mt-4"
      style={{ backgroundColor: "#75D6C6" ,fontWeight:"600",padding:"5px 45px",fontSize:"30px" }}
      onClick={() =>{
        const currentDate = new Date();
        navigate(`/Home/Play&Achievements/ViewAchievements`,{
        state: {...data ,selectedAt: currentDate.toISOString()},
      }) }}
    >
   عرض انتصاراتي
    </button>
    </div>
</div>

   
  );
};

export default Congrats;

