import { useState } from "react";

// icons
import { GrFormCheckmark } from "react-icons/gr";
import { IoMdArrowRoundBack, IoMdCloseCircle } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

const PlansData = {
  quarterly: [
    {
      name: "Free trial",
      desc: "Kickstart your journey with our free trial without any credit card",
      price: 0,
      validity: "(15 days free trial)",
      features: [
        "Digital QR menu with 5 tables",
        "Social media integration",
        "Automated customer data collection",
        "Automated feedback collection",
        "Partial Customer insights",
      ],
      button: {
        btn: "Lets get started",
        start: true,
      },
    },
    {
      name: "Starter Plan",
      desc: "Unleash the Power of Your Business with Starter Plan.",
      price: 765,
      validity: "/month billed annually",
      features: [
        "Digital QR menu with 5 tables",
        "Social media integration",
        "Automated customer data collection",
        "Automated feedback collection",
        "Customer insights ",
        "Automated marketing",
      ],
      button: {
        btn: "Lets get started",
        start: true,
      },
    },
    {
      name: "Premium Enterprise",
      desc: "Unleash the Power of Your Business with Premium Enterprise Plan.",
      price: 1215,
      validity: "/month/Outlet",
      features: [
        "All of Starter plan with unlimited tables",
        "Detailed customer insights",
        "WhatsApp Business Api",
        "Readymade Marketing template",
        "Personalised targeted marketing",
        "Dedicated 24/7 support",
      ],
      button: {
        btn: "Contact Sales",
        start: false,
      },
    },
  ],
  annually: [
    {
      name: "Free trial",
      desc: "Kickstart your journey with our free trial without any credit card",
      price: 0,
      validity: "(15 days free trial)",
      features: [
        "Digital QR menu with 5 tables",
        "Social media integration",
        "Automated customer data collection",
        "Automated feedback collection",
        "Partial Customer insights",
      ],
      button: {
        btn: "Lets get started",
        start: true,
      },
    },
    {
      name: "Starter Plan",
      desc: "Unleash the Power of Your Business with Starter Plan.",
      price: 465,
      validity: "/month billed annually",
      features: [
        "Digital QR menu with 5 tables",
        "Social media integration",
        "Automated customer data collection",
        "Automated feedback collection",
        "Customer insights ",
        "Automated marketing",
      ],
      button: {
        btn: "Lets get started",
        start: true,
      },
    },
    {
      name: "Premium Enterprise",
      desc: "Unleash the Power of Your Business with Premium Enterprise Plan.",
      price: 845,
      validity: "/month/Outlet",
      features: [
        "All of Starter plan with unlimited tables",
        "Detailed customer insights",
        "WhatsApp Business Api",
        "Readymade Marketing template",
        "Personalised targeted marketing",
        "Dedicated 24/7 support",
      ],
      button: {
        btn: "Contact Sales",
        start: false,
      },
    },
  ]
};

const PlansTable = [
  {
    head: "Number of Tables",
    plan1: "5 Tables",
    plan2: {
      head: "10 Tables",
      subhead: "Table Add-ons on Demand",
    },
    plan3: {
      head: "Unlimited",
    },
  },
  {
    head: "Menu catalogue items",
    plan1: "Unlimited",
    plan2: {
      head: "Unlimited",
    },
    plan3: {
      head: "Unlimited",
    },
  },
  {
    head: "Customer records",
    plan1: "100 Max",
    plan2: {
      head: "Unlimited",
    },
    plan3: {
      head: "Unlimited",
    },
  },
  {
    head: "Social media integration",
    plan1: "check",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Automated customer data collection",
    plan1: "check",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Customer data Analytics",
    plan1: "",
    plan2: {
      head: "Partial",
    },
    plan3: {
      head: "Detailed",
    },
  },
  {
    head: "Automated Feedback collection",
    plan1: "check",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Automated WhatApp Campaign",
    plan1: "uncheck",
    plan2: {
      head: "Partial",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Readymade WhatsApp campaign template",
    plan1: "uncheck",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
      subhead: "Customisable",
    },
  },
  {
    head: "Analytics and reporting",
    plan1: "uncheck",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Outlet Management",
    plan1: "uncheck",
    plan2: {
      head: "uncheck",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Official WhatsApp Business API",
    plan1: "uncheck",
    plan2: {
      head: "uncheck",
    },
    plan3: {
      head: "check",
      subhead: "At additional setup fee of ₹5000",
    },
  },
  {
    head: "Official WhatsApp Greentick",
    plan1: "uncheck",
    plan2: {
      head: "uncheck",
    },
    plan3: {
      head: "check",
      subhead: "Additional verification required",
    },
  },
  {
    head: "WhatsApp Messaging",
    plan1: "uncheck",
    plan2: {
      head: "uncheck",
    },
    plan3: {
      head: "check",
    },
  },
];

const Plans = () => {
  const [switchTab, setSwitchTab] = useState<string>("quarterly");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col items-center">
        <img src="" />
        <div className="px-[1rem] md:px-[5rem] w-full mt-20 flex flex-row flex-wrap">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <Link className="w-fit h-fit" to="/login">
                <IoMdArrowRoundBack className="text-[1.8rem]" />
              </Link>

              <h1 className="text-[28px] font-bold">Select Plan</h1>
              <p className="text-[1rem] font-bold text-[#64748B]">
                Plans that are carefully crafted to suit your business.
              </p>
            </div>
            <div className="w-fit h-fit flex flex-row rounded-[40px] border border-1 border-[#000000CC]">
              <button
                className={`w-fit px-[2.5rem] py-4 rounded-[40px] transition-colors duration-500 ${
                  switchTab === "quarterly"
                    ? "bg-[#004AAD] text-white"
                    : "bg-white text-black"
                } text-[24px]`}
                onClick={() => setSwitchTab("quarterly")}
              >
                Quarterly
              </button>
              <button
                className={`w-fit px-[1.5rem] rounded-[40px] transition-colors duration-500 ${
                  switchTab === "annual"
                    ? "bg-[#004AAD] text-white"
                    : "bg-white text-black"
                } text-[24px]`}
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
              <div className="w-[300px] sm:w-[438px] flex flex-col gap-4 shadow-2xl border rounded-3xl p-[1.5rem]">
                <h1 className="text-[35px] text-[#1B223C] font-[500] flex flex-row items-center gap-2">
                  {plan.name}
                  {plan.name === "Starter Plan" && (
                    <span className="w-fit h-fit text-[18px] rounded-[8px] border border-[#004AAD] px-4 py-2 bg-[#FFDD66] ">
                      Recommended
                    </span>
                  )}
                </h1>
                <p className="text-[21px] text-[#797878]">{plan.desc}</p>
                <p className="text-[24px] text-[#797878] border-b border-b-[#E7EBFF] pb-2">
                  <span className="text-[40px] text-[#1B223C] font-[700]">
                    ₹{plan.price}
                  </span>{" "}
                  {plan.validity}
                </p>
                <div className="w-[280px] sm:h-[250px] flex flex-col gap-2 mt-2">
                  {plan.features.map((feature) => (
                    <p className="flex flex-row items-center text-[18px]">
                      <GrFormCheckmark className="text-3xl" />
                      {feature}
                    </p>
                  ))}
                </div>
                {plan.button.start ? (
                  <button className="bg-[#004AAD] h-16 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
                    {plan.button.btn}
                  </button>
                ) : (
                  <button className="h-16 text-[1.1rem] rounded-[8px] text-black border-2 font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
                    {plan.button.btn}
                  </button>
                )}
              </div>
            ))}
          {switchTab === "annual" &&
            PlansData.annually.map((plan) => (
              <div className="w-[438px] flex flex-col gap-4 shadow-2xl border rounded-3xl p-[1.5rem]">
                <h1 className="text-[35px] text-[#1B223C] font-[500] flex flex-row items-center gap-2">
                  {plan.name}
                  {plan.name === "Starter Plan" && (
                    <span className="w-fit h-fit text-[18px] rounded-[8px] border border-[#004AAD] px-4 py-2 bg-[#FFDD66] ">
                      Recommended
                    </span>
                  )}
                </h1>
                <p className="text-[21px] text-[#797878]">{plan.desc}</p>
                <p className="text-[24px] text-[#797878] border-b border-b-[#E7EBFF] pb-2">
                  <span className="text-[40px] text-[#1B223C] font-[700]">
                    ₹{plan.price}
                  </span>{" "}
                  {plan.validity}
                </p>
                <div className="w-[280px] sm:h-[250px] flex flex-col gap-2 mt-2">
                  {plan.features.map((feature) => (
                    <p className="flex flex-row items-center text-[18px]">
                      <GrFormCheckmark className="text-3xl" />
                      {feature}
                    </p>
                  ))}
                </div>
                {plan.button.start ? (
                  <button className="bg-[#004AAD] h-16 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
                    {plan.button.btn}
                  </button>
                ) : (
                  <button className="h-16 text-[1.1rem] rounded-[8px] text-black border-2 font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
                    {plan.button.btn}
                  </button>
                )}
              </div>
            ))}
        </div>
        <div className="w-full h-fit px-[5rem] py-4 mt-10">
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
                        <span className="text-[40px] text-[#1B223C] font-[700]">
                          Free
                        </span>{" "}
                        (15 days)
                      </p>
                      <button
                        className="w-[250px] h-fit text-[1.1rem] rounded-[8px] border-2 border-black font-bold text-richblack-900 px-[12px] py-[0.8rem]"
                        onClick={() => toggleModal()}
                      >
                        Current Plan
                      </button>
                    </th>
                    <th className="border-2 p-4">
                      <p className="text-[14px] text-[#797878]">
                        <span className="text-[40px] text-[#1B223C] font-[700]">
                          ₹765
                        </span>{" "}
                        /Month
                      </p>
                      <button className="w-[250px] bg-[#004AAD] h-fit text-[1.1rem] text-white rounded-[8px] border-2 border-[#004AAD] font-bold text-richblack-900 px-[12px] py-[0.8rem]">
                        Upgrade to this Plan
                      </button>
                    </th>
                    <th className="border-2 p-4">
                      <p className="text-[14px] text-[#797878]">
                        <span className="text-[40px] text-[#1B223C] font-[700]">
                          ₹1215
                        </span>{" "}
                        /Month
                      </p>
                      <button className="w-[250px] bg-[#004AAD] h-fit text-[1.1rem] text-white rounded-[8px] border-2 border-[#004AAD] font-bold text-richblack-900 px-[12px] py-[0.8rem]">
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
                        className="w-[250px] h-fit text-[1.1rem] rounded-[8px] border-2 border-black font-bold text-richblack-900 px-[12px] py-[0.8rem]"
                        onClick={() => toggleModal()}
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
                      <button className="w-[250px] bg-[#004AAD] h-fit text-[1.1rem] text-white rounded-[8px] border-2 border-[#004AAD] font-bold text-richblack-900 px-[12px] py-[0.8rem]">
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
                      <button className="w-[250px] bg-[#004AAD] h-fit text-[1.1rem] text-white rounded-[8px] border-2 border-[#004AAD] font-bold text-richblack-900 px-[12px] py-[0.8rem]">
                        Upgrade to this Plan
                      </button>
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {PlansTable.map((plan) => (
                <tr className="text-center h-[80px] text-[14px]">
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
        {isOpen && (
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
                    onClick={() => toggleModal()}
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

export default Plans;