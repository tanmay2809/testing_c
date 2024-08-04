
import { useState, useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import {fetchMostRecommandItemsDetails} from "../../redux/mostrecommandslice";
import type { RootState, AppDispatch } from "../../redux/store";

import { Link } from "react-router-dom";


import Feedback from "../../component/outlet/Feedback";

//lottie
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

//icons
import { PiHandWaving } from "react-icons/pi";
import { RiWhatsappFill } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { BiSolidError } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { MdOutlineNavigateNext } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";
import { MdRefresh } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
//assets
import icon from '../../assets/Visit.png'
import icon1 from '../../assets/Regular Visitor.png'
import notfound from '../../assets/No data found.png'

import Chart1 from '../../component/dashboard/Chart1';




const Dashboard = () => {

  const  {data}  = useSelector((state: RootState) => state.resturantdata);
 
  console.log("restaurantData: ", data);
  
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();
  const id: string | null = localStorage.getItem("id");
  // console.log("id: ", id);
  useEffect(() => {
    if (id) {
      dispatch(fetchMostRecommandItemsDetails({ id }) as any);
    }
  }, [dispatch, id]);

  const top4menu = useSelector((state: RootState) => state.mostRecommand);
  // console.log("topmenu: ",top4menu?.data?.menuItems);



  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling animation
    });
  }



  const [status,setstatus] = useState(1);
  console.log(data)
  console.log(data?.additionalDetails);
  console.log(data?.category);

  // const [marketing,setmarketing]=useState(false);

  const marketing=0;
  
  useEffect(() => {
    if (data?.category && data.category.length > 0) {
      if (data.additionalDetails) {
        if (marketing) {
          setstatus(3);
        } else {
          setstatus(2);
        }
      } else {
        setstatus(1);
      }
    }
  }, [data, marketing]);
  

  //overview
  const [selectedDays, setSelectedDays] = useState(7); // Default to "Last 7 Days"
  const [totalVisits, setTotalVisits] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [returningCustomers, setReturningCustomers] = useState(0);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDays(parseInt(event.target.value));
  };

  const getFilteredData = (data:any) => {
    const days = selectedDays;
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - days);
  
    let totalVisits = 0;
    let totalCustomers = 0;
    let returningCustomers = 0;
  
    data.forEach((customer:any) => {
      const visitsInTimeFrame = customer?.visits?.filter((visit: string) => {
        const visitDate = new Date(visit);
        return visitDate >= startDate && visitDate <= now;
      });
  
      if (visitsInTimeFrame.length > 0) {
        totalVisits += visitsInTimeFrame.length;
        totalCustomers++;
  
        if (visitsInTimeFrame.length >= 3) {
          returningCustomers++;
        }
      }
    });
  
    return {
      totalVisits,
      totalCustomers,
      returningCustomers
    };
  };

  useEffect(()=>{

    // const { totalVisits, totalCustomers, returningCustomers } = getFilteredData(data?.customerData);
    // setTotalVisits(totalVisits);
    // setTotalCustomers(totalCustomers);  
    // setReturningCustomers(returningCustomers);

    if (data?.customerData) {
      const { totalVisits, totalCustomers, returningCustomers } = getFilteredData(data.customerData);
      setTotalVisits(totalVisits);
      setTotalCustomers(totalCustomers);
      setReturningCustomers(returningCustomers);
    }

  },[selectedDays,data]);

  // navbar fram
  const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };
 
  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className=" lg:w-[93%] h-fit px-[1rem] py-[1rem] flex flex-col items-center justify-center  lg:ml-[7%] ">
        <div onClick={handlefram} className="w-full  h-fit flex flex-col items-center gap-2 mt-[80px]  mb-[2rem] mx-[1.5rem]  ">
          <div className="w-full h-fit flex items-center justify-between bg-[#D7E8FF] font-inter font-[400] text-[.9rem] text-black px-4 py-2  rounded-xl ">
            <div className="flex items-center gap-2">
              <BiSolidError className="size-5 text-[#004AADC9] " />
              <p>
                Your are using a free trial ! switch to Premium for maximum
                utilisation
              </p>
            </div>
            <button className="px-[.9rem] py-[.3rem] bg-white rounded-lg">
              Upgrade Now
            </button>
          </div>
          {/* reach out your customer */}
          <div className="w-full h-fit flex relative mt-[.5rem] py-[1.5rem] px-[2.5rem] bg-[#FFCF27] rounded-md">
            <div className="font-inter text-black w-[55%]">
              <div className="font-[700] text-[2rem] leading-[2.7rem]">
                <p>Reach out your customers like </p>
                <p>never before</p>
              </div>

              <p className="font-[600] text-[1.1rem] tracking-tighter mt-3">
                Explore our pre-made Templates tailored for eateries
              </p>
            </div>

            <div className=" absolute lg:right-[10rem] md:right-[6rem] -top-[.1rem] rotate-[13deg] ">
              <DotLottieReact
                src="https://lottie.host/d4be8719-9a6c-4ad1-8cb8-46b28c108c50/b2zAzWhAdV.json"
                autoplay
                loop
                style={{ width: "300px", height: "200px" }}
              />
            </div>
          </div>

          {/* Hellow Foodoos */}
          {status < 3 ? (
            <div className="bg-[#F1F7FF] w-full h-fit my-[.75rem] flex py-[1.5rem] px-[2.5rem] rounded-lg ">
              <div className="w-[40%] h-fit">
                <p className="flex items-center gap-4 font-Sen font-[700] text-[2rem] text-nowrap text-[#505050] tracking-tight">
                  Hello {data.resName}{" "}
                  <span>
                    <PiHandWaving className=" text-black -rotate-[10deg]" />
                  </span>
                </p>
                <div>
                  <div className="text-[1.2rem] font-Sen font-[700] leading-[1.6rem] mt-1 text-black">
                    <p>Lets build your success story</p>
                    <p>together</p>
                  </div>

                  <div className="lg:mt-0 md:mt-[60px]">
                    <DotLottieReact
                      src="https://lottie.host/a3f808d0-ea12-443d-940e-1f07bb25e67e/xLVE06Ex60.json"
                      autoplay
                      loop
                      style={{ width: "200px", height: "200px" }}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-inter font-[600] text-[2.4rem] text-black">
                    {status}
                    <span className="font-[500] text-[1.2rem]">
                      /3 completed
                    </span>
                  </p>
                  <div className="w-[50%] h-[20px] bg-[#D7E8FF] rounded-xl">
                    <div
                      className={`${
                        status === 1 ? "w-[33%]" : "w-[66%]"
                      }  bg-[#004AAD] h-[90%] rounded-xl`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="w-[60%] h-fit flex items-end flex-col  font-inter py-[1rem] ">
                <Link
                  to="https://wa.me/917044292143?text=Hi%20"
                  className="bg-white flex items-center py-2  border border-[#000000CC] rounded-lg text-nowrap justify-center  px-5 font-[500] text-[1.1rem]  gap-2 left-0"
                >
                  {" "}
                  <RiWhatsappFill className="text-green-500 size-6" /> Contact
                  Us{" "}
                </Link>
                <div className="w-full h-fit flex flex-col gap-4 mt-[5rem]">
                  <div className="w-full h-fit flex hover:bg-[#004AAD] hover:text-white  gap-4 bg-[#D7E8FF] py-3 px-6 rounded-xl justify-between">
                    <div className="font-inter leading-[1.5rem]">
                      <p className="font-[600] text-[.95rem] text-nowrap">
                        Complete Business Profile
                      </p>
                      <p className="font-[400] text-[.85rem] ">
                        Complete Business Profile for maximum branding
                      </p>
                    </div>
                    {status >= 1 ? (
                      <div className="flex items-center justify-end">
                        <button className="bg-[#FFCF27] px-[2rem] py-[.65rem] my-1  rounded-lg text-[.98rem] text-black">
                          Completed
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end">
                        <Link
                          to="/setting"
                          onClick={handleScrollToTop}
                          className="bg-white px-[2rem] py-[.65rem] my-1 flex items-center  text-nowrap rounded-lg text-[.98rem] text-black"
                        >
                          Start Now
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="w-full h-fit flex hover:bg-[#004AAD] hover:text-white  gap-4 bg-[#D7E8FF] py-3 px-6 rounded-xl justify-between">
                    <div className="font-inter leading-[1.5rem]">
                      <p className="font-[600] text-[.95rem] text-nowrap">
                        Create Digital Menu
                      </p>
                      <p className="font-[400] text-[.85rem]">
                        Create digital menu for better customer interaction
                      </p>
                    </div>
                    {status >= 2 ? (
                      <div className="flex items-center justify-end">
                        <button className="bg-[#FFCF27] px-[2rem] py-[.65rem] my-1  rounded-lg text-[.98rem] text-black">
                          Completed
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end">
                        <Link
                          to="/menu"
                          onClick={handleScrollToTop}
                          className="bg-white px-[2rem] py-[.65rem] my-1 flex items-center  text-nowrap rounded-lg text-[.98rem] text-black"
                        >
                          Start Now
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="w-full h-fit flex hover:bg-[#004AAD] hover:text-white  gap-4 bg-[#D7E8FF] py-3 px-6 rounded-xl justify-between">
                    <div className="font-inter  leading-[1.5rem]">
                      <p className="font-[600] text-[.95rem] text-nowrap">
                        Automate Campaigns
                      </p>
                      <p className="font-[400] text-[.85rem] ">
                        Automate Campaign for better customer engagement{" "}
                      </p>
                    </div>
                    <div className="flex items-center justify-end">
                      <Link
                        to="/marketing"
                        className="bg-white px-[2rem] py-[.65rem] my-1 flex items-center  rounded-lg text-[.98rem] text-nowrap text-black"
                      >
                        Start Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div></div>
            </div>
          ) : (
            <div className="bg-[#F1F7FF] w-full h-fit my-[.75rem] flex justify-between items-center py-[1.2rem] px-[2.5rem] rounded-lg ">
              <div className=" leading-[2.5rem]">
                <p className="flex items-center gap-4 font-Sen font-[700] text-[2rem] text-nowrap text-[#505050] tracking-tight">
                  Hello{data.resName}
                  <span>
                    <PiHandWaving className=" text-black -rotate-[10deg]" />
                  </span>
                </p>
                <p className="text-[1.2rem] font-Sen font-[700] leading-[1.6rem] mt-1 text-black">
                  Lets build your success story together
                </p>
              </div>
              <div>
                <Link
                  to="https://wa.me/917044292143?text=Hi%20"
                  className="bg-white flex items-center py-2  border border-[#000000CC] rounded-lg text-nowrap justify-center  px-5 font-[500] text-[1.1rem]  gap-2 left-0"
                >
                  {" "}
                  <RiWhatsappFill className="text-green-500 size-6" /> Contact
                  Us{" "}
                </Link>
              </div>
            </div>
          )}

          {/* Campaign Overview */}
          <div className="bg-[#F1F7FF] w-full h-fit flex flex-col  py-[1.5rem] font-inter px-[2.5rem] rounded-lg">
            <div className="flex w-full justify-between items-center">
              <p className="text-[#505050] font-semibold w-[700] text-[1.6rem] ">
                Campaign Overview
              </p>
              <div className="flex items-center justify-center gap-4">
                {/* Dropdown */}

                <select
                  id="date"
                  name="date"
                  className="font-inter px-2 py-3  sm:text-sm rounded-lg  font-semibold"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 3 Months</option>
                  <option value="180">Last 6 Months</option>
                  <option value="365">Last 12 Months</option>
                </select>

                <Link to="/wallet" className="flex items-center gap-2 bg-white rounded-lg px-5 py-2">
                  {" "}
                  <BsPlus className="size-6" /> Refill Credit
                </Link>
              </div>
            </div>

            <div className="w-full h-fit mt-[2rem] mb-[1rem] flex flex-col gap-4 ">
              <div className="w-full h-fit flex gap-2 justify-between">
                <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
                  <p className="font-[700] text-[1.8rem]">0</p>
                  <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2 ">
                    <span>
                      <IoPeopleSharp className="size-5" />
                    </span>
                    Total campaign sent
                  </p>
                </div>
                <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
                  <p className="font-[700] text-[1.8rem]">0</p>
                  <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2 ">
                    <span>
                      {" "}
                      <img src={icon} className="size-5 " alt="icon" />
                    </span>
                    Customer revisit
                  </p>
                </div>
                <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
                  <p className="font-[700] text-[1.8rem]">0%</p>
                  <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2 ">
                    <span>
                      <img src={icon1} className="size-5 " alt="icon" />
                    </span>
                    Visit ratio
                  </p>
                </div>
              </div>
              <div className="w-full h-fit flex gap-2 justify-between">
                <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
                  <p className="font-[700] text-[1.8rem]">₹ 0</p>
                  <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2 ">
                    <span>
                      <IoPeopleSharp className="size-5" />
                    </span>
                    Utility Cost
                  </p>
                </div>
                <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
                  <p className="font-[700] text-[1.8rem]">₹ 0</p>
                  <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2 ">
                    <span>
                      <img src={icon} className="size-5 " alt="icon" />
                    </span>
                    Marketing Cost
                  </p>
                </div>
                <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
                  <p className="font-[700] text-[1.8rem]">₹ 0</p>
                  <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2 ">
                    <span>
                      <img src={icon1} className="size-5 " alt="icon" />
                    </span>
                    Total Cost
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Overview1 1 */}
          <div className="bg-[#F1F7FF] w-full h-fit flex flex-col mt-[.8rem] py-[1.5rem] font-inter px-[2.5rem] rounded-lg">
            <div className="flex w-full justify-between items-center">
              <p className="text-[#505050] font-semibold w-[700] text-[1.6rem] ">
                Customer Overview
              </p>
              <div className="flex items-center justify-center gap-4">
                {/* Dropdown */}

                <select
                  id="date"
                  name="date"
                  value={selectedDays} 
                  onChange={handleSelectChange}
                  className="font-inter px-2 py-3  sm:text-sm rounded-lg  font-semibold"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 3 Months</option>
                  <option value="180">Last 6 Months</option>
                  <option value="365">Last 12 Months</option>
                </select>

                <Link
                  to="/customer/analytics"
                  onClick={handleScrollToTop}
                  className="flex items-center  bg-white rounded-lg px-5 py-2 font-[700] text-[#64748B]"
                >
                  {" "}
                  View Analytics{" "}
                  <MdNavigateNext className="text-[#505050] size-8 font-[800]" />
                </Link>
                <Link
                  to="/Table"
                  onClick={handleScrollToTop}
                  className="flex items-center  bg-white rounded-lg px-5 py-2 font-[700] text-[#64748B]"
                >
                  {" "}
                  View Tables{" "}
                  <MdNavigateNext className="text-[#505050] size-8 font-[800]" />
                </Link>
              </div>
            </div>

            <div className="w-full h-fit mt-[2rem] mb-[1rem] flex flex-col gap-4 ">
              <div className="w-full h-fit flex gap-2 justify-between">
                <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
                  <p className="font-[700] text-[1.8rem]">{totalVisits}</p>
                  <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2 ">
                    <span>
                      <IoPeopleSharp className="size-5" />
                    </span>
                    Total Visit
                  </p>
                </div>
                <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
                  <p className="font-[700] text-[1.8rem]">{totalCustomers}</p>
                  <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2 ">
                    <span>
                      <img src={icon} className="size-5 " alt="icon" />
                    </span>
                    Customer Captured
                  </p>
                </div>
                <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
                  <p className="font-[700] text-[1.8rem]">{returningCustomers}</p>
                  <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2 ">
                    <span>
                      <img src={icon1} className="size-5 " alt="icon" />
                    </span>
                    Returning Customer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* menu performance */}
          <div className=" w-full grid lg:grid-cols-2 md:grid-cols-1  gap-4 h-fit font-inter   rounded-lg">
            {/* left part */}
            <div className=" w-full h-[508px] flex flex-col  my-[1rem]  bg-[#F1F7FF] rounded-lg ">
              <div className="flex justify-between items-center font-inter border-b px-[1rem] border-[#00000099] py-4">
                <p className="font-[700] text-[1.6rem] text-[#505050]">
                  Menu Performance
                </p>
                <Link
                  to="/menu"
                  className="text-[1rem] flex items-center font-[700] text-[#64748B] px-4 py-2 bg-white rounded-lg"
                >
                  Manage Menu{" "}
                  <MdOutlineNavigateNext className="size-7 text-[#505050]  font-[900]" />
                </Link>
              </div>

              {top4menu?.data?.menuItems?.length > 0 ? (
                <div className="w-full h-fit flex flex-col px-[1.5rem] mb-[2rem]  font-inter">
                  <p className="text-[#505050] font-[500] text-[1.2rem] text-nowrap py-[1rem]">
                    Top 4 Menu item on customer preferance
                  </p>

                  {top4menu?.data?.menuItems.slice(0, 4).map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between my-[.5rem] items-center bg-white rounded-lg px-[2rem] py-[.3rem] text-black"
                    >
                      <div className="font-inter ">
                        <p className="text-[1.2rem] font-[500] ">{item.name}</p>
                        <p className="flex gap-2 items-center font-[700] text-[1.rem] text-[#464646]">
                          {item.tag} <RxDotFilled className="size-6" />{" "}
                          <span>₹{item.price}</span>
                        </p>
                      </div>
                      <div>
                        <p className="flex gap-3 text-[1.4rem] font-[500] items-center">
                          {item.likedBy.length}
                          <span>
                            <IoIosHeart className="text-red-500 size-6" />
                          </span>
                        </p>
                        <p className="font-[500] text-[1.rem]">
                          Customer love this
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-fit flex items-center text-center justify-between flex-col px-[1.5rem] mb-[2rem]  font-inter">
                  <p className="text-[#505050] font-[500] text-[1.2rem] text-nowrap py-[1rem]">
                    Top Menu item on basis of customer interaction
                  </p>
                  <img
                    src={notfound}
                    alt="found"
                    className="h-[300px] aspect-auto"
                  />
                  <div className="font-inter font-[600] text-[.7rem] text-black">
                    <p>
                      No data to display. Once customers starts visiting this
                      will look{" "}
                    </p>
                    <p>a lot more exciting.</p>
                  </div>
                </div>
              )}
            </div>
            {/* right part */}
            <div className=" w-full h-fit flex flex-col   my-[1rem] gap-3 ">
              <div className="w-full h-fit flex font-[500] flex-col px-[1.5rem]  font-roboto bg-[#F1F7FF] py-[1rem] rounded-lg text-[#000000]">
                <p className=" text-[1.5rem] text-nowrap">
                  Total Menu Interaction by customers
                </p>
                <p className="text-[1rem] text-nowrap">
                  Menu Interaction includes customer like a menu products
                </p>
                <p className="text-[3.2rem] pt-[1rem]">1024</p>
              </div>

              <div className="w-full h-fit bg-[#F1F7FF] rounded-lg  ">
                <div className="w-full h-fit px-[1.5rem] py-[1rem] flex font-Roboto border-b border-black  justify-between">
                  <div className="font-[500]">
                    <p className=" text-[1.5rem]">
                      Your Menu Score is{" "}
                      <span className="font-[700] text-[#ED9510]">Average</span>
                    </p>
                    <p className=" text-[1rem]">Last Updated on 19/06/2024</p>
                  </div>
                  <div className="flex items-center">
                    <button className="text-[1rem] w-fit border-2 flex items-center gap-2 font-[700] text-[#64748B] px-5  py-[.3rem]  bg-white rounded-lg">
                      {" "}
                      <MdRefresh className="size-5 text-[#505050]" />
                      <p>Refresh</p>{" "}
                    </button>
                  </div>
                </div>
                <div className="w-full h-fit flex px-[1.5rem] py-[2rem]">
                  <div className="w-[50%] font-Roboto font-[500]">
                    <p className=" leading-[2rem] text-[1rem]">
                      Enhance menu Media, description and category structure for
                      better customer experience
                    </p>
                  </div>
                  <div className="w-[60%] font-Roboto font-[500] h-[150px]  relative">
                    <div className="absolute top-[60%] left-[55%] translate-x-[-50%] translate-y-[-50%]">
                      <Chart1 percentage={50} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Feedback div */}
          <Feedback />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
