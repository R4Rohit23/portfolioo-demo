import {
    City,
    Country,
    CourseEndDate,
    CourseSpecialization,
    CourseStartDate,
    Degree,
    DobField,
    FirstNameField,
    GenderField,
    HourlyRatesField,
    Institute,
    LastNameField,
    LocationField,
    MonthlyRatesField,
    Percentage,
    PhoneNumberField,
    Qualification,
    State,
    WeeklyRatesField,
} from "../../utils/InputFields";
import { useSelector } from "react-redux";
import ClientDetails from "../Client-Profile/ClientDetails";
import ArtistDetails from "./ArtistDetails";

interface IPROPS {
    Ref: any;
}
const ArtistRates = ({ Ref }: IPROPS) => {
    const { userData } = useSelector((store) => store.store.userDetails);
    const Fields = [
        { field: HourlyRatesField, value: userData?.firstName },
        { field: WeeklyRatesField, value: userData?.lastName },
        { field: MonthlyRatesField, value: userData?.phoneNumber },
    ];
    return (
        <ArtistDetails Fields={Fields} heading={"Payment Rates"} pageId={Ref} />
    );
};

export default ArtistRates;
