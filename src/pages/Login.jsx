import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import { PiEyeSlashLight } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    setFormData({
      email: "",
      password: "",
    });
    setLoading(true);
    console.log(formData);
    console.log(rememberMe);
  }

  return (
    <div className="flex items-center justify-center lg:justify-end px-[1rem] md:px-[10rem] w-full h-[100vh] bg-main bg-no-repeat bg-cover bg-center">
      <div className="w-[450px]  h-fit flex flex-col px-[2rem] py-[2.5rem] bg-white relative gap-4 justify-center items-center rounded-xl">
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-y-5">
          <div className="font-bold text-left text-[28px]">
            Log In to your Dashboard
          </div>
          <p className="text-[#64748B] text-left text-[16px]">
            Welcome back! please enter your detail
          </p>

          <div className="flex flex-col gap-4 mt-2">
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
            <label className="text-[1rem] font-semibold text-center flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="size-[24px] mr-2"
              />
              Remember me
            </label>
            <div>
              <Link to="/forgot">
                <p className="text-[1rem] mt-1 text-[#004AAD] font-bold max-w-max ">
                  Forgot Password?
                </p>
              </Link>
            </div>
          </div>

          <button className="bg-[#004AAD] h-16 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
            {loading ? (
              <div
              className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            >
            </div>
            ) : (
                <span>Log In</span>
            )}
            
          </button>

          <div className="flex gap-2 mt-2 justify-center items-center">
            <p>Don't have an account?</p>
            <Link to="/register">
              <span className="text-[#004AAD] text-[1.1rem] font-bold">
                Create Now
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;