import { APIHandler } from "../../server/API";
import ROUTES from "../../server/Routes";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IInvite } from "../../interfaces/Invite";
import Dummy from "../../assets/Dummy-Profile-Image.webp";
import InputField from "../../common/InputField";
import { GiSettingsKnobs } from "react-icons/gi";
import {
  CiCircleCheck,
  CiCircleChevDown,
  CiCircleChevUp,
  CiCircleRemove,
  CiSearch,
} from "react-icons/ci";
import { TiPin } from "react-icons/ti";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BsClockHistory } from "react-icons/bs";
import {  useState } from "react";
import { IFilter } from "../../interfaces/Filter";

interface IInviteSidebar {
  setActiveInvite: (value: any) => void;
}

const Sidebar = (props: IInviteSidebar) => {
  const { setActiveInvite } = props;
  const [cookie] = useCookies(["accessToken"]);
  const [state, setState] = useState("Pending");
  const [sort, setSort] = useState(-1);

  const body = {
    filter: {
      state: state,
    },
    sort: {
      createdAt: sort,
    },
  };

  const fetchInvites = async (body: IFilter) => {
    const { data } = await APIHandler(
      "POST",
      ROUTES.MESSAGES.GET_ALL_MESSAGES,
      body,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.accessToken}`,
      }
    );
    return data.data;
  };

  const {
    data: invites,
    isError,
    isLoading,
    error,
  } = useQuery<IInvite[]>({
    queryKey: ["myInvites", body],
    queryFn: () => fetchInvites(body),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return toast.error("Something went wrong. Please try again");
  }

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border border-gray-200 bg-white p-6 rounded-3xl divide-y-1">
      <div className="flex gap-5">
        <InputField placeholder="Search" startContent={<CiSearch />} />
        <Dropdown>
          <DropdownTrigger>
            <button className="bg-[#1C4980] p-2 rounded-lg">
              <GiSettingsKnobs className="w-5 h-5 text-white" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="accepted"
              startContent={
                <CiCircleCheck className="text-green-600 w-5 h-5" />
              }
              onClick={() => {
                setState("Accepted");
              }}
            >
              Accepted
            </DropdownItem>
            <DropdownItem
              key="pending"
              startContent={
                <BsClockHistory className="text-yellow-400 w-4 h-4" />
              }
              onClick={() => {
                setState("Pending");
              }}
            >
              Pending
            </DropdownItem>
            <DropdownItem
              key="rejected"
              startContent={<CiCircleRemove className="text-red-400 w-5 h-5" />}
              showDivider
              onClick={() => {
                setState("Rejected");
              }}
            >
              Rejected
            </DropdownItem>
            <DropdownItem
              key="asc"
              className=""
              startContent={<CiCircleChevUp className="h-5 w-5" />}
              onClick={() => {
                setSort(-1);
              }}
            >
              Latest
            </DropdownItem>
            <DropdownItem
              key="desc"
              className=""
              startContent={<CiCircleChevDown className="h-5 w-5" />}
              onClick={() => {
                setSort(1);
              }}
            >
              Oldest
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {invites?.map((invite) => (
        <button
          key={invite._id}
          className="py-5 flex flex-col gap-5"
          onClick={() => setActiveInvite(invite)}
        >
          <div className="flex items-center gap-2 relative">
            <img
              src={invite?.client?.user?.profileImage ?? Dummy}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h1 className="text-lg font-semibold">
              {invite?.client?.user?.firstName} {invite?.client?.user?.lastName}
            </h1>
            {invite?.isPinned && (
              <div className="bg-red-50 border rounded-full p-1">
                <TiPin className="text-red-400 w-5 h-5" />
              </div>
            )}
          </div>
          <p className="line-clamp-2 text-start">{invite?.message}</p>
          {invite?.priority && (
            <p className="text-[10px] flex-1 px-4 text-[#FF7373] bg-[#FFCDCD54] py-2 rounded-full">
              Urgent Requirement
            </p>
          )}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
