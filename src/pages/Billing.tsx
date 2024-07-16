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
      <div className="w-full h-fit relative ">
        <div className=" w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%]  ">
          <div className="w-full flex flex-col gap-4 rounded-xl px-8 py-4 h-fit bg-[#F1F7FF]">
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col">
                  <h1 className="text-[24px] font-semibold">Billing Details</h1>
                  <p className="text-[18x] font-[400] text-[#616161]">
                    Your billing will be under this information
                  </p>
                </div>
              </div>
              <div className="w-fit flex flex-col justify-center">
                <button
                  className="w-fit h-fit flex flex-row justify-center items-center gap-2 text-black text-[21px] font-[500] rounded-[8px]"
                  onClick={() => toggleModel()}
                >
                  <BiEditAlt className="" />
                  Edit Details
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl flex flex-row flex-wrap gap-x-[1.2rem] gap-y-[2.2rem] w-fit h-fit p-[1.5rem]">
              <div className="w-[240px] flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Company Name
                </p>
                <h1 className=" text-xl font-semibold">
                  Foodoos Private Limited
                </h1>
              </div>
              <div className="w-[200px] flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">Country</p>
                <h1 className=" text-xl font-semibold">India</h1>
              </div>
              <div className="w-[200px] flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">State</p>
                <h1 className=" text-xl font-semibold">West Bengal</h1>
              </div>
              <div className="w-[200px] flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">City</p>
                <h1 className="text-xl font-semibold">Kolkata</h1>
              </div>
              <div className="w-[150px] flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">Pincode</p>
                <h1 className=" text-xl font-semibold">5412</h1>
              </div>
              <div className="w-[240px] flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  GST number
                </p>
                <h1 className=" text-xl font-semibold">897564876778896</h1>
              </div>
              <div className="w-[270px] flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">Address</p>
                <h1 className=" text-xl font-semibold">
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
            // tabIndex="-1"
            aria-hidden="true"
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end  z-50 p-2`}
          >
            <div
              className={`bg-white w-[500px] shadow-lg rounded-lg  overflow-y-auto ${
                isClosing ? "slide-out-right" : "slide-in-right"
              }`}
            >
              <div className="w-full relative px-6 py-4 bg-white rounded-lg shadow h-full ">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-[24px] font-bold">
                      Edit Billing Details
                    </h1>
                    <p className="text-[16px] font-medium">
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
                        className="w-full p-2 border-2 border-[#00000033] rounded-[8px] text-[18px]"
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
                        className="w-full p-2 border-2 border-[#00000033] rounded-[8px] text-[18px]"
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
                        className="w-full p-2 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="flex justify-between mt-1 items-center ">
                      <label className="text-sm font-semibold text-center flex items-center">
                        <input
                          type="checkbox"
                          //   checked={rememberMe}
                          //   onChange={() => setRememberMe(!rememberMe)}
                          className="size-[20px] mr-2"
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
                        className="w-full p-2 border-2 border-[#00000033] rounded-[8px]"
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
                        className="w-full p-2 border-2 border-[#00000033] rounded-[8px]"
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
                    <div className="flex flex-row gap-5 mt-4">
                      <button
                        className="w-[50%]  text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-2"
                        onClick={() => handleCloseModal()}
                      >
                        Cancel
                      </button>
                      <button className="w-[50%] bg-[#004AAD]  text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-2">
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

export default Billing;
