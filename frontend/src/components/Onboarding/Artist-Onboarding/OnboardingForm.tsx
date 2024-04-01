import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { StepFormArtist, StepFormClient, StepFormJob } from "./StepForm";
import OnboardingSuccessPage from "../../../pages/Onboarding/OnboardingSuccess";
import { styled } from "@mui/material/styles";
import { MdMessage } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaHatWizard } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { ClientData } from "../../../interfaces/ClientData";
import { JobData } from "../../../interfaces/Job";

const stepsArtist = [
  "Tell Us About Yourself",
  "What are your pricing?",
  "Show your skills",
  "Where We Will Find You?",
];

const stepsClient = ["Tell Us About Yourself", "Where We Will Find You"];

const stepsJob = ["Project Title", "Skills", "Scope", "Budget", "Description", "Post Job"];

interface IOnboarding {
  data: any;
  setData: (value: any) => void;
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <MdMessage />,
    2: <FaRupeeSign />,
    3: <FaHatWizard />,
    4: <IoShareSocialSharp />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function ColorlibStepIcon2(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <MdMessage />,
    2: <FaLocationDot />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function ArtistOnboardingForm(props: IOnboarding) {
  const { data, setData } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80vh",
      }}
    >
      {/* <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper> */}
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {stepsArtist.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === stepsArtist.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 5, mb: 1 }}>
            All steps completed - redirecting to the landing page...
          </Typography>
          <OnboardingSuccessPage />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <StepFormArtist
            state={activeStep}
            setActiveStep={setActiveStep}
            data={data}
            setData={setData}
            totalSteps={stepsArtist.length - 1}
          />
        </React.Fragment>
      )}
    </Box>
  );
}

export const ClientOnboardingForm = (props: IOnboarding) => {
  const { data, setData } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80vh",
      }}
    >
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {stepsClient.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon2}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === stepsClient.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 5, mb: 1 }}>
            All steps completed - redirecting to the landing page...
          </Typography>
          <OnboardingSuccessPage />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <StepFormClient
            state={activeStep}
            setActiveStep={setActiveStep}
            data={data as ClientData}
            setData={setData}
            totalSteps={stepsClient.length - 1}
          />
        </React.Fragment>
      )}
    </Box>
  );
};

export const JobCreationForm = (props: IOnboarding) => {
  const { data, setData } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div className="flex gap-10 px-10">
      <Box sx={{ maxWidth: 200, width: "100%", borderRight: 1, borderColor: "#D1D1D1" }}>
        <Stepper
          // alternativeLabel
          activeStep={activeStep}
          // connector={<ColorlibConnector />}
          orientation="vertical"
          className="py-10"
        >
          {stepsJob.map((label) => (
            <Step key={label}>
              <StepLabel><Box sx={{ fontSize: 20 }}>{label}</Box></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeStep === stepsJob.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 5, mb: 1 }}>
            All steps completed - redirecting to the landing page...
          </Typography>
          <OnboardingSuccessPage />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <StepFormJob
            state={activeStep}
            setActiveStep={setActiveStep}
            data={data as JobData}
            setData={setData}
            totalSteps={stepsJob.length - 1}
          />
        </React.Fragment>
      )}
    </div>
  );
};
