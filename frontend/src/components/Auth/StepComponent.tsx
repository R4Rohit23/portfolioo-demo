import React, { useState } from "react";
import { IRegister, ILogin } from "../../interfaces/Auth";
import Login from "./Login/Login";
import Register from "./Register/Register";
import VerifyOtp from "./Register/VerifyOtp";
import CongulationPage from "./Register/Congratulations";
import ForgotPassword from "./ResetPassword/ForgotPassword";
import EmailSended from "./ResetPassword/EmailSended";

interface IPROPS {
  isLogin?: boolean;
}
const StepComponent: React.FC<IPROPS> = (props) => {
  const { isLogin } = props;
  const [isRegister, setIsRegister] = useState<boolean>(isLogin ? false : true);

  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<IRegister | ILogin>();
  const [email, setEmail] = useState<string>("");

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const RegisterComps = [
    <Register
      data={data}
      key={step}
      setData={setData}
      nextStep={nextStep}
      handleNavigate={() => setIsRegister(!isRegister)}
    />,
    <VerifyOtp
      key={step}
      data={data}
      prevStep={prevStep}
      nextStep={nextStep}
    />,
    // <CongulationPage />,
  ];

  const LoginComps = [
    <Login
      key={"login"}
      handleNavigate={() => setIsRegister(!isRegister)}
      nextStep={nextStep}
    />,
    <ForgotPassword
      prevStep={prevStep}
      nextStep={nextStep}
      email={email}
      setEmail={setEmail}
    />,
    <EmailSended prevStep={prevStep} email={email} />,
  ];

  return isRegister ? RegisterComps[step - 1] : LoginComps[step - 1];
};

export default StepComponent;
