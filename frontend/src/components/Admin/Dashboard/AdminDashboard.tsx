import React from "react";
import { APIHandler } from "../../../server/API";
import ROUTES from "../../../server/Routes";
import { useQuery } from "@tanstack/react-query";
import { IStats } from "../../../interfaces/Dashboard";
import toast from "react-hot-toast";
import Loader from "../../../common/Loader";
import MonthlyArtists from "../Charts/MonthlyArtists";
import MonthlyClients from "../Charts/MonthlyClient";

export default function AdminDashboard() {
  const fetchStats = async () => {
    const response = await APIHandler("GET", ROUTES.ADMIN.GET_ALL_STATS);
    console.log(response);
    return response.data;
  };

  const { isLoading, isError, data, error } = useQuery<IStats>({
    queryKey: ["dashboard_stats"],
    queryFn: fetchStats,
  });

  if (isLoading) return <Loader />;

  if (isError) return toast.error(error.message);

  return (
    <div>
      {/* Stats  */}
      <section className="flex gap-2 justify-between">
        <div className="stats-1 py-5 px-10 flex flex-col justify-center items-center rounded-xl">
          <p className="text-4xl text-white font-semibold">
            {data?.artistCount}
          </p>
          <p className="text-white font-semibold text-lg">Numbers Of Artists</p>
        </div>

        <div className="stats-2  px-10 flex flex-col justify-center items-center rounded-xl">
          <p className="text-4xl text-white font-semibold">
            {data?.clientCount}
          </p>
          <p className="text-white font-semibold text-lg">Numbers Of Clients</p>
        </div>

        <div className="stats-3  px-10 flex flex-col justify-center items-center rounded-xl">
          <p className="text-4xl text-white font-semibold">
            {data?.totalGigsCount}
          </p>
          <p className="text-white font-semibold text-lg">
            Numbers Of Total Gigs
          </p>
        </div>

        <div className="stats-4  px-10 flex flex-col justify-center items-center rounded-xl">
          <p className="text-4xl text-white font-semibold">83%</p>
          <p className="text-white font-semibold text-lg">Hiring Percentage</p>
        </div>
      </section>

      {/* Graphs  */}
      <section className="flex justify-between mt-10 gap-10 ">
        <div className="w-[50%]">
          <MonthlyArtists data={data} />
        </div>
        <div className="w-[50%]">
          <MonthlyClients data={data} />
        </div>
      </section>
    </div>
  );
}
