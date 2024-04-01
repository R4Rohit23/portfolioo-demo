import React, { useState } from "react";
import SideImage from "../../../assets/Auth_Assets/SideScreen.png";
import * as Yup from "yup";
import InputField from "../../../common/InputField";
import ButtonElement from "../../../common/Button";
import { Formik } from "formik";
import { VEmail } from "../../../validation/InputFields";
import ErrorText from "../../../common/ErrorText";
import ROUTES from "../../../server/Routes";
import { APIHandler } from "../../../server/API";
import toast from "react-hot-toast";

interface IPROPS {
    prevStep: (props: any) => any;
    nextStep: () => any;
    setEmail: (props: any) => any;
    email: string;
}

const ForgotPassword: React.FC<IPROPS> = (props) => {
    const { prevStep, nextStep, email, setEmail } = props;

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // dispatch(generatePasswordToken(email, setEmailSend));
    };

    const Validation = Yup.object().shape({
        email: VEmail,
    });
    return (
        <div className="grid grid-cols-2 w-full">
            <img src={SideImage} className="h-full" />
            <div className="min-h-full">
                <div className="h-[100%] flex flex-col justify-center items-center w-full ">
                    <Formik
                        initialValues={{
                            email: email ? email : "",
                        }}
                        validationSchema={Validation}
                        onSubmit={async (values) => {
                            console.log(values);

                            setLoading(true);
                            const { status, data, error } = await APIHandler(
                                "POST",
                                ROUTES.AUTH.FORGOT_PASSWORD_TOKEN,
                                { email: values.email }
                            );

                            setLoading(false);

                            if (status) {
                                setEmail(values.email);
                                nextStep && nextStep();
                            } else {
                                toast.error(error || "Something Went Wrong!");
                                console.log(error);
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
                            <div className="w-[80%]  mx-auto space-y-10">
                                <div className="space-y-5">
                                    <h4 className="text-2xl  font-medium">
                                        Please Verify Your Email ID
                                    </h4>
                                    <p className="text-sm font-medium">
                                        Have no fear. We’ll email you
                                        instructions to reset your password. If
                                        you dont have access to your email we
                                        can try account recovery
                                    </p>

                                    <div className="relative">
                                        <InputField
                                            handleFunction={handleChange(
                                                "email"
                                            )}
                                            value={values["email"]}
                                            name={"email"}
                                            type="text"
                                            label="Email"
                                        />
                                        <div className="absolute top-14">
                                            {errors["email"] &&
                                                touched["email"] && (
                                                    <ErrorText
                                                        text={errors["email"]}
                                                    />
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <ButtonElement
                                        text="Back to Login"
                                        handleFunction={prevStep}
                                        className="bg-main-light"
                                    />
                                    <ButtonElement
                                        text="Reset Password"
                                        handleFunction={handleSubmit}
                                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                                        isLoading={loading}
                                    />
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
