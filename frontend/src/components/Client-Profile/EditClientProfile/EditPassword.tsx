import { Formik } from "formik";
import React, { useState } from "react";
import {
    UPhoneNumber,
    VDOB,
    VEmail,
    VFirstName,
    VLastName,
    VLocation,
    VNewPassword,
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
    NewPasswordField,
    PasswordField,
    PhoneNumberField,
    ProfileImageFiled,
} from "../../../utils/InputFields";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import EditClientDetails from "./EditClientDetails";
import ROUTES from "../../../server/Routes";

const EditPasswrod = () => {
    const Validation = Yup.object().shape({
        password: VPassword,
        newPassword: VNewPassword,
    });

    const { userData } = useSelector((store) => store.store.userDetails);

    const Fields = [PasswordField, NewPasswordField];
    const initialValues = {
        password: "",
        newPassword: "",
    };

    return (
        <EditClientDetails
            Fields={Fields}
            heading={"Password & Security"}
            initialValues={initialValues}
            apiRoute={ROUTES.AUTH.CHANGE_PASSWORD}
            Validation={Validation}
        />
    );
};

export default EditPasswrod;
