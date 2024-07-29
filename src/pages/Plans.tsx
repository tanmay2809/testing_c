import { useState } from "react";

// assets
import logo from "../assets/logo2.png";
import PlansComp from "../component/PlansComp";

const Plans = () => {
  const [switchTab, setSwitchTab] = useState<string>("quarterly");

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col items-center">
        <div className="w-full h-fit py-[1rem] px-[1rem] md:px-[5rem] flex flex-row justify-start">
          <img src={logo} className="w-[130px] h-auto" />
        </div>
        <div className="px-[3rem] lg:px-[5rem] w-full mt-5 flex flex-row flex-wrap">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-col">
              {/* <Link className="w-fit h-fit" to="/login">
                <IoMdArrowRoundBack className="text-[1.8rem]" />
              </Link> */}

              <h1 className="text-[28px] mt-2 font-bold">Select Plan</h1>
              <p className="text-[1rem] mt-2 font-bold text-[#64748B]">
                Plans that are carefully crafted to suit your business.
              </p>
            </div>
            <div className="px-[1rem] lg:px-[5rem] w-full flex flex-row flex-wrap">
              <div className="w-full flex flex-row justify-center items-center">
                <div className="w-fit h-fit flex flex-row rounded-[40px] border border-1 border-[#000000CC]">
                  <button
                    className={`w-fit px-[1.5rem] py-2 font-[500] rounded-[40px] transition-colors duration-500 ${
                      switchTab === "quarterly"
                        ? "bg-[#004AAD] text-white"
                        : "bg-white text-black"
                    } text-[20px]`}
                    onClick={() => setSwitchTab("quarterly")}
                  >
                    Quarterly
                  </button>
                  <button
                    className={`w-fit px-[1.5rem] font-[500] rounded-[40px] transition-colors duration-500 ${
                      switchTab === "annual"
                        ? "bg-[#004AAD] text-white"
                        : "bg-white text-black"
                    } text-[20px]`}
                    onClick={() => setSwitchTab("annual")}
                  >
                    Annually (save 44%)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <PlansComp switch={switchTab} />
        </div>
      </div>
    </>
  );
};

export default Plans;
