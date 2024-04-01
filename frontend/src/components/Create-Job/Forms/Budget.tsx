import React, { useState } from "react";
import { IPropSteps } from "../../../interfaces/StepForm";
import ButtonElement from "../../../common/Button";
import InputField from "../../../common/InputField";
import Box from "@mui/material/Box";
import { LiaRupeeSignSolid } from "react-icons/lia";

const Budget = (props: IPropSteps) => {
  const { data, setData, totalSteps, setActiveStep, activeStep } = props;
  const [state, setState] = useState("fixed");
  const [fixedBudget, setFixedBudget] = useState(0);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  console.log(data);

  const handleSubmit = async () => {
    if (state === "fixed") {
      setData((prevData) => {
        return {
          ...prevData,
          fixedBudget: fixedBudget,
        };
      });
    } else {
      setData((prevData) => {
        return {
          ...prevData,
          hourlyBudgetRange: {
            from: from,
            to: to,
          },
        };
      });
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <div className="flex flex-col justify-between h-full pb-10">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold">Tell us about your budget.</h1>
          <p className="text-base pt-2">
            This will help us match you to talent within your range.
          </p>
        </div>

        <div className="flex flex-1 gap-10">
          <ButtonElement
            text="Hourly Rates"
            handleFunction={() => setState("hourly")}
            className={`${state === "hourly" && "gradient-button"}`}
          />
          <ButtonElement
            text="Fixed Rates"
            handleFunction={() => setState("fixed")}
            className={`${state === "fixed" && "gradient-button"}`}
          />
        </div>

        <div>
          {state === "fixed" ? (
            <div className="flex flex-col gap-5">
              <h1>
                Set a price for the project and pay at the end, or you can
                divide the project into milestones and pay as each milestone is
                completed.
              </h1>
              <div>
                <h1 className="text-lg font-semibold">
                  What is the best cost estimate for your project?
                </h1>
                <p>
                  You can negotiate this cost and create milestones when you
                  chat with your freelancer.
                </p>
              </div>
              <InputField
                className="max-w-sm"
                placeholder="Enter your budget..."
                startContent={<LiaRupeeSignSolid />}
                handleFunction={(e) => setFixedBudget(parseInt(e.target.value))}
                type="number"
                value={data?.fixedBudget ? data.fixedBudget : fixedBudget}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex gap-10 items-center">
                <InputField
                  className="max-w-sm"
                  label="From"
                  handleFunction={(e) => setFrom(parseInt(e.target.value))}
                  value={
                    data?.hourlyBudgetRange?.from
                      ? data.hourlyBudgetRange.from
                      : from
                  }
                  type="number"
                />{" "}
                <span className="pt-6">/Hr</span>
                <InputField
                  className="max-w-sm"
                  label="To"
                  handleFunction={(e) => setTo(parseInt(e.target.value))}
                  value={
                    data?.hourlyBudgetRange?.to ? data.hourlyBudgetRange.to : to
                  }
                  type="number"
                />{" "}
                <span className="pt-6">/Hr</span>
              </div>
              <p>This is the average rate for similar projects.</p>
              <h1>
                Professionals tend to charge $10 - $25 /hour (USD) for graphic
                design projects like yours. Experts may charge higher rates.
              </h1>
            </div>
          )}
        </div>

        <div>
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
              //   disabled={}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Budget;
