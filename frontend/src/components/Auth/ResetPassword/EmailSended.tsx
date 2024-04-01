import React, { useState } from "react";
import SideImage from "../../../assets/Auth_Assets/SideScreen.png";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InputField from "../../../common/InputField";
import ButtonElement from "../../../common/Button";

interface IPROPS {
  prevStep: (props: any) => any;
  email: string;
}
const EmailSended: React.FC<IPROPS> = (props) => {
  const { prevStep, email } = props;
  return (
    <div className="grid grid-cols-2 w-full">
      <img src={SideImage} className="h-full" />
      <div className="min-h-full">
        <div className="h-[100%] flex flex-col justify-center items-center w-full ">
          <div className="w-[50%]  mx-auto space-y-10">
            <div className="space-y-5">
              <h4 className="text-2xl  font-medium">Check Email</h4>
              <p className="text-sm font-medium">
                We have sent the reset email to {email}
              </p>
            </div>

            <ButtonElement
              text="Resend Email "
              handleFunction={prevStep}
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSended;
