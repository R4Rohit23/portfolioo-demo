import { IPropSteps } from "../../../../interfaces/StepForm";
import {
  FaGithub,
  FaFigma,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { SiAdobexd, SiBlender } from "react-icons/si";
import InputField from "../../../../common/InputField";
import Box from "@mui/material/Box";
import ButtonElement from "../../../../common/Button";
import ROUTES from "../../../../server/Routes";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { APIHandler } from "../../../../server/API";

const SocialLinks = (props: IPropSteps) => {
  const [cookie] = useCookies(["accessToken"]);

  const navigate = useNavigate();

  const { data, clientData, setData, isSubmit, totalSteps, setActiveStep, activeStep } =
    props;

  const socialLinksStartContent = [
    {
      name: "linkedin",
      icon: <FaLinkedinIn />,
    },
    {
      name: "facebook",
      icon: <FaFacebookF />,
    },
    {
      name: "instagram",
      icon: <FaInstagram />,
    },
    {
      name: "github",
      icon: <FaGithub />,
    },
    {
      name: "figma",
      icon: <FaFigma />,
    },
    {
      name: "adobexd",
      icon: <SiAdobexd />,
    },
    {
      name: "blender",
      icon: <SiBlender />,
    },
  ];

  console.log(data);

  const handleSubmit = async () => {
    const {
      data: result,
      status,
    } = await APIHandler("POST", ROUTES.ARTIST.ONBOARD_ARTIST, data, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.accessToken}`,
    });

    console.log(result);

    if (!status) {
      toast.error("Internal Server Error");
      return;
    }

    setActiveStep(activeStep + 1);

    setTimeout(() => {
      navigate("/");
    }, 6000);
  };

  const handleChange = (e) => {
    setData((prevFormData) => {
      return {
        ...prevFormData,
        socialLinks: {
          ...prevFormData.socialLinks,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  return (
    <div className="space-y-10 mt-10">
      <h1 className="text-2xl font-semibold">Add Your Social Links</h1>
      <div className="space-y-10 max-h-72 overflow-y-auto pr-10">
      {socialLinksStartContent.map((link, indx) => (
        <InputField
          type="text"
          placeholder="Paste Your Social Link Here..."
          startContent={link.icon}
          key={indx}
          handleFunction={handleChange}
          name={link.name}
        />
      ))}
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

export default SocialLinks;
