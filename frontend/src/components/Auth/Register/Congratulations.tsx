import React, { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import ButtonElement from "../../../common/Button";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface ICongratulation {
    setIsOpen: (value: boolean) => void;
}

const CongulationPage = (props: ICongratulation) => {
    const { setIsOpen } = props;

    const [user, serUser] = useState({});

    const [cookie, setCookie] = useCookies(["accessToken"]);
    const navigate = useNavigate();

    console.log(cookie?.accessToken);

    const { userData, userLoading } = useSelector(
        (store) => store?.store?.userDetails
    );

    useEffect(() => {
        // Parse query parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("token");

        if (accessToken?.length > 0) {
            setCookie("accessToken", accessToken, {
                expires: new Date(
                    new Date().getTime() + 5 * 24 * 60 * 60 * 1000
                ),
            });
        }
        // Set the state with the query parameter value
    }, []); // Run only once when component mounts

    // useEffect(() => {
    //   if (!userLoading) {
    //     if (userData?.accountType === "Artist") {
    //       navigate("/profile-artist");
    //     } else if (userData?.accountType === "Client") {
    //       navigate("/client-profile");
    //     } else if (userData?.accountType !== "User") {
    //       navigate("/");
    //     }
    //   }
    // }, [cookie?.accessToken, userData]);

    return (
        <div className="min-h-[500px]  flex flex-col items-center justify-center">
            <div className="w-[70%] mx-auto   space-y-8">
                <MdDone
                    className="w-fit p-2 bg-[#FFCC00] text-white rounded-full mx-auto"
                    size={50}
                />
                <p className="text-[30px] font-medium  text-[#595959] leading-10 w-fit mx-auto text-center">
                    Congratulations, Your account has been successfully created.
                    Lets get you started!
                </p>
                <div className="flex  mx-auto  items-center flex-row   w-fit gap-10 ">
                    <ButtonElement
                        text="Freelancer"
                        className=" rounded-full border border-[#FFCC00] bg-[#FFCC00] bg-opacity-5   w-fit text-[#676767]                "
                        handleFunction={() => navigate("/artist-onboarding")}
                    />
                    <ButtonElement
                        text="Client"
                        handleFunction={() => navigate("/client-onboarding")}
                        className=" rounded-full border border-[#FFCC00] bg-[#FFCC00] bg-opacity-5   w-fit text-[#676767]                "
                    />
                </div>
            </div>
        </div>
    );
};

export default CongulationPage;
