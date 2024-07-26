import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../main";

// icons
import { CiMail } from "react-icons/ci";

// assets
import logo from "../../assets/logo.png";

//components
import Loader from "../../component/outlet/Loader";

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/sendOTP`,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        sessionStorage.setItem("email", formData.email);
        toast.success("OTP Sent Successfully");
        setFormData({
          email: "",
        });
        navigate("/verify");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
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
      <div className="flex items-center justify-center lg:justify-end px-[1rem] md:px-[10rem] w-full h-[100vh] bg-main bg-no-repeat bg-cover bg-center">
        <img
          src={logo}
          className="absolute right-[70%] md:right-[75%] lg:right-[85%] bottom-[85%] w-[150px] h-auto"
        />
        <div className="w-[400px] h-fit flex flex-col px-[2rem] py-[1.5rem] bg-white relative gap-4 justify-center items-center rounded-xl">
          <form
            onSubmit={submitHandler}
            className="w-full flex flex-col gap-y-5"
          >
            <div className="w-full flex flex-col gap-3">
              {/* <Link className="w-fit h-fit" to="/login">
                <IoMdArrowRoundBack className="text-[1.8rem]" />
              </Link> */}
              <div className="font-bold text-left text-[24px]">
                Forgot Password?
              </div>
            </div>
            <p className="text-[#64748B] text-left text-[16px]">
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex w-full h-[3.5rem] border rounded-[0.5rem] pl-[12px] items-center gap-3">
                <CiMail className="text-[#64748B] size-[25px]" />
                <input
                  required
                  type="email"
                  placeholder="Registered mail id"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="w-full h-full text-[1rem] text-richblack-5 outline-none"
                />
              </div>
            </div>

            <button className="bg-[#004AAD] h-13 text-[1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
              {loading ? (
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              ) : (
                <span>Continue</span>
              )}
            </button>

            <div className="flex gap-2 mt-2 justify-center items-center">
              <Link to="/login">
                <span className="text-[#004AAD] text-[1rem] font-bold">
                  Back to Login
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
