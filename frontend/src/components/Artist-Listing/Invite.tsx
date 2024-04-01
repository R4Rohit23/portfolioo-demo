import Dummy from "../../assets/Dummy-Profile-Image.webp";
import TextAreaField from "../../common/TextAreaField";
import ButtonElement from "../../common/Button";
import toast from "react-hot-toast";
import { APIHandler } from "../../server/API";
import ROUTES from "../../server/Routes";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Checkbox } from "@nextui-org/checkbox";

interface IProps {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    location: string;
    title: string;
    profileImage?: string;
  };
  setInviteOpen: (value: boolean) => void;
}

const Invite = (props: IProps) => {
  const { data, setInviteOpen } = props;
  const [cookie] = useCookies(["accessToken"]);
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState(false);


  const handleInvite = async () => {
    try {
      const response = await APIHandler(
        "POST",
        ROUTES.MESSAGES.CREATE_MESSAGE,
        {
          message: message,
          artist_id: data.id,
          priority: priority,
        },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.accessToken}`,
        }
      );

      if (!response.status) {
        console.log(response.error);
        return toast.error("Internal Server Error");
      }

      toast.success("Invitation Sent Successfully");
      setInviteOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col p-10 gap-10">
      <h1 className="text-2xl font-semibold">Invite To Job</h1>

      <div className="flex gap-5">
        <img
          src={data.profileImage ?? Dummy}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold capitalize">
            {data.firstName} {data.lastName}{" "}
            <span className="text-sm font-normal">{data.location}</span>
          </p>
          <p className="text-base font-medium">{data.title}</p>
        </div>
      </div>


      <div>
        <p className="pb-2">Message</p>
        <TextAreaField
          handleFunction={(e) => setMessage(e.target.value)}
          placeholder="Type Your Message Here..."
        />
      </div>

      <div>
        <Checkbox isSelected={priority} onValueChange={setPriority}>
          Is Urgent Requirement?
        </Checkbox>
      </div>

      <div className="flex">
        <ButtonElement
          className="gradient-button w-full"
          text="Invite"
          handleFunction={handleInvite}
        />
      </div>
    </div>
  );
};

export default Invite;