import React from "react";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ButtonElement from "../../common/Button";
import SuccessConfetti from "../../common/Confetti";

const OnboardingSuccessPage = () => {
  
  return (
    <div className="flex flex-col items-center justify-center bg-main-light  shadow-xl border-4 h-screen">
      <div className="w-[70%] mx-auto   space-y-8">
        <MdDone
          className="w-fit p-2 bg-black text-main rounded-full mx-auto"
          size={50}
        />
        <p className="text-[30px] font-medium  text-[#595959] leading-10 w-fit mx-auto text-center">
          Congratulations, Your onboarding process is successfully finished. 
        </p>

        <SuccessConfetti run={true} />
      </div>
    </div>
  );
};

export default OnboardingSuccessPage;
