import { useState } from "react";

// components
import PlansComp from "../../component/PlansComp";

const MyPlans = () => {
  const [switchTab, setSwitchTab] = useState<string>("quarterly");

  return (
    <>
      <div className="w-full h-fit relative font-inter">
        <div className="w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%]">
          <div className="w-full px-6 py-4 bg-[#F1F7FF]">
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[1.3rem] font-[600]">Free Trial</h1>
                <p className="text-[1rem]">Current Plan</p>
              </div>
              <div className="w-fit h-fit">
                <button className="w-[8rem] flex flex-row justify-center items-center gap-2 bg-[#004AAD] text-white  py-1 text-lg font-[500] rounded-[0.5rem]">
                  Upgrade
                </button>
                <svg
                  className="relative -top-[3rem] -right-[7.1rem] w-7 h-6"
                  width="32"
                  height="34"
                  viewBox="0 0 32 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4.5"
                    y="4.5"
                    width="22.38"
                    height="24.54"
                    rx="11.19"
                    fill="white"
                  />
                  <rect
                    x="4.5"
                    y="4.5"
                    width="22.38"
                    height="24.54"
                    rx="11.19"
                    stroke="white"
                    strokeWidth="5"
                  />
                  <path
                    d="M18.6236 14.7973L24.3745 13.2897L21.785 22.8177L21.7842 22.8206L21.7671 22.82H21.75H9.16H9.15184L9.14369 22.8201L7.41392 13.2914L7.41399 13.2914L7.41201 13.2811L7.42563 13.2861L7.44075 13.291L12.7608 15.021L13.6558 15.312L14.0005 14.4362L15.7095 10.0944L17.4486 14.2186L17.7853 15.0171L18.6236 14.7973ZM20.38 1H11C8.34783 1 5.8043 2.05357 3.92893 3.92893C2.05357 5.8043 1 8.34783 1 11V22.54C1 25.1922 2.05357 27.7357 3.92893 29.6111C5.8043 31.4864 8.34783 32.54 11 32.54H20.38C23.0322 32.54 25.5757 31.4864 27.4511 29.6111C29.3264 27.7357 30.38 25.1922 30.38 22.54V11C30.38 8.34783 29.3264 5.8043 27.4511 3.92893C25.5757 2.05357 23.0322 1 20.38 1Z"
                    fill="black"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
            <div className="bg-white rounded-xl flex flex-row flex-wrap justify-between w-full h-fit p-[1rem]">
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">
                  Subscription Period
                </p>
                <h1 className="text-base font-semibold">15 Days</h1>
              </div>
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">
                  Starting Date
                </p>
                <h1 className="text-base font-semibold">01-03-2023</h1>
              </div>
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">
                  Next Billing Date
                </p>
                <h1 className="text-base font-semibold">15-03-2023</h1>
              </div>
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">
                  Payment status
                </p>
                <h1 className="text-base font-semibold">Pending</h1>
              </div>
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">
                  Status
                </p>
                <h1 className="text-base font-semibold">
                  <span>Trial Period</span> (15 Days)
                </h1>
              </div>
            </div>
          </div>
          <div className="px-[1rem] md:px-[5rem] w-full flex flex-row flex-wrap">
            <div className="w-full flex flex-row justify-center items-center -mt-2">
              <div className="w-fit h-fit flex flex-row rounded-[2.5rem] border border-1 border-[#000000CC]">
                <button
                  className={`w-fit px-[1.5rem] py-2 font-[500] rounded-[2.5rem] transition-colors duration-500 ${
                    switchTab === "quarterly"
                      ? "bg-[#004AAD] text-white"
                      : "bg-white text-black"
                  } text-[1.25rem]`}
                  onClick={() => setSwitchTab("quarterly")}
                >
                  Quarterly
                </button>
                <button
                  className={`w-fit px-[1.5rem] font-[500] rounded-[2.5rem] transition-colors duration-500 ${
                    switchTab === "annual"
                      ? "bg-[#004AAD] text-white"
                      : "bg-white text-black"
                  } text-[1.25rem]`}
                  onClick={() => setSwitchTab("annual")}
                >
                  Annually (save 44%)
                </button>
              </div>
            </div>
          </div>
          <PlansComp switch={switchTab} />
        </div>
      </div>
    </>
  );
};

export default MyPlans;
