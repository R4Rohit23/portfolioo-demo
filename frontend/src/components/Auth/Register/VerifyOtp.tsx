import OTPInput from "react-otp-input";
import AuthLady from "../../../assets/Auth_Assets/SideScreen.png";
import { useEffect, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { TbMailCheck } from "react-icons/tb";
import ButtonElement from "../../../common/Button";
import { IoCaretBack } from "react-icons/io5";
import { APIHandler } from "../../../server/apiConnetor";
import ROUTES from "../../../server/Routes";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface IPROPS {
    key: number;
    prevStep: (props: any) => any;
    nextStep: () => any;
    data: any;
}
const VerifyOtp: React.FC<IPROPS> = (props) => {
    const navigate = useNavigate();
    const { prevStep, data, nextStep } = props;
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [cookie, setCookie] = useCookies(["accessToken"]);

    const [seconds, setSeconds] = useState<number>(59);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds === 0) {
            } else {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    const handleSubmit = async () => {
        console.log(data);

        if (otp?.length < 4 || otp?.length > 4) return;

        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        formData.append("otp", otp);

        setLoading(true);
        const response = await APIHandler(
            "POST",
            ROUTES.AUTH.REGISTER_USER,
            formData
        );
        setLoading(false);

        console.log(response);

        if (response?.status) {
            // nextStep && nextStep();
            navigate("/congratulation");
            setCookie("accessToken", response?.data.accessToken, {
                expires: new Date(
                    new Date().getTime() + 5 * 24 * 60 * 60 * 1000
                ),
            });
            // nextStep && nextStep();
            navigate("/");
        }

        setError(response?.error);
    };

    const handleSendOtp = async () => {
        if (seconds !== 0) return;
        await APIHandler("POST", ROUTES.AUTH.SEND_OTP, {
            email: data?.email,
        });

        setSeconds(59);
    };
    return (
        <div className="grid grid-cols-2  w-full">
            <div>
                <img src={AuthLady} className=" h-full" />
            </div>

            <div className="min-h-full w-full">
                <div className=" h-[80%] flex flex-col justify-center items-center w-full  ">
                    <div className="w-[80%]  mx-auto space-y-10">
                        <div className="space-y-4">
                            <div className="flex flex-row gap-4 items-center">
                                <TfiEmail size={24} />
                                <h4 className="text-2xl  font-medium">
                                    Please Verify Your Email ID
                                </h4>
                            </div>

                            <div className="flex flex-row gap-4 p-4 justify-center items-center rounded-lg bg-[#FFCC00] bg-opacity-10 w-[100%]">
                                <TbMailCheck
                                    size={30}
                                    className="w-fit p-1 text-[#32D69F] bg-white rounded-full"
                                />
                                <p className=" text-sm font-medium w-[100%]">
                                    Enter the one time password(OTP) which has
                                    been sent to{" "}
                                    <span className="font-bold">
                                        {data?.email}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="relative w-fit">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={4}
                                    renderSeparator={
                                        <span className="text-gray-400 mx-4">
                                            -{" "}
                                        </span>
                                    }
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            style={{
                                                boxShadow:
                                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }}
                                            className="w-[38px] ml-1  lg:w-[50px]  border  rounded-md text-black border-slate-300 aspect-square text-center focus:outline-2 focus:outline-yellow-50"
                                        />
                                    )}
                                />
                                <p className="absolute top-14 left-[40%] text-red-600 text-xs text-center">
                                    {error ? error : " "}
                                </p>
                            </div>

                            <p className=" text-sm  w-[100%]">
                                Didn't receive OTP ?{" "}
                                <span
                                    className=" text-red-600 cursor-pointer"
                                    onClick={() => handleSendOtp()}
                                >
                                    {seconds !== 0
                                        ? `Resend in ${seconds} sec`
                                        : "Resend"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex w-[70%] mx-auto  h-[100px] items-center flex-row justify-between border-t-1 ">
                    <ButtonElement
                        text="Back"
                        className=" rounded-full border border-gray-400 bg-white  px-6 gap-0  w-fit text-[#676767]"
                        Icon={IoCaretBack}
                        handleFunction={prevStep}
                    />
                    <ButtonElement
                        isLoading={loading}
                        text="Verify Email"
                        handleFunction={handleSubmit}
                        className=" rounded-full border border-[#FFCC00] bg-[#FFCC00] bg-opacity-5   w-fit text-[#676767]                "
                    />
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
