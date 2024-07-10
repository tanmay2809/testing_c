import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";

// assets
import whatsapp from "../assets/whatsapp.png";

const Setting = () => {
  const location = useLocation();

  return (
    <div className="w-full h-fit relative  ">
      <Navbar />
      <div className=" w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%] mt-2 ">
        <div className="w-full flex flex-row justify-between mt-[70px]">
          <div className="flex flex-col">
            <h1 className="text-[28px] font-semibold">Settings</h1>
            <p className="text-[18px]">Manage your account settings here</p>
          </div>
          <div className="">
            <button className="w-[180px] flex flex-row items-center gap-2 px-4 py-2 border-2 text-[21px] font-[500] rounded-[8px]">
              <img className="w-7 h-7" src={whatsapp} />
              Contact Us
            </button>
          </div>
        </div>

        {/* Buttons Container */}
        <div className="w-[100%] flex flex-row justify-start border-b border-b-[#000000CC]">
          <Link
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            to="/settings/store"
          >
            Store Details
            <span
              className={`${
                location.pathname === "/settings/store"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </Link>
          <Link
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            to="/settings/myplans"
          >
            My Plan
            <span
              className={`${
                location.pathname === "/settings/myplans"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </Link>
          <Link
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            to="/settings/billing"
          >
            Billing Details
            <span
              className={`${
                location.pathname === "/settings/billing"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </Link>
          <Link
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            to="/settings/invoice"
          >
            Invoice
            <span
              className={`${
                location.pathname === "/settings/invoice"
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

export default Setting;
