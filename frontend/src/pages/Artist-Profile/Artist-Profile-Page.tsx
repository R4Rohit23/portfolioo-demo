import React, { useRef, useState } from "react";
import Navbar from "../../components/Landing-Page/Navbar";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import ButtonElement from "../../common/Button";
import EditOverlay from "../../common/EditOverlay";
import EditProfile from "../../components/Client-Profile/EditClientProfile/EditProfile";
import { useSelector } from "react-redux";
import ArtistSidebar from "../../components/Artist-Profile/ArtistSidebar";
import ArtistAbout from "../../components/Artist-Profile/ArtistAbout";
import ArtistSkills from "../../components/Artist-Profile/ArtistSkills";
import EducationDetails from "../../components/Artist-Profile/ArtistEducatoin";
import ArtistRates from "../../components/Artist-Profile/ArtistRates";
import ArtistSocialLinks from "../../components/Artist-Profile/ArtistSocialLinks";
import EditArtist from "../../components/Artist-Profile/EditArtistProfile/EditArtist";

const ArtistProfile = () => {
    const [open, setOpen] = useState<boolean>(false);
    const aboutRef = useRef(null);
    const skillRef = useRef(null);
    const educationRef = useRef(null);
    const pricingRef = useRef(null);
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
                                    {userData?.firstName +
                                        " " +
                                        userData?.lastName}
                                </h2>
                                <div className="grid grid-cols-2 gap-2 gap-x-10">
                                    <div className="flex flex-row gap-2 items-center">
                                        <IoBriefcaseOutline /> <p> Aritst</p>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <BsTelephone /> <p> 9999999999 </p>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <FaRegBuilding /> <p> Pune</p>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <MdOutlineEmail />{" "}
                                        <p> umer@gmail.com </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4">
                            <ButtonElement
                                text="Upload Resume"
                                className="w-fit border bg-white border-main-blue"
                                handleFunction={() => setOpen(true)}
                            />
                            <ButtonElement
                                text="Profile Setting "
                                className="w-fit bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                                handleFunction={() => setOpen(true)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-60 w-11/12 mx-auto flex flex-row ">
                    <div className="flex mt-3 flex-row justify-between w-full ">
                        <div className="w-fit">
                            <ArtistSidebar
                                aboutRef={aboutRef}
                                skillRef={skillRef}
                                educationRef={educationRef}
                                pricingRef={pricingRef}
                                socialRef={socialRef}
                            />
                        </div>
                        <div className="w-[83%] space-y-4 overflow-hidden ">
                            <ArtistAbout Ref={aboutRef} />
                            <ArtistSkills Ref={skillRef} />
                            <EducationDetails Ref={educationRef} />
                            <ArtistRates Ref={pricingRef} />
                            <ArtistSocialLinks Ref={socialRef} />
                        </div>
                    </div>
                </div>
            </div>
            <EditOverlay
                open={open}
                setOpen={setOpen}
                children={<EditArtist />}
            />
        </>
    );
};

export default ArtistProfile;
