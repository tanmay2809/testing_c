import React from "react";

import { Outlet, Link, useLocation } from "react-router-dom";

const Customer: React.FC = () => {
  const location = useLocation();
  console.log("Customer Component Rendered");
  console.log("Current Location:", location.pathname);

  // navbar fram
  const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };

  return (
    <div
      // onClick={handleFrame}
      className="w-full h-fit relative md:mb-[80px] lg:mb-0"
    >
      {/* Main Content Area */}
      <div className="bg-white lg:w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 lg:ml-[7%]">
        <div
          onClick={handlefram}
          className="w-full flex flex-row justify-between mt-[70px]"
        >
          <div className="flex flex-col ">
            <h1 className="text-[28px] font-semibold">Customers</h1>
            <p className="text-[18px]">
              All your customer behaviour data and activity, easily accessible
              in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Buttons Container */}
      <div className="sticky top-[70px] pt-[10px] bg-white z-10 border-b border-b-[#000000CC]">
        <div className="w-[91%] flex ml-[9%] flex-row justify-start">
          <Link
            className="w-[120px] flex flex-col   gap-2 text-[21px] font-[500]"
            to="/customer"
          >
            Overview
            <span
              className={`${location.pathname === "/customer/overview" ||
                  location.pathname === "/customer"
                  ? "bg-[#004AAD]"
                  : "hidden"
                } h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </Link>
          <Link
            className="w-[150px] flex flex-col items-center  gap-2 text-[21px] font-[500]"
            to="/customer/analytics"
          >
            Analytics
            <span
              className={`${location.pathname === "/customer/analytics"
                  ? "bg-[#004AAD]"
                  : "hidden"
                } h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </Link>
          <Link
            className="w-[170px] flex flex-col  gap-2 text-[21px] font-[500]"
            to="/customer/customerList"
          >
            Customer List
            <span
              className={`${location.pathname === "/customer/customerList"
                  ? "bg-[#004AAD]"
                  : "hidden"
                } h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Customer;
