import { SiAdobexd, SiBlender } from "react-icons/si";

import {
    FaGithub,
    FaFigma,
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
} from "react-icons/fa";
import { ITextProp } from "../interfaces/Input";

export const EmailField: ITextProp = {
    name: "email",
    type: "email",
    label: "Email",
    placeHolder: "Email",
};

export const PasswordField: ITextProp = {
    name: "password",
    type: "password",
    label: "Password",
    placeHolder: "Password",
};

export const ConfirmPasswordField: ITextProp = {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeHolder: "Confirm Password",
};
export const NewPasswordField: ITextProp = {
    name: "newPassword",
    type: "password",
    label: "New Password",
    placeHolder: "newPassword",
};

export const OTPField: ITextProp = {
    name: "otp",
    type: "number",
    label: "OTP",
    placeHolder: "",
};

export const FirstNameField: ITextProp = {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeHolder: "First Name",
};
export const LastNameField: ITextProp = {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeHolder: "Last Name",
};
export const ProfileImageFiled: ITextProp = {
    name: "profileImage",
    type: "text",
    label: "Profile Image",
    placeHolder: "Profile Image",
};

export const CityField: ITextProp = {
    name: "city",
    type: "text",
    label: "City",
    placeHolder: "Enter your City bane",
};

export const UserNameField: ITextProp = {
    name: "username",
    type: "text",
    label: "Username",
    placeHolder: "Username",
};

export const DobField: ITextProp = {
    name: "dob",
    type: "date",
    label: "date of birth",
    placeHolder: "Enter your Date of Birth",
};

export const CategoryField: ITextProp = {
    name: "category",
    type: "text",
    label: "Category",
    placeHolder: "Enter your Category",
};

export const SubCategoryField: ITextProp = {
    name: "subcategory",
    type: "text",
    label: "Sub Category",
    placeHolder: "Enter your Sub Category",
};

export const YearOfCorporationField: ITextProp = {
    name: "yearOfCorporation",
    type: "number",
    label: "Year Of Corporation",
    placeHolder: "Enter your Year Of Corporation",
};
export const GenderField: ITextProp = {
    name: "gender",
    type: "text",
    label: "Gender",
    placeHolder: "gender",
};

//                                                    Social links

export const LinkedinField: ITextProp = {
    name: "linkedin",
    type: "text",
    label: "Phone Number",
    placeHolder: "Add Your Social Link Here...",
    startContent: FaLinkedinIn,
};
export const FacebookField: ITextProp = {
    name: "facebook",
    type: "text",
    label: "Phone Number",
    placeHolder: "Add Your Social Link Here...",
};
export const TwitterField: ITextProp = {
    name: "twitter",
    type: "text",
    label: "Phone Number",
    placeHolder: "Add Your Social Link Here...",
};
export const InstagramField: ITextProp = {
    name: "instagram",
    type: "text",
    label: "Phone Number",
    placeHolder: "Add Your Social Link Here...",
    startContent: FaInstagram,
};
export const MediumField: ITextProp = {
    name: "medium",
    type: "text",
    label: "Phone Number",
    placeHolder: "Add Your Social Link Here...",
    startContent: "",
};
export const FigmaField: ITextProp = {
    name: "figma",
    type: "text",
    label: "Phone Number",
    placeHolder: "Add Your Social Link Here...",
    startContent: FaFigma,
};
export const GithubField: ITextProp = {
    name: "github",
    type: "text",
    label: "Phone Number",
    placeHolder: "Add Your Social Link Here...",
    startContent: FaGithub,
};
export const AdobexdField: ITextProp = {
    name: "adobexd",
    type: "text",
    label: "Phone Number",
    placeHolder: "Add Your Social Link Here...",
    startContent: SiAdobexd,
};
export const blenderField: ITextProp = {
    name: "Blender",
    type: "text",
    label: "Phone Number",
    placeHolder: "Add Your Social Link Here...",
    startContent: SiBlender,
};

//                                                    Course form

