import { useState } from "react";

//icons
// import { FaPlus } from "react-icons/fa6";
import { Outlet, Link, useLocation } from "react-router-dom";

//other components
import CampaignPricing from "../../component/Marketing/CampaignPricing";

//svg
// import doubleArrow from "/doubleArrow.svg";

const Marketing = () => {
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
  const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };

  return (
    <>
      <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
        {/* Main Content Area */}
        <div
          onClick={handlefram}
          className="bg-white lg:w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 lg:ml-[7%]"
        >
          <div className="w-full flex flex-row justify-between mt-[70px]">
            <div className="flex flex-col">
              <h1 className="text-[1.75rem] font-semibold">Marketing</h1>
              <p className="text-lg">
                Create and manage your marketing seemlessly
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Buttons Container */}
        <div className="sticky top-[70px] pt-[10px] bg-white z-10 border-b border-b-[#000000CC]">
          <div className="w-[91%] flex ml-[9%] flex-row justify-start">
            <Link
              className="w-[9.4rem] flex flex-col  gap-2 text-[1.3125rem] font-[500]"
              to="/marketing"
              onClick={handleScrollToTop}
            >
              Integrations
              <span
                className={`${
                  location.pathname === "/marketing" ? "bg-[#004AAD]" : "hidden"
                } h-1 w-[80%] rounded-t-[0.375rem]`}
              ></span>
            </Link>
            <Link
              className="w-[13.75rem] flex flex-col  gap-2 text-[1.3125rem] font-[500]"
              to="/marketing/manage"
              onClick={handleScrollToTop}
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
            {/* <Link
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            to="/setting/invoice"
          >
            Invoice
            <span
              className={`${
                location.pathname === "/setting/invoice"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </Link> */}
          </div>
        </div>

        <Outlet />
        <CampaignPricing isVisible={isPricingVisible} onClose={togglePricing} />
      </div>
    </>
  );
};

export default Marketing;
