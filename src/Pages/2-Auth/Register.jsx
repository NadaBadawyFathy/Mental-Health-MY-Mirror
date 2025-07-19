import CloudShape from "../../components/CloudShape";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { Base } from '../../../Api';
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    email: '',
    country: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "password") {
      if (value.length < 8) {
        setPasswordError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setPasswordError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    try {
      const res = await axios.post(`${Base}register`, formData);

      toast.success("تم التسجيل بنجاح");
      if (res.status === 200 || res.status === 201) {
        navigate('/Login');
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء التسجيل");
      console.error("Registration Error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <CloudShape />
      <div className="text-center flex justify-center mb-[50px]">
        <div className="relative bg-white">
          <h2 className="text-3xl mt-[-80px] mb-16">إنشاء حساب</h2>
          <form className="flex flex-col gap-3 text-right w-[265px]" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium pb-4">الاسم</label>
              <input
                type="text"
                dir="rtl"
                name="name"
                placeholder="ادخل الاسم"
                className="w-full px-3 py-2 bbbb rounded-md"
                onChange={handleChange}
                value={formData.name}
              />
            </div>

            <div className="relative">
              <label className="block text-lg font-medium pb-4">كلمة المرور</label>
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
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium pb-4">البريد الالكتروني</label>
              <input
                type="email"
                dir="rtl"
                name="email"
                placeholder="ادخل البريد"
                className="w-full px-3 py-2 bbbb rounded-md"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div>
              <label className="block text-lg font-medium pb-4">تاريخ الميلاد</label>
              <input
                type="date"
                dir="rtl"
                name="birthdate"
                className="w-full px-3 py-2 bbbb rounded-md"
                onChange={handleChange}
                value={formData.birthdate}
              />
            </div>

            <div>
              <label className="block text-lg font-medium pb-4">الدولة</label>
              <input
                type="text"
                dir="rtl"
                name="country"
                placeholder="ادخل اسم دولتك"
                className="w-full px-3 py-2 bbbb rounded-md mb-10"
                onChange={handleChange}
                value={formData.country}
              />
            </div>

            <button
              type="submit"
              className="text-black text-center font-semibold py-2 rounded-md mt-4"
              style={{ backgroundColor: "#75D6C6" }}
            >
              استمر
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
