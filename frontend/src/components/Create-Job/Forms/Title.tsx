import React, { useState } from "react";
import { IPropSteps } from "../../../interfaces/StepForm";
import ButtonElement from "../../../common/Button";
import Box from "@mui/material/Box";
import InputField from "../../../common/InputField";
import { Formik } from "formik";

const Title = (props: IPropSteps) => {
  const { data, setData, totalSteps, setActiveStep, activeStep } = props;

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-semibold">
            Let's start with a strong title.
          </h1>
          <p className="pt-2 text-base">
            This helps your job post stand out to the right candidates. It’s the
            first thing they’ll see, so make it count!
          </p>
        </div>

        <Formik
          initialValues={{
            title: data?.title ? data.title : "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            setData((prevFormData) => {
              return { ...prevFormData, ...values };
            });
            setActiveStep(activeStep + 1);
          }}
        >
          {({ isSubmitting, values, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <InputField
                name="title"
                label="Write a title for your job post"
                placeholder="Enter your title here..."
                value={values.title}
                handleFunction={handleChange("title")}
                disabled={isSubmitting}
              />

              <div>
                <p>Example titles</p>
                <ul className="list-disc pl-10 pt-2">
                  <li>
                    UX/UI designer to bring website mockup and prototype to life
                  </li>
                  <li>
                    Video editor needed to create whiteboard explainer video
                  </li>
                  <li>
                    UX designer with e-commerce experience to support app
                    development
                  </li>
                </ul>
              </div>

              <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  //   disabled={}
                />
              </Box>
            </form>
          )}
        </Formik>

        {/* <InputField
          name="title"
          label="Write a title for your job post"
          placeholder="Enter your title here..."
          value={data?.title ?? ""}
          handleFunction={(e) => setTitle(e.target.value)}
        /> */}
      </div>
    </div>
  );
};

export default Title;
