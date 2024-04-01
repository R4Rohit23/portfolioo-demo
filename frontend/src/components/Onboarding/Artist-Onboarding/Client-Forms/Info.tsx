import {
  CompanyName,
  CompanyWebsite,
  Industry,
  CompanySize,
  CompanyLocation,
  CompanyEmail,
  CompanyPhone,
} from "../../../../utils/InputFields";
import InputField from "../../../../common/InputField";
import ErrorText from "../../../../common/ErrorText";
import { Formik } from "formik";
import {
  VCName,
  VCWebsite,
  VCInd,
  VCSize,
  VCLocation,
  VCEmail,
  VCPhone,
} from "../../../../validation/InputFields";
import * as Yup from "yup";
import TextAreaField from "../../../../common/TextAreaField";
import { IPropSteps } from "../../../../interfaces/StepForm";
import ButtonElement from "../../../../common/Button";
import Box from "@mui/material/Box";
import { APIHandler } from "../../../../server/API";
import ROUTES from "../../../../server/Routes";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Info = (props: IPropSteps) => {
  const { data, setData, totalSteps, setActiveStep, activeStep } = props;

  const [cookie] = useCookies(["accessToken"]);

  const Fields1 = [CompanyWebsite, CompanyLocation, CompanyEmail, CompanyPhone];

  const Validation = Yup.object().shape({
    companyWebsite: VCWebsite,
    companyLocation: VCLocation,
    companyEmail: VCEmail,
    companyPhone: VCPhone,
  });

  const navigate = useNavigate();

  console.log(data);

  return (
    <div>
      <Formik
        initialValues={{
          companyWebsite: data?.companyWebsite ? data.companyWebsite : "",
          companyLocation: data?.companyLocation ? data.companyLocation : "",
          companyEmail: data?.companyEmail ? data.companyEmail : "",
          companyPhone: data?.companyPhone ? data.companyPhone : "",
        }}
        validationSchema={Validation}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          setData((prevFormData) => {
            return { ...prevFormData, ...values };
          });

          const { data: result, status } = await APIHandler(
            "POST",
            ROUTES.CLIENT.ONBOARD_CLIENT,
            data,
            {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie.accessToken}`,
            }
          );

          console.log(result);

          if (!status) {
            toast.error("Internal Server Error");
            return;
          }

          setActiveStep(activeStep + 1);

          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 6000);

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

export default Info;
