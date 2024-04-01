import React from "react";
import { useField } from "formik";

interface UploadProps {
    name: string;
}

const SelectGender: React.FC<UploadProps> = ({ name }) => {
    const [, { value, error }, { setValue }] = useField(name);

    const genders = ["Male", "Female", "Other"];

    return (
        <div className=" my-auto flex fle-row justify-between text-sm">
            {genders?.map((ele, idx) => (
                <div
                    className={` ${
                        value === ele
                            ? "bg-main-light bg-opacity-25 [#FCEFDA] text-main transition-all duration-200"
                            : ""
                    }    h-10 w-20 cursor-pointer text-center flex flex-row items-center justify-center border border-main border-dashed rounded-full `}
                    onClick={() => setValue(ele)}
                >
                    {ele}
                </div>
            ))}
        </div>
    );
};

export default SelectGender;
