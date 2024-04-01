import AboutArtist from "./Forms/About";
import AboutClient from "./Client-Forms/About"
import Prices from "./Forms/Prices";
import Skills from "./Forms/Skills";
import SocialLinks from "./Forms/SocialLinks";
import Info from "./Client-Forms/Info";
import Title from "../../Create-Job/Forms/Title";
import SkillsRequired from "../../Create-Job/Forms/Skills";
import ScopeOfWork from "../../Create-Job/Forms/Scope";
import Budget from "../../Create-Job/Forms/Budget";
import Description from "../../Create-Job/Forms/Description";
import PostJob from "../../Create-Job/Forms/PostJob";

interface PropStepForm {
  state: number;
  data: any;
  setData: (value: any) => void;
  totalSteps?: number;
  setActiveStep: (step: number) => void;
}

export const StepFormArtist = (props: PropStepForm) => {
  const { state, data, setData, totalSteps, setActiveStep } = props;

  const Components = [
    <AboutArtist
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
    <Prices
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
    <Skills
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
    <SocialLinks
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
  ];

  return <section className="w-full mt-10">{Components[state]}</section>;
};


export const StepFormClient= (props: PropStepForm) => {
  const { state, data, setData, totalSteps, setActiveStep } = props;

  const Components = [
    <AboutClient
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
    <Info
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
  ];

  return <section className="w-full mt-10">{Components[state]}</section>;
};


export const StepFormJob= (props: PropStepForm) => {
  const { state, data, setData, totalSteps, setActiveStep } = props;

  const Components = [
    <Title
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
    <SkillsRequired
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
    <ScopeOfWork
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
    <Budget
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
    <Description
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
    <PostJob
      data={data}
      setData={setData}
      activeStep={state}
      totalSteps={totalSteps}
      setActiveStep={setActiveStep}
    />,
  ];

  return <section className="w-full mt-10">{Components[state]}</section>;
};






