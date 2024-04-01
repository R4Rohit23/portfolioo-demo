import React from "react";
import { InputTags } from "../../../../common/Tags_Input_Field/InputTags";
import { IPropSteps } from "../../../../interfaces/StepForm";
import Box from "@mui/material/Box";
import ButtonElement from "../../../../common/Button";

const Skills = (props: IPropSteps) => {
    const { data, setData, isSubmit, totalSteps, setActiveStep, activeStep } =
        props;
    console.log(data);

    const handleSubmit = async () => {
        setActiveStep(activeStep + 1);
    };

    return (
        <div className="flex flex-col gap-60">
            <div>
                <p className="text-2xl pb-10 font-semibold">Show Your Skills</p>
                <InputTags data={data} setData={setData} />
            </div>

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
                />
            </Box>
        </div>
    );
};

export default Skills;
