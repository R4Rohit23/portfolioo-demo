import React, { useEffect, useState } from "react";
import CongulationPage from "../components/Auth/Register/Congratulations";
import OverlayFragment from "./OverlayFragment";
import { useNavigate } from "react-router-dom";

const StartOnborading = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      navigate("/");
    }
  }, [isOpen]);
  return (
    <div className="bg-[#f3d14bef] min-h-screen max-w-[100vw]">
      <OverlayFragment
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={<CongulationPage />}
        size="5xl"
      />
    </div>
  );
};

export default StartOnborading;
