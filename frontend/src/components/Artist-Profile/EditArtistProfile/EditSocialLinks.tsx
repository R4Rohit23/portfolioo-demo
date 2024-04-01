import { Formik } from "formik";
import React, { useState } from "react";
import { UPhoneNumber } from "../../../validation/InputFields";
import * as Yup from "yup";
import {
    FaGithub,
    FaFigma,
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
} from "react-icons/fa";
import { SiAdobexd, SiBlender } from "react-icons/si";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { APIHandler } from "../../../server/API";
import { setUserData } from "../../../redux/user.slice";
import toast from "react-hot-toast";
import { Input } from "@nextui-org/react";
import ButtonElement from "../../../common/Button";
import ROUTES from "../../../server/Routes";
import ErrorText from "../../../common/ErrorText";

interface IPROPS {
    type: string;
}

const EditSocailLinks: React.FC<IPROPS> = (props) => {
    const { type } = props;
    const { userData } = useSelector((store) => store.store.userDetails);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [cookie] = useCookies(["accessToken"]);

    const Validation = Yup.object().shape({
        phoneNumber: UPhoneNumber,
    });

    const socialLinksStartContent = [
        {
            name: "linkedin",
            icon: <FaLinkedinIn size={20} />,
        },
        {
            name: "facebook",
            icon: <FaFacebookF size={20} />,
        },
        {
            name: "instagram",
            icon: <FaInstagram size={20} />,
        },
        {
            name: "github",
            icon: <FaGithub size={20} />,
        },
        {
            name: "figma",
            icon: <FaFigma size={20} />,
        },
        {
            name: "adobexd",
            icon: <SiAdobexd size={20} />,
        },
        {
            name: "blender",
            icon: <SiBlender size={20} />,
        },
    ];
    const initialValues = {
        linkedin:
            type === "Artist"
                ? userData?.artistId?.socialLinks?.linkedin
                : userData?.clientId?.socialLinks?.linkedin,

        facebook:
            type === "Artist"
                ? userData?.artistId?.socialLinks?.facebook
                : userData?.clientId?.socialLinks?.facebook,
        instagram:
            type === "Artist"
                ? userData?.artistId?.socialLinks?.instagram
                : userData?.clientId?.socialLinks?.instagram,
        github:
            type === "Artist"
                ? userData?.artistId?.socialLinks?.github
                : userData?.clientId?.socialLinks?.github,

        figma:
            type === "Artist"
                ? userData?.artistId?.socialLinks?.figma
                : userData?.clientId?.socialLinks?.figma,

        adobexd:
            type === "Artist"
                ? userData?.artistId?.socialLinks?.adobexd
                : userData?.clientId?.socialLinks?.adobexd,

        blender:
            type === "Artist"
                ? userData?.artistId?.socialLinks?.blender
                : userData?.clientId?.socialLinks?.blender,
    };
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

                let route = "";
                if (type === "Artist") {
                    route = ROUTES.ARTIST.UPDATE_ARTIST_PROFILE;
                } else {
                    route = ROUTES.CLIENT.UPDATE_CLIENT_PROFILE;
                }

                const payload = {
                    socialLinks: values,
                };
                const response = await APIHandler("PUT", route, payload, {
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
                        Social Links
                    </h2>
                    {/* <img src={QR} /> */}
                    <div className=" flex flex-row justify-between gap-10">
                        <div className="grid grid-cols-2 gap-5 gap-y-8  w-[80%] ">
                            {socialLinksStartContent.map((inp, id) => (
                                <>
                                    <div key={id} className={`  relative `}>
                                        <Input
                                            id="filled-read-only-input"
                                            type={"text"}
                                            startContent={inp?.icon}
                                            // label={inp?.label}
                                            // helperText="Enter compony name"
                                            value={values[inp?.name]}
                                            onChange={handleChange(inp?.name)}
                                            placeholder="Add Your Social Link Here..."
                                            variant="bordered"
                                        />
                                        <div className="absolute top-16">
                                            {errors[inp?.name] &&
                                                touched[inp?.name] && (
                                                    <ErrorText
                                                        text={errors[inp?.name]}
                                                    />
                                                )}
                                        </div>
                                    </div>
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

export default EditSocailLinks;
