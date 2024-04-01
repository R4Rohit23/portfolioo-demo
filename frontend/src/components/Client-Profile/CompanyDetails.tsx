import {
    CompanyDescription,
    CompanyEmail,
    CompanyLocation,
    CompanyName,
    CompanyPhone,
    CompanySize,
    CompanyWebsite,
    DobField,
    FirstNameField,
    GenderField,
    Industry,
    LastNameField,
    LocationField,
    PhoneNumberField,
} from "../../utils/InputFields";
import { useSelector } from "react-redux";
import ClientDetails from "./ClientDetails";

const CompanyDetails = ({ companyRef }) => {
    const { userData } = useSelector((store) => store.store.userDetails);

    console.log(userData?.clientId);
    const Fields = [
        { field: CompanyName, value: userData?.clientId?.companyName },
        { field: CompanyEmail, value: userData?.clientId?.companyEmail },
        { field: Industry, value: userData?.clientId?.industry },
        { field: CompanyPhone, value: userData?.clientId?.companyPhone },
        { field: CompanyLocation, value: userData?.clientId?.companyLocation },
        { field: CompanySize, value: userData?.clientId?.companySize },
        { field: CompanyWebsite, value: userData?.clientId?.companyWebsite },
        {
            field: CompanyDescription,
            value: userData?.cliendId?.companyDescription,
        },
    ];
    return (
        <ClientDetails
            Fields={Fields}
            heading={"Company Details"}
            pageId={companyRef}
        />
    );
};

export default CompanyDetails;
