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
        <div className=" w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%] mt-2 ">
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
            <div className="bg-white rounded-xl flex flex-row flex-wrap gap-x-[8rem] gap-y-[3rem] w-fit h-fit p-[3rem]">
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Bussiness Type
                </p>
                <h1 className="text-[28px] font-semibold">854</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Bussiness Landmark
                </p>
                <h1 className="text-[28px] font-semibold">85</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Business City
                </p>
                <h1 className="text-[28px] font-semibold">52</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">State</p>
                <h1 className="text-[28px] font-semibold">5</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">Pincode</p>
                <h1 className="text-[28px] font-semibold">5412</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Social Handels
                </p>
                <h1 className="text-[28px] font-semibold">Head</h1>
              </div>
              <div className="flex flex-col grow">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Feedback Channels
                </p>
                <h1 className="text-[28px] font-semibold">Head</h1>
              </div>
              <div className="flex flex-col grow">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Manager Name
                </p>
                <h1 className="text-[28px] font-semibold">5412</h1>
              </div>
              <div className="flex flex-col grow">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Manager Contact
                </p>
                <h1 className="text-[28px] font-semibold">5412</h1>
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

export default Billing;
