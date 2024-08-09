import { useState } from "react";

//icons
// import { FaPlus } from "react-icons/fa6";
import { Outlet, Link, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

//other components
import CampaignPricing from "../../component/Marketing/CampaignPricing";

//svg
import doubleArrow from "/doubleArrow.svg";

const WhatsAppManager = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  console.log("Customer Component Rendered");
  console.log("Current Location:", location.pathname);
  const [isPricingVisible, setIsPricingVisible] = useState<boolean>(false);

  const togglePricing = () => {
    setIsPricingVisible(!isPricingVisible);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling animation
    });
  };

  // navbar fram
  // const handlefram = () => {
  //   document.getElementById("frame")!.style.display = "none";
  // };

  return (
    <div className="w-full h-fit bg-[#F1F7FF]">
      <div
        // onClick={handlefram}
        className="lg:w-[93%]  h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 lg:ml-[7%] "
      >
        <div className="w-full flex flex-row justify-between mt-[70px]">
          <div className="flex flex-col">
            <h1 className="text-[1.75rem] font-semibold">WhatsApp Manager</h1>
            <p className="text-lg">
              Use whatsApp business tailored for eateries
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              className="w-[9rem] flex flex-row items-center justify-evenly gap-2 px-4 py-2 border-2 text-base font-[500] rounded-md bg-white"
              onClick={togglePricing}
            >
              Pricing
              <img src={doubleArrow} />
            </button>
          </div>
        </div>
      </div>
      {/* Buttons Container */}
      <div className="w-[92%] lg:w-[89%] ml-[4%] lg:ml-[9%] mb-[10px] sticky top-[70px] z-10 flex items-center justify-between  bg-white p-2 rounded-lg">
        <div className="w-full flex justify-start gap-4 text-[#7C7C7C]">
          <Link
            className={`${
              location.pathname === "/manager"
                ? "bg-[#EDF5FF] text-[#004AAD] border-none"
                : ""
            } font-[500] border border-[#D1D1D1] rounded-lg px-4 py-[0.4rem]`}
            to="/manager"
            onClick={handleScrollToTop}
          >
            Templates
          </Link>
          <Link
            className={`${
              location.pathname === "/manager/header"
                ? "bg-[#EDF5FF] text-[#004AAD] border-none"
                : ""
            } font-[500] border border-[#D1D1D1] rounded-lg px-4 py-[0.4rem]`}
            to="/manager/header"
            onClick={handleScrollToTop}
          >
            WhatsApp Header
          </Link>
        </div>
        {/* <button
            onClick={() => {
              navigate("/createcampaign");
              handleScrollToTop();
            }}
            className="w-[10.5rem] flex justify-center items-center gap-1 bg-[white] text-[#004AAD] px-2 py-[0.3rem] text-base font-[500] rounded-md border border-[#E2E8F0]"
          >
            <FaPlus className="text-base" />
            Create Campaign
          </button> */}
      </div>

      <Outlet />
      <CampaignPricing isVisible={isPricingVisible} onClose={togglePricing} />
    </div>
  );
};

export default WhatsAppManager;
