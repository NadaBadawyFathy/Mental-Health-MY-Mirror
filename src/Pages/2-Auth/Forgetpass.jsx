import CloudShape from "../../components/CloudShape";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Base } from "../../../Api";
import { toast, ToastContainer } from "react-toastify";

const Forgetpass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Base}forgot-password?email=${email}`);
      toast.success("تم إرسال الكود بنجاح");
      localStorage.setItem("resetEmail", email);
      navigate("/sendcode");
    } catch (err) {
      toast.error("حدث خطأ أثناء إرسال الكود. تأكد من البريد");
    }
  };

  return (
    <div>
      <ToastContainer />
      <CloudShape />
      <div className="text-center flex justify-center mb-[50px]">
        <div className="relative bg-white">
          <h2 className="text-3xl mb-24">نسيت كلمة المرور</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-right">
            <label className="text-2xl text-[#0A584F] pb-4">البريد الالكتروني</label>
            <input
              type="email"
              required
              dir="rtl"
              placeholder="ادخل البريد الالكتروني"
              className="w-full px-3 py-2 bbbb rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-[#0A584F] mb-32">
              أدخل عنوان بريدك الإلكتروني المسجل، وسنرسل لك الكود لإعادة تعيين كلمة المرور.
            </p>
            <button type="submit" className="bg-[#75D6C6] text-black font-semibold py-2 rounded-md" style={{ textAlign: "center" }} >
              ارسل الكود
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgetpass;