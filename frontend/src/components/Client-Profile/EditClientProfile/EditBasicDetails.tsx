import { Formik } from "formik";
import React, { useState } from "react";
import {
    UPhoneNumber,
    VDOB,
    VEmail,
    VFirstName,
    VLastName,
    VLocation,
    VPhoneNumber,
} from "../../../validation/InputFields";
import * as Yup from "yup";
import {
    DobField,
    EmailField,
    FirstNameField,
    GenderField,
    LastNameField,
    LocationField,
    PhoneNumberField,
    ProfileImageFiled,
} from "../../../utils/InputFields";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import EditClientDetails from "./EditClientDetails";
import ROUTES from "../../../server/Routes";

const EditBasicDetails = () => {
    const Validation = Yup.object().shape({
        phoneNumber: UPhoneNumber,
    });

    const { userData } = useSelector((store) => store.store.userDetails);

    const Fields = [
        ProfileImageFiled,
        FirstNameField,
        LastNameField,
        DobField,
        PhoneNumberField,
        LocationField,
        GenderField,
    ];
    const initialValues = {
        firstName: userData?.firstName ? userData.firstName : "",
        lastName: userData?.lastName ? userData.lastName : "",
        phoneNumber: userData?.phoneNumber ? userData?.phoneNumber : "",
        profileImage: userData?.profileImage ? userData?.profileImage : null,
        location: userData?.location ? userData?.location : "",
        gender: userData?.gender ? userData?.gender : "",
        dob: userData?.dob ? userData?.dob?.split("T")?.[0] : null,
    };

    return (
        <EditClientDetails
            Fields={Fields}
            heading={"Basic  Details"}
            initialValues={initialValues}
            apiRoute={ROUTES.AUTH.UPDATE_PROFILE}
            type="basic"
            Validation={Validation}
        />
    );
};

export default EditBasicDetails;
