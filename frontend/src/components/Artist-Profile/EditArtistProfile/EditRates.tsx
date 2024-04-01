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
    HourlyRatesField,
    MonthlyRatesField,
    WeeklyRatesField,
} from "../../../utils/InputFields";
import { useSelector } from "react-redux";
import ROUTES from "../../../server/Routes";
import EditArtistDetails from "./EditArtistDetails";

const EditArtistRates = () => {
    const { userData } = useSelector((store) => store.store.userDetails);

    const Fields = [HourlyRatesField, WeeklyRatesField, MonthlyRatesField];
    const initialValues = {
        weekly: userData?.clientId?.companyName
            ? userData?.clientId?.companyName
            : "",
        monthly: userData?.clientId?.companyEmail
            ? userData?.clientId?.companyEmail
            : "",
        hourly: userData?.clientId?.companyLocation
            ? userData?.clientId?.companyLocation
            : "",
    };
    const Validation = Yup.object().shape({
        phoneNumber: UPhoneNumber,
    });
    return (
        <EditArtistDetails
            Fields={Fields}
            heading={"Pricing  Rates"}
            initialValues={initialValues}
            apiRoute={ROUTES.ARTIST.UPDATE_ARTIST_PROFILE}
            Validation={Validation}
            type="pricing-rates"
        />
    );
};

export default EditArtistRates;
