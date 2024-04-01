import {
    DobField,
    FirstNameField,
    GenderField,
    LastNameField,
    LocationField,
    PhoneNumberField,
} from "../../utils/InputFields";
import { useSelector } from "react-redux";
import ClientDetails from "./ClientDetails";

const BasicDetails = ({ basicRef }) => {
    const { userData } = useSelector((store) => store.store.userDetails);
    const Fields = [
        { field: FirstNameField, value: userData?.firstName },
        { field: LastNameField, value: userData?.lastName },
        {
            field: DobField,
            value: userData?.dob ? userData?.dob?.split("T")?.[0] : null,
        },
        { field: PhoneNumberField, value: userData?.phoneNumber },
        { field: LocationField, value: userData?.location },
        { field: GenderField, value: userData?.gender },
    ];
    return (
        <ClientDetails
            Fields={Fields}
            heading={"Basic Details"}
            pageId={basicRef}
        />
    );
};

export default BasicDetails;
