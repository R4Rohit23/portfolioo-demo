import JobCard from "./Card";
import { APIHandler } from "../../server/API";
import ROUTES from "../../server/Routes";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IGigCard } from "../../interfaces/ClientData";

const Listing = () => {
  const fetchAllJobs = async () => {
    try {
      const response = await APIHandler(
        "POST",
        ROUTES.GIG.GET_ALL_GIGS,
        {},
        {
          "Content-Type": "application/json",
        }
      );
      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, isError, data, error } = useQuery<IGigCard[]>({
    queryKey: ["jobs"],
    queryFn: fetchAllJobs,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return toast.error(error.message);

  return (
    <div className="space-y-10">
      {data?.map((artistData) => (
        <JobCard data={artistData} key={artistData._id} />
      ))}
    </div>
  );
};

export default Listing;
