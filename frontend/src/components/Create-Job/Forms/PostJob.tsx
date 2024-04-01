import Box from "@mui/material/Box";
import { IPropSteps } from "../../../interfaces/StepForm";
import ButtonElement from "../../../common/Button";
import { APIHandler } from "../../../server/API";
import ROUTES from "../../../server/Routes";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJob = (props: IPropSteps) => {
  const { data, activeStep } = props;
  console.log(data);

  const [cookie] = useCookies(["accessToken"]);

  const transformString = (inputString: string) => {
    return inputString
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const navigate = useNavigate();

  const handlePostJob = async () => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "skillsRequired") {
          for (const skill in data[key]) {
            formData.append("skillsRequired", data[key][skill]);
          }
        }
        if (key === "mediaFiles") {
          data[key].forEach((file: File) => {
            formData.append("mediaFiles", file);
          });
        } else {
          formData.append(key, data[key]);
        }
      }

      const { status, data: result } = await APIHandler(
        "POST",
        ROUTES.GIG.CREATE_GIG,
        formData,
        {
          Authorization: `Bearer ${cookie.accessToken}`,
          "Content-Type": "multipart/form-data",
        }
      );

      if (!status) {
        toast.error("Something went wrong");
        return;
      }
      toast.success("Gig Created Successfully");
      console.log(result);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full pb-10">
      <div className="flex flex-col gap-5">
        <div className="divide-y-1">
          <h1 className="text-2xl font-semibold pb-5">Job Details</h1>

          <div className="py-5 flex flex-col gap-4">
            <p className="text-lg">
              Project Title:{" "}
              <span className="font-semibold">{data?.title}</span>
            </p>
            <p>{data?.description}</p>
          </div>

          <div className="py-5">
            <div>
              <h1 className="text-lg font-semibold">Skills Required</h1>
              <div className="flex gap-5 py-4">
                {data?.skillsRequired?.map((skill: string) => (
                  <p className="bg-slate-50 px-4 py-2 rounded-full">{skill}</p>
                ))}
              </div>
            </div>

            <div className="py-5">
              <h1 className="text-lg font-semibold">Scope</h1>
              <p className="capitalize">
                {data?.scopeOfWork}
                {", "}
                {data?.deadline && transformString(data?.deadline)}
                {", "}
                {data?.jobLevel}
              </p>
            </div>

            <div>
              <h1 className="text-lg font-semibold">Budget</h1>
              <p>{data?.fixedBudget}</p>
              <div className="flex gap-4">
                <p className="font-semibold">
                  From:{" "}
                  <span className="font-normal">
                    Rs.{data?.hourlyBudgetRange?.from}
                  </span>
                </p>
                <p className="font-semibold">
                  To: <span>Rs.{data?.hourlyBudgetRange?.to}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <ButtonElement
              disabled={activeStep === 0}
              // handleFunction={() => setActiveStep(activeStep - 1)}
              text="Save To Draft"
              className="disabled:bg-none gradient-button "
            />

            <Box sx={{ flex: "1 1 auto" }} />
            <ButtonElement
              handleFunction={handlePostJob}
              text={"Post Job"}
              className="gradient-button"
              // disabled={isLoading}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
