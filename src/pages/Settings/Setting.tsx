import { Link, Outlet, useLocation } from "react-router-dom";

// assets
import whatsapp from "../../assets/whatsapp.png";

const Setting = () => {
  const location = useLocation();

  // navbar frame
  const handleFrame = () => {
    document.getElementById("frame")!.style.display = "none";
  };

  return (
    <div
      onClick={handleFrame}
      className="w-full h-fit relative md:mb-[80px] lg:mb-0"
    >
      {/* Main Content Area */}
      <div className="bg-white lg:w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 lg:ml-[7%]">
        <div className="w-full flex flex-row justify-between mt-[70px]">
          <div className="flex flex-col">
            <h1 className="text-[28px] font-semibold">Settings</h1>
            <p className="text-[18px]">Manage your account settings here</p>
          </div>
          <div>
            <Link to="https://wa.me/917044292143?text=Hi%20">
              <button className="w-[160px] flex flex-row items-center gap-2 px-4 py-2 border-2 text-[18px] font-[500] rounded-[8px]">
                <img className="w-6 h-6" src={whatsapp} alt="WhatsApp" />
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Buttons Container */}
      <div className="sticky top-[70px] pt-[10px] bg-white z-10 border-b border-b-[#000000CC]">
        <div className="w-[91%] flex ml-[9%] flex-row justify-start">
          <Link
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            to="/setting/store"
          >
            Store Details
            <span
              className={`${
                location.pathname === "/setting/store" ||
                location.pathname === "/setting"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </Link>
          <Link
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            to="/setting/myplans"
          >
            My Plan
            <span
              className={`${
                location.pathname === "/setting/myplans"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </Link>
          <Link
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            to="/setting/billing"
          >
            Billing Details
            <span
              className={`${
                location.pathname === "/setting/billing"
                  ? "bg-[#004AAD]"
                  : "hidden"
              } h-1 w-[80%] rounded-t-[6px]`}
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
    </div>
  );
};

export default Setting;