export const PhoneNumberField: ITextProp = {
    name: "phoneNumber",
    type: "text",
    label: "Phone Number",
    placeHolder: "Enter your Phone Number",
};

//                                                        user profile

// Artist Onboarding
export const TitleField: ITextProp = {
    name: "title",
    type: "text",
    label: "Title",
    placeHolder: "Enter your Title",
};

export const DescriptionField: ITextProp = {
    name: "description",
    type: "text",
    label: "Description",
    placeHolder: "Enter your Description",
};

export const LocationField: ITextProp = {
    name: "location",
    type: "text",
    label: "Location",
    placeHolder: "Enter your Location",
};

export const HourlyRatesField: ITextProp = {
    name: "hourly",
    type: "number",
    label: "Hourly Rates",
    placeHolder: "Enter your Hourly Rates",
};

export const WeeklyRatesField: ITextProp = {
    name: "weekly",
    type: "number",
    label: "Weekly Rates",
    placeHolder: "Enter your Weekly Rates",
};

export const MonthlyRatesField: ITextProp = {
    name: "monthly",
    type: "number",
    label: "Monthly Rates",
    placeHolder: "Enter your Monthly Rates",
};

export const YearsOfExperienceField: ITextProp = {
    name: "yearsOfExperience",
    type: "number",
    label: "Years Of Experience",
    placeHolder: "Enter your Years Of Experience",
};

//                                            Client Onboarding
export const CompanyName: ITextProp = {
    name: "companyName",
    type: "text",
    label: "Company Name",
    placeHolder: "Enter your company name",
};

export const CompanyWebsite: ITextProp = {
    name: "companyWebsite",
    type: "text",
    label: "Company Website",
    placeHolder: "Enter your company website",
};

export const Industry: ITextProp = {
    name: "industry",
    type: "text",
    label: "Industry Type",
    placeHolder: "Enter your company industry",
};

export const CompanySize: ITextProp = {
    name: "companySize",
    type: "number",
    label: "Company Size",
    placeHolder: "Enter your company size",
};

export const CompanyLocation: ITextProp = {
    name: "companyLocation",
    type: "text",
    label: "Company Location",
    placeHolder: "Enter your company location",
};

export const CompanyEmail: ITextProp = {
    name: "companyEmail",
    type: "text",
    label: "Company Email",
    placeHolder: "Enter your company email",
};

export const CompanyPhone: ITextProp = {
    name: "companyPhone",
    type: "text",
    label: "Company Phone",
    placeHolder: "Enter your company phone",
};

export const CompanyDescription: ITextProp = {
    name: "companyDescription",
    type: "text",
    label: "Company Description",
    placeHolder: "Enter your Company Description",
};

//                                Education Detail
export const Qualification: ITextProp = {
    name: "qualification",
    type: "text",
    label: "Qualification",
    placeHolder: "Enter your qualification",
};

export const Degree: ITextProp = {
    name: "degree",
    type: "text",
    label: "degree",
    placeHolder: "Enter your degree",
};

export const CourseStartDate: ITextProp = {
    name: "from",
    type: "date",
    label: "From",
    placeHolder: "From",
};
export const CourseEndDate: ITextProp = {
    name: "to",
    type: "date",
    label: "To",
    placeHolder: "To",
};
export const Percentage: ITextProp = {
    name: "percentage",
    type: "number",
    label: "Percentage",
    placeHolder: "Percentage",
};

export const CourseSpecialization: ITextProp = {
    name: "courseSpecialization",
    type: "text",
    label: "Course Specialization",
    placeHolder: "Course Specialization",
};
export const Institute: ITextProp = {
    name: "institute",
    type: "text",
    label: "Institute",
    placeHolder: "Institute",
};

export const Country: ITextProp = {
    name: "country",
    type: "text",
    label: "Country",
    placeHolder: "Country",
};
export const State: ITextProp = {
    name: "state",
    type: "text",
    label: "State",
    placeHolder: "State",
};
export const City: ITextProp = {
    name: "city",
    type: "text",
    label: "City",
    placeHolder: "City",
};

export type TInputName = keyof typeof EmailField;
