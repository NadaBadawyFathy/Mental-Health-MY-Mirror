import React, { useState, useRef, useEffect } from "react";
import CloudShape from "../../components/CloudShape";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Base } from "../../../Api";

function SendCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleVerify = async () => {
    const fullCode = code.join("");
    try {
      await axios.post(`${Base}verify-code?email=${email}&code=${fullCode}`);
      toast.success("تم التحقق من الكود بنجاح");
      navigate("/resetpassword");
    } catch (err) {
      toast.error("الكود غير صحيح. حاول مرة أخرى");
    }
  };

  const handleChange = (val, idx) => {
    if (!/^[0-9]*$/.test(val)) return; // يقبل فقط الأرقام
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    if (val && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  return (
    <div>
      <ToastContainer />
      <CloudShape />
      <div className="text-center flex justify-center mb-[50px]">
        <div className="relative bg-white">
          <h2 className="text-3xl mt-[-80px] mb-16">ادخل الكود المرسل</h2>
          <h3 className="text-2xl text-[#0A584F] mb-16">الكود</h3>
          <div className="flex justify-between gap-2 mb-12 flex-wrap justify-center">
            {code.map((c, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                maxLength="1"
                value={c}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-[50px] h-[60px] text-center text-2xl border-2 border-gray-300 rounded-lg"
              />
            ))}
          </div>
          <button
            onClick={handleVerify}
            className="bg-[#75D6C6] text-black font-semibold py-2 rounded-md w-full"
            style={{ textAlign: "center" }}
          >
            تحقق
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendCode;
