import Box from "@mui/material/Box";
import ButtonElement from "../../../common/Button";
import { IPropSteps } from "../../../interfaces/StepForm";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";

const SkillsRequired = (props: IPropSteps) => {
  const { data, setData, totalSteps, setActiveStep, activeStep } = props;

  const selectedValues = useMemo(() => data?.skillsRequired ?? [], [data?.skillsRequired]);


  const skills = [
    // Software Development
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "HTML",
    "CSS",
    "React",
    "Angular",
    "Node.js",
    "SQL",
    "MongoDB",
    "Git",
    "AWS",
    "Docker",
    "Kubernetes",
    "Agile Development",
    "CI/CD",
    "Microservices",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Science",

    // Graphic Designing
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe InDesign",
    "Sketch",
    "Figma",
    "Typography",
    "Logo Design",
    "Brand Identity",
    "Print Design",
    "Digital Illustration",
    "User Interface (UI) Design",
    "User Experience (UX) Design",
    "Responsive Design",
    "Motion Graphics",
    "Visual Effects (VFX)",
    "Storyboarding",
    "Color Theory",

    // 3D Artistry
    "Blender",
    "Autodesk Maya",
    "3ds Max",
    "ZBrush",
    "Substance Painter",
    "Unity",
    "Unreal Engine",
    "3D Modeling",
    "Texturing",
    "Rigging",
    "Animation",
    "Character Design",
    "Environment Design",
    "Lighting",
    "Rendering",
    "Virtual Reality (VR) Development",
    "Augmented Reality (AR) Development",

    // Additional Skills
    "UI/UX Prototyping",
    "Wireframing",
    "Frontend Development",
    "Backend Development",
    "Mobile App Development",
    "Web Design",
    "Game Design",
    "Digital Marketing",
    "Content Writing",
    "SEO",
    "Social Media Management",
    "Project Management",
    "Problem Solving",
    "Critical Thinking",
    "Communication Skills",
    "Teamwork",
    "Adaptability",
    "Leadership",
    "Time Management",
  ];

  return (
    <div className="flex flex-col justify-between h-full pb-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">
          What are the main skills required for your work?
        </h1>
        <Autocomplete
          value={selectedValues}
          onChange={(event, newValue) => {
            setData((prevData) => {
              return {
                ...prevData,
                skillsRequired: newValue,
              };
            });
          }}
          multiple
          id="tags-outlined"
          options={skills}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Skills Or Add Your Own"
              placeholder="Add More Skills"
            />
          )}
        />
        <p className="text-sm">For the best results, add 3-5 skills</p>
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
            handleFunction={() => setActiveStep(activeStep + 1)}
            text={activeStep === totalSteps ? "Finish" : "Next"}
            className="gradient-button"
            //   disabled={}
          />
        </Box>
      </div>
    </div>
  );
};

export default SkillsRequired;
