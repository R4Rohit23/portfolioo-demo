import { Input } from "@nextui-org/react";
import React from "react";
import { ITextProp } from "../../interfaces/Input";

interface IPROPS {
    Fields: { field: ITextProp; value: any }[];
    heading: string;
    pageId?: any;
}
const ClientDetails: React.FC<IPROPS> = ({ Fields, heading, pageId }) => {
    return (
        <div
            ref={pageId}
            className="p-4 bg-[#FFFFFF] rounded-md border border-slate-200 w-full  space-y-6"
        >
            <h3 className="text-xl font-medium  capitalize">{heading}</h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                {Fields.map((inp, id) => (
                    <>
                        <div key={id} className={`  relative `}>
                            <Input
                                id="filled-read-only-input"
                                type={inp?.field?.type}
                                readOnly={true}
                                label={inp?.field?.label}
                                startContent={inp?.field?.startContent}
                                // helperText="Enter compony name"
                                value={inp?.value}
                                placeholder={
                                    inp?.field?.type === "date"
                                        ? "Enter Date"
                                        : ""
                                }
                                variant="bordered"
                            />
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default ClientDetails;
