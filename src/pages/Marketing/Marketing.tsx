import { useState } from "react";

//icons
import { FaPlus } from "react-icons/fa6";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

//other components
import CampaignPricing from "../../component/Marketing/CampaignPricing";


const Marketing = () => {
  const navigate=useNavigate();
  const location = useLocation();
  console.log("Customer Component Rendered");
  console.log("Current Location:", location.pathname);
  const [isPricingVisible, setIsPricingVisible] = useState<boolean>(false);

  const togglePricing = () => {
    setIsPricingVisible(!isPricingVisible);
  };
  return (
    <div className="w-full h-fit relative">
      <div className="w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%] ">
        <div className="w-full flex flex-row justify-between mt-[70px]">
          <div className="flex flex-col">
            <h1 className="text-[1.75rem] font-semibold">Marketing</h1>
            <p className="text-lg">
              Create and manage your marketing seemlessly
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              className="w-[9rem] flex flex-row items-center justify-evenly gap-2 px-4 py-2 border-2 text-base font-[500] rounded-md"
              onClick={togglePricing}
            >
              Pricing
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66602 2L8.53394 9L1.66602 16"
                  stroke="#64748B"
                  strokeWidth="3"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.79883 2L15.6668 9L8.79883 16"
                  stroke="#64748B"
                  strokeWidth="3"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button onClick={()=>navigate("/createcampaign")} className="w-[10.5rem] flex justify-center items-center gap-1 bg-[white] text-[#004AAD] px-2 py-2 text-base font-[500] rounded-md border border-[#E2E8F0]">
              <FaPlus className="text-base" />
              Create Campaign
            </button>
          </div>
        </div>

        {/* Buttons Container */}
        <div className="w-[100%] flex flex-row justify-start border-b border-b-[#000000CC] -mt-3">
          <Link
            className="w-[13.75rem] flex flex-col items-center gap-2 text-[1.325rem] font-[500]"
            to="/marketing"
          >
            Campaign Library
            <span
              className={`${
                location.pathname === "/marketing"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[0.375rem]`}
            ></span>
          </Link>
          <Link
            className="w-[13.75rem] flex flex-col items-center gap-2 text-[1.325rem] font-[500]"
            to="/marketing/manage"
          >
            Manage Campaigns
            <span
              className={`${
                location.pathname === "/marketing/manage"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[0.375rem]`}
            ></span>
          </Link>
          <Link
            className="w-[13.75rem] flex flex-col items-center gap-2 text-[1.325rem] font-[500]"
            to="/marketing/whatsappsetting"
          >
            WhatsApp Settings
            <span
              className={`${
                location.pathname === "/marketing/whatsappsetting"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[0.375rem]`}
            ></span>
          </Link>
        </div>
      </div>
      <Outlet />
      <CampaignPricing isVisible={isPricingVisible} onClose={togglePricing} />
    </div>
  );
};

export default Marketing;
