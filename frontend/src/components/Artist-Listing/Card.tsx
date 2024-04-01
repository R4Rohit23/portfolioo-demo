import Dummy from "../../assets/Dummy-Profile-Image.png";
import { CiHeart } from "react-icons/ci";
import ButtonElement from "../../common/Button";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaCrown } from "react-icons/fa";
import { IArtistCard } from "../../interfaces/Artist";
import { useState } from "react";
import OverlayFragment from "../../common/OverlayFragment";
import Invite from "./Invite";

interface ICard {
  data: IArtistCard;
}

const ArtistCard = (props: ICard) => {
  const { data } = props;
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);

  return (
    <main className="p-10 rounded-lg bg-white flex flex-col gap-5 drop-shadow-lg">
      <section className="flex justify-between">
        <div className="flex gap-10">
          <img
            src={data?.user?.profileImage ?? Dummy}
            alt="profile image"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold capitalize">
              {data?.user?.firstName} {data?.user?.lastName}{" "}
              <span className="text-base font-medium">{data?.location}</span>
            </h1>
            <h3 className="text-lg capitalize">{data?.title}</h3>
          </div>
        </div>

        <div className="space-x-10 ">
          <button className="bg-white p-3 rounded-full border-2">
            <CiHeart />
          </button>
          <ButtonElement text="View PortFolio" />
          <ButtonElement
            text="Invite To Job"
            className="gradient-button"
            handleFunction={() => setInviteOpen(true)}
          />
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
        {data?.skills?.map((skill, index) => (
          <p
            key={index}
            className="bg-slate-100 px-3 py-2 text-xs rounded-full"
          >
            {skill}
          </p>
        ))}
      </section>

      <section className="line-clamp-4">{data?.description}</section>

      <OverlayFragment
        children={
          <Invite
            data={{
              id: data?.userId,
              firstName: data?.user?.firstName,
              lastName: data?.user?.lastName,
              profileImage: data?.user?.profileImage,
              title: data?.title,
              location: data?.location,
            }}
            setInviteOpen={setInviteOpen}
          />
        }
        isOpen={inviteOpen}
        setIsOpen={setInviteOpen}
        size="2xl"
      />
    </main>
  );
};

export default ArtistCard;
