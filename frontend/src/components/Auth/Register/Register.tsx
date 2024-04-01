import { Formik } from "formik";
import React, { useRef, useState } from "react";
import ROUTES from "../../../server/Routes";
import * as Yup from "yup";
import {
  VEmail,
  VPassword,
  VFirstName,
  VLastName,
  VUserName,
  VConfirmPassword,
  VPhone,
} from "../../../validation/InputFields";
import {
  UserNameField,
  EmailField,
  FirstNameField,
  LastNameField,
  PasswordField,
  ConfirmPasswordField,
  PhoneNumberField,
} from "../../../utils/InputFields";
import InputField from "../../../common/InputField";
import ButtonElement from "../../../common/Button";
import AuthHeader from "../../../common/AuthHeader";
import { IPropSteps } from "../../../interfaces/StepForm";
import { FaGoogle } from "react-icons/fa";
import ErrorText from "../../../common/ErrorText";
import axios from "axios";

import AuthLady from "../../../assets/Auth_Assets/SideScreen.png";
import { APIHandler } from "../../../server/apiConnetor";
import InputPassword from "../../../common/InputPassword";
import UploadProfileImg from "../../Client-Profile/UploadProfileImg";
import { useNavigate } from "react-router-dom";

const Register: React.FC<IPropSteps> = (props) => {
  const { data, setData, nextStep, isNavigate, handleNavigate } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const profileImgRef = useRef();
  const profileImgUpload = useRef();

  const Fields = [
    UserNameField,
    EmailField,
    PhoneNumberField,
    FirstNameField,
    LastNameField,
  ];

  const Validation = Yup.object().shape({
    username: VUserName,
    firstName: VFirstName,
    lastName: VLastName,
    email: VEmail,
    phoneNumber: VPhone,
    password: VPassword,
    confirmPassword: VConfirmPassword,
  });

  return (
    <div className="grid grid-cols-2  w-full">
      {/* AuthLady 😂😂 */}
      <img src={AuthLady} className=" h-full" />
      <div>
        <div className="w-[80%] mx-auto mt-7">
          <AuthHeader
            title="Create An Account"
            subtitle="Already have an account?"
            linkText="Sign in"
            handleClick={() => handleNavigate && handleNavigate()}
          />
          <Formik
            initialValues={{
              username: data?.username ? data?.username : "",
              firstName: data?.firstName ? data?.firstName : "",
              lastName: data?.lastName ? data?.lastName : "",
              email: data?.email ? data?.email : "",
              password: data?.password ? data?.password : "",
              confirmPassword: data?.confirmPassword
                ? data?.confirmPassword
                : "",
              phoneNumber: data?.phoneNumber ? data?.phoneNumber : "",
              profileImage: null,
            }}
            validationSchema={Validation}
            onSubmit={async (values) => {
              console.log(values);

              setLoading(true);
              const res = await APIHandler("POST", ROUTES.AUTH.SEND_OTP, {
                email: values.email,
                phoneNo: values.phoneNumber
              });
              console.log(res);
              setLoading(false);

              if (res.status) {
                setData && setData(values);
                nextStep && nextStep();
              } else {
                setError(res?.message);
              }
            }}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <div className="">
                <UploadProfileImg name="profileImage" />
                <div className="grid grid-cols-2 gap-5 mb-4 gap-x-4 ">
                  {Fields.map((inp, id) => (
                    <div
                      key={id}
                      className={`${
                        inp.name === "username" ? "col-span-2" : "col-span-1 "
                      } space-y-1 relative `}
                    >
                      <InputField
                        type={inp.type}
                        handleFunction={handleChange(inp.name)}
                        value={values[inp.name]}
                        name={inp.name}
                        label={inp.label}
                      />
                      <div className="absolute top-16">
                        {errors[inp.name] && touched[inp.name] && (
                          <ErrorText text={errors[inp.name]} />
                        )}
                      </div>
                    </div>
                  ))}

                  <div>
                    <InputPassword
                      type={PasswordField?.type}
                      handleFunction={handleChange(PasswordField?.name)}
                      label={PasswordField?.label}
                      value={values[PasswordField?.name]}
                      name={PasswordField?.name}
                    />
                    {errors[PasswordField?.name] &&
                      touched[PasswordField?.name] && (
                        <ErrorText text={errors[PasswordField?.name]} />
                      )}
                  </div>

                  <div>
                    <InputPassword
                      type={ConfirmPasswordField?.type}
                      handleFunction={handleChange(ConfirmPasswordField?.name)}
                      label={ConfirmPasswordField?.label}
                      value={values[ConfirmPasswordField?.name]}
                      name={ConfirmPasswordField?.name}
                    />
                    {errors[ConfirmPasswordField?.name] &&
                      touched[ConfirmPasswordField?.name] && (
                        <ErrorText text={errors[ConfirmPasswordField?.name]} />
                      )}
                  </div>
                </div>
                <div className="space-y-">
                  {" "}
                  <p className=" relative -top-5 text-red-600 text-xs text-center">
                    {error ? error : " "}
                  </p>
                  <ButtonElement
                    text="Next"
                    className=" w-full gradient-button  "
                    handleFunction={handleSubmit}
                    isLoading={loading}
                  />
                </div>
                <p className="text-center my-2">or</p>
                <ButtonElement
                  text="Sign up With Google"
                  handleFunction={() => {
                    window.location.href = `${axios.defaults.baseURL}/api/auth/google`;
                  }}
                  Icon={FaGoogle}
                  className="w-full"
                />
                <div className="my-4 flex gap-4">
                  {/* <input type="checkbox" className="accent-[#A75EB1]" onChange={() => setIsAllowed(!isAllowed)} /> */}
                  <p className="text-xs font-medium text-[#84818A]">
                    By clicking Create account, I agree that I have read and
                    accepted the Terms of Use and Privacy Policy.
                  </p>
                </div>
              </div>
            )}
          </Formik>

          {/* Alert Component  */}
          {/* {isError && (
        <Alert
          isAlertShown={isError}
          setAlertShown={setIsError}
          isError={isError}
          message={message}
        />
      )} */}
        </div>
      </div>
    </div>
  );
};

export default Register;
