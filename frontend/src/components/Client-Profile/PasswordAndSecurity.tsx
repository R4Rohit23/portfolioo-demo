import { PasswordField } from "../../utils/InputFields";
import ClientDetails from "./ClientDetails";
const PasswordAndSecurity = ({ passwordRef }) => {
    const Fields = [
        { field: PasswordField, value: ".........." },
        // { field: NewPasswordField, value: "" },
    ];
    return (
        <ClientDetails
            Fields={Fields}
            heading={"Password & Security"}
            pageId={passwordRef}
        />
    );
};

export default PasswordAndSecurity;
