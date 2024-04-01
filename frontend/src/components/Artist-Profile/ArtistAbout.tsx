import React from "react";
import { useSelector } from "react-redux";

interface IPROPS {
    Ref: any;
}
const ArtistAbout = ({ Ref }: IPROPS) => {
    const { userData } = useSelector((store) => store.store.userDetails);
    return (
        <div
            ref={Ref}
            className="p-6 bg-[#FFFFFF] rounded-md border border-slate-200 w-full  space-y-6"
        >
            <h3 className="text-xl font-medium  uppercase">About us</h3>

            <p className="leading-10 text-lg">
                {/* I am UI/UX designer, I specialize in creating intuitive digital
                experiences that optimize usability and drive engagement. With a
                strong focus on user research & data-driven insights, I use
                design tools and methodologies to create wireframes, prototypes,
                and final visual designs that meet business requirements and
                exceed user expectations. I have a proven track record of
                designing impactful digital experiences that engage, inform, and
                delight */}
                {userData?.artistId?.description}
            </p>
        </div>
    );
};

export default ArtistAbout;
