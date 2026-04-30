import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SolmatePhoneNumber() {
  const [countryCode, setCountryCode] = useState("+ 27");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    setError("");

    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }
    if (!/^\d{6,15}$/.test(phone.trim())) {
      setError("Please enter a valid phone number");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms and conditions");
      return;
    }

    try {
      setLoading(true);
      const fullNumber = `${countryCode.replace(/\s/g, "")}${phone.trim()}`;
      const response = await fetch(
        "https://my-worker-app.instapayapi.workers.dev/api/phone",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: fullNumber }),
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
        setError(data.message || data.error || "Something went wrong");
        return;
      }

      console.log("Phone submitted:", fullNumber);
      navigate("/solmate-sms", { state: { phone } });
      // navigate to next step here
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  // Continue button enabled only if phone is filled AND terms agreed
  const isEnabled = phone.trim().length > 0 && agreed;

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
        Enter your phone<br />number
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-base sm:text-lg mb-12">
        To join SOLmate and setup your account
      </p>

      {/* Phone Number Section */}
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-white text-lg font-normal mb-3"
        >
          Phone number
        </label>

        <div className="flex gap-3">
          {/* Country Code */}
          <div className="bg-[#1A2731] rounded-lg w-24 h-14 flex items-center justify-center">
            <span className="text-gray-400 text-base">{countryCode}</span>
          </div>

          {/* Phone Input */}
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              // Allow only digits
              const val = e.target.value.replace(/\D/g, "");
              setPhone(val);
              if (error) setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
            className={`flex-1 bg-[#1A2731] rounded-lg px-4 h-14 text-white outline-none text-base transition ${
              error
                ? "ring-2 ring-red-500"
                : "focus:ring-2 focus:ring-[#FFD60A]"
            }`}
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-3 font-medium">{error}</p>
        )}
      </div>

      {/* Spacer pushes footer to bottom */}
      <div className="flex-1"></div>

      {/* Terms Checkbox */}
      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={() => setAgreed(!agreed)}
          aria-label="Agree to terms"
          className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
            agreed ? "bg-[#FFD60A]" : "bg-transparent border-2 border-gray-500"
          }`}
        >
          {agreed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0A1721"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </button>
        <p className="text-white text-sm sm:text-base">
          I agree with the{" "}
          <a
            href="#terms"
            className="text-[#FFD60A] hover:underline"
          >
            Terms and conditions
          </a>
        </p>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!isEnabled || loading}
        className={`w-full py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center gap-2 ${
          isEnabled && !loading
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
            Loading...
          </>
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
}