import React from "react";
import {
    FaGithub,
    FaFigma,
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
} from "react-icons/fa";
import {
    AdobexdField,
    FacebookField,
    FigmaField,
    GithubField,
    InstagramField,
    LinkedinField,
    MediumField,
    TwitterField,
    blenderField,
} from "../../utils/InputFields";
import { useSelector } from "react-redux";
import ClientDetails from "./ClientDetails";
import { SiAdobexd, SiBlender } from "react-icons/si";
import { Input } from "@nextui-org/react";

const ClientSocialLinks = ({ socialRef }) => {
    const { userData } = useSelector((store) => store.store.userDetails);
    const socialLinksStartContent = [
        {
            name: "linkedin",
            icon: <FaLinkedinIn size={20} />,
        },
        {
            name: "facebook",
            icon: <FaFacebookF size={20} />,
        },
        {
            name: "instagram",
            icon: <FaInstagram size={20} />,
        },
        {
            name: "github",
            icon: <FaGithub size={20} />,
        },
        {
            name: "figma",
            icon: <FaFigma size={20} />,
        },
        {
            name: "adobexd",
            icon: <SiAdobexd size={20} />,
        },
        {
            name: "blender",
            icon: <SiBlender size={20} />,
        },
    ];

    return (
        <div
            ref={socialRef}
            className="p-4 bg-[#FFFFFF] rounded-md border border-slate-200 w-full  space-y-6"
        >
            <h3 className="text-xl font-medium  capitalize">Social Links</h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                {socialLinksStartContent.map((link, idx) => (
                    <>
                        <div key={idx} className={`  relative `}>
                            <Input
                                type={"text"}
                                readOnly={true}
                                startContent={link?.icon}
                                // helperText="Enter compony name"
                                // value={link?.value}
                                placeholder="Add Your Social Link Here..."
                                variant="bordered"
                                key={idx}
                            />
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default ClientSocialLinks;
