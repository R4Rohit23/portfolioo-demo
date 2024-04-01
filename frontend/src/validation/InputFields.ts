import * as Yup from "yup";

export const VEmail = Yup.string()
    .email("Invalid Email")
    .required("Email  required");

export const VPassword = Yup.string().required("Password  required");
export const VNewPassword = Yup.string().required("Password  required");

export const VConfirmPassword = Yup.string()
    .label("confirm password")
    .required("C Password  required")
    .oneOf([Yup.ref("password"), null], "Passwords must match");

export const VOTP = Yup.string()
    .min(4, "Please enter 4 Digits of otp")
    .required("Please enter OTP");

export const VUserName = Yup.string()
    .min(2, "Username must contain 5 character")
    .required("Username required");

export const VName = Yup.string()
    .min(2, "Name must contain 5 character")
    .required("Name required");

export const VFirstName = Yup.string()
    .min(2, "Name must contain 5 character")
    .required("First Name required ");

export const VLastName = Yup.string()
    .min(2, "Name must contain 5 character")
    .required("Last Name required");

export const VPhone = Yup.string()
    .matches(/^[0-9]{10}$/, "Valid number required")
    .required(" Phone Number required");

//                                                 Courses form

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const VPhoneNumber = Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter Phone Number");

// export const EcUpiNumber = Yup.string().required(
//   "Please enter payment upi number "
// );

export const VDOB = Yup.date().required("Date of birth is required");

// Artist Onboarding
export const VTitle = Yup.string().required("Title is required");

export const VDescription = Yup.string().required("Description is required");

export const VLocation = Yup.string().required("Location is required");

export const VHourlyRates = Yup.number().required("Hourly rates are required");

export const VWeeklyRates = Yup.number().required("Weekly rates are required");

export const VMonthlyRates = Yup.number().required(
    "Monthly rates are required"
);

//                                Client Onboarding
export const VCName = Yup.string().required("Company Name is required");

export const VCWebsite = Yup.string().required("Company Website is required");

export const VCInd = Yup.string().required("Company Industry is required");

export const VCSize = Yup.string().required("Company Size is required");

export const VCLocation = Yup.string().required("Company Location is required");

export const VCEmail = Yup.string().required("Company Email is required");

export const VCPhone = Yup.string().required(
    "Company Phone Number is required"
);

//                                  Update profile

export const UPhoneNumber = Yup.string().matches(
    phoneRegExp,
    "Phone number is not valid"
);
