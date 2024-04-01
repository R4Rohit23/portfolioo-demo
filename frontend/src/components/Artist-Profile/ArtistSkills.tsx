import React from "react";
import { useSelector } from "react-redux";

interface IPROPS {
    Ref: any;
}
const ArtistSkills = ({ Ref }: IPROPS) => {
    const { userData } = useSelector((store) => store.store.userDetails);
    return (
        <div
            ref={Ref}
            className="p-6 bg-[#FFFFFF] rounded-md border border-slate-200 w-full  space-y-6"
        >
            <h3 className="text-xl font-medium  uppercase">Skills </h3>
            <div className="flex flex-wrap gap-4 w-[60%]">
                {userData?.artistId?.skills?.map((ele, idx) => (
                    <span
                        key={idx}
                        className="inline-flex items-center rounded-md  px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                    >
                        {ele}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ArtistSkills;
