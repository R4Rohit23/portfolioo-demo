import React from "react";
import Dummy from "../../assets/Dummy-Profile-Image.webp";
import { IInvite } from "../../interfaces/Invite";
import { TiPin, TiPinOutline } from "react-icons/ti";
import Letter from "../../assets/Letter.jpeg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIHandler } from "../../server/API";
import ROUTES from "../../server/Routes";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

interface IActiveInvite {
  activeInvite: IInvite;
}

interface IBody {
  inviteId: string;
  isPinned?: boolean;
  state?: string;
}

const ActiveInvite = (props: IActiveInvite) => {
  const { activeInvite } = props;
  const [cookie] = useCookies(["accessToken"]);

  const queryClient = useQueryClient();

  const updateInvite = async (body: IBody) => {
    const response = await APIHandler(
      "PUT",
      ROUTES.MESSAGES.UPDATE_INVITE,
      body,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.accessToken,
      }
    );
    return response;
  };

  const mutation = useMutation({
    mutationFn: updateInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInvites"] });
      toast.success("Invitation Updated Successfully!");
    },
  });

  if (mutation.isPending) {
    return <div>Updating...</div>;
  }

  if (mutation.isError) {
    return toast.error(mutation.error.message);
  }

  return (
    <>
      {!activeInvite?._id.length ? (
        <div className="p-10 bg-white h-[85vh] flex flex-col gap-2 relative rounded-2xl border justify-center items-center">
          <img src={Letter} alt="Letter" className="w-[50%] h-[50%]" />
          <h1 className="capitalize text-2xl font-semibold">
            Please Select Invitations from the Sidebar to view
          </h1>
        </div>
      ) : (
        <div className="p-10 bg-white h-[85vh] flex flex-col gap-10 relative">
          <div className="flex gap-5 justify-between relative">
            <div className="flex gap-5">
              <img
                src={activeInvite?.client?.user?.profileImage ?? Dummy}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-semibold">
                  {activeInvite?.client?.user?.firstName}{" "}
                  {activeInvite?.client?.user?.lastName}
                </h1>
                <p className="text-base">{activeInvite?.client?.companyName}</p>
                <p className="text-sm">
                  {activeInvite?.client?.companyWebsite}
                </p>
              </div>
            </div>

            <button
              className="absolute top-0 right-0 rounded-full border-2  p-2"
              onClick={() => {
                mutation.mutate({
                  inviteId: activeInvite?._id,
                  isPinned: activeInvite?.isPinned ? false : true,
                });
              }}
            >
              <TiPinOutline
                className={`w-6 h-6  ${
                  activeInvite.isPinned
                    ? "text-red-500"
                    : "text-black opacity-30"
                }`}
              />
            </button>
          </div>
          <div className="text-lg">{activeInvite?.message}</div>

          {activeInvite?.state === "Pending" && (
            <div className="absolute bottom-0 pb-20 right-20 flex gap-10">
              <button
                className="border px-4 py-3 rounded-full border-[#1C4980] text-[#1C4980]"
                onClick={() => {
                  mutation.mutate({
                    inviteId: activeInvite?._id,
                    state: "Rejected",
                  });
                  window.location.reload();
                }}
              >
                Reject
              </button>
              <button
                className="border px-4 py-3 rounded-full bg-[#FFCC00]"
                onClick={() => {
                  mutation.mutate({
                    inviteId: activeInvite?._id,
                    state: "Accepted",
                  });
                  window.location.reload();
                }}
              >
                Accept
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ActiveInvite;
