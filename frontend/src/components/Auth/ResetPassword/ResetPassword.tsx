import React, { useState } from "react";
import SideImage from "../../../assets/Auth_Assets/SideScreen.png";
import OverlayFragment from "../../../common/OverlayFragment";
import ErrorText from "../../../common/ErrorText";
import InputField from "../../../common/InputField";
import ButtonElement from "../../../common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { VConfirmPassword, VPassword } from "../../../validation/InputFields";
import ROUTES from "../../../server/Routes";
import { APIHandler } from "../../../server/API";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const Validation = Yup.object().shape({
        password: VPassword,
        confirmPassword: VConfirmPassword,
    });
    const token = location.pathname.split("/")?.at(-1);

    return (
        <div className="grid grid-cols-2 w-full">
            <img src={SideImage} className="h-full" />
            <div className="min-h-full">
                <div className="h-[100%] flex flex-col justify-center items-center w-full ">
                    <Formik
                        initialValues={{
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={Validation}
                        onSubmit={async (values) => {
                            console.log(values);

                            setLoading(true);
                            const { status, data, error } = await APIHandler(
                                "POST",
                                ROUTES.AUTH.FORGOT_PASSWORD,
                                {
                                    password: values.password,
                                    confirmPassword: values.confirmPassword,
                                    token: token,
                                }
                            );

                            setLoading(false);

                            if (!status) {
                                toast.error(error || "Something Went Wrong!");
                                console.log(error);
                            } else {
                                toast.success("Password Changed Successfully");
                                navigate("/");
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
                            <div className="w-[80%]  mx-auto space-y-12">
                                <div className="space-y-5">
                                    <h4 className="text-2xl  font-medium">
                                        Choose new password
                                    </h4>
                                    <p className="text-sm font-medium">
                                        Almost done. Enter your new password and
                                        your all set.
                                    </p>

                                    <div className="space-y-10">
                                        <div className="relative">
                                            <InputField
                                                handleFunction={handleChange(
                                                    "password"
                                                )}
                                                value={values["password"]}
                                                name={"password"}
                                                type="password"
                                                label="Password"
                                            />
                                            <div className="absolute top-14">
                                                {errors["password"] &&
                                                    touched["password"] && (
                                                        <ErrorText
                                                            text={
                                                                errors[
                                                                    "password"
                                                                ]
                                                            }
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <InputField
                                                handleFunction={handleChange(
                                                    "confirmPassword"
                                                )}
                                                value={
                                                    values["confirmPassword"]
                                                }
                                                name={"confirmPassword"}
                                                type="password"
                                                label="confirmPassword"
                                            />
                                            <div className="absolute top-14">
                                                {errors["confirmPassword"] &&
                                                    touched[
                                                        "confirmPassword"
                                                    ] && (
                                                        <ErrorText
                                                            text={
                                                                errors[
                                                                    "confirmPassword"
                                                                ]
                                                            }
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between">
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
                </div>{" "}
            </div>
        </div>
    );
};

const UpdatePassword = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="bg-[#f3d14bef] min-h-screen max-w-[100vw]">
            <OverlayFragment
                isOpen={true}
                setIsOpen={setIsOpen}
                children={<ChangePassword />}
                size="5xl"
            />
        </div>
    );
};

export default UpdatePassword;
