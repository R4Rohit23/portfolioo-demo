import React from "react";
import {
    FaGithub,
    FaFigma,
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import { SiAdobexd, SiBlender } from "react-icons/si";
import { Input } from "@nextui-org/react";

interface IPROPS {
    Ref: any;
}
const ClientSocialLinks = ({ Ref }: IPROPS) => {
    const { userData } = useSelector((store) => store.store.userDetails);

    const socialLinksStartContent = [
        {
            name: "linkedin",
            icon: <FaLinkedinIn size={20} />,
            value: userData?.artistId?.socialLinks?.linkedin
                ? userData?.artistId?.socialLinks?.linkedin
                : "",
        },
        {
            name: "facebook",
            icon: <FaFacebookF size={20} />,
            value: userData?.artistId?.socialLinks?.facebook
                ? userData?.artistId?.socialLinks?.facebook
                : "",
        },
        {
            name: "instagram",
            icon: <FaInstagram size={20} />,
            value: userData?.artistId?.socialLinks?.instagram
                ? userData?.artistId?.socialLinks?.instagram
                : "",
        },
        {
            name: "github",
            icon: <FaGithub size={20} />,
            value: userData?.artistId?.socialLinks?.github
                ? userData?.artistId?.socialLinks?.github
                : "",
        },
        {
            name: "figma",
            icon: <FaFigma size={20} />,
            value: userData?.artistId?.socialLinks?.figma
                ? userData?.artistId?.socialLinks?.figma
                : "",
        },
        {
            name: "adobexd",
            icon: <SiAdobexd size={20} />,
            value: userData?.artistId?.socialLinks?.adobexd
                ? userData?.artistId?.socialLinks?.adobexd
                : "",
        },
        {
            name: "blender",
            icon: <SiBlender size={20} />,
            value: userData?.artistId?.socialLinks?.blender
                ? userData?.artistId?.socialLinks?.blender
                : "",
        },
    ];

    return (
        <div
            ref={Ref}
            className="p-4 bg-[#FFFFFF] rounded-md border border-slate-200 w-full  space-y-6"
        >
            <h3 className="text-xl font-medium  capitalize">Social Links</h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                {socialLinksStartContent.map((link, idx) => (
                    <div key={idx} className={`  relative `}>
                        <Input
                            type={"text"}
                            readOnly={true}
                            value={link?.value}
                            startContent={link?.icon}
                            // helperText="Enter compony name"
                            // value={link?.value}
                            placeholder="Add Your Social Link Here..."
                            variant="bordered"
                            key={idx}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientSocialLinks;
