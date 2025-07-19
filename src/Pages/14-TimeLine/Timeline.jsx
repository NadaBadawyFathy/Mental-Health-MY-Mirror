import CloudShape from "../../components/CloudShape";

import timeline from "../../assests/svgs/timeline.svg"; 

import { Home, User, Menu } from "lucide-react";
import { Link, useNavigate , useLocation } from "react-router-dom";


const activityData = [
  {
    title: "عملت تمارين التنفس",
 
    date:  " الساعة 5:40,  الثلاثاء، 16 اغسطس ٢٠٢٥",
  },
  {
    title: "عملت تمارين رياضية",
    
    date:  " الساعة 5:40,  الثلاثاء، 16 اغسطس ٢٠٢٥",
  },
  {
    title: "تعرضت لنوبة نفسية لمدة ١٣ دقيقة",
    
    date:  " الساعة 5:40,  الثلاثاء، 16 اغسطس ٢٠٢٥",
  },
  {
    title: "قامت لمدة ١٢ دقيقة",
    
    date:  " الساعة 5:40,  الثلاثاء، 16 اغسطس ٢٠٢٥",
  },
  {
    title: "حالتك المزاجية: مبسوط",
    
    date:  " الساعة 5:40,  الثلاثاء، 16 اغسطس ٢٠٢٥",
  },
  {
    title: "قمت بتحدي والانتصار",
    
    date:  " الساعة 5:40,  الثلاثاء، 16 اغسطس ٢٠٢٥",
  },
];

const ActivityCard = ({ title, detail, date }) => (
  <div className="border-b border-gray-300 py-4 px-4">
    <div className="flex justify-between items-start">
      <div>
      <p className="text-sm text-gray-400 mt-2 text-right"  style={{fontSize: "12px", paddingTop: "16px",   paddingLeft: "20px"}}>{date}</p>
 
        
      </div>

      <div className="flex justify-between items-start">        
      <p className="text-lg font-medium text-gray-800 text-right"     
      
      style={{fontSize: "25px", paddingTop: "20px",   paddingRight: "20px"
    }}
      
      >{title}</p> 
        <i className="fa-solid fa-check  mt-1" style={{fontSize: "45px", color: "#75D6C6",  padding: "10px"
            }}
            ></i>
           
            </div>
    </div>
    
  </div>
);

const Timeline = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  const navigate = useNavigate();
  return (
    <div style={{height:"full"}}>  

<div  style={{display:"flex",justifyContent:"space-between"}}> 
    
      <div>
      <CloudShape />
      <img src={timeline} alt="New goal" 
      style={{
        position: "relative",
    bottom: "10rem",
    width: "130px"}}      />  
    </div>




<h2 style={{fontSize:"2.6rem",marginBottom:"1rem",paddingRight:"35px",marginTop:"4rem" }}>  الجدول الزمنى</h2>

 </div>












    {/* Bottom Navigation */}
    <nav className="fixed bottom-0 container z-50">
      <div className="relative flex justify-around items-center bg-[#53b4a4] h-16 rounded-t-xl" style={{fontSize:"85px"}}> 
        
        {/* Home Icon in Circle - CENTERED */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <Link
            to="/Home"
            className={`rounded-full  transition-all duration-200 ${
              isActive("/Home") ? "bg-white" : "bg-transparent "
            }`}
          >
            <Home className={`h-10 w-10 ${
              isActive("/Home") ? "text-[#53b4a4]" : "text-white  relative top-[35px]"
            }`} />
          </Link>
        </div>

        {/* User Icon */}
        <Link
          to="/profile"
          className={`rounded-full p-3 transition-all duration-200 ${
            isActive("/profile") ? "bg-white" : "bg-transparent"
          }`}
        >
          <User className={`h-10 w-10 ${
            isActive("/profile") ? "text-[#53b4a4]" : "text-white"
          }`} />
        </Link>

        {/* Spacer */}
        <div className="w-12" />

        {/* Timeline/Menu Icon */}
        <Link
          to="/timeline"
          className={`rounded-full p-3 transition-all duration-200 ${
            isActive("/timeline") ? "bg-white" : "bg-transparent"
          }`}
        >
          <Menu className={`h-9 w-9 ${
            isActive("/timeline") ? "text-[#53b4a4]" : "text-white"
          }`} />
        </Link>
      </div>
    </nav>






    <div className="flex justify-center">
    <div className=" bg-white rounded-lg  mt-6 overflow-hidden" style={{width:"80%"}}>
      {activityData.map((activity, index) => (
        <ActivityCard
          key={index}
          title={activity.title}
          date={activity.date}
        />
      ))}
    </div>

</div>
 </div>


   
  );
};

export default Timeline;



