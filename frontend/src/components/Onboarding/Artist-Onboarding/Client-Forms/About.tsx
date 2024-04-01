import {
  CompanyName,
  CompanyWebsite,
  Industry,
  CompanySize,
  CompanyDescription,
} from "../../../../utils/InputFields";
import InputField from "../../../../common/InputField";
import ErrorText from "../../../../common/ErrorText";
import { Formik } from "formik";
import {
  VCName,
  VCWebsite,
  VCInd,
  VCSize,
} from "../../../../validation/InputFields";
import * as Yup from "yup";
import TextAreaField from "../../../../common/TextAreaField";
import { IPropSteps } from "../../../../interfaces/StepForm";
import ButtonElement from "../../../../common/Button";
import Box from "@mui/material/Box";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const About = (props: IPropSteps) => {
  const { data, setData, totalSteps, setActiveStep, activeStep } = props;
  // const [clientType, setClientType] = useState("");

  const Fields1 = [CompanyName, CompanyDescription, Industry, CompanySize];

  const Validation = Yup.object().shape({
    companyName: VCName,
    //   companyWebsite: VCWebsite,
    industry: VCInd,
    companySize: VCSize,
  });

  const typesOfClient = [
    {
      label: "Company",
      value: "Company",
    },
    {
      label: "Individual",
      value: "Individual",
    },
  ];


  return (
    <div>
      <Formik
        initialValues={{
          companyName: data?.companyName ? data.companyName : "",
          // companyWebsite: data?.companyWebsite? data.companyWebsite : "",
          companyDescription: data?.companyDescription
            ? data.companyDescription
            : "",
          industry: data?.industry ? data.industry : "",
          companySize: data?.companySize ? data.companySize : "",
        }}
        validationSchema={Validation}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          setData((prevFormData) => {
            return { ...prevFormData, ...values };
          });
          setActiveStep(activeStep + 1);
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
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-14 overflow-y-auto h-[70vh] pr-5"
          >
            {/* <h1 className="text-2xl font-semibold">Let&apos; get started</h1> */}
            {/* <div>
              <h1>Client Type</h1>
              <Select
                label="Select client type"
                className="max-w-xs pt-3"
                onChange={(e) => setClientType(e.target.value)}
              >
                {typesOfClient.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
            </div> */}

            {Fields1.map((inp, indx) => (
              <>
                {inp.name === "companyDescription" ? (
                  <div className="relative">
                    <TextAreaField
                      key={indx}
                      type={inp.type}
                      label={inp.label}
                      name={inp.name}
                      value={values[inp.name]}
                      handleFunction={handleChange(inp.name)}
                    />
                    <div className="absolute top-[100px]">
                      {errors[inp.name] && touched[inp.name] && (
                        <ErrorText text={errors[inp.name]} key={inp.name} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <InputField
                      key={indx}
                      type={inp.type}
                      label={inp.label}
                      name={inp.name}
                      placeholder={inp.placeHolder}
                      value={values[inp.name]}
                      handleFunction={handleChange(inp.name)}
                    />

                    <div className="absolute top-[70px]">
                      {errors[inp.name] && touched[inp.name] && (
                        <ErrorText text={errors[inp.name]} key={inp.name} />
                      )}
                    </div>
                  </div>
                )}
              </>
            ))}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <ButtonElement
                disabled={activeStep === 0}
                handleFunction={() => setActiveStep(activeStep - 1)}
                text="Back"
                className="disabled:bg-none gradient-button "
              />

              <Box sx={{ flex: "1 1 auto" }} />
              <ButtonElement
                handleFunction={handleSubmit}
                text={activeStep === totalSteps ? "Finish" : "Next"}
                className="gradient-button"
                disabled={isSubmitting}
              />
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default About;
