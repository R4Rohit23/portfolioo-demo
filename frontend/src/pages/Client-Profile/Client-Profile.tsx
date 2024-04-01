import React, { useRef, useState } from "react";
import Navbar from "../../components/Landing-Page/Navbar";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import ButtonElement from "../../common/Button";
import ClientSidebar from "../../components/Client-Profile/Sidebar";
import CompanyDetails from "../../components/Client-Profile/CompanyDetails";
import EditOverlay from "../../common/EditOverlay";
import EditProfile from "../../components/Client-Profile/EditClientProfile/EditProfile";
import { useSelector } from "react-redux";
import { user } from "@nextui-org/react";
import BasicDetails from "../../components/Client-Profile/BasicDetails";
import PasswordAndSecurity from "../../components/Client-Profile/PasswordAndSecurity";
import ClientSocialLinks from "../../components/Client-Profile/ClientSocialLinks";

const ClientProfile = () => {
    const [open, setOpen] = useState<boolean>(false);
    const basicRef = useRef(null);
    const companyRef = useRef(null);
    const passwordRef = useRef(null);
    const socialRef = useRef(null);
    const { userData } = useSelector((store) => store?.store?.userDetails);
    return (
        <>
            <div className="bg-[#f8f8f8] max-w-screen min-h-screen">
                <Navbar />

                {/* profile section */}
                <div className="fixed  w-full mx-auto z-20 bg-[#f8f8f8] ">
                    <div className=" my-7 p-8 w-11/12  mx-auto flex flex-row justify-between  gap-4 items-center  bg-[#FFFFFF] rounded-md border border-slate-200">
                        <div className="flex flex-row items-center gap-6">
                            <img
                                src={
                                    userData?.profileImage
                                        ? userData?.profileImage
                                        : `https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg`
                                }
                                className="aspect-square h-32 rounded-full"
                            />
                            <div className="space-y-2">
                                <h2 className="font-medium text-2xl  capitalize">
                                    {userData?.firstName} {userData?.lastName}{" "}
                                </h2>
                                <div className="grid grid-cols-2 gap-2 gap-x-10">
                                    <div className="flex flex-row gap-2 items-center">
                                        <IoBriefcaseOutline />{" "}
                                        <p> {userData?.accountType}</p>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <BsTelephone />{" "}
                                        <p> {userData?.phoneNumber} </p>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <FaRegBuilding />{" "}
                                        <p>
                                            {" "}
                                            {userData?.clientId?.companyName}
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <MdOutlineEmail />{" "}
                                        <p> {userData?.email} </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ButtonElement
                            text="Profile Setting "
                            className="w-fit bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                            handleFunction={() => setOpen(true)}
                        />
                    </div>
                </div>

                <div className="mt-64 w-11/12 mx-auto flex flex-row ">
                    <div className="flex flex-row justify-between w-full ">
                        <div className="w-fit">
                            <ClientSidebar
                                basicRef={basicRef}
                                socialRef={socialRef}
                                passwordRef={passwordRef}
                                companyRef={companyRef}
                            />
                        </div>
                        <div className="w-[83%] space-y-4 overflow-hidden ">
                            <BasicDetails basicRef={basicRef} />
                            <CompanyDetails companyRef={companyRef} />
                            <PasswordAndSecurity passwordRef={passwordRef} />
                            <ClientSocialLinks socialRef={socialRef} />
                        </div>
                    </div>
                </div>
            </div>
            <EditOverlay
                open={open}
                setOpen={setOpen}
                children={<EditProfile />}
            />
        </>
    );
};

export default ClientProfile;
