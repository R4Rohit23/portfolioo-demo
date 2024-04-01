import React from "react";
import { IconType } from "react-icons";

interface PropHeader {
  title?: string;
  subtitle?: string;
  linkText?: string;
  href?: string;
  handleClick?: (values: any) => void;
  icon?: string;
}

const AuthHeader: React.FC<PropHeader> = (props) => {
  const { title, subtitle, linkText, href, handleClick, icon } = props;
  return (
    <div>
      <h1 className="lg:text-2xl text-xl font-semibold my-4 flex items-center gap-2">
        <img src={icon} /> {title}
      </h1>
      <div className="flex items-center text-sm gap-2">
        <p className="text-[#94A3B8] text-sm">{subtitle}</p>
        <a
          className="cursor-pointer hover:underline duration-300"
          onClick={handleClick}
        >
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default AuthHeader;
