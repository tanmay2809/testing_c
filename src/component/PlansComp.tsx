import { useEffect, useState } from "react";

// icons
import { GrFormCheckmark } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { MdVerified } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

// assets
import { PlansData, PlansTable } from "../constants";

interface PlansProps {
  switch: string;
}

const PlansComp: React.FC<PlansProps> = ({ switch: initialSwitchTab }) => {
  const [switchTab, setSwitchTab] = useState<string>(initialSwitchTab);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setSwitchTab(initialSwitchTab);
  }, [initialSwitchTab]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex w-full items-center justify-center px-[1rem] gap-x-[1.2rem] -mt-3 ">
        {switchTab === "quarterly" &&
          PlansData.quarterly.map((plan) => (
            <div className="group w-[18.75rem] sm:w-[26.875rem] flex flex-col gap-3 shadow-2xl border rounded-3xl p-[1.5rem] hover:bg-[#004AAD] hover:text-white transition-all">
              <h1 className="text-[1.625rem] text-[#1B223C] font-semibold flex flex-row items-center gap-2 group-hover:text-white">
                {plan.name}
                {plan.name === "Starter Plan" && (
                  <span className="w-fit h-fit text-[0.9375rem] rounded-[0.5rem] border border-[#004AAD] px-4 py-2 bg-[#FFDD66] ml-5 group-hover:text-black">
                    Recommended
                  </span>
                )}
              </h1>
              <p className="text-[0.875rem] text-[#797878] group-hover:text-white">
                {plan.desc}
              </p>
              <p className="text-[1.125rem] text-[#797878] flex flex-row items-center gap-2 border-b border-b-[#E7EBFF] pb-2 group-hover:text-white">
                <span className="text-[1.75rem] text-[#1B223C] font-bold group-hover:text-white">
                  ₹{plan.price}
                </span>{" "}
                {plan.validity}
              </p>
              <div className="w-full sm:h-[15.625rem] flex flex-col gap-3 mt-2">
                {plan.features.map((feature) => (
                  <p className="flex flex-row items-center text-[0.9375rem] gap-1">
                    <GrFormCheckmark className="text-[1.25rem]" />
                    {feature}
                  </p>
                ))}
              </div>
              {plan.button.start ? (
                <button className="bg-[#004AAD] border-2 text-[1.1rem] rounded-[0.5rem] text-white border-[#004AAD] font-bold text-richblack-900 px-[0.75rem] py-3  group-hover:border-white">
                  {plan.button.btn}
                </button>
              ) : (
                <button className=" text-[1.1rem] bg-white rounded-[0.5rem] text-black border-2 font-bold text-richblack-900 px-[0.75rem] py-3  group-hover:text-[#004AAD]">
                  {plan.button.btn}
                </button>
              )}
            </div>
          ))}
        {switchTab === "annual" &&
          PlansData.annually.map((plan) => (
            <div className="group w-[18.75rem] sm:w-[26.875rem] flex flex-col gap-3 shadow-2xl border rounded-3xl p-[1.5rem] hover:bg-[#004AAD] hover:text-white transition-all">
              <h1 className="text-[1.625rem] text-[#1B223C] font-semibold flex flex-row items-center gap-2 group-hover:text-white">
                {plan.name}
                {plan.name === "Starter Plan" && (
                  <span className="w-fit h-fit text-[0.9375rem] rounded-[0.5rem] border border-[#004AAD] px-4 py-2 bg-[#FFDD66] ml-5 group-hover:text-black">
                    Recommended
                  </span>
                )}
              </h1>
              <p className="text-[0.875rem] text-[#797878] group-hover:text-white">
                {plan.desc}
              </p>
              <p className="text-[1.125rem] text-[#797878] flex flex-row items-center gap-2 border-b border-b-[#E7EBFF] pb-2 group-hover:text-white">
                <span className="text-[1.625rem] text-[#1B223C] font-bold group-hover:text-white">
                  ₹{plan.price}
                </span>{" "}
                {plan.validity}
              </p>
              <div className="w-full sm:h-[15.625rem] flex flex-col gap-3 mt-2">
                {plan.features.map((feature) => (
                  <p className="flex flex-row items-center text-[0.9375rem]">
                    <GrFormCheckmark className="text-[1.25rem]" />
                    {feature}
                  </p>
                ))}
              </div>
              {plan.button.start ? (
                <button className="bg-[#004AAD] border-2  text-[1.1rem] rounded-[0.5rem] text-white border-[#004AAD] font-bold text-richblack-900 px-[0.75rem] py-3  group-hover:border-white">
                  {plan.button.btn}
                </button>
              ) : (
                <button className=" text-[1.1rem] bg-white rounded-[0.5rem] text-black border-2 font-bold text-richblack-900 px-[0.75rem] py-3  group-hover:text-[#004AAD]">
                  {plan.button.btn}
                </button>
              )}
            </div>
          ))}
      </div>

      <div className="w-full h-fit px-[5rem] py-4 mt-12 rounded-xl">
        <table className="w-full overflow-x-scroll ">
          <thead>
            <tr>
              {switchTab === "quarterly" && (
                <>
                  <th className="text-[1.25rem] w-1/4 border-2 p-4">
                    Compare plans
                    <p className="text-[#858BA0] text-[0.875rem]">
                      Choose your business plan according to your business need
                    </p>
                  </th>
                  <th className="border-2 p-4">
                    <p className="text-[0.875rem] text-[#797878]">
                      <span className="text-[1.625rem] text-[#1B223C] font-[700]">
                        Free
                      </span>{" "}
                      (15 days)
                    </p>
                    <button
                      className="w-[12.5rem] h-fit text-[1.1rem] mt-2 rounded-[0.5rem] border-2 border-black font-bold text-richblack-900 px-[0.75rem] py-2"
                      onClick={() => toggleModal()}
                    >
                      Current Plan
                    </button>
                  </th>
                  <th className="border-2 p-4">
                    <p className="text-[0.875rem] text-[#797878]">
                      <span className="text-[1.625rem] text-[#1B223C] font-[700]">
                        ₹765
                      </span>{" "}
                      /Month
                    </p>
                    <button className="w-[12.5rem] bg-[#004AAD] h-fit text-[1rem] mt-2 text-white rounded-[0.5rem] border-2 border-[#004AAD] font-bold text-richblack-900 px-[0.75rem] py-2">
                      Upgrade to this Plan
                    </button>
                  </th>
                  <th className="border-2 p-4">
                    <p className="text-[0.875rem] text-[#797878]">
                      <span className="text-[1.625rem] text-[#1B223C] font-[700]">
                        ₹1215
                      </span>{" "}
                      /Month
                    </p>
                    <button className="w-[12.5rem] bg-[#004AAD] h-fit text-[1rem] mt-2 text-white rounded-[0.5rem] border-2 border-[#004AAD] font-bold text-richblack-900 px-[0.75rem] py-2">
                      Upgrade to this Plan
                    </button>
                  </th>
                </>
              )}
              {switchTab === "annual" && (
                <>
                  <th className="text-[1.25rem] w-1/4 border-2 p-4">
                    Compare plans
                    <p className="text-[#858BA0] text-[0.875rem]">
                      Choose your business plan according to your business need
                    </p>
                  </th>
                  <th className="border-2 p-4">
                    <p className="text-[0.875rem] text-[#797878]">
                      <span className="text-[1.625rem] text-[#1B223C] font-[700]">
                        Free
                      </span>{" "}
                      (15 days)
                    </p>
                    <button
                      className="w-[12.5rem] h-fit text-[1.1rem] mt-2 rounded-[0.5rem] border-2 border-black font-bold text-richblack-900 px-[0.75rem] py-2"
                      onClick={() => toggleModal()}
                    >
                      Current Plan
                    </button>
                  </th>
                  <th className="border-2 p-4">
                    <p className="text-[0.875rem] text-[#797878]">
                      <span className="text-[1.625rem] text-[#1B223C] font-[700]">
                        ₹679
                      </span>{" "}
                      /Month
                    </p>
                    <button className="w-[12.5rem] bg-[#004AAD] h-fit text-[1rem] mt-2 text-white rounded-[0.5rem] border-2 border-[#004AAD] font-bold text-richblack-900 px-[0.75rem] py-2">
                      Upgrade to this Plan
                    </button>
                  </th>
                  <th className="border-2 p-4">
                    <p className="text-[0.875rem] text-[#797878]">
                      <span className="text-[1.625rem] text-[#1B223C] font-[700]">
                        ₹1049
                      </span>{" "}
                      /Month
                    </p>
                    <button className="w-[12.5rem] bg-[#004AAD] h-fit text-[1rem] mt-2 text-white rounded-[0.5rem] border-2 border-[#004AAD] font-bold text-richblack-900 px-[0.75rem] py-2">
                      Upgrade to this Plan
                    </button>
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {PlansTable.map((plan) => (
              <tr className="text-center  h-20 text-sm">
                <td className="text-base border-2 p-2">{plan.head}</td>
                {plan.plan1 === "check" ? (
                  <td className="border-2 p-2">
                    <MdVerified className="text-xl w-full" />
                  </td>
                ) : plan.plan1 === "uncheck" ? (
                  <td className="border-2 p-2">
                    <IoIosCloseCircleOutline className="text-2xl w-full" />
                  </td>
                ) : (
                  <td className="border-2 p-2">{plan.plan1}</td>
                )}
                {plan.plan2.head === "check" ? (
                  <td className="border-2 p-2">
                    <MdVerified className="text-xl w-full" />
                    {plan.plan2.subhead && (
                      <p className="text-[#858BA0] text-sm">
                        {plan.plan2.subhead}
                      </p>
                    )}
                  </td>
                ) : plan.plan2.head === "uncheck" ? (
                  <td className="border-2 p-2">
                    <IoIosCloseCircleOutline className="text-2xl w-full" />
                    {plan.plan2.subhead && (
                      <p className="text-[#858BA0] text-sm">
                        {plan.plan2.subhead}
                      </p>
                    )}
                  </td>
                ) : (
                  <td className="border-2 p-2">
                    {plan.plan2.head}
                    {plan.plan2.subhead && (
                      <p className="text-[#858BA0] text-sm">
                        {plan.plan2.subhead}
                      </p>
                    )}
                  </td>
                )}
                {plan.plan3.head === "check" ? (
                  <td className="border-2 p-2">
                    <MdVerified className="text-xl w-full" />
                    {plan.plan3.subhead && (
                      <p className="text-[#858BA0] text-sm">
                        {plan.plan3.subhead}
                      </p>
                    )}
                  </td>
                ) : plan.plan3.head === "uncheck" ? (
                  <td className="border-2 p-2">
                    <IoIosCloseCircleOutline className="text-2xl w-full" />
                    {plan.plan3.subhead && (
                      <p className="text-[#858BA0] text-sm">
                        {plan.plan3.subhead}
                      </p>
                    )}
                  </td>
                ) : (
                  <td className="border-2 p-2">
                    {plan.plan3.head}
                    {plan.plan3.subhead && (
                      <p className="text-[#858BA0] text-sm">
                        {plan.plan3.subhead}
                      </p>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <div
          id="default-modal"
          // tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-80 sm:w-fit h-auto  shadow-lg rounded-lg overflow-y-auto">
            <div className="w-[50rem] relative p-8 bg-white rounded-lg shadow">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <h1 className="text-[1.63rem] font-bold">
                    You've chosen our most popular plan
                  </h1>
                  <p className="text-base font-bold">
                    Please add your billing details to proceed
                  </p>
                </div>
                <IoMdCloseCircle
                  onClick={() => toggleModal()}
                  className="text-4xl hover:cursor-pointer"
                />
              </div>
              <div className="flex flex-col mt-5">
                <h1 className="text-[1.375rem] text-[#444444] font-bold">
                  Billing Details
                </h1>
                <form className="flex flex-row flex-wrap justify-center gap-x-7 gap-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-sm font-[500]">
                      Company Name
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-[21.875rem] p-2 border-2 border-[#00000033] rounded-lg text-base"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-sm font-[500]">
                      Address
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-[21.875rem] p-2 border-2 border-[#00000033] rounded-lg text-base"
                      placeholder="Enter Address"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="country"
                      className="flex flex-row items-center text-sm font-[500]"
                    >
                      Country
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <select
                      className="w-[21.875rem] p-2 border-2 border-[#00000033] rounded-lg text-base"
                      id="country"
                      name="country"
                      value="dw"
                      // onChange={handleInputChange}
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="state"
                      className="flex flex-row items-center text-sm font-[500]"
                    >
                      State
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <select
                      className="w-[21.875rem] p-2 border-2 border-[#00000033] rounded-lg text-base"
                      id="state"
                      name="state"
                      value="dw"
                      // onChange={handleInputChange}
                    >
                      <option value="">Select State</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-sm font-[500]">
                      City
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-[21.875rem] p-2 border-2 border-[#00000033] rounded-lg text-base"
                      placeholder="Enter City"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-sm font-[500]">
                      Pin-Code
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-[21.875rem] p-2 border-2 border-[#00000033] rounded-lg text-base"
                      placeholder="Enter Pincode"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-sm font-[500]">
                      GST Number
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-[21.875rem] p-2 border-2 border-[#00000033] rounded-lg text-base"
                      placeholder="Enter Number"
                    />
                  </div>
                  <button className="w-[21.875rem] bg-[#004AAD] text-[1.1rem] rounded-lg text-white font-bold text-richblack-900 px-3 py-[0.5625rem] mt-7">
                    Proceed
                  </button>

                  <div className="flex mt-3 items-center justify-center">
                    <label className="text-[1rem] font-semibold text-center flex items-center">
                      <input
                        type="checkbox"
                        //   checked={rememberMe}
                        //   onChange={() => setRememberMe(!rememberMe)}
                        className="size-[1.375rem] mr-2"
                      />
                      I am not registered with GST
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlansComp;
