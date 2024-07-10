import { useState } from "react";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";

// icons
import { LuAsterisk } from "react-icons/lu";
import { IoMdCloseCircle } from "react-icons/io";
import { FaAnglesRight } from "react-icons/fa6";

// constants
import { Invoices } from "../constants";

const Invoice = () => {
  const [model, setModel] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const toggleModel = () => {
    setModel(!model);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      toggleModel();
    }, 500);
  };

  return (
    <>
      <div className="w-full h-fit relative ">
        <Navbar />
        <div className=" w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%] mt-2 ">
          <div className="w-full flex flex-row justify-between mt-[70px]">
            <div className="flex flex-col">
              <h1 className="text-[28px] font-semibold">Settings</h1>
              <p className="text-[18px]">Manage your account settings here</p>
            </div>
            <div className="">
              <button className="w-[180px] px-4 py-2 border-2 text-[21px] font-[500] rounded-[8px]">
                Contact Us
              </button>
            </div>
          </div>

          {/* Buttons container */}
          <div className="w-[100%] flex flex-row justify-start border-b border-b-[#000000CC]">
            <Link
              className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
              to="/settings"
            >
              Store Details
              <span
                className={`hidden bg-[#004AAD] h-1 w-[80%] rounded-t-[6px]`}
              ></span>
            </Link>
            <Link
              className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
              to="/settings/myplans"
            >
              My Plan
              <span
                className={`hidden bg-[#004AAD] h-1 w-[80%] rounded-t-[6px]`}
              ></span>
            </Link>
            <Link
              className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
              to="/settings/billing"
            >
              Billing Details
              <span
                className={`hidden bg-[#004AAD] h-1 w-[80%] rounded-t-[6px]`}
              ></span>
            </Link>
            <Link
              className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
              to="/settings/invoice"
            >
              Invoice
              <span
                className={`bg-[#004AAD] h-1 w-[80%] rounded-t-[6px]`}
              ></span>
            </Link>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col">
              <h1 className="text-[24px] text-[#4D4D4D] font-[500]">
                My Invoices
              </h1>
              <p className="text-[16x]">
                You have
                <span className="text-[#004AAD] font-bold">
                  {" "}
                  {Invoices.length} invoice
                </span>
              </p>
            </div>
            <div className="flex flex-col">
              {Invoices.map((invoice) => (
                <div className="p-5 flex flex-row justify-between border-2 rounded-xl">
                  <div className="flex flex-col">
                    <p className="text-[14px] text-[#616161] font-[700]">
                      Invoice Number
                    </p>
                    <p className="text-[18px] text-[#616161] font-[400]">
                      {invoice.number}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[14px] text-[#616161] font-[700]">
                      Company invoice name
                    </p>
                    <p className="text-[18px] text-[#616161] font-[400]">
                      {invoice.name}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[14px] text-[#616161] font-[700]">
                      Invoice Date
                    </p>
                    <p className="text-[18px] text-[#616161] font-[400]">
                      {invoice.date}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[14px] text-[#616161] font-[700]">
                      Invoice Amount
                    </p>
                    <p className="text-[18px] text-[#616161] font-[400]">
                      ₹{invoice.amount}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[14px] text-[#616161] font-[700]">
                      GST Charges
                    </p>
                    <p className="text-[18px] text-[#616161] font-[400]">
                      ₹{invoice.charges}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[14px] text-[#616161] font-[700]">
                      Payment Mode
                    </p>
                    <p className="text-[18px] text-[#616161] font-[400]">
                      {invoice.mode}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[14px] text-[#616161] font-[700]">
                      Billing period
                    </p>
                    <p className="text-[18px] text-[#616161] font-[400]">
                      {invoice.period}
                    </p>
                  </div>
                  <button
                    className="flex flex-row items-center gap-2 text-[18px] font-[700]"
                    onClick={() => toggleModel()}
                  >
                    View Details{" "}
                    <FaAnglesRight className="text-[#64748B] text-xl" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model */}
        {model && (
          <div
            id="default-modal"
            // tabIndex="-1"
            aria-hidden="true"
            className={`fixed inset-0 z-50 flex items-center justify-end w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50`}
          >
            <div
              className={`relative p-4 w-full sm:w-fit h-fit ${
                isClosing ? "slide-out-right" : "slide-in-right"
              }`}
            >
              <div className="w-full relative px-8 py-5 bg-white rounded-lg shadow">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-[28px] font-bold">
                      Edit Billing Details
                    </h1>
                    <p className="text-[18px] font-bold">
                      Edit your billing details at convinience
                    </p>
                  </div>
                  <IoMdCloseCircle
                    onClick={() => {
                      handleCloseModal();
                    }}
                    className="text-4xl hover:cursor-pointer"
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <form className="flex flex-col gap-2 justify-center">
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center text-[14px] font-[500]">
                        Company Name
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center text-[14px] font-[500]">
                        Address
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center text-[14px] font-[500]">
                        GST Number
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="flex justify-between mt-1 items-center justify-center">
                      <label className="text-[1rem] font-semibold text-center flex items-center">
                        <input
                          type="checkbox"
                          //   checked={rememberMe}
                          //   onChange={() => setRememberMe(!rememberMe)}
                          className="size-[24px] mr-2"
                        />
                        I am not registered with GST
                      </label>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="country"
                        className="flex flex-row items-center text-[14px] font-[500]"
                      >
                        Country
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <select
                        className="w-full p-4 border-2 border-[#00000033] rounded-[8px]"
                        id="country"
                        name="country"
                        // value="dw"
                        // onChange={handleInputChange}
                      >
                        <option value="">Select Country</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="country"
                        className="flex flex-row items-center text-[14px] font-[500]"
                      >
                        State
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <select
                        className="w-full p-4 border-2 border-[#00000033] rounded-[8px]"
                        id="state"
                        name="state"
                        // value="dw"
                        // onChange={handleInputChange}
                      >
                        <option value="">Select State</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                    <div className="flex flex-row gap-5">
                      <button
                        className="w-[50%] h-14 text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-[1rem]"
                        onClick={() => handleCloseModal()}
                      >
                        Cancel
                      </button>
                      <button className="w-[50%] bg-[#004AAD] h-14 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem]">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Invoice;
