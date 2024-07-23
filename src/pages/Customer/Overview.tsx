import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import {RestaurantState as RestaurantData} from '../../redux/restaurantData';

//icons
import { FaUser } from "react-icons/fa6";

//other components
import BarChart from "../../component/Customer/BarChart";

//data for chart
import { dataForOverview, options, months } from "../../constants/index";
// import { data, options, months } from "../../constants/index";
import Feedback from "../../component/outlet/Feedback";

const Overview: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.resturantdata);
  // as { data: RestaurantData };
  console.log("resData: ", data);

  const [selectedDay, setSelectedDay] = useState<string>("Today");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()]
  );
  const [newCustomers, setNewCustomers] = useState<number>(0);
  const [regularCustomers, setRegularCustomers] = useState<number>(0);

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const getMonthIndex = (month: string): number => months.indexOf(month);

  const filterCustomers = (
    year: number,
    monthIndex: number,
    data: any
  ): { newCustomers: number; regularCustomers: number } => {
    const today = new Date();

    let startDate: Date;
    let endDate: Date;

    if (selectedDay === "Today") {
      startDate = new Date(year, monthIndex, today.getDate());
      endDate = new Date(year, monthIndex, today.getDate() + 1);
    } else if (selectedDay === "Weekly") {
      const dayOfWeek = today.getDay();
      const startOfWeek = today.getDate() - dayOfWeek;
      startDate = new Date(year, monthIndex, startOfWeek);
      endDate = new Date(year, monthIndex, startOfWeek + 7);
    }

    const isDateInRange = (date: Date) => date >= startDate && date < endDate;

    const newCustomersCount = data?.filter((customer: any) => {
      const firstVisitDate = new Date(customer?.visits[0]);
      return isDateInRange(firstVisitDate);
    }).length;

    const regularCustomersCount = data?.filter((customer: any) => {
      const totalVisits = customer.visits.filter((visit: string) => {
        const visitDate = new Date(visit);
        return visitDate <= endDate;
      }).length;

      const recentVisit = customer.visits.some((visit: string) => {
        const visitDate = new Date(visit);
        return isDateInRange(visitDate);
      });

      return totalVisits > 2 && recentVisit;
    }).length;

    return {
      newCustomers: newCustomersCount,
      regularCustomers: regularCustomersCount,
    };
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const selectedMonthIndex = getMonthIndex(selectedMonth);
    console.log("selected month index : ", selectedMonthIndex);
    const { newCustomers, regularCustomers } = filterCustomers(
      currentYear,
      selectedMonthIndex,
      data?.customerData
    );

    setNewCustomers(newCustomers);
    setRegularCustomers(regularCustomers);
  }, [selectedDay, selectedMonth, data?.customerData]);

  return (
    <div className="w-full h-fit relative ">
      <div className=" lg:w-[93%] h-fit px-[2rem] py-[1rem]  gap-10 lg:ml-[7%] ">
        {/*Customer Snapshot div */}
        <div className="p-2 bg-[#F1F7FF] font-inter">
          {/* Top Section */}
          <div className="flex justify-between items-center p-2 ">
            {/* Left Section */}
            <div>
              <h1 className="text-xl font-semibold mb-1">Customer Snapshot</h1>
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
                value={selectedMonth}
                onChange={handleMonthChange}
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
          <div className="lg:flex md:flex gap-4 font-inter lg:justify-evenly mb-1">
            <div className="lg:w-1/4 bg-white p-4 shadow-md rounded-md text-left h-[9rem] flex flex-col justify-evenly">
              <div className="text-3xl font-bold text-[#505050]">30</div>
              <div className="flex justify-start gap-3 items-center">
                <FaUser />
                <p className="text-[#505050] text-lg">Total Customer</p>
              </div>
            </div>
            <div className="lg:w-1/4 bg-white p-4 shadow-md rounded-md text-left h-[9rem] flex flex-col justify-evenly">
              <div className="text-3xl font-bold  text-[#505050]">
                {newCustomers}
              </div>
              <div className="flex justify-start gap-3 items-center">
                <FaUser />
                <p className="text-[#505050] text-lg">New Customer</p>
              </div>
            </div>
            <div className="lg:w-1/4 bg-white p-4 shadow-md rounded-md text-left h-[9rem] flex flex-col justify-evenly">
              <div className="text-3xl font-bold  text-[#505050]">
                {regularCustomers}
              </div>
              <div className="flex justify-start gap-3 items-center">
                <FaUser />
                <p className="text-[#505050] text-lg">Regular Customer</p>
              </div>
            </div>
          </div>
        </div>

        {/*Chart div */}
        <div className="border border-[#B5CEF0] mt-2 px-6 py-2 font-inter flex flex-col">
          <div className="flex justify-between items-center ">
            <div className="text-xl font-semibold text-[#212B36]">
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
              <span className="text-sm text-[#5E5E5E]">New Customer</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#004AAD] rounded-full mr-2"></div>
              <span className="text-sm text-[#5E5E5E]">Old Customer</span>
            </div>
          </div>
          {/*chart */}
          <div className=" lg:h-[22rem] md:h-[13rem]">
            <BarChart data={dataForOverview} options={options} width={500} height={150} />
          </div>
        </div>
        {/*Feedback div */}
        <Feedback />
      </div>
    </div>
  );
};

export default Overview;
