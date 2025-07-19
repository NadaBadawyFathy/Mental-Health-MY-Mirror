import React, { useState } from "react";
import CloudShape from "../../components/CloudShape";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base } from "../../../Api";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setError("كلمة المرور يجب أن تكون على الأقل 8 أحرف");
      return;
    } else {
      setError("");
    }

    try {
      await axios.post(`${Base}reset-password?email=${email}&newPassword=${newPassword}`);
      toast.success("تم تغيير كلمة المرور بنجاح");
      navigate("/login");
    } catch (err) {
      toast.error("حدث خطأ أثناء إعادة تعيين كلمة المرور");
    }
  };

  return (
    <div>
      <ToastContainer />
      <CloudShape />
      <div className="text-center flex justify-center mb-[50px]">
        <div className="relative bg-white">
          <h2 className="text-3xl mt-[-80px] mb-16">كلمة مرور جديدة</h2>
          <form onSubmit={handleReset} className="flex flex-col gap-3 text-right w-[300px]">
            <label className="text-xl text-[#0A584F]">أدخل كلمة المرور الجديدة</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                dir="rtl"
                placeholder="كلمة مرور جديدة"
                className={`w-full px-3 py-2 bbbb rounded-md pr-10 border ${error ? 'border-red-500' : 'border-gray-300'}`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
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

            {error && (
              <p className="text-red-500 text-sm mt-[-8px]">{error}</p>
            )}

            <button
              type="submit"
              className="bg-[#75D6C6] text-black font-semibold py-2 rounded-md mt-6"
              style={{ textAlign: "center" }}
            >
              إعادة تعيين
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
