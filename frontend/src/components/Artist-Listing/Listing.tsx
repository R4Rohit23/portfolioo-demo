import ArtistCard from "./Card";
import { APIHandler } from "../../server/API";
import ROUTES from "../../server/Routes";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IArtistCard } from "../../interfaces/Artist";

const Listing = () => {
  const fetchAllArtists = async () => {
    try {
      const response = await APIHandler(
        "POST",
        ROUTES.ARTIST.GET_ALL_ARTISTS,
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

  const { isLoading, isError, data, error } = useQuery<IArtistCard[]>({
    queryKey: ["artists"],
    queryFn: fetchAllArtists,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return toast.error(error.message);

  return (
    <div className="space-y-10">
      {data?.map((artistData) => (
        <ArtistCard data={artistData} key={artistData._id} />
      ))}
    </div>
  );
};

export default Listing;
