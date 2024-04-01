import { useState } from "react";
import OnboardingForm from "../../components/Onboarding/Artist-Onboarding/OnboardingForm";
import { ArtistData } from "../../interfaces/UserData";
import AuthLady from "../../assets/Onboarding/ArtistOnboardingSideImage.svg";

const ArtistOnboarding = () => {
  const [formData, setFormData] = useState<ArtistData>();

  return (
    <div className=" flex h-full -mt-20 pt-20">
      <img src={AuthLady} className="h-[91vh] w-[40vw] drop-shadow-2xl" />
      <div className="flex flex-col w-full px-20 pt-10  mx-auto drop-shadow-md">
        <OnboardingForm data={formData} setData={setFormData} />
      </div>
    </div>
  );
};

export default ArtistOnboarding;
