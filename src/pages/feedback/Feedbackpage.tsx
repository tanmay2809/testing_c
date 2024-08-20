import SwitchFeedback from "../../component/Feedback/SwitchFeedback";
import Feedback from "../../component/outlet/Feedback";

//images
import google from "../../assets/Google-Review.png";
import heartseye from "/hearts_in_eye.svg";
import flatMouth from "/flatMouth.svg";
import smiley from "/smiley.svg";
// import noDataFound from "../../assets/No data found.png";

import FeedbackSlider from "../../component/Feedback/FeedbackSlider";
import { sampleReviews } from "../../constants";

import { BarChartc } from "../../component/Customer/Barchartc";
import { Barchart1 } from "../../component/Feedback/Barchart1";
// import { useState } from "react";



const Feedbackpage = () => {
  // const [dailyVisits, setDailyVisits] = useState<{ [key: string]: number }>({});
  let dailyVisits: { [key: string]: number } = {};
  // navbar fram
  const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };
  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className=" lg:w-[93%] h-fit px-[1.5rem] py-[1rem] flex flex-col items-center justify-center  lg:ml-[7%] bg-[#F5F9FF] ">
        <div
          onClick={handlefram}
          className="w-full  h-fit flex flex-col items-center gap-2 mt-[80px]  mb-[2rem] mx-[1.5rem]  "
        >
          <div className="w-full h-fit ">
            <p className="text-[1.7rem] font-bold text-[#000000]">
              Feedback Automation
            </p>
            <p className="text-[1rem] font-semibold text-[#000000] text-nowrap">
              Easily manage and automate feedback collection
            </p>
          </div>

          {/* reach out your customer */}
          <div className="w-full h-fit flex relative mt-[.5rem] py-[1.5rem] px-[2.5rem] bg-[#FFCF27] rounded-md">
            <div className="font-inter text-black w-[70%]">
              <div className="font-[700] text-[2rem] leading-[2.7rem]">
                <p>Turn Negative Feedback into Positive </p>
                <p>Relationships!</p>
              </div>

              <p className="font-[600] text-[1.1rem] tracking-tighter mt-3">
                With our new feedback feature, you can easily send discount or
                apologies to your customers in just a few clicks.
              </p>
            </div>
          </div>

          {/* Track your customer feedback with real-time analytics */}

          <div className="w-full h-fit flex flex-col relative  py-[1.5rem]  rounded-md">
            <div className="w-full h-fit flex items-center justify-between">
              <p className="font-inter font-[600] text-[1.2rem]">
                Track your customer feedback with real-time analytics
              </p>
              <button>Last 30 days</button>
            </div>

            <div className="w-full h-fit flex  gap-3 mt-[1rem] flex-wrap">
              <div className="md:w-[32%] lg:w-[24%] bg-[#E7FFB4]  h-[200px] rounded-lg p-[1rem] flex flex-col justify-between">
                <p className="font-Roboto font-[600] text-[1.2rem]">
                  Total Feedback
                </p>
                <p className="font-inter font-[600] text-[2.8rem] ">1590</p>
              </div>
              <div className="md:w-[32%] lg:w-[24%] bg-[#FFDB8F]  h-[200px] rounded-lg p-[1rem] flex flex-col justify-between">
                <p className="font-Roboto font-[600] text-[1.2rem]">
                  Average Rating
                </p>
                <p className="font-inter font-[600] text-[2.8rem] ">4.6</p>
              </div>
              {/*this will be hidden for large screen and visible in md screen */}
              <div className="md:w-[32.5%] lg:hidden bg-[#DFE7FF] h-[200px] rounded-lg flex flex-col items-start justify-between p-4">
                <p className="font-Roboto font-[600] text-[1.2rem]">
                  Snackbae assisted reviews & ratings
                </p>
                <p className="font-inter font-[600] text-[2.8rem]">252</p>
                <img src={google} alt="Google Logo" className="w-16 " />
              </div>

              <div className="md:w-[100%] lg:w-[49.5%] bg-[#DEEDFF]  h-[200px] rounded-lg p-[1rem] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-Roboto font-[600] text-[1.2rem]">
                      Feedback Control
                    </p>
                    <p className=" font-[600] text-[.8rem]">
                      Created on 15 Feb 2022
                    </p>
                  </div>
                  <div className="flex flex-col items-end ">
                    <p className=" font-[600] text-[.9rem]">Channel</p>
                    <button className=" font-[600] text-[.8rem] px-2 py-[.1rem] bg-white rounded-md">
                      {" "}
                      WhatsApp Utility
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[#65C466] font-Roboto text-[1.1rem]">
                      Action
                    </p>
                    <SwitchFeedback />
                  </div>
                  <button className="text-[#585858] text-[1rem] bg-white px-2 py-1 rounded-sm">
                    Edit Feedback settings
                  </button>
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col w-full gap-3">
                {/*this will be visible for large screen and hidden in md screen */}
                <div className="md:hidden lg:block lg:w-[24%] bg-[#DFE7FF] h-[200px] rounded-lg flex flex-col items-start justify-between p-4">
                  <p className="font-Roboto font-[600] text-[1.2rem]">
                    Snackbae assisted reviews & ratings
                  </p>
                  <p className="font-inter font-[600] text-[2.8rem]">252</p>
                  <img src={google} alt="Google Logo" className="w-16 " />
                </div>

                <div className="md:w-[100%] lg:w-[75%] bg-[#D0FFF8] h-[200px] rounded-lg flex flex-col justify-around  p-4">
                  <p className="font-Roboto font-[600] text-[1.2rem]">
                    Feedback Report
                  </p>
                  <div className="flex items-center justify-around">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1">
                        <img src={heartseye} />
                        <p className="font-inter font-[600] text-[2.8rem]">
                          91%
                        </p>
                      </div>
                      <p className="text-base text-[#575757] font-[600]">
                        1450 Positive Feedback
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <img src={flatMouth} />
                        <p className="font-inter font-[600] text-[2.8rem]">
                          91%
                        </p>
                      </div>
                      <p className="text-base text-[#575757] font-[600]">
                        86 Negative Feedback
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <img src={smiley} />
                        <p className="font-inter font-[600] text-[2.8rem]">
                          91%
                        </p>
                      </div>
                      <p className="text-base text-[#575757] font-[600]">
                        54 Neutral Feedback
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col lg:flex-row items-center gap-3 w-full">
                <div className="md:w-[100%] lg:w-1/2 bg-[#F5F2F2] h-[22rem] relative rounded-lg p-6 flex flex-col justify-evenly gap-4 overflow-hidden">
                  
                   
                      <p className="text-lg font-semibold flex items-center absolute z-[50] mb-2 top-0 ">
                        Rating Breakdown
                      </p>
                    
                  
                  {/* {pause ? (
                    <div className="w-full flex flex-col items-center justify-start">
                      <img src={noDataFound} className="w-60 h-auto" />
                      <p className="w-full text-center">
                        No data to display. Once customers starts visiting this
                        will look a lot more exciting.
                      </p>
                    </div>
                  ) : ( */}
                  <div className=" w-full h-fit flex absolute z-[20] left-0 py-2 bottom-0">
                    <div className="w-[100%] h-full block  ">
                      
                      <Barchart1/>
                    </div>
                    
                  </div>
                  {/* )} */}
                </div>
                <div className="md:w-[100%] lg:w-1/2 bg-[#DEEDFF] h-[22rem] rounded-lg p-4">
                  <p className="text-lg font-semibold flex items-center gap-2 mb-2">
                    Daily Responses
                  </p>
                  {/* {pause ? (
                    <div className="w-full flex flex-col items-center justify-start">
                      <img src={noDataFound} className="w-60 h-auto" />
                      <p className="w-full text-center">
                        No data to display. Once customers starts visiting this
                        will look a lot more exciting.
                      </p>
                    </div>
                  ) : ( */}
                  <div className="relative flex justify-center items-center mb-4">
                    <div className="w-full h-full overflow-hidden ">
                      <BarChartc dailyVisits={dailyVisits} />
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </div>
              <div className="mt-2 bg-[#DEEDFF] p-4 rounded-md min-w-full">
                <h2 className="text-xl font-bold mb-4 font-Roboto">
                  Negative Feedback
                </h2>
                <FeedbackSlider slides={sampleReviews} />
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

export default Feedbackpage;
