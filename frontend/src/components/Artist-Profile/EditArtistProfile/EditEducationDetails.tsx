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
    City,
    CompanyDescription,
    CompanyEmail,
    CompanyLocation,
    CompanyName,
    CompanyPhone,
    CompanySize,
    CompanyWebsite,
    Country,
    CourseEndDate,
    CourseSpecialization,
    CourseStartDate,
    Degree,
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
import { useSelector } from "react-redux";
import ROUTES from "../../../server/Routes";
import EditArtistBasicDetails from "./EdtiArtistBasicDetails";
import EditArtistDetails from "./EditArtistDetails";

const EditEducationDetails = () => {
    const { userData } = useSelector((store) => store.store.userDetails);

    const Fields = [
        Qualification,
        Degree,
        CourseStartDate,
        CourseEndDate,
        Institute,
        Percentage,
        CourseSpecialization,
        Country,
        State,
        City,
    ];
    const initialValues = {
        qualification: userData?.clientId?.companyName
            ? userData?.clientId?.companyName
            : "",
        degree: userData?.clientId?.companyEmail
            ? userData?.clientId?.companyEmail
            : "",
        from: userData?.clientId?.companyLocation
            ? userData?.clientId?.companyLocation
            : "",
        to: userData?.clientId?.companyWebsite
            ? userData?.clientId?.companyWebsite
            : "",
        percentage: userData?.clientId?.companySize
            ? userData?.clientId?.companySize
            : "",
        courseSpecialization: userData?.clientId?.companyPhone
            ? userData?.clientId?.companyPhone
            : "",
        institute: userData?.clientId?.companyDescription
            ? userData?.clientId?.companyDescription
            : "",
        country: userData?.clientId?.industry
            ? userData?.clientId?.industry
            : "",
        state: userData?.clientId?.industry ? userData?.clientId?.industry : "",
        city: userData?.clientId?.industry ? userData?.clientId?.industry : "",
    };
    const Validation = Yup.object().shape({
        phoneNumber: UPhoneNumber,
    });
    return (
        <EditArtistDetails
            Fields={Fields}
            heading={"Education  Details"}
            initialValues={initialValues}
            apiRoute={ROUTES.ARTIST.UPDATE_ARTIST_PROFILE}
            Validation={Validation}
            type="education-details"
        />
    );
};

export default EditEducationDetails;
