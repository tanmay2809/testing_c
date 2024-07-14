import { useState } from "react";

//icons
import { FaUser } from "react-icons/fa6";

//images
import feedback from "../assets/undraw_feedback_re_urmj 1.png";

//other components
import BarChart from "../component/BarChart";

//data for chart
import { data, options, months } from "../constants/index";

const Overview: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Today");
  return (
    <div className="w-full h-fit relative ">
      <div className=" w-[93%] h-fit px-[2rem] py-[1rem]  gap-10 ml-[7%] mt-2 ">
        {/*Customer Snapshot div */}
        <div className="p-6 bg-[#F1F7FF] font-inter">
          {/* Top Section */}
          <div className="flex justify-between items-center p-4 mb-6">
            {/* Left Section */}
            <div>
              <h1 className="text-2xl font-semibold mb-2">Customer Snapshot</h1>
              <p className="text-gray-600 text-base ">
                Explore how recently, how often your customer visit your
                business
              </p>
            </div>

            {/* Right Section */}
            <div className="lg:flex md:flex gap-2">
              <button
                className={`${
                  selectedDay === "Today"
                    ? "bg-[#004AAD] text-white"
                    : "bg-white"
                } rounded-lg px-6 py-2 flex items-center text-sm font-Roboto font-semibold`}
                onClick={() => setSelectedDay("Today")}
              >
                Today
              </button>
              <button
                className={`${
                  selectedDay === "Weekly"
                    ? "bg-[#004AAD] text-white"
                    : "bg-white"
                } rounded-lg px-6 py-2 flex items-center text-sm font-Roboto font-semibold`}
                onClick={() => setSelectedDay("Weekly")}
              >
                Weekly
              </button>

              {/* Dropdown Button */}

              <select
                id="month"
                name="month"
                className="font-inter px-2 py-2 text-base focus:outline-none sm:text-sm rounded-md border border-black mt-1"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="lg:flex md:flex gap-4 font-inter lg:justify-evenly">
            <div className="lg:w-1/4 bg-white p-4 shadow-md rounded-md text-left h-48 flex flex-col justify-evenly">
              <div className="text-[2.5rem] font-bold mb-2 text-[#505050]">
                30
              </div>
              <div className="flex justify-start gap-3 items-center">
                <FaUser />
                <p className="text-[#505050] text-[1.315rem]">Total Customer</p>
              </div>
            </div>
            <div className="lg:w-1/4 bg-white p-4 shadow-md rounded-md text-left h-48 flex flex-col justify-evenly">
              <div className="text-[2.5rem] font-bold mb-2 text-[#505050]">
                30
              </div>
              <div className="flex justify-start gap-3 items-center">
                <FaUser />
                <p className="text-[#505050] text-[1.315rem]">New Customer</p>
              </div>
            </div>
            <div className="lg:w-1/4 bg-white p-4 shadow-md rounded-md text-left h-48 flex flex-col justify-evenly">
              <div className="text-[2.5rem] font-bold mb-2 text-[#505050]">
                30
              </div>
              <div className="flex justify-start gap-3 items-center">
                <FaUser />
                <p className="text-[#505050] text-[1.315rem]">
                  {" "}
                  Regular Customer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*Chart div */}
        <div className="border border-[#B5CEF0] mt-4 px-6 py-4 font-inter shadow-md shadow-slate-300">
          <div className="flex justify-between items-center pb-2 mb-2 ">
            <div className="text-[1.38rem] font-semibold text-[#212B36]">
              New Customer vs Old Customer
            </div>
            <div>
              <select
                id="month"
                name="month"
                className="font-inter px-2 py-2 text-base focus:outline-none sm:text-sm rounded-md border border-black mt-1"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom section with color circles and labels */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#C0DBFF] rounded-full mr-2"></div>
              <span className="text-base text-[#5E5E5E]">New Customer</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#004AAD] rounded-full mr-2"></div>
              <span className="text-base text-[#5E5E5E]">Old Customer</span>
            </div>
          </div>
          {/*chart */}
          <div>
            <BarChart data={data} options={options} />
          </div>
        </div>

        {/*Feedback div */}
        <div className="py-4 px-8 flex items-center justify-evenly gap-10 border border-[#505050] font-inter mt-4">
          <img
            src={feedback}
            alt="Feedback image"
            className="w-[143px] h-[123px]"
          />
          <div className="flex flex-col gap-4">
            <p className=" text-lg font-medium text-[#555555]">
              Help us to make snackBAE better by adding a feedback or request
              features that are best for your business
            </p>
            <p className="text-[#004AAD] text-lg font-bold">Give Feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
