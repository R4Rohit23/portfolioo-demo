import DummyImage from "../../assets/Dummy-Profile-Image.webp";
import InputField from "../../common/InputField";
import {
  DescriptionField,
  HourlyRatesField,
  LocationField,
  MonthlyRatesField,
  TitleField,
  WeeklyRatesField,
  YearsOfExperienceField,
} from "../../utils/InputFields";
import SideImage from "../../assets/Auth_Assets/SideScreen.png";
import TextAreaField from "../../common/TextAreaField";
import { InputTags } from "../../common/Tags_Input_Field/InputTags";
import SelectField from "../../common/SelectField";
import { FaFigma, FaGithub, FaHandPointRight } from "react-icons/fa";
import { SiAdobexd, SiBlender } from "react-icons/si";
import ButtonElement from "../../common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  VDescription,
  VHourlyRates,
  VLocation,
  VMonthlyRates,
  VTitle,
  VWeeklyRates,
} from "../../validation/InputFields";
import ErrorText from "../../common/ErrorText";

const Sample = () => {
  const Fields1 = [TitleField, DescriptionField, LocationField];
  const PricesField = [HourlyRatesField, WeeklyRatesField, MonthlyRatesField];

  const systemAvailabilityOptions = [
    {
      value: "yes",
      label: "I Have System",
    },
    {
      value: "no",
      label: "I Don't Have System",
    },
  ];

  const socialLinksStartContent = [
    <FaGithub />,
    <FaFigma />,
    <SiAdobexd />,
    <SiBlender />,
  ];

  const Validation = Yup.object().shape({
    title: VTitle,
    description: VDescription,
    location: VLocation,
    hourlyRates: VHourlyRates,
    weeklyRates: VWeeklyRates,
    monthlyRates: VMonthlyRates,
  });

  return (
    <div className=" grid grid-cols-2 bg-main-light w-full h-screen">
      <img src={SideImage} className="h-full" />
      <div className="flex flex-col justify-between py-10 items-center pr-20 overflow-y-auto">
        <h1 className="w-full text-start text-3xl font-semibold items-center flex gap-2">
          {" "}
          <FaHandPointRight /> Join Us As Artist
        </h1>
        <img src={DummyImage} className="w-32 h-32 rounded-full mt-5" />
        <Formik
          initialValues={{
            title: "",
            description: "",
            location: "",
            hourlyRates: "",
            monthlyRates: "",
            weeklyRates: "",
            yearsOfExperience: "",
            skills: [],
            tags: [],
            systemAvailability: false,
          }}
          validationSchema={Validation}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              className="max-w-2xl w-full flex flex-col gap-8"
              onSubmit={handleSubmit}
            >
              {Fields1.map((inp, indx) => (
                <>
                  {inp.name === "description" ? (
                    <div>
                      <TextAreaField
                        key={indx}
                        type={inp.type}
                        label={inp.label}
                        name={inp.name}
                        value={values[inp.name]}
                        handleFunction={handleChange(inp.name)}
                      />
                      {errors[inp.name] && touched[inp.name] && (
                        <ErrorText text={errors[inp.name]} />
                      )}
                    </div>
                  ) : (
                    <div>
                      <InputField
                        key={indx}
                        type={inp.type}
                        label={inp.label}
                        name={inp.name}
                        placeholder={inp.placeHolder}
                        value={values[inp.name]}
                        handleFunction={handleChange(inp.name)}
                      />

                      {errors[inp.name] && touched[inp.name] && (
                        <ErrorText text={errors[inp.name]} />
                      )}
                    </div>
                  )}
                </>
              ))}
              <div className="flex gap-5">
                {PricesField.map((inp, indx) => (
                  <div>
                    <InputField
                      key={indx}
                      type={inp.type}
                      label={inp.label}
                      name={inp.name}
                      placeholder={inp.placeHolder}
                      handleFunction={handleChange(inp.name)}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      value={values[inp.name]}
                    />
                    {errors[inp.name] && touched[inp.name] && (
                      <ErrorText text={errors[inp.name]} />
                    )}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-base pb-2">Skills</p>
                <InputTags />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <InputField
                  type={YearsOfExperienceField.type}
                  label={YearsOfExperienceField.label}
                  name={YearsOfExperienceField.name}
                  placeholder={YearsOfExperienceField.placeHolder}
                  value={values[YearsOfExperienceField.name]}
                  handleFunction={handleChange(YearsOfExperienceField.name)}
                />
                {errors[YearsOfExperienceField.name] &&
                  touched[YearsOfExperienceField.name] && (
                    <ErrorText text={errors[YearsOfExperienceField.name]} />
                  )}

                <SelectField
                  options={systemAvailabilityOptions}
                  label="System Availability"
                  placeholder="Do you have your own system?"
                  value={values.systemAvailability}
                />
              </div>

              <div className="space-y-3">
                <p className="text-base font-semibold">Social Links</p>
                {socialLinksStartContent.map((link, indx) => (
                  <InputField
                    type="text"
                    placeholder="Paste Your Social Link Here..."
                    startContent={link}
                    key={indx}
                  />
                ))}
              </div>

              <ButtonElement
                text="Submit"
                handleFunction={handleSubmit}
                className="gradient-button"
                isLoading={isSubmitting}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Sample;
