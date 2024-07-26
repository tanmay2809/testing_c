import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// icons
import { MdLockOutline } from "react-icons/md";
// import { IoMdArrowRoundBack } from "react-icons/io";

// assets
import logo from "../../assets/logo.png";

//components
import Loader from "../../component/outlet/Loader";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "react-toastify";

interface FormData {
  otp: string;
}

const Verify = () => {
  const [formData, setFormData] = useState<FormData>({
    otp: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(20);
  const [resendOTP, setResendOTP] = useState<boolean>(false);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (!sessionStorage.getItem("email")) {
      navigate("/register");
    }
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
    setLoading(true);
    let data = JSON.stringify({
      email: email,
      otp: formData.otp,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/verifyOTP`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(response.data)
        setLoading(false);
        toast.success("OTP Verified");
        navigate("/newpassword");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error("Incorrect OTP!");
          setLoading(false);
        }
        console.log(error);
      });

    setFormData({
      otp: "",
    });
    console.log(formData);
  }

  function handleResend() {
    setTimer(20);
    setResendOTP(false);
  }

  return (
    <>
      {videoLoading && <Loader />}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://s3groupsnackbae.s3.ap-south-1.amazonaws.com/1721141264218"
        autoPlay
        muted
        loop
        onLoadedData={() => setVideoLoading(false)}
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
              {/* <Link className="w-fit h-fit" to="/register">
                  <IoMdArrowRoundBack className="text-[1.8rem]" />
                </Link> */}
              <div className="font-bold text-left text-[24px]">
                Verify Email
              </div>
            </div>
            <p className="text-[#64748B]  text-left text-[14px]">
              Verification mail has been sent to{" "}
              <span className="font-bold">{email}</span>
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
                <p className="text-[#5C5C5C] text-[16px]">
                  Didn't receive OTP?{" "}
                  <span
                    onClick={handleResend}
                    className="text-[#004AAD] font-semibold hover:cursor-pointer"
                  >
                    Resend OTP
                  </span>
                </p>
              ) : (
                <p className="text-[#5C5C5C] text-[16px]">
                  Didn't receive OTP?{" "}
                  <span className="font-semibold">
                    Resend in 00:{timer < 10 ? `0${timer}` : timer}
                  </span>
                </p>
              )}
            </div>
              <button className="bg-[#004AAD] w-full h-13 flex items-center justify-center text-[1rem] rounded-[8px] text-white font-semibold text-richblack-900 px-[12px] tracking-wider py-[1rem] mt-6">
                {loading ? (
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                ) : (
                  <span className="text-[1rem]">Verify</span>
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
