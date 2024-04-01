import React, { useRef, useState } from "react";
import TextAreaField from "../../../common/TextAreaField";
import { GoPaperclip } from "react-icons/go";
import { IPropSteps } from "../../../interfaces/StepForm";
import Box from "@mui/material/Box";
import ButtonElement from "../../../common/Button";
import { FaXmark } from "react-icons/fa6";
import { APIHandler } from "../../../server/API";
import ROUTES from "../../../server/Routes";
import { useCookies } from "react-cookie";

const Description = (props: IPropSteps) => {
  const { data, setData, totalSteps, setActiveStep, activeStep } = props;
  const [description, setDescription] = useState("");
  const [staticImages, setStaticImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["accessToken"]);

  const inputRef = useRef();

  const handleDelete = async (file: File) => {
    const updatedImages = staticImages.filter((item) => item !== file);
    setStaticImages(updatedImages);
  };

  const handleImageUpload = async () => {
    setIsLoading(true);
    // const formData = new FormData();

    // staticImages.forEach((image) => {
    //   formData.append("mediaFiles", image);
    // });

    // const { data: imageResult, status, error } = await APIHandler(
    //   "POST",
    //   ROUTES.CLIENT.CREATE_GIG,
    //   formData,
    //   {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: "Bearer " + cookie.accessToken,
    //   }
    // );

    // console.log(imageResult);

    // if (!status) {
    //   setIsLoading(false);
    //   console.log(error);
    //   return;
    // }
    setData((prevData) => {
      return {
        ...prevData,
        description: description,
        mediaFiles: staticImages,
      };
    });
    setIsLoading(false);
    setActiveStep(activeStep + 1);
  };

  console.log(data);

  return (
    <div className="flex flex-col justify-between h-full pb-10">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold">Start the conversation.</h1>
          <p className="text-base pt-2">Talent are looking for:</p>
          <ul className="list-disc pl-10">
            <li>Clear expectations about your task or deliverables</li>
            <li>The skills required for your work</li>
            <li>Good communication</li>
            <li>Details about how you or your team like to work</li>
          </ul>
        </div>
        <div>
          <h1>Describe what you need</h1>
          <TextAreaField
            handleFunction={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <button
            className="flex gap-2 items-center border border-main-blue text-main-blue p-2 text-sm rounded-md"
            onClick={() => inputRef.current.click()}
          >
            <GoPaperclip />
            Attach File
          </button>
        </div>

        <div className="lg:flex gap-5">
          {staticImages.map((file, id) => (
            <div className="relative" key={id}>
              <img
                src={URL.createObjectURL(file)}
                className="w-[100%] rounded-md object-cover max-h-[400px]"
                key={id}
              />

              <div className="absolute top-3 right-3 z-10">
                <button
                  className="text-black bg-white rounded-full p-1"
                  onClick={() => handleDelete(file)}
                >
                  <FaXmark className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <input
          type="file"
          ref={inputRef}
          hidden
          accept=".jpeg,.jpg,.png,.webp"
          multiple={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              setStaticImages((prevImages) => [
                ...prevImages,
                ...e.target.files,
              ]);
            }
          }}
        />

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
              handleFunction={handleImageUpload}
              text={"Review Job Post"}
              className="gradient-button"
              disabled={isLoading}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Description;
