
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
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


import icon from '../../assets/Visit.png'
import icon1 from '../../assets/Regular Visitor.png'

import Chart1 from '../../component/dashboard/Chart1';



const Dashboard = () => {

  const top3menu = [
    {
      name: "Cheese Burder",
      price:"1150",
    },
    {
      name: "Cheese Burder",
      price:"1150",
    },
    {
      name: "Cheese Burder",
      price:"1150",
    },
    {
      name: "Cheese Burder",
      price:"1150",
    },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling animation
    });
  }

  const { data } = useSelector(
    (state: RootState) => state.resturantdata
  );
  // as { data: RestaurantData };
  console.log("resData: ", data);

  const [status,setstatus] = useState(1);

  useEffect(() => {
    if(data?.category )
      {
        setstatus(2);
      }
  }, []);

  
 
  return (

    <div className="w-full h-fit relative ">
      
      <div className=" lg:w-[93%] h-fit px-[1rem] py-[1rem] flex flex-col items-center justify-center  lg:ml-[7%] ">
        <div className="w-full  h-fit flex flex-col items-center gap-2 mt-[80px] mb-[2rem] mx-[1.5rem]  ">

          <div className="w-full h-fit flex items-center justify-between bg-[#D7E8FF] font-inter font-[400] text-[.9rem] text-black px-4 py-2  rounded-xl ">
              <div className='flex items-center gap-2'>
              <BiSolidError  className='size-5 text-[#004AADC9] ' />
                <p>Your are using a free trial ! switch to Premium for maximum utilisation</p>
              </div>
              <button className='px-[.9rem] py-[.3rem] bg-white rounded-lg'>Upgrade Now</button>
          </div>
            {/* reach out your customer */}
          <div className="w-full h-fit flex relative mt-[.5rem] py-[1.5rem] px-[2.5rem] bg-[#FFCF27] rounded-md">
            <div className="font-inter text-black w-[55%]">
              <div className="font-[700] text-[2rem] leading-[2.7rem]">
              <p>Reach out your customers like </p>
              <p>never before</p>
              </div>
              
              <p className="font-[600] text-[1.1rem] tracking-tighter mt-3">Explore our pre-made Templates tailored for eateries</p>
            </div>

            <div className=" absolute right-[5rem] -top-[.1rem] rotate-[13deg] ">
              <DotLottieReact
                src="https://lottie.host/d4be8719-9a6c-4ad1-8cb8-46b28c108c50/b2zAzWhAdV.json"
                autoplay
                loop
                style={{ width: "300px", height: "200px", }}
              />
            </div>
          </div>
           {/* Hellow Foodoos */}

           {
              status<=3 ?  <div className="bg-[#F1F7FF] w-full h-fit my-[.75rem] flex py-[1.5rem] px-[2.5rem] rounded-lg ">
              <div className="w-[40%] h-fit">
                <p className="flex items-center gap-4 font-Sen font-[700] text-[2rem] text-nowrap text-[#505050] tracking-tight">Hello Foodoos <span><PiHandWaving  className=" text-black -rotate-[10deg]" /></span></p>
                <div>
                  <div className="text-[1.2rem] font-Sen font-[700] leading-[1.6rem] mt-1 text-black">
                  <p>Lets build your success story</p>
                  <p>together</p>
                  </div>
                  
                    <DotLottieReact
                      src="https://lottie.host/a3f808d0-ea12-443d-940e-1f07bb25e67e/xLVE06Ex60.json"
                      autoplay
                      loop
                      style={{ width: "200px", height: "200px" }}
                    />
                </div>
                <div>
                  <p className="font-inter font-[600] text-[2.4rem] text-black">{status}<span className="font-[500] text-[1.2rem]">/3 completed</span></p>
                  <div className="w-[50%] h-[20px] bg-[#D7E8FF] rounded-xl">
                  <div className={`${status === 1 ? "w-[33%]" : "w-[66%]"}  bg-[#004AAD] h-[90%] rounded-xl`}></div>

                  </div>
                </div>

              </div>

              <div className="w-[60%] h-fit flex items-end flex-col  font-inter py-[1rem] ">
                 <Link to="https://wa.me/917003876815?text=Hi%20" className="bg-white flex items-center py-2  border border-[#000000CC] rounded-lg text-nowrap justify-center  px-5 font-[500] text-[1.1rem]  gap-2 left-0"> <RiWhatsappFill className="text-green-500 size-6" /> Contact Us </Link>
                 <div className="w-full h-fit flex flex-col gap-4 mt-[5rem]">
                    <div className="w-full h-fit flex hover:bg-[#004AAD] hover:text-white  gap-4 bg-[#D7E8FF] py-3 px-6 rounded-xl justify-between">
                        <div className="font-inter leading-[1.5rem]">
                          <p className="font-[600] text-[.95rem] text-nowrap">Complete Business Profile</p>
                          <p className="font-[400] text-[.85rem] text-nowrap">Complete Business Profile for maximum branding</p>
                        </div>
                        <button className="bg-[#FFCF27] px-[2rem] my-1  rounded-lg text-[.98rem] text-black">Completed</button>
                    </div>
                    <div className="w-full h-fit flex hover:bg-[#004AAD] hover:text-white  gap-4 bg-[#D7E8FF] py-3 px-6 rounded-xl justify-between">
                        <div className="font-inter leading-[1.5rem]">
                          <p className="font-[600] text-[.95rem] text-nowrap">Create Digital Menu</p>
                          <p className="font-[400] text-[.85rem] text-nowrap">Create digital menu for better customer interaction</p>
                        </div>
                        {
                          (status==2) ? <button className="bg-[#FFCF27] px-[2rem] my-1  rounded-lg text-[.98rem] text-black">Completed</button>:
                          <Link to='/menu' onClick={handleScrollToTop} className="bg-white px-[2rem] my-1 flex items-center  rounded-lg text-[.98rem] text-black">Start Now</Link>
                        }
                        
                    </div>
                    <div className="w-full h-fit flex hover:bg-[#004AAD] hover:text-white  gap-4 bg-[#D7E8FF] py-3 px-6 rounded-xl justify-between">
                        <div className="font-inter leading-[1.5rem]">
                          <p className="font-[600] text-[.95rem] text-nowrap">Automate Campaigns</p>
                          <p className="font-[400] text-[.85rem] text-nowrap">Automate Campaign for better customer engagement </p>
                        </div>
                    
                        <Link to='/marketing' className="bg-white px-[2rem] my-1 flex items-center  rounded-lg text-[.98rem] text-black">Start Now</Link>
                        
                    </div>
                 </div>
                 
              </div>

              <div>

              </div>
                 </div>:
                 <div className="bg-[#F1F7FF] w-full h-fit my-[.75rem] flex justify-between items-center py-[1.2rem] px-[2.5rem] rounded-lg ">
                  <div className=" leading-[2.5rem]">
                  <p className="flex items-center gap-4 font-Sen font-[700] text-[2rem] text-nowrap text-[#505050] tracking-tight">Hello Foodoos <span><PiHandWaving  className=" text-black -rotate-[10deg]" /></span></p>
                  <p className="text-[1.2rem] font-Sen font-[700] leading-[1.6rem] mt-1 text-black">Lets build your success story together</p>
                  </div>
                  <div>
                  <Link to="https://wa.me/917003876815?text=Hi%20" className="bg-white flex items-center py-2  border border-[#000000CC] rounded-lg text-nowrap justify-center  px-5 font-[500] text-[1.1rem]  gap-2 left-0"> <RiWhatsappFill className="text-green-500 size-6" /> Contact Us </Link>

                  </div>
                 
                 </div>
           }
          

          {/* Campaign Overview */}
          <div className="bg-[#F1F7FF] w-full h-fit flex flex-col  py-[1.5rem] font-inter px-[2.5rem] rounded-lg">
            <div className="flex w-full justify-between items-center">
              <p className='text-[#505050] font-semibold w-[700] text-[1.6rem] '>Campaign Overview</p>
              <div className='flex items-center justify-center gap-4'>
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

                <button className='flex items-center gap-2 bg-white rounded-lg px-5 py-2'> <BsPlus className="size-6" /> Refill Credit</button>

              </div>

            </div>

            <div className='w-full h-fit mt-[2rem] mb-[1rem] flex flex-col gap-4 '>

              <div className='w-full h-fit flex gap-2 justify-between'>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>1000</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><IoPeopleSharp className='size-5' /></span>Total campaign sent</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>30</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span> <img src={icon} className='size-5 ' alt="icon" /></span>Customer revisit</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>9%</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><img src={icon1} className='size-5 ' alt="icon" /></span>Visit ratio</p>
                </div>

              </div>
              <div className='w-full h-fit flex gap-2 justify-between'>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>₹ 200</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><IoPeopleSharp className='size-5' /></span>Utility Cost</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>₹ 500</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><img src={icon} className='size-5 ' alt="icon" /></span>Marketing Cost</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>₹ 700</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><img src={icon1} className='size-5 ' alt="icon" /></span>Total Cost</p>
                </div>

              </div>

            </div>

          </div>

          {/* Campaign Overview1 1 */}
          <div className="bg-[#F1F7FF] w-full h-fit flex flex-col mt-[.8rem] py-[1.5rem] font-inter px-[2.5rem] rounded-lg">
            <div className="flex w-full justify-between items-center">
              <p className='text-[#505050] font-semibold w-[700] text-[1.6rem] '>Campaign Overview</p>
              <div className='flex items-center justify-center gap-4'>
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

                <Link to="/customer/analytics" onClick={handleScrollToTop} className='flex items-center  bg-white rounded-lg px-5 py-2 font-[700] text-[#64748B]'> View Analytics <MdNavigateNext className="text-[#505050] size-8 font-[800]"/></Link>
                <Link to="/Table" onClick={handleScrollToTop} className='flex items-center  bg-white rounded-lg px-5 py-2 font-[700] text-[#64748B]'> View Tables <MdNavigateNext className="text-[#505050] size-8 font-[800]"/></Link>
              </div>

            </div>

            <div className='w-full h-fit mt-[2rem] mb-[1rem] flex flex-col gap-4 '>

              <div className='w-full h-fit flex gap-2 justify-between'>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>300</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><IoPeopleSharp className='size-5' /></span>Total Visit</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>500</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><img src={icon} className='size-5 ' alt="icon" /></span>Total Customer Captured</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>100</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><img src={icon1} className='size-5 ' alt="icon" /></span>Returning Customer</p>
                </div>

              </div>
              

            </div>

          </div>

          {/* menu performance */}
          <div className=" w-full grid md:grid-cols-2 grid-cols-1  gap-4 h-fit font-inter   rounded-lg">

            <div className=' w-full h-fit flex flex-col  my-[1rem]  bg-[#F1F7FF] rounded-lg '>
              <div className='flex justify-between items-center font-inter border-b px-[1rem] border-[#00000099] py-4'>
                <p className='font-[700] text-[1.6rem] text-[#505050]'>Menu Performance</p>
                <Link to="/menu" className='text-[1rem] flex items-center font-[700] text-[#64748B] px-4 py-2 bg-white rounded-lg'>Manage Menu <MdOutlineNavigateNext className='size-7 text-[#505050]  font-[900]' /></Link>
              </div>

              <div className='w-full h-fit flex flex-col px-[1.5rem] mb-[2rem]  font-inter'>
                <p className='text-[#505050] font-[500] text-[1.2rem] text-nowrap py-[1rem]'>Top 3 Menu item on customer preferance</p>

                {
                  top3menu.map((item, index) => (
                    <div key={index} className='flex justify-between my-[.5rem] items-center bg-white rounded-lg px-[2rem] py-[.3rem] text-black'>
                      <div className='font-inter '>
                    <p className='text-[1.3rem] font-[500] '>{item.name}</p>
                    <p className='flex gap-2 items-center font-[700] text-[1.rem] text-[#464646]'>burger <RxDotFilled  className='size-6'/> <span>₹ 199</span></p>
                  </div>
                  <div>
                    <p className='flex gap-3 text-[1.4rem] font-[500] items-center'>2431 <span><IoIosHeart className='text-red-500 size-6' /></span></p>
                    <p className='font-[500] text-[1.rem]'>Customer live this</p>
                  </div>
                    </div>  
                  ))
                }

               
              </div>

            </div>

            <div className=' w-full h-fit flex flex-col   my-[1rem] gap-3 '>
              <div className='w-full h-fit flex font-[500] flex-col px-[1.5rem]  font-roboto bg-[#F1F7FF] py-[1rem] rounded-lg text-[#000000]'>
                
                <p className=' text-[1.5rem] text-nowrap'>Total Menu Interaction by customers</p>
                <p className='text-[1rem] text-nowrap'>Menu Interaction includes customer like a menu products</p>
                <p className='text-[3.2rem] pt-[1rem]'>1024</p>
                
              </div>

              <div className='w-full h-fit bg-[#F1F7FF] rounded-lg  '>

                <div className='w-full h-fit px-[1.5rem] py-[1rem] flex font-Roboto border-b border-black  justify-between'>
                  <div className='font-[500]'>
                    <p className=' text-[1.5rem]'>Your Menu Score is <span className='font-[700] text-[#ED9510]'>Average</span></p>
                    <p className=' text-[1rem]'>Last Updated on 19/02/2023</p>
                  </div>
                  <div className="flex items-center">
                  <button className='text-[1rem] w-fit border-2 flex items-center gap-2 font-[700] text-[#64748B] px-5  py-[.3rem]  bg-white rounded-lg'> <MdRefresh  className='size-5 text-[#505050]' /><p>Refresh</p> </button>
                  </div>
                  
                </div>
                <div className='w-full h-fit flex px-[1.5rem] py-[2rem]'>
                  <div className='w-[50%] font-Roboto font-[500]'>
                    <p className=' leading-[2rem] text-[1rem]'>Enhance menu Media, description and category structure for better customer experience</p>
                  </div>
                  <div className='w-[60%] font-Roboto font-[500] h-[150px]  relative'>
                    <div className='absolute top-[60%] left-[55%] translate-x-[-50%] translate-y-[-50%]'>
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
