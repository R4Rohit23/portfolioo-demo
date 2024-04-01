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
    Institute,
    LastNameField,
    LocationField,
    Percentage,
    PhoneNumberField,
    Qualification,
    State,
} from "../../utils/InputFields";
import { useSelector } from "react-redux";
import ClientDetails from "../Client-Profile/ClientDetails";
import ArtistDetails from "./ArtistDetails";

interface IPROPS {
    Ref: any;
}
const EducationDetails = ({ Ref }: IPROPS) => {
    const { userData } = useSelector((store) => store.store.userDetails);
    const Fields = [
        { field: Qualification, value: userData?.firstName },
        { field: Degree, value: userData?.lastName },
        {
            field: CourseStartDate,
            value: userData?.dob ? userData?.dob?.split("T")?.[0] : null,
        },
        {
            field: CourseEndDate,
            value: userData?.dob ? userData?.dob?.split("T")?.[0] : null,
        },
        { field: Institute, value: userData?.phoneNumber },
        { field: Percentage, value: userData?.location },
        { field: CourseSpecialization, value: userData?.gender },
        { field: Country, value: userData?.gender },
        { field: State, value: userData?.gender },
        { field: City, value: userData?.gender },
    ];
    return (
        <ArtistDetails
            Fields={Fields}
            heading={"Education Details"}
            pageId={Ref}
        />
    );
};

export default EducationDetails;
