import CloudShape from "../../components/CloudShape";

import newgoal from "../../assests/svgs/newgoal.svg"; 
import { useNavigate } from "react-router-dom";


const Congrat = () => {

    
  const navigate = useNavigate();
  
  return (
    <div>

<div  style={{display:"flex",justifyContent:"space-between"}}> 
    
      <div>
      <CloudShape />
      <img src={newgoal} alt="New goal" 
      style={{
        position: "relative",
    bottom: "10rem",
    width: "110px"}}      />  
    </div>


<div>

<h2 style={{fontSize:"2.6rem",marginTop:"3rem",paddingRight:"35px" }}>تحديد الهدف</h2>
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
  >  مبروك 🌟 حققت هدفك بكل إصرار واجتهاد إحنا فخورين بيك جدا خليك دايما واثق في نفسك واستمر في التقدم نحو أهداف جديدة كل خطوة بتاخذها بتقريك أكثر من النجاح  </p>

  



</div>

<div
  className="flex items-center justify-center "
  style={{paddingBottom:"8rem" }} // لو حابة تضيفي خلفية
>
<button
      className="text-black text-center font-semibold py-2 rounded-md mt-4"
      style={{ backgroundColor: "#75D6C6" ,fontWeight:"600",padding:"5px 45px",fontSize:"30px" }}
      onClick={() => navigate(`/Home/NewGoal`) }
    >
   إغلاق
    </button>
    </div>
</div>

   
  );
};

export default Congrat;

