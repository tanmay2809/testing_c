import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// icons
import { MdLockOutline } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

// assets
import bgVideo from "../../assets/bg-video.mp4";
import logo from "../../assets/logo.png";

interface FormData {
    password: string;
    confirmPassword: string;
}

const NewPassword = () => {
    const [formData, setFormData] = useState<FormData>({
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const [isMinLength, setIsMinLength] = useState<boolean>(false);
    const [hasUpperCase, setHasUpperCase] = useState<boolean>(false);
    const [hasNumber, setHasNumber] = useState<boolean>(false);
    const [hasSymbol, setHasSymbol] = useState<boolean>(false);

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        validatePassword(value);
    }

    function validatePassword(password: string) {
        setIsMinLength(password.length >= 6);
        setHasUpperCase(/[A-Z]/.test(password));
        setHasNumber(/\d/.test(password));
        setHasSymbol(/[!@#$%^&*]/.test(password));
    }
    
    function submitHandler(event: FormEvent) {
        event.preventDefault();

        if (!isMinLength || !hasUpperCase || !hasNumber || !hasSymbol) {
            return;
        }
        
        setFormData({
            password: "",
            confirmPassword: ""
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
          <img
            src={logo}
            className="absolute right-[70%] md:right-[75%] lg:right-[85%] bottom-[85%] w-[150px] h-auto"
          />
          <div className="w-[430px] h-fit flex flex-col px-[2rem] py-[1.5rem] bg-white relative gap-4 justify-center items-center rounded-xl">
            <form
              onSubmit={submitHandler}
              className="w-full flex flex-col gap-y-3.5"
            >
              <div className="w-full flex flex-col gap-3">
                {/* <Link className="w-fit h-fit" to="/register">
                  <IoMdArrowRoundBack className="text-[1.8rem]" />
                </Link> */}
                <div className="font-bold text-left text-[30px]">
                  Create New Password
                </div>
              </div>
              <p className="text-[#64748B] text-left text-[14px]">
                Create a unique password
              </p>

              <div className="flex flex-col gap-2 mt-2">
                <label className="font-[500]">Enter Password</label>
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

              <div className="flex flex-col gap-2 mt-2">
                <label className="font-[500]">Re-Enter Password</label>
                <div className="flex w-full h-[3.5rem] border rounded-[0.5rem] pl-[12px] items-center gap-3 relative">
                  <MdLockOutline className="text-[#64748B] size-[25px]" />
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="ConfirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    className="w-full h-full text-[1rem] text-richblack-5 outline-none"
                  />
                  <span
                    className="absolute right-5 cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <PiEyeLight fontSize={24} />
                    ) : (
                      <PiEyeSlashLight fontSize={24} />
                    )}
                  </span>
                </div>
              </div>

              {formData.password.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p
                    className={`text-sm flex flex-row items-center gap-1 ${
                      isMinLength ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isMinLength ? <FaCheck /> : <RxCross2 />}
                    Minimum 6 characters
                  </p>
                  <p
                    className={`text-sm flex flex-row items-center gap-1 ${
                      hasUpperCase ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {hasUpperCase ? <FaCheck /> : <RxCross2 />}
                    At least 1 capital letter
                  </p>
                  <p
                    className={`text-sm flex flex-row items-center gap-1 ${
                      hasNumber ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {hasNumber ? <FaCheck /> : <RxCross2 />}
                    At least 1 number
                  </p>
                  <p
                    className={`text-sm flex flex-row items-center gap-1 ${
                      hasSymbol ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {hasSymbol ? <FaCheck /> : <RxCross2 />}
                    At least 1 symbol
                  </p>
                </div>
              )}

              {formData.confirmPassword.length > 0 &&
                formData.confirmPassword !== formData.password && (
                  <p
                    className={`text-sm flex flex-row items-center gap-1 text-red-500`}
                  >
                    <RxCross2 />
                    Password does not match
                  </p>
                )}
            <Link to="/plans">
              <button className="bg-[#004AAD] w-full tracking-wider h-14 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-4">
                {loading ? (
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                ) : (
                  <span>Continue</span>
                )}
              </button>
              </Link>
            </form>
          </div>
        </div>
      </>
    );
};

export default NewPassword;