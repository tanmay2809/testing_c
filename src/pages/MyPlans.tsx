import { useState } from "react";

// icons
import { TbChessQueenFilled } from "react-icons/tb";
import { GrFormCheckmark } from "react-icons/gr";
import { LuAsterisk } from "react-icons/lu";
import { IoIosCloseCircleOutline, IoMdCloseCircle } from "react-icons/io";
import { MdVerified } from "react-icons/md";

// constants
import { PlansData, PlansTable } from "../constants";

const MyPlans = () => {
  const [switchTab, setSwitchTab] = useState<string>("quarterly");

  const [model, setModel] = useState<boolean>(false);
  const togglePlansModel = () => {
    setModel(!model);
  };

  return (
    <>
      <div className="w-full h-fit relative ">
        <div className=" w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%]  ">
          <div className="w-full px-10 py-8 bg-[#F1F7FF]">
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[24px] font-[500]">Free Trial</h1>
                <p className="text-[16x]">Current Plan</p>
              </div>
              <div className="w-fit h-fit">
                <button className="w-[180px] flex flex-row justify-center items-center gap-2 bg-[#004AAD] text-white px-4 py-2 text-[21px] font-[500] rounded-[8px]">
                  Upgrade
                </button>
                <div className="relative bg-black rounded-xl outline outline-3 w-fit h-fit p-[3px] bottom-[60px] left-[90%] text-2xl text-white">
                  <TbChessQueenFilled />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl flex flex-row flex-wrap justify-between w-full h-fit p-[3rem]">
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Subscription Period
                </p>
                <h1 className="text-[28px] font-semibold">15 Days</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Starting Date
                </p>
                <h1 className="text-[28px] font-semibold">01-03-2023</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Next Billing Date
                </p>
                <h1 className="text-[28px] font-semibold">15-03-2023</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">
                  Payment status
                </p>
                <h1 className="text-[28px] font-semibold">Pending</h1>
              </div>
              <div className="flex flex-col">
                <p className="text-[18px] text-[#616161] font-[400]">Status</p>
                <h1 className="text-[28px] font-semibold">
                  Trail Period (15 Days)
                </h1>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="px-[1rem] md:px-[5rem] w-full mt-5 flex flex-row flex-wrap">
              <div className="w-full flex flex-row justify-center items-center">
                <div className="w-fit h-fit flex flex-row rounded-[40px] border border-1 border-[#000000CC]">
                  <button
                    className={`w-fit px-[2rem] py-3 font-[500] rounded-[40px] transition-colors duration-500 ${
                      switchTab === "quarterly"
                        ? "bg-[#004AAD] text-white"
                        : "bg-white text-black"
                    } text-[22px]`}
                    onClick={() => setSwitchTab("quarterly")}
                  >
                    Quarterly
                  </button>
                  <button
                    className={`w-fit px-[1rem] font-[500] rounded-[40px] transition-colors duration-500 ${
                      switchTab === "annual"
                        ? "bg-[#004AAD] text-white"
                        : "bg-white text-black"
                    } text-[22px]`}
                    onClick={() => setSwitchTab("annual")}
                  >
                    Annually (save 44%)
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full items-center justify-center flex-wrap px-[1rem] gap-x-[1.2rem] gap-y-[1.2rem] mt-20">
              {switchTab === "quarterly" &&
                PlansData.quarterly.map((plan) => (
                  <div
                    key={plan.name}
                    className="group w-[300px] sm:w-[400px] flex flex-col gap-4 shadow-2xl border rounded-3xl p-[1.5rem] hover:bg-[#004AAD] hover:text-white transition-all"
                  >
                    <h1 className="text-[35px] text-[#1B223C] font-[500] flex flex-row items-center gap-2 group-hover:text-white">
                      {plan.name}
                      {plan.name === "Starter Plan" && (
                        <span className="w-fit h-fit text-[15px] rounded-[8px] border border-[#004AAD] px-4 py-2 bg-[#FFDD66] group-hover:text-black">
                          Recommended
                        </span>
                      )}
                    </h1>
                    <p className="text-[21px] text-[#797878] group-hover:text-white">
                      {plan.desc}
                    </p>
                    <p className="text-[24px] text-[#797878] flex flex-row items-center gap-2 border-b border-b-[#E7EBFF] pb-2 group-hover:text-white">
                      <span className="text-[40px] text-[#1B223C] font-[700] group-hover:text-white">
                        ₹{plan.price}
                      </span>{" "}
                      {plan.validity}
                    </p>
                    <div className="w-full sm:h-[280px] flex flex-col gap-2 mt-2">
                      {plan.features.map((feature) => (
                        <p
                          key={feature}
                          className="flex flex-row items-center text-[18px]"
                        >
                          <GrFormCheckmark className="text-3xl" />
                          {feature}
                        </p>
                      ))}
                    </div>
                    {plan.button.start ? (
                      <button className="bg-[#004AAD] border-2 h-15 text-[1.1rem] rounded-[8px] text-white border-[#004AAD] font-bold text-richblack-900 px-[12px] py-[1rem] mt-6 group-hover:border-white">
                        {plan.button.btn}
                      </button>
                    ) : (
                      <button className="h-15 text-[1.1rem] bg-white rounded-[8px] text-black border-2 font-bold text-richblack-900 px-[12px] py-[1rem] mt-6 group-hover:text-[#004AAD]">
                        {plan.button.btn}
                      </button>
                    )}
                  </div>
                ))}
              {switchTab === "annual" &&
                PlansData.annually.map((plan) => (
                  <div className="group w-[300px] sm:w-[400px] flex flex-col gap-4 shadow-2xl border rounded-3xl p-[1.5rem] hover:bg-[#004AAD] hover:text-white transition-all">
                    <h1 className="text-[35px] text-[#1B223C] font-[500] flex flex-row items-center gap-2 group-hover:text-white">
                      {plan.name}
                      {plan.name === "Starter Plan" && (
                        <span className="w-fit h-fit text-[15px] rounded-[8px] border border-[#004AAD] px-4 py-2 bg-[#FFDD66] group-hover:text-black">
                          Recommended
                        </span>
                      )}
                    </h1>
                    <p className="text-[21px] text-[#797878] group-hover:text-white">
                      {plan.desc}
                    </p>
                    <p className="text-[24px] text-[#797878] flex flex-row items-center gap-2 border-b border-b-[#E7EBFF] pb-2 group-hover:text-white">
                      <span className="text-[40px] text-[#1B223C] font-[700] group-hover:text-white">
                        ₹{plan.price}
                      </span>{" "}
                      {plan.validity}
                    </p>
                    <div className="w-full sm:h-[250px] flex flex-col gap-2 mt-2">
                      {plan.features.map((feature) => (
                        <p className="flex flex-row items-center text-[18px]">
                          <GrFormCheckmark className="text-3xl" />
                          {feature}
                        </p>
                      ))}
                    </div>
                    {plan.button.start ? (
                      <button className="bg-[#004AAD] border-2 h-15 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-6 group-hover:border-white">
                        {plan.button.btn}
                      </button>
                    ) : (
                      <button className="h-15 text-[1.1rem] bg-white rounded-[8px] text-black border-2 font-bold text-richblack-900 px-[12px] py-[1rem] mt-6 group-hover:text-[#004AAD]">
                        {plan.button.btn}
                      </button>
                    )}
                  </div>
                ))}
            </div>
            <div className="w-full h-fit px-[5rem] py-4 mt-12">
              <table className="w-full overflow-x-scroll">
                <thead>
                  <tr>
                    {switchTab === "quarterly" && (
                      <>
                        <th className="text-[24px] w-1/4 border-2 p-4">
                          Compare plans
                          <p className="text-[#858BA0] text-[14px]">
                            Choose your business plan according to your business
                            need
                          </p>
                        </th>
                        <th className="border-2 p-4">
                          <p className="text-[14px] text-[#797878]">
                            <span className="text-[38px] text-[#1B223C] font-[700]">
                              Free
                            </span>{" "}
                            (15 days)
                          </p>
                          <button
                            className="w-[200px] h-fit text-[1.1rem] mt-2 rounded-[8px] border-2 border-black font-bold text-richblack-900 px-[12px] py-[0.7rem]"
                            onClick={() => togglePlansModel()}
                          >
                            Current Plan
                          </button>
                        </th>
                        <th className="border-2 p-4">
                          <p className="text-[14px] text-[#797878]">
                            <span className="text-[38px] text-[#1B223C] font-[700]">
                              ₹765
                            </span>{" "}
                            /Month
                          </p>
                          <button className="w-[200px] bg-[#004AAD] h-fit text-[1.1rem] mt-2 text-white rounded-[8px] border-2 border-[#004AAD] font-bold text-richblack-900 px-[12px] py-[0.7rem]">
                            Upgrade to this Plan
                          </button>
                        </th>
                        <th className="border-2 p-4">
                          <p className="text-[14px] text-[#797878]">
                            <span className="text-[38px] text-[#1B223C] font-[700]">
                              ₹1215
                            </span>{" "}
                            /Month
                          </p>
                          <button className="w-[200px] bg-[#004AAD] h-fit text-[1.1rem] mt-2 text-white rounded-[8px] border-2 border-[#004AAD] font-bold text-richblack-900 px-[12px] py-[0.7rem]">
                            Upgrade to this Plan
                          </button>
                        </th>
                      </>
                    )}
                    {switchTab === "annual" && (
                      <>
                        <th className="text-[24px] w-1/4 border-2 p-4">
                          Compare plans
                          <p className="text-[#858BA0] text-[14px]">
                            Choose your business plan according to your business
                            need
                          </p>
                        </th>
                        <th className="border-2 p-4">
                          <p className="text-[14px] text-[#797878]">
                            <span className="text-[40px] text-[#1B223C] font-[700]">
                              Free
                            </span>{" "}
                            (15 days)
                          </p>
                          <button
                            className="w-[200px] h-fit text-[1.1rem] rounded-[8px] border-2 border-black font-bold text-richblack-900 px-[12px] py-[0.8rem]"
                            onClick={() => togglePlansModel()}
                          >
                            Current Plan
                          </button>
                        </th>
                        <th className="border-2 p-4">
                          <p className="text-[14px] text-[#797878]">
                            <span className="text-[40px] text-[#1B223C] font-[700]">
                              ₹465
                            </span>{" "}
                            /Month
                          </p>
                          <button className="w-[200px] bg-[#004AAD] h-fit text-[1.1rem] text-white rounded-[8px] border-2 border-[#004AAD] font-bold text-richblack-900 px-[12px] py-[0.8rem]">
                            Upgrade to this Plan
                          </button>
                        </th>
                        <th className="border-2 p-4">
                          <p className="text-[14px] text-[#797878]">
                            <span className="text-[40px] text-[#1B223C] font-[700]">
                              ₹845
                            </span>{" "}
                            /Month
                          </p>
                          <button className="w-[200px] bg-[#004AAD] h-fit text-[1.1rem] text-white rounded-[8px] border-2 border-[#004AAD] font-bold text-richblack-900 px-[12px] py-[0.8rem]">
                            Upgrade to this Plan
                          </button>
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {PlansTable.map((plan) => (
                    <tr
                      key={plan.head}
                      className="text-center h-[80px] text-[14px]"
                    >
                      <td className="text-[18px] border-2 p-2">{plan.head}</td>
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
                            <p className="text-[#858BA0] text-[14px]">
                              {plan.plan2.subhead}
                            </p>
                          )}
                        </td>
                      ) : plan.plan2.head === "uncheck" ? (
                        <td className="border-2 p-2">
                          <IoIosCloseCircleOutline className="text-2xl w-full" />
                          {plan.plan2.subhead && (
                            <p className="text-[#858BA0] text-[14px]">
                              {plan.plan2.subhead}
                            </p>
                          )}
                        </td>
                      ) : (
                        <td className="border-2 p-2">
                          {plan.plan2.head}
                          {plan.plan2.subhead && (
                            <p className="text-[#858BA0] text-[14px]">
                              {plan.plan2.subhead}
                            </p>
                          )}
                        </td>
                      )}
                      {plan.plan3.head === "check" ? (
                        <td className="border-2 p-2">
                          <MdVerified className="text-xl w-full" />
                          {plan.plan3.subhead && (
                            <p className="text-[#858BA0] text-[14px]">
                              {plan.plan3.subhead}
                            </p>
                          )}
                        </td>
                      ) : plan.plan3.head === "uncheck" ? (
                        <td className="border-2 p-2">
                          <IoIosCloseCircleOutline className="text-2xl w-full" />
                          {plan.plan3.subhead && (
                            <p className="text-[#858BA0] text-[14px]">
                              {plan.plan3.subhead}
                            </p>
                          )}
                        </td>
                      ) : (
                        <td className="border-2 p-2">
                          {plan.plan3.head}
                          {plan.plan3.subhead && (
                            <p className="text-[#858BA0] text-[14px]">
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
          </div>
        </div>

        {/* Model */}
        {model && (
          <div
            id="default-modal"
            // tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
          >
            <div className="relative p-4 w-[320px] sm:w-fit h-fit">
              <div className="w-[800px] relative p-8 bg-white rounded-lg shadow">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-[28px] font-bold">
                      You've chosen our most popular plan
                    </h1>
                    <p className="text-[18px] font-bold">
                      Please add your billing details to proceed
                    </p>
                  </div>
                  <IoMdCloseCircle
                    onClick={() => togglePlansModel()}
                    className="text-4xl hover:cursor-pointer"
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <h1 className="text-[24px] text-[#444444] font-bold">
                    Billing Details
                  </h1>
                  <form className="flex flex-row flex-wrap justify-center gap-x-7 gap-y-5">
                    <div className="flex flex-col gap-2">
                      <label className="flex flex-row items-center text-[14px] font-[500]">
                        Company Name
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-[350px] p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex flex-row items-center text-[14px] font-[500]">
                        Address
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-[350px] p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                        placeholder="Enter Address"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="country"
                        className="flex flex-row items-center text-[14px] font-[500]"
                      >
                        Country
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <select
                        className="w-[350px] p-4 border-2 border-[#00000033] rounded-[8px]"
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
                        className="flex flex-row items-center text-[14px] font-[500]"
                      >
                        State
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <select
                        className="w-[350px] p-4 border-2 border-[#00000033] rounded-[8px]"
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
                      <label className="flex flex-row items-center text-[14px] font-[500]">
                        City
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-[350px] p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                        placeholder="Enter City"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex flex-row items-center text-[14px] font-[500]">
                        Pin-Code
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-[350px] p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                        placeholder="Enter Pincode"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex flex-row items-center text-[14px] font-[500]">
                        GST Number
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        className="w-[350px] p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                        placeholder="Enter Number"
                      />
                    </div>
                    <button className="w-[350px] bg-[#004AAD] h-16 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-7">
                      Proceed
                    </button>

                    <div className="flex justify-between mt-3 items-center justify-center">
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

export default MyPlans;
