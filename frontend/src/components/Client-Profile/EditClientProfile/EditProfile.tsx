import { ScrollShadow } from "@nextui-org/react";
import React, { useState } from "react";
import EditBasicDetails from "./EditBasicDetails";
import EditClientDetails from "./EditClientDetails";
import EditCompanyDetails from "./EditCompanyDetails";
import EditPasswrod from "./EditPassword";

const items = [
    { name: "basic details", href: "#", current: true },
    { name: "compony details", href: "#", current: true },

    { name: "password & security", href: "/user", current: false },

    { name: "membership history ", href: "/user/posts", current: false },
    { name: "teams ", href: "/products", current: false },
    { name: "tax information ", href: "/products", current: false },
    { name: "connected services ", href: "/products", current: false },
    { name: "past contacts ", href: "/products", current: false },
    { name: "history ", href: "/products", current: false },
    // More items...
];
const EditProfile = () => {
    const [openTab, setOpenTab] = useState<string>(items[0]?.name);
    return (
        <div className="w-full flex flex-row  gap-6  bg-[#F8F8F8]">
            <ScrollShadow
                hideScrollBar
                className=" w-[300px] h-[900px] mt-auto "
            >
                <ul role="list" className="space-y-3 w-full mb-5  ">
                    {items.map((item, idx) => (
                        <li
                            key={idx}
                            className={` ${
                                openTab === item?.name
                                    ? "border-r-4 border-r-main-light"
                                    : " transition-all duration-200 hover:border-r-4  hover:border-r-main-light"
                            } overflow-hidden rounded-md bg-white px-6 py-4 shadow border border-slate-200 w-full cursor-pointer`}
                            onClick={() => setOpenTab(item?.name)}
                        >
                            {" "}
                            {item?.name}
                            {/* Your content */}
                        </li>
                    ))}
                </ul>
            </ScrollShadow>
            <div className=" w-full bg-white rounded-md p-5">
                {openTab === "basic details" && <EditBasicDetails />}
                {openTab === "compony details" && <EditCompanyDetails />}
                {openTab === "password & security" && <EditPasswrod />}
            </div>
        </div>
    );
};

export default EditProfile;
