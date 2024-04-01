import { Formik } from "formik";
import React, { useState } from "react";
import {
    UPhoneNumber,
    VDOB,
    VEmail,
    VFirstName,
    VLastName,
    VLocation,
    VPassword,
    VPhoneNumber,
} from "../../../validation/InputFields";
import * as Yup from "yup";
import {
    CompanyDescription,
    CompanyEmail,
    CompanyLocation,
    CompanyName,
    CompanyPhone,
    CompanySize,
    CompanyWebsite,
    DobField,
    EmailField,
    FirstNameField,
    GenderField,
    Industry,
    LastNameField,
    LocationField,
    PhoneNumberField,
    ProfileImageFiled,
} from "../../../utils/InputFields";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import EditClientDetails from "./EditClientDetails";
import ROUTES from "../../../server/Routes";

const EditCompanyDetails = () => {
    const { userData } = useSelector((store) => store.store.userDetails);

    const Fields = [
        CompanyName,
        CompanyEmail,
        Industry,
        CompanyPhone,
        CompanyLocation,
        CompanySize,
        CompanyWebsite,
        CompanyDescription,
    ];
    const initialValues = {
        companyName: userData?.clientId?.companyName
            ? userData?.clientId?.companyName
            : "",
        companyEmail: userData?.clientId?.companyEmail
            ? userData?.clientId?.companyEmail
            : "",
        companyLocation: userData?.clientId?.companyLocation
            ? userData?.clientId?.companyLocation
            : "",
        companyWebsite: userData?.clientId?.companyWebsite
            ? userData?.clientId?.companyWebsite
            : "",
        companySize: userData?.clientId?.companySize
            ? userData?.clientId?.companySize
            : "",
        companyPhone: userData?.clientId?.companyPhone
            ? userData?.clientId?.companyPhone
            : "",
        companyDescription: userData?.clientId?.companyDescription
            ? userData?.clientId?.companyDescription
            : "",
        industry: userData?.clientId?.industry
            ? userData?.clientId?.industry
            : "",
    };
    const Validation = Yup.object().shape({
        phoneNumber: UPhoneNumber,
    });
    return (
        <EditClientDetails
            Fields={Fields}
            heading={"Company  Details"}
            initialValues={initialValues}
            apiRoute={ROUTES.CLIENT.UPDATE_CLIENT_PROFILE}
            Validation={Validation}
        />
    );
};

export default EditCompanyDetails;
