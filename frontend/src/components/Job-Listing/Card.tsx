import Dummy from "../../assets/Dummy-Profile-Image.png";
import { CiHeart } from "react-icons/ci";
import ButtonElement from "../../common/Button";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaCrown } from "react-icons/fa";
import { IGigCard } from "../../interfaces/ClientData";
import GigOverview from "./Overview";
import { useState } from "react";

interface ICard {
  data: IGigCard;
}

const JobCard = (props: ICard) => {
  const { data } = props;
  const [showGig, setShowGig] = useState<boolean>(false);

  const skillsRequired = data?.skillsRequired?.filter(
    (val, indx) => indx !== data?.skillsRequired?.length - 1
  );

  return (
    <main className="p-10 rounded-lg bg-white flex flex-col gap-5 drop-shadow-lg">
      <section className="flex justify-between">
        <div className="flex gap-10">
          <img
            src={data?.client?.userDetails?.profileImage ?? Dummy}
            alt="profile image"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold capitalize">
              {data.client?.userDetails.firstName}{" "}
              {data.client?.userDetails.lastName}
              <span className="text-base font-medium pl-2">
                {data.client?.companyLocation}
              </span>
            </h1>
            <h3 className="text-lg capitalize">
              Looking For :{" "}
              <span className="font-semibold truncate">{data.title}</span>
            </h3>
          </div>
        </div>

        <div className="space-x-10 ">
          <button className="bg-white p-3 rounded-full border-2">
            <CiHeart />
          </button>
          {/* <ButtonElement text="View PortFolio" /> */}
          <ButtonElement text="View Post" className="gradient-button" handleFunction={() => setShowGig(true)}/>
        </div>
      </section>

      <section className="flex gap-5  text-lg">
        <h1 className="flex items-center">
          <LiaRupeeSignSolid />
          100/hr
        </h1>
        <h1 className="flex items-center gap-2">
          <div className="text-main border-2 p-1 rounded-full">
            <FaCrown />
          </div>
          96% Job Success
        </h1>
        <h1 className="flex items-center">
          <LiaRupeeSignSolid />
          30k+ Earned
        </h1>
      </section>

      <section className="flex gap-3">
        {skillsRequired.map((skill, index) => (
          <p
            key={index}
            className="bg-slate-100 px-3 py-2 text-xs rounded-full"
          >
            {skill}
          </p>
        ))}
      </section>

      <section className="line-clamp-4">{data.description}</section>

      <GigOverview open={showGig} setOpen={setShowGig} data={data}/>
    </main>
  );
};

export default JobCard;
