import { useState } from "react";
import Navbar from "../component/Navbar";

// icons
import { FaPlus } from "react-icons/fa6";
import { TbChessQueenFilled } from "react-icons/tb";
import { BiEditAlt } from "react-icons/bi";
import { GrFormCheckmark } from "react-icons/gr";
import { IoMdArrowRoundBack, IoMdCloseCircle } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

// assets
import image from "../assets/Ellipse 2862.png";
import logo from "../assets/logo2.png";
import { PlansData, PlansTable } from "../constants";

const Setting = () => {
  const [activeButton, setActiveButton] = useState<string>("Store");

  const MyStores = [
    {
      username: "Foodoos",
      email: "connect.foodoos@gmail.com",
      type: "Cafeteria",
      landmark: "Salt Lake",
      city: "Kolkata",
      state: "West Bengal",
      pincode: 700059,
      socials: [
        {
          name: "youtube",
          link: "",
        },
        {
          name: "facebook",
          link: "",
        },
        {
          name: "instagram",
          link: "",
        },
      ],
      channels: [
        {
          name: "zomato",
          link: "",
        },
        {
          name: "google",
          link: "",
        },
      ],
      manager: "Sam Sundar",
      contact: "+91 7021457893",
    },
  ];

  const [switchTab, setSwitchTab] = useState<string>("quarterly");
  const [storeModal, setStoreModal] = useState<boolean>(false);
  const [billingModal, setBillingModal] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const toggleStoreModel = () => {
    setStoreModal(!storeModal);
  };

  const toggleBillingModel = () => {
    setBillingModal(!billingModal);
  };

  const handleCloseStoreModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      toggleStoreModel();
    }, 500);
  };

  const handleCloseBillingModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      toggleBillingModel();
    }, 500);
  };

  return (
    <div className="w-full h-fit relative ">
      <Navbar />
      <div className=" w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%] mt-2 ">
        <div className="w-full flex flex-row justify-between">
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

        <div className="w-[100%] flex flex-row justify-start border-b border-b-[#000000CC]">
          <button
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            onClick={() => setActiveButton("Store")}
          >
            Store Details
            <span
              className={`${
                activeButton === "Store" ? "block" : "hidden"
              } bg-[#004AAD] h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </button>
          <button
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            onClick={() => setActiveButton("Plan")}
          >
            My Plan
            <span
              className={`${
                activeButton === "Plan" ? "block" : "hidden"
              } bg-[#004AAD] h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </button>
          <button
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            onClick={() => setActiveButton("Billing")}
          >
            Billing Details
            <span
              className={`${
                activeButton === "Billing" ? "block" : "hidden"
              } bg-[#004AAD] h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </button>
          <button
            className="w-[150px] flex flex-col items-center gap-2 text-[21px] font-[500]"
            onClick={() => setActiveButton("Invoice")}
          >
            Invoice
            <span
              className={`${
                activeButton === "Invoice" ? "block" : "hidden"
              } bg-[#004AAD] h-1 w-[80%] rounded-t-[6px]`}
            ></span>
          </button>
        </div>

        {activeButton === "Store" && (
          <>
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[24px] font-[500]">My stores</h1>
                <p className="text-[16x]">
                  You have
                  <span className="text-[#004AAD] font-bold">
                    {MyStores.length} active store
                  </span>
                </p>
              </div>
              <div className="w-fit h-fit">
                <button className="w-[180px] flex flex-row justify-center items-center gap-2 bg-[#004AAD] text-white px-4 py-2 text-[21px] font-[500] rounded-[8px]">
                  <FaPlus className="text-2xl" />
                  Add Store
                </button>
                <div className="relative bg-black rounded-xl outline outline-3 w-fit h-fit p-[3px] bottom-[60px] left-[90%] text-2xl text-white">
                  <TbChessQueenFilled />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col">
              {MyStores.map((store) => (
                <div className="w-full flex flex-col gap-4 rounded-xl px-8 py-4 h-fit bg-[#F1F7FF]">
                  <div className="w-full flex flex-row justify-between">
                    <div className="flex flex-row gap-4">
                      <img
                        src={image}
                        className="w-[70px] h-[70px] object-cover"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-[24px] font-semibold">
                          {store.username}
                        </h1>
                        <p className="text-[18x] font-[400] text-[#616161]">
                          {store.email}
                        </p>
                      </div>
                    </div>
                    <div className="w-fit flex flex-col justify-center">
                      <button
                        className="w-fit h-fit flex flex-row justify-center items-center gap-2 text-black text-[21px] font-[500] rounded-[8px]"
                        onClick={() => toggleStoreModel()}
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
                      <h1 className="text-[28px] font-semibold">
                        {store.type}
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[18px] text-[#616161] font-[400]">
                        Bussiness Landmark
                      </p>
                      <h1 className="text-[28px] font-semibold">
                        {store.landmark}
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[18px] text-[#616161] font-[400]">
                        Business City
                      </p>
                      <h1 className="text-[28px] font-semibold">
                        {store.city}
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[18px] text-[#616161] font-[400]">
                        State
                      </p>
                      <h1 className="text-[28px] font-semibold">
                        {store.state}
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[18px] text-[#616161] font-[400]">
                        Pincode
                      </p>
                      <h1 className="text-[28px] font-semibold">
                        {store.pincode}
                      </h1>
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
                      <h1 className="text-[28px] font-semibold">
                        {store.manager}
                      </h1>
                    </div>
                    <div className="flex flex-col grow">
                      <p className="text-[18px] text-[#616161] font-[400]">
                        Manager Contact
                      </p>
                      <h1 className="text-[28px] font-semibold">
                        {store.contact}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeButton === "Plan" && (
          <>
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
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Status
                  </p>
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
                      <div className="w-full sm:h-[280px] flex flex-col gap-2 mt-2">
                        {plan.features.map((feature) => (
                          <p className="flex flex-row items-center text-[18px]">
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
                              Choose your business plan according to your
                              business need
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
                              onClick={() => toggleStoreModel()}
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
                              Choose your business plan according to your
                              business need
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
                              // onClick={() => toggleModal()}
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
                      <tr className="text-center h-[80px] text-[14px]">
                        <td className="text-[18px] border-2 p-2">
                          {plan.head}
                        </td>
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
          </>
        )}

        {activeButton === "Billing" && (
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
                  onClick={() => toggleBillingModel()}
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
        )}
      </div>
      {storeModal && (
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
            <div className="w-full relative p-8 bg-white rounded-lg shadow">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <h1 className="text-[28px] font-bold">Edit Store Details</h1>
                  <p className="text-[18px] font-bold">
                    Edit your store details at convinience
                  </p>
                </div>
                <IoMdCloseCircle
                  onClick={() => {
                    handleCloseStoreModal();
                  }}
                  className="text-4xl hover:cursor-pointer"
                />
              </div>
              <div className="flex flex-col mt-5">
                <form className="flex flex-col gap-4 justify-center">
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-[14px] font-[500]">
                      Outlet Name
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="country"
                      className="flex flex-row items-center text-[14px] font-[500]"
                    >
                      Outlet Type
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <select
                      className="w-full p-4 border-2 border-[#00000033] rounded-[8px]"
                      id="type"
                      name="type"
                      // value="dw"
                      // onChange={handleInputChange}
                    >
                      <option value="">Select Type</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-[14px] font-[500]">
                      Outlet Mail ID
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                      placeholder="Enter Email ID"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-[14px] font-[500]">
                      Outlet Landmark
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                      placeholder="Enter Landmark"
                    />
                  </div>
                  <div className="flex flex-row gap-5">
                    <button className="w-[50%] h-14 text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-[1rem]" onClick={()=>handleCloseStoreModal()}>
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

      {billingModal && (
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
                    handleCloseBillingModal();
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
                    <button className="w-[50%] h-14 text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-[1rem]" onClick={()=>handleCloseBillingModal()}>
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
  );
};

export default Setting;
