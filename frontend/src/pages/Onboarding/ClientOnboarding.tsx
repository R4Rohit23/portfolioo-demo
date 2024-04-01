import { useState } from "react";
import { ClientOnboardingForm } from "../../components/Onboarding/Artist-Onboarding/OnboardingForm";
import { ClientData } from "../../interfaces/ClientData";
import AuthLady from "../../assets/Onboarding/ClientSideImage.svg";

const ClientOnboarding = () => {
  const [formData, setFormData] = useState<ClientData>();

  return (
    <div className=" flex  h-full -mt-20 pt-20">
      <img src={AuthLady} className="h-screen w-[40vw] drop-shadow-lg -mt-10" />
      <div className="flex flex-col w-full px-20 pt-10  mx-auto drop-shadow-lg">
        <ClientOnboardingForm data={formData} setData={setFormData} />
      </div>
    </div>
  );
};

export default ClientOnboarding;
