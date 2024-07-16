import { useState } from "react";

// icons
import { LuAsterisk } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";

const Billing = () => {
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
      <div className="w-full h-fit relative">
        <div className="w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%]">
          <div className="w-full flex flex-col gap-4 rounded-xl px-8 py-4 h-fit bg-[#F1F7FF]">
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col">
                  <h1 className="text-[1.25rem] font-semibold">
                    Billing Details
                  </h1>
                  <p className="text-[1.1rem] font-[400] text-[#616161]">
                    Your billing will be under this information
                  </p>
                </div>
              </div>
              <div className="w-fit flex flex-col justify-center">
                <button
                  className="w-fit h-fit flex flex-row justify-center items-center gap-2 text-black text-[1.2rem] font-[500] rounded-[0.5rem]"
                  onClick={() => toggleModel()}
                >
                  <BiEditAlt className="" />
                  Edit Details
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl flex flex-row flex-wrap gap-x-[0.75rem] gap-y-[1.37rem] w-fit h-fit p-[1.25rem]">
              <div className="w-[15rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  Company Name
                </p>
                <h1 className="text-lg font-semibold">
                  Foodoos Private Limited
                </h1>
              </div>
              <div className="w-[12.5rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  Country
                </p>
                <h1 className="text-lg font-semibold">India</h1>
              </div>
              <div className="w-[12.5rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  State
                </p>
                <h1 className="text-lg font-semibold">West Bengal</h1>
              </div>
              <div className="w-[12.5rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  City
                </p>
                <h1 className="text-lg font-semibold">Kolkata</h1>
              </div>
              <div className="w-[9.375rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  Pincode
                </p>
                <h1 className="text-lg font-semibold">5412</h1>
              </div>
              <div className="w-[15rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  GST number
                </p>
                <h1 className="text-lg font-semibold">897564876778896</h1>
              </div>
              <div className="w-[16.875rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  Address
                </p>
                <h1 className="text-lg font-semibold">
                  AG Block,Salt Lake sector 2 Kolkata-700091
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Model */}
        {model && (
          <div
            id="default-modal"
            aria-hidden="true"
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-2`}
          >
            <div
              className={`bg-white w-[31.25rem] shadow-lg rounded-lg overflow-y-auto ${
                isClosing ? "slide-out-right" : "slide-in-right"
              }`}
            >
              <div className="w-full relative px-6 py-4 bg-white rounded-lg shadow h-full">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-[1.5rem] font-bold">
                      Edit Billing Details
                    </h1>
                    <p className="text-[1rem] font-medium">
                      Edit your billing details at convenience
                    </p>
                  </div>
                  <IoMdCloseCircle
                    onClick={() => {
                      handleCloseModal();
                    }}
                    className="text-[2.5rem] hover:cursor-pointer"
                  />
                </div>
                <div className="flex flex-col mt-2 h-[88%] justify-evenly">
                  <form className="flex flex-col gap-2 justify-center">
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                        Company Name
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                        Address
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                        GST Number
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="flex justify-between mt-1 items-center">
                      <label className="text-sm font-semibold text-center flex items-center">
                        <input
                          type="checkbox"
                          className="size-[1.25rem] mr-2"
                        />
                        I am not registered with GST
                      </label>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="country"
                        className="flex flex-row items-center text-[0.875rem] font-[500]"
                      >
                        Country
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <select
                        className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem]"
                        id="country"
                        name="country"
                      >
                        <option value="">Select Country</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="country"
                        className="flex flex-row items-center text-[0.875rem] font-[500]"
                      >
                        State
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <select
                        className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem]"
                        id="state"
                        name="state"
                      >
                        <option value="">Select State</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                  </form>
                  <div className="flex flex-row gap-5 mt-6">
                    <button
                      className="w-[50%] text-[1.1rem] rounded-[0.5rem] border-2 font-bold text-richblack-900 px-[12px] py-2"
                      onClick={() => handleCloseModal()}
                    >
                      Cancel
                    </button>
                    <button className="w-[50%] bg-[#004AAD] text-[1.1rem] rounded-[0.5rem] text-white font-bold text-richblack-900 px-[12px] py-2">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Billing;
