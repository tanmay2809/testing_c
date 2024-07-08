import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
 import { toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

// icons
import { MdLockOutline } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

// assets
import bgVideo from "../assets/bg-video.mp4";
import logo from "../assets/logo.png";

interface FormData {
    otp:string
}

const Verify = () => {
    const [formData, setFormData] = useState<FormData>({
        otp: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(20);
    const [resendOTP, setResendOTP] = useState<boolean>(false);

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else {
            setResendOTP(true);
        }
    }, [timer]);

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }

    function submitHandler(event: FormEvent) {
        event.preventDefault();
        setFormData({
            otp: ""
        });
        setLoading(true);
        console.log(formData);
    }
    
    function handleResend() {
        setTimer(20);
        setResendOTP(false);
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
          <img
            src={logo}
            className="absolute right-[70%] md:right-[75%] lg:right-[85%] bottom-[85%] w-[150px] h-auto"
          />
          <div className="w-[400px] h-fit flex flex-col px-[2rem] py-[1.5rem] bg-white relative gap-4 justify-center items-center rounded-xl">
            <form
              onSubmit={submitHandler}
              className="w-full flex flex-col gap-y-4"
            >
              <div className="w-full flex flex-col gap-3">
                <Link className="w-fit h-fit" to="/register">
                  <IoMdArrowRoundBack className="text-[1.8rem]" />
                </Link>
                <div className="font-bold text-left text-[28px]">
                  Verify Email
                </div>
              </div>
              <p className="text-[#64748B] text-left text-[14px]">
                Verification mail has been sent{" "}
                <span className="font-bold">connect.foodoos@gmail.com</span>
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex w-full h-[3.5rem] border rounded-[0.5rem] pl-[12px] items-center gap-3 relative">
                  <MdLockOutline className="text-[#64748B] size-[25px]" />
                  <input
                    required
                    type="password"
                    placeholder="One Time Password"
                    name="otp"
                    value={formData.otp}
                    onChange={changeHandler}
                    className="w-full h-full text-[1rem] text-richblack-5 outline-none"
                  />
                </div>
              </div>

              <div className="mt-3">
                {resendOTP ? (
                  <p className="text-[#5C5C5C] text-[18px]">
                    Didn't receive OTP?{" "}
                    <span
                      onClick={handleResend}
                      className="text-[#004AAD] font-bold hover:cursor-pointer"
                    >
                      Resend OTP
                    </span>
                  </p>
                ) : (
                  <p className="text-[#5C5C5C] text-[18px]">
                    Didn't receive OTP?{" "}
                    <span className="font-bold">
                      Resend in 00:{timer < 10 ? `0${timer}` : timer}
                    </span>
                  </p>
                )}
              </div>

              <button className="bg-[#004AAD] h-14 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
                {loading ? (
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                ) : (
                  <span>Verify</span>
                )}
              </button>

              <div className="flex gap-2 mt-2 justify-center items-center">
                <Link to="/register">
                  <span className="text-[#004AAD] text-[1.1rem] font-bold">
                    Cancel
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
};

export default Verify;