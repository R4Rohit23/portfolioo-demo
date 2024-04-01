import { Formik } from "formik";
import React, { useState } from "react";
import { UPhoneNumber, VPassword } from "../../../validation/InputFields";

import ErrorText from "../../../common/ErrorText";
import ButtonElement from "../../../common/Button";
import UploadProfileImg from "../../Client-Profile/UploadProfileImg";
import { Input } from "@nextui-org/react";
import LocationSearch from "../../../common/LocationSearch";
import SelectGender from "../../Client-Profile/SelectGender";
import { APIHandler } from "../../../server/API";
import ROUTES from "../../../server/Routes";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { ITextProp } from "../../../interfaces/Input";
import { setUserData } from "../../../redux/user.slice";
import toast from "react-hot-toast";
import { InputTags } from "../../../common/Tags_Input_Field/InputTags";

interface IPROPS {
    Fields: ITextProp[];
    heading: string;
    apiRoute: string;
    initialValues: any;
    type?: string;
    Validation: any;
}

const EditArtistDetails: React.FC<IPROPS> = ({
    Fields,
    heading,
    apiRoute,
    initialValues,
    type,
    Validation,
}) => {
    const { userData } = useSelector((store) => store.store.userDetails);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [cookie] = useCookies(["accessToken"]);

    return (
        <Formik
            initialValues={{ ...initialValues }}
            validationSchema={Validation}
            onSubmit={async (values: any) => {
                // setShowEnrollForm(false);

                setLoading(true);
                const formData = new FormData();
                for (const key in values) {
                    formData.append(key, values[key]);
                }

                let payload = null;
                if (type === "basic") {
                    payload = formData;
                } else if (type === "education-details") {
                    payload = {
                        educationInfo: values,
                    };
                } else if (type === "pricing-rates") {
                    payload = {
                        pricing: values,
                    };
                } else {
                    payload = values;
                }
                const response = await APIHandler("PUT", apiRoute, payload, {
                    Authorization: "Bearer " + cookie.accessToken,
                });

                console.log("Client edit response --->", response);
                setLoading(false);
                if (response?.status) {
                    toast.success(response?.message);

                    if (response?.data?.user)
                        dispatch(setUserData(response?.data?.user));
                } else {
                    toast.error(response?.error);
                }
            }}
        >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <div className="flex flex-col  space-y-10  rounded-md text-richblack-5 py-4 px-4 mb-10 w-full  ">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {heading}
                    </h2>
                    {/* <img src={QR} /> */}
                    <div className=" flex flex-row justify-between gap-10">
                        {type === "basic" && (
                            <UploadProfileImg name="profileImage" />
                        )}
                        <div className="grid grid-cols-2 gap-5 gap-y-8  w-[80%] ">
                            {Fields.map((inp, id) => (
                                <>
                                    {inp.name !== "profileImage" &&
                                        inp.name !== "location" &&
                                        inp.name !== "gender" &&
                                        inp.name !== "companyLocation" && (
                                            <div
                                                key={id}
                                                className={`  relative `}
                                            >
                                                <Input
                                                    id="filled-read-only-input"
                                                    type={inp?.type}
                                                    label={inp?.label}
                                                    // helperText="Enter compony name"
                                                    value={values[inp?.name]}
                                                    onChange={handleChange(
                                                        inp?.name
                                                    )}
                                                    placeholder={
                                                        inp?.type === "date"
                                                            ? "Enter Date"
                                                            : ""
                                                    }
                                                    variant="bordered"
                                                />
                                                <div className="absolute top-16">
                                                    {errors[inp?.name] &&
                                                        touched[inp?.name] && (
                                                            <ErrorText
                                                                text={
                                                                    errors[
                                                                        inp
                                                                            ?.name
                                                                    ]
                                                                }
                                                            />
                                                        )}
                                                </div>
                                            </div>
                                        )}

                                    {/* basic */}
                                    {inp.name == "location" && (
                                        <LocationSearch
                                            name="location"
                                            data={values?.location}
                                        />
                                    )}
                                    {inp.name == "gender" && (
                                        <SelectGender name="gender" />
                                    )}

                                    {/* company */}
                                    {inp.name == "companyLocation" && (
                                        <LocationSearch name="companyLocation" />
                                    )}
                                </>
                            ))}
                        </div>

                        <div></div>
                    </div>

                    <ButtonElement
                        text={"Submit"}
                        className="w-fit ml-auto bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                        handleFunction={handleSubmit}
                        isLoading={loading}
                    />
                </div>
            )}
        </Formik>
    );
};

export default EditArtistDetails;
