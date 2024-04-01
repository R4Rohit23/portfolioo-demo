import React from "react";
import PaintBrush from "../../assets/PaintBrush.jpeg";
import { Link } from "react-router-dom";

const Discover_Section = () => {
  return (
    <div className="relative">
      <img src={PaintBrush} className="max-h-[500px] w-full" />
      <div className="absolute top-0 z-10 px-10 py-20">
        <h1 className="text-black text-6xl font-bold">
          Discover Talent <p className="font-normal">Your Own Way</p>{" "}
        </h1>
        <p className="max-w-md text-justify mt-5 font-semibold">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
          dolorum magni delectus molestias numquam, doloremque, obcaecati
          quisquam debitis
        </p>

        <div className="mt-6 flex gap-10">
          <div className=" p-6 bg-white flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">
              Post a job and recruit an expert
            </h1>
            <Link to={"/"} className="text-lg">
              Explore
            </Link>
          </div>
          <div className=" p-6 bg-white flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">
              Post a job and recruit an expert
            </h1>
            <Link to={"/"} className="text-lg">
              Explore
            </Link>
          </div>
          <div className=" p-6 bg-white flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">
              Post a job and recruit an expert
            </h1>
            <Link to={"/"} className="text-lg">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover_Section;
