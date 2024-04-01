import { Formik } from "formik";
import React from "react";
import ROUTES from "../../../server/Routes";
import * as Yup from "yup";
import { VName, VEmail, VPassword } from "../../../validation/InputFields";
import {
  UserNameField,
  EmailField,
  FirstNameField,
  LastNameField,
  PasswordField,
} from "../../../utils/InputFields";
import InputField from "../../../common/InputField";
import ButtonElement from "../../../common/Button";
import AuthHeader from "../../../common/AuthHeader";
import { IPropSteps } from "../../../interfaces/StepForm";
import { FaGoogle } from "react-icons/fa";

import SideImage from "../../../assets/Auth_Assets/SideScreen.png";
import LoginIcon from "../../../assets/Auth_Assets/LoginLogo.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { APIHandler } from "../../../server/API";
import ErrorText from "../../../common/ErrorText";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import InputPassword from "../../../common/InputPassword";

const Login: React.FC<IPropSteps> = (props) => {
  const {
    data,
    setData,
    nextStep,
    isNavigate,
    setIsLoginClick,
    handleNavigate,
  } = props;
  const [cookie, setCookie] = useCookies(["accessToken"]);

  const Fields = [EmailField];
  const navigate = useNavigate();

  const Validation = Yup.object().shape({
    email: VEmail,
    password: VPassword,
  });

  return (
    <div className="grid grid-cols-2 w-full">
      <img src={SideImage} className="h-full" />
      <div className="flex flex-col justify-between p-6">
        <AuthHeader
          title="Log In to Portfolioo"
          icon={LoginIcon}
          subtitle="Don't have an account?"
          linkText="Sign up"
          handleClick={() => handleNavigate && handleNavigate()}
        />
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Validation}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            const { status, data, error } = await APIHandler(
              "POST",
              ROUTES.AUTH.LOGIN,
              { email: values.email, password: values.password }
            );

            if (!status) {
              toast.error(error || "Something Went Wrong!");
              setSubmitting(false);
              return;
            }

            setCookie("accessToken", data.accessToken, {
              expires: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
            });

            // window.location.reload();
            toast.success("Logged In");
            // setIsLoginClick && setIsLoginClick(false);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <form className="my-4 flex flex-col gap-4">
              {Fields.map((inp, idx) => (
                <div key={idx}>
                  <InputField
                    type={inp.type}
                    handleFunction={handleChange(inp.name)}
                    label={inp.label}
                    value={values[inp.name]}
                    name={inp.name}
                  />
                  {errors[inp.name] && touched[inp.name] && (
                    <ErrorText text={errors[inp.name]} />
                  )}
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

              <a
                className="my-4 float-left cursor-pointer text-sm hover:underline"
                onClick={nextStep}
              >
                Forgot Password
              </a>
              <ButtonElement
                text="Sign In"
                handleFunction={handleSubmit}
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                isLoading={isSubmitting}
              />
              <p className="text-center">or</p>
              <ButtonElement
                className="w-full bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                text="Login With Google"
                handleFunction={() => {
                  window.location.href = `${axios.defaults.baseURL}/api/auth/google`;
                }}
                Icon={FaGoogle}
              />
              <p className="text-sm pt-4 px-4">
                By joining, you agree to the portfolio Terms of Service & to
                occasionally receive emails from us. Please read our Privacy
                Policy to learn how we use your personal data.
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
