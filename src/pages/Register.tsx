import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// icons
import { CiMail } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import { PiEyeSlashLight } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";

// assets
import bgVideo from "../assets/bg-video.mp4";

interface FormData {
    name: string;
  email: string;
  password: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
    });

    const [isAgree, setIsAgree] = useState<boolean>(false);
    const [agreeError, setAgreeError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }

    function submitHandler(event: FormEvent) {
        event.preventDefault();
        if (!isAgree) {
            setAgreeError("Please Agree to privacy policy!");
            return;
        } else {
            setAgreeError("");
        }
        setFormData({
            name: "",
            email: "",
            password: "",
        });
        setLoading(true);
        console.log(formData);
    }

    return (
        <>
            <video
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
                src={bgVideo}
                autoPlay
                muted
                loop
            ></video>
            <div className="relative flex items-center justify-center lg:justify-end px-[1rem] md:px-[10rem] w-full h-[100vh]">
                <div className="w-[450px] h-fit flex flex-col px-[2rem] py-[2.5rem] bg-white relative gap-4 justify-center items-center rounded-xl">
                    <form
                        onSubmit={submitHandler}
                        className="w-full flex flex-col gap-y-5"
                    >
                        <div className="font-bold text-left text-[28px]">
                            Create Business Account
                        </div>
                        <p className="text-[#64748B] text-left text-[16px]">
                            Enhance your customer retention & marketing with{" "}
                            <span className="font-bold">snackBAE</span>
                        </p>

                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex w-full h-[3.5rem] border rounded-[0.5rem] pl-[12px] items-center gap-3">
                                <CiMail className="text-[#64748B] size-[25px]" />
                                <input
                                    required
                                    type="text"
                                    placeholder="Brand Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={changeHandler}
                                    className="w-full h-full text-[1rem] text-richblack-5 outline-none"
                                />
                            </div>

                            <div className="flex w-full h-[3.5rem] border rounded-[0.5rem] pl-[12px] items-center gap-3">
                                <CiMail className="text-[#64748B] size-[25px]" />
                                <input
                                    required
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={changeHandler}
                                    className="w-full h-full text-[1rem] text-richblack-5 outline-none"
                                />
                            </div>

                            <div className="flex w-full h-[3.5rem] border rounded-[0.5rem] pl-[12px] items-center gap-3 relative">
                                <MdLockOutline className="text-[#64748B] size-[25px]" />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={changeHandler}
                                    className="w-full h-full text-[1rem] text-richblack-5 outline-none"
                                />
                                <span
                                    className="absolute right-5 cursor-pointer"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? (
                                        <PiEyeLight fontSize={24} />
                                    ) : (
                                        <PiEyeSlashLight fontSize={24} />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between mt-3 items-center justify-center">
                            <label className="text-[0.95rem] text-[#64748B] font-semibold text-center flex items-center text-nowrap">
                                <input
                                    type="checkbox"
                                    checked={isAgree}
                                    onChange={() => setIsAgree(!isAgree)}
                                    className="size-[24px] mr-2"
                                />
                                Agree to our
                                <span className="font-bold text-black mx-1">
                                    Privacy policy
                                </span>{" "}
                                &{" "}
                                <span className="font-bold text-black mx-1">
                                    terms of condition
                                </span>
                            </label>
                        </div>

                        {agreeError.length > 0 && <span className="text-red-500">{agreeError}</span>}

                        <button className="bg-[#004AAD] h-14 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
                            {loading ? (
                                <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            ) : (
                                <span>Continue</span>
                            )}
                        </button>

                        <div className="flex gap-2 mt-2 justify-center items-center">
                            <p>Already have an account?</p>
                            <Link to="/login">
                                <span className="text-[#004AAD] text-[1.1rem] font-bold">
                                    Login
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;