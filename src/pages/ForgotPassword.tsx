import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// icons
import { CiMail } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";

// assets
import bgVideo from "../assets/bg-video.mp4";

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState<FormData>({
    email: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    setFormData({
      email: ""
    });
    setLoading(true);
    console.log("Printing the formData ");
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
      <div className="flex items-center justify-center lg:justify-end px-[1rem] md:px-[10rem] w-full h-[100vh] bg-main bg-no-repeat bg-cover bg-center">
        <div className="w-[450px] h-fit flex flex-col px-[2rem] py-[2.5rem] bg-white relative gap-4 justify-center items-center rounded-xl">
          <form onSubmit={submitHandler} className="w-full flex flex-col gap-y-5">
            <div className="w-full flex flex-col gap-3">
              <Link className="w-fit h-fit" to="/login">
                <IoMdArrowRoundBack className="text-[1.8rem]" />
              </Link>
              <div className="font-bold text-left text-[28px]">
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

            <button className="bg-[#004AAD] h-16 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
              {loading ? (
                <div className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              ) : (
                <span>Continue</span>
              )}
            </button>

            <div className="flex gap-2 mt-2 justify-center items-center">
              <Link to="/login">
                <span className="text-[#004AAD] text-[1.1rem] font-bold">
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