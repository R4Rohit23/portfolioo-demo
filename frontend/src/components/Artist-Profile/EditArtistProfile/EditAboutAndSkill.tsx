import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
    UPhoneNumber,
    VDOB,
    VDescription,
    VEmail,
    VFirstName,
    VLastName,
    VLocation,
    VPassword,
    VPhoneNumber,
} from "../../../validation/InputFields";
import * as Yup from "yup";
import {
    City,
    Country,
    CourseEndDate,
    CourseSpecialization,
    CourseStartDate,
    Degree,
    DescriptionField,
    DobField,
    EmailField,
    FirstNameField,
    GenderField,
    Industry,
    Institute,
    LastNameField,
    LocationField,
    Percentage,
    PhoneNumberField,
    ProfileImageFiled,
    Qualification,
    State,
} from "../../../utils/InputFields";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../../server/Routes";
import EditArtistBasicDetails from "./EdtiArtistBasicDetails";
import EditArtistDetails from "./EditArtistDetails";
import ButtonElement from "../../../common/Button";
import { Input } from "@nextui-org/react";
import TextAreaField from "../../../common/TextAreaField";
import { ArtistData } from "../../../interfaces/UserData";
import { InputTags } from "../../../common/Tags_Input_Field/InputTags";
import { APIHandler } from "../../../server/API";
import toast from "react-hot-toast";
import { setUserData } from "../../../redux/user.slice";

const EditEducationDetails = () => {
    const { userData } = useSelector((store) => store.store.userDetails);

    const [description, setDescription] = useState<string>("");
    const [data, setData] = useState<ArtistData>({
        skills: ["umer"],
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [cookie] = useCookies(["accessToken"]);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("data", data);
    }, [data]);

    const handleSubmit = async () => {
        if (description) {
            setData({
                ...data,
                description: description,
            });
        }
        setLoading(true);
        const response = await APIHandler(
            "PUT",
            ROUTES.ARTIST.UPDATE_ARTIST_PROFILE,
            data,
            {
                Authorization: "Bearer " + cookie.accessToken,
            }
        );

        console.log("Client edit response --->", response);
        setLoading(false);
        if (response?.status) {
            toast.success(response?.message);

            if (response?.data?.user)
                dispatch(setUserData(response?.data?.user));
        } else {
            toast.error(response?.error);
        }
    };
    return (
        <div className="flex flex-col  space-y-10  rounded-md text-richblack-5 py-4 px-4 mb-10 w-full  ">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                About us And Skills
            </h2>
            {/* <img src={QR} /> */}
            <div className=" flex flex-row justify-between gap-10">
                <div className="grid grid-cols-2 gap-5 gap-y-8  w-full">
                    <div className={`  relative col-span-2 `}>
                        <TextAreaField
                            id="filled-read-only-input"
                            type="text"
                            label="About us"
                            // helperText="Enter compony name"
                            value={description}
                            handleFunction={(e) =>
                                setDescription(e.target.value)
                            }
                            variant="bordered"
                        />
                    </div>

                    <InputTags data={data} setData={setData} />
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
    );
};

export default EditEducationDetails;
