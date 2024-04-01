import { useState } from "react";
import { IPropSteps } from "../../../interfaces/StepForm";
import Box from "@mui/material/Box";
import ButtonElement from "../../../common/Button";
import { RadioGroup, Radio } from "@nextui-org/react";

const ScopeOfWork = (props: IPropSteps) => {
  const { data, setData, totalSteps, setActiveStep, activeStep } = props;
  const [selected, setSelected] = useState("");
  const [scope, setScope] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = async () => {
    setData((prevData) => {
      return {
        ...prevData,
        scopeOfWork: selected,
        deadline: scope,
        jobLevel: level,
      };
    });
    setActiveStep(activeStep + 1);
  };

  const largeScope = [
    {
      label: "More than 6 months",
      value: "more_than_6_months",
    },
    {
      label: "3 to 6 months",
      value: "3_to_6_months",
    },
    {
      label: "1 to 3 months",
      value: "1_to_3_months",
    },
  ];

  const smallScope = [
    {
      label: "3 to 6 months",
      value: "3_to_6_months",
    },
    {
      label: "1 to 3 months",
      value: "1_to_3_months",
    },
    {
      label: "Less than 1 month",
      value: "less_than_1_month",
    },
  ];

  const workLevel = [
    {
      value: "entry",
      label: "Entry",
      description: "Looking for someone relatively new to this field",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      description: "Looking for substantial experience in this field",
    },
    {
      value: "expert",
      label: "Expert",
      description: "Looking for comprehensive and deep expertise in this field",
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full pb-10">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold">
            Next, estimate the scope of your work.
          </h1>
          <p className="text-base pt-2">
            Consider the size of your project and the time it will take.
          </p>
        </div>

        {/* Scope of work  */}
        <RadioGroup value={selected} onValueChange={setSelected}>
          <Radio
            value="large"
            description="Longer term or complex initiatives (ex. develop and
              execute a brand strategy (i.e., graphics, positioning)"
          >
            Large
          </Radio>
          <Radio
            value="medium"
            description="Well-defined projects (ex. design business rebrand
              package (i.e., logos, icons)"
            className="py-5"
          >
            Medium
          </Radio>
          <Radio
            value="small"
            description="Quick and straightforward tasks (ex. create logo for
              a new product)"
          >
            Small
          </Radio>
        </RadioGroup>

        {/* Time period of work  */}
        {selected && selected.length > 0 && (
          <div>
            <h1 className="text-base font-semibold py-4">
              How long will your work take?
            </h1>
            {selected === "large" || selected === "medium" ? (
              <RadioGroup value={scope} onValueChange={setScope}>
                {largeScope.map((scope) => (
                  <Radio key={scope.value} value={scope.value} className="py-4">
                    {scope.label}
                  </Radio>
                ))}
              </RadioGroup>
            ) : (
              <RadioGroup value={scope} onValueChange={setScope}>
                {smallScope.map((scope) => (
                  <Radio key={scope.value} value={scope.value} className="py-4">
                    {scope.label}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          </div>
        )}

        {/* Level of work  */}
        {scope && scope.length > 0 && (
          <div>
            <h1 className="text-base font-semibold">
              What level of experience will it need??
            </h1>
            <p className="pb-4 text-sm">
              This won't restrict any proposals, but helps match expertise to
              your budget.
            </p>

            <RadioGroup value={level} onValueChange={setLevel}>
              {workLevel.map((scope) => (
                <Radio
                  key={scope.value}
                  value={scope.value}
                  className="py-4"
                  description={scope.description}
                >
                  {scope.label}
                </Radio>
              ))}
            </RadioGroup>
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
  );
};

export default ScopeOfWork;
