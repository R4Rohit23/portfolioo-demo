import {
  TitleField,
  DescriptionField,
  LocationField,
} from "../../../../utils/InputFields";
import InputField from "../../../../common/InputField";
import ErrorText from "../../../../common/ErrorText";
import { Formik } from "formik";
import {
  VTitle,
  VDescription,
  VLocation,
} from "../../../../validation/InputFields";
import * as Yup from "yup";
import TextAreaField from "../../../../common/TextAreaField";
import { IPropSteps } from "../../../../interfaces/StepForm";
import ButtonElement from "../../../../common/Button";
import Box from "@mui/material/Box";

const About = (props: IPropSteps) => {
  const { data, setData, totalSteps, setActiveStep, activeStep } = props;
  
  const Fields1 = [TitleField, DescriptionField, LocationField];

  const Validation = Yup.object().shape({
    title: VTitle,
    description: VDescription,
    location: VLocation,
  });

  return (
    <div>
      <Formik
        initialValues={{
          title: data?.title ? data.title : "",
          description: data?.description ? data.description : "",
          location: data?.location ? data.location : "",
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
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-14">
            {/* <h1 className="text-2xl font-semibold">Let&apos; get started</h1> */}
            {Fields1.map((inp, indx) => (
              <>
                {inp.name === "description" ? (
                  <div className="relative">
                    <TextAreaField
                      key={indx}
                      type={inp.type}
                      label={inp.label}
                      name={inp.name}
                      value={values[inp.name]}
                      handleFunction={handleChange(inp.name)}
                    />
                    <div className="absolute top-[100px]" >
                      {errors[inp.name] && touched[inp.name] && (
                        <ErrorText text={errors[inp.name]} key={inp.name}/>
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
