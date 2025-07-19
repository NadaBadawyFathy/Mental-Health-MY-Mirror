import CloudShape from "../../components/CloudShape";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import { Base } from '../../../Api';
import { toast, ToastContainer } from "react-toastify";

const Login = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${Base}login`, {
        email: formData.email,
        password: formData.password
      });

      if (res.status === 200) {
        console.log("Login Response:", res.data);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken); 
        localStorage.setItem("userId", res.data.id); 


        console.log("token:", res.data);
        navigate('/Home');
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error("فشل تسجيل الدخول. تأكد من البيانات.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <CloudShape />
      <div className="text-center" style={{ display: "flex", alignItems: "none", justifyContent: "center", marginBottom: "80px" }}>
        <div className="relative bg-white">
          <h2 className="text-center text-lg" style={{ marginTop: "-80px", fontSize: "3rem", marginBottom: "6rem" }}>تسجيل الدخول</h2>
          <form className="flex-col gap-3 text-right" style={{ display: "flex", alignItems: "none", width: "300px" }} onSubmit={handleSubmit}>
            <div style={{ marginBottom: "2rem" }}>
              <label className="block ext-lg font-medium pb-4" style={{ fontSize: "22px" }}>البريد الالكتروني</label>
              <input type="email" dir="rtl" name="email" placeholder="ادخل البريد" className="w-full px-3 py-2 bbbb rounded-md" onChange={handleChange} value={formData.email} />
            </div>

            <div className="relative">
              <label className="block ext-lg font-medium pb-4" style={{ fontSize: "22px" }}>كلمة المرور</label>
              <input
                type={showPassword ? "text" : "password"}
                dir="rtl"
                name="password"
                placeholder="ادخل كلمة السر"
                className="w-full px-3 py-2 bbbb rounded-md pr-10"
                onChange={handleChange}
                value={formData.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 bottom-[10px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 hover:text-gray-700 transition"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7 0-1.243.346-2.41.95-3.425M21.07 21.07L3 3"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>

            <div className="text-left mb-3" style={{ marginBottom: "8rem" }}>
              <Link to="/forgetpassword" className="text-decoration-none">هل نسيت كلمة المرور؟</Link>
            </div>
            <button type="submit" className="text-black text-center font-semibold py-2 rounded-md mt-4" style={{ backgroundColor: "#75D6C6" }}>
              تسجيل دخول
            </button>
            <div className="mb-3 text-center">
              ليس لديك حساب ؟
              <Link to="/register" style={{ textDecoration: "underline", fontWeight: "bold" }}>قم بالتسجيل</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
