import {
  HourlyRatesField,
  MonthlyRatesField,
  WeeklyRatesField,
} from "../../../../utils/InputFields";
import InputField from "../../../../common/InputField";
import ErrorText from "../../../../common/ErrorText";
import { Formik } from "formik";
import {
  VHourlyRates,
  VMonthlyRates,
  VWeeklyRates,
} from "../../../../validation/InputFields";
import * as Yup from "yup";
import { IPropSteps } from "../../../../interfaces/StepForm";
import Box from "@mui/material/Box";
import ButtonElement from "../../../../common/Button";
import { FaRupeeSign } from "react-icons/fa";

const Prices = (props: IPropSteps) => {
  const { data, setData, isSubmit, totalSteps, setActiveStep, activeStep } =
    props;

  const PricesField = [HourlyRatesField, WeeklyRatesField, MonthlyRatesField];

  const Validation = Yup.object().shape({
    hourly: VHourlyRates,
    weekly: VWeeklyRates,
    monthly: VMonthlyRates,
  });

  return (
    <Formik
      initialValues={{
        hourly: data?.pricing?.hourly ? data.pricing.hourly : "",
        weekly: data?.pricing?.weekly ? data.pricing.weekly : "",
        monthly: data?.pricing?.monthly ? data.pricing.monthly : "",
      }}
      validationSchema={Validation}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        setData((prevFormData) => {
          return { ...prevFormData, pricing: { ...values } };
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
          {/* <h1 className="text-2xl font-semibold">Set Your Prices</h1> */}
          {PricesField.map((inp, indx) => (
            <div className="relative">
              <InputField
                key={inp.name}
                type={inp.type}
                label={inp.label}
                name={inp.name}
                placeholder={inp.placeHolder}
                handleFunction={handleChange(inp.name)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    {/* <span className="text-default-400 text-small">$</span> */}
                    <FaRupeeSign className="text-default-400 text-small"/>
                  </div>
                }
                value={values[inp.name]}
              />
              <div className="absolute top-[70px]">
                {errors[inp.name] && touched[inp.name] && (
                  <ErrorText text={errors[inp.name]} key={inp.name}/>
                )}
              </div>
            </div>
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
  );
};

export default Prices;
