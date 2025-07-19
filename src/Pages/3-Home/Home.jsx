import { Home, User, Menu } from "lucide-react";
import { Link, useNavigate  , useLocation } from "react-router-dom";

const goals = [
  { id: 1, title: "روتينك اليومي", img: "goal 1.svg",link: "/Home/routine" },
  { id: 2, title: "تحديد الهدف", img: "goal 2.svg", link: "/Home/NewGoal" },
  { id: 3, title: "اللعب والانجازات", img: "goal 3.svg", link:"/Home/Play&Achievements" },
  { id: 4, title: "الافكار السلبية", img: "goal 4.svg" , link:'/Home/negativeIdea' },
  { id: 5, title: "الملاحظات", img: "goal 5.svg",  link:"/Home/writenote" },
  { id: 6, title: "حب النفس", img: "goal 6.svg" , link: "/Home/SelfloveIncentivize" },
  { id: 7, title: "مزاج ممتن", img: "goal 7.svg",link: "/Home/grateful-mood" },
  { id: 8, title: "صفي ذهنك", img: "goal 8.svg"  ,link: "/Home/clear-mind" },
  { id: 9, title: "التغذية", img: "goal 9.svg"  ,link:"/Home/Nutrition" },
  { id: 10, title: "النوم", img: "goal 10.svg" ,link:'/Home/improveSleep'},
  { id: 11, title: "الدردشة", img: "goal 11.svg" , link:"/Home/chat"},
  { id: 12, title: "التمارين الرياضية", img: "goal 12.svg" , link:"/Home/exercise2"},
];

export default function AllPage() {

  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  const navigate = useNavigate();


  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <h1 className="text-center text-4xl mt-4 mb-32 mt-28" >الأهداف اليومية</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4 flex-grow">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="cursor-pointer no-underline"
            onClick={() => { navigate(goal.link) }}
          >
            <div className="bg-secondary rounded-lg flex flex-col items-center justify-center p-4 text-center">
              <img
                src={`/images/images/${goal.img}`}
                alt={goal.title}
                className="rounded-md  object-cover"
              />
            </div>
            <div
              className="text-sm font-medium text-center mt-2"
              style={{ marginBottom: "8rem", fontSize: "22px" }}
            >
              {goal.title}
            </div>
          </div>
        ))}
      </div>






   {/* Bottom Navigation */}
   <nav className="fixed bottom-0 container z-50">
   <div className="relative flex justify-around items-center bg-[#53b4a4] h-16 rounded-t-xl" style={{fontSize:"85px"}}> 
    
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

    {/* Home Icon in Circle - CENTERED */}
    <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg">
      <Link
        to="/Home"
        className="flex items-center justify-center"
      >
        <Home className={`h-10 w-10 ${
          isActive("/Home") ? "text-[#53b4a4]" : "text-[#53b4a4]"
        }`} />
      </Link>
    </div>

    {/* Timeline/Menu Icon */}
    <Link
      to="/timeline"
      className={`rounded-full p-3 transition-all duration-200 ${
        isActive("/timeline") ? "bg-white" : "bg-transparent"
      }`}
    >
      <Menu className={`h-10 w-10 ${
        isActive("/timeline") ? "text-[#53b4a4]" : "text-white"
      }`} />
    </Link>
  </div>
</nav>







    </div>
  );
}
