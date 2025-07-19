import { useNavigate } from "react-router-dom";


const Welcome  = () => {

  const navigate = useNavigate();
    return (
      <div >

       <div className="text-center" style={{display:"flex" , justifyContent:"center", marginBottom:"50px"}}>
       
      <div className="relative ">

<div>
  <img src="/images/logo.png" className=" mb-2 " alt="" width="300" height="300" style={{paddingLeft:"10px"}} ></img>
  <img src="/images/name.png" className=" mb-8" alt="" width="350" height="350" ></img>
</div>


        <form className=" flex-col gap-3 text-right"style={{display:"flex", fontSize:"25px" }} >
          <button className=" text-black text-center font-semibold py-2 rounded-md mt-4" style={{backgroundColor:"#75D6C6"}}    onClick={() => navigate(`/register`)}>انشاء حساب </button>
          <button className=" text-black text-center font-semibold py-2 rounded-md mt-4" style={{backgroundColor:"#75D6C6"}} onClick={() => navigate(`/Login`)}>لديك حساب بالفعل </button>
        </form>
      </div>
    </div>
      </div>
    );
  }
  
  export default Welcome;
  
