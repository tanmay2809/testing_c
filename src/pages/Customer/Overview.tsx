import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
// import {RestaurantState as RestaurantData} from '../../redux/restaurantData';

//icons
import { FaUser } from "react-icons/fa6";

//other components
import BarChart from "../../component/Customer/BarChart";

//data for chart
import { options, months } from "../../constants/index";

//images
import noDataFound from "../../assets/undraw_no_data_re_kwbl 1.png";

import Feedback from "../../component/outlet/Feedback";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];  // Assuming data is an array of numbers
    backgroundColor: string;
  }[];
}

const Overview: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.resturantdata);

  console.log("resData: ", data);

  const [selectedDay, setSelectedDay] = useState<string>("Today");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()]
  );
  const [newCustomers, setNewCustomers] = useState<number>(0);
  const [regularCustomers, setRegularCustomers] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const getMonthIndex = (month: string): number => months.indexOf(month);

  const filterCustomers = (
    year: number,
    monthIndex: number,
    data: any
  ): {
    newCustomers: number;
    regularCustomers: number;
    totalCustomers: number;
  } => {
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

    // const newCustomersCount = data?.filter((customer: any) => {
    //   const firstVisitDate = new Date(customer?.visits[0]);
    //   return isDateInRange(firstVisitDate);
    // }).length;

    const newCustomersCount = data?.filter((customer: any) => {
      const firstVisitDate = new Date(customer?.visits[0]);
      const secondVisitDate = customer.visits.length==2 && customer.visits[1] ? new Date(customer?.visits[1]) : null;
      return isDateInRange(firstVisitDate) || (secondVisitDate && isDateInRange(secondVisitDate));
    }).length;

    // const regularCustomersCount = data?.filter((customer: any) => {
    //   const totalVisits = customer.visits.filter((visit: string) => {
    //     const visitDate = new Date(visit);
    //     return visitDate <= endDate;
    //   }).length;

    //   const recentVisit = customer.visits.some((visit: string) => {
    //     const visitDate = new Date(visit);
    //     return isDateInRange(visitDate);
    //   });

    //   return totalVisits > 2 && recentVisit;
    // }).length;

    const regularCustomersCount = data?.filter((customer: any) => {
      const totalVisitsInMonth = customer?.visits?.filter((visit: string) => {
        const visitDate = new Date(visit);
        return visitDate.getMonth() === monthIndex && visitDate.getFullYear() === year;
      }).length;
    
      const visitsInRange = customer.visits.filter((visit: string) => {
        const visitDate = new Date(visit);
        return isDateInRange(visitDate);
      }).length;
    
      if (selectedDay === "Today") {
        const visitsToday = customer.visits.filter((visit: string) => {
          const visitDate = new Date(visit);
          return visitDate.getDate() === today.getDate() &&
                 visitDate.getMonth() === monthIndex &&
                 visitDate.getFullYear() === year;
        }).length;
        return visitsToday >= 1 && totalVisitsInMonth >= 3;
      } else if (selectedDay === "Weekly") {
        return visitsInRange >= 1 && totalVisitsInMonth >= 3;
      }
    }).length;

    // const totalCustomersCount = data?.reduce((total: number, customer: any) => {
    //   const visitsInRange = customer.visits.filter((visit: string) => {
    //     const visitDate = new Date(visit);
    //     return isDateInRange(visitDate);
    //   }).length;
    //   return total + visitsInRange;
    // }, 0);

    const totalCustomersCount = data?.filter((customer: any) => {
      return customer?.visits?.some((visit: string) => {
        const visitDate = new Date(visit);
        return isDateInRange(visitDate);
      });
    }).length;

    return {
      newCustomers: newCustomersCount,
      regularCustomers: regularCustomersCount,
      totalCustomers: totalCustomersCount,
    };
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const selectedMonthIndex = getMonthIndex(selectedMonth);
    console.log("selected month index : ", selectedMonthIndex);
    const { newCustomers, regularCustomers, totalCustomers } = filterCustomers(
      currentYear,
      selectedMonthIndex,
      data?.customerData
    );

    setNewCustomers(newCustomers);
    setRegularCustomers(regularCustomers);
    setTotalCustomers(totalCustomers);
  }, [selectedDay, selectedMonth, data?.customerData]);

  //barchart
  const [monthForGraph, setMonthForGraph] = useState<string>(
    months[new Date().getMonth()]
  );

  const handleMonthChangeForGraph = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonthForGraph(e.target.value);
  };
  const [dataForOverview, setDataForOverview] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const fetchDataForMonth = async (month: string) => {
    const monthIndex = months.indexOf(month) + 1;
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://dolphin-app-fmayj.ondigitalocean.app/api/customerCounts/${data._id}/${monthIndex}`,
        headers: {},
      };
      console.log(data._id, monthIndex); //data._id undefined

      axios
        .request(config)
        .then((res) => {
          console.log(JSON.stringify(res.data));
          const response = res.data;
          console.log(response);

          const { newCustomersPerDay, regularCustomersPerDay } = response.data;
          console.log("new ", newCustomersPerDay);
          console.log("reg ", regularCustomersPerDay);
          const labels = Array.from(
            { length: newCustomersPerDay?.length },
            (_, i) => `${i + 1} ${monthForGraph}`
          );

          const newData:ChartData = {
            labels,
            datasets: [
              {
                label: "New Customer",
                data: newCustomersPerDay,
                backgroundColor: "#C0DBFF",
              },
              {
                label: "Old Customer",
                data: regularCustomersPerDay,
                backgroundColor: "#004AAD",
              },
            ],
          };
          setDataForOverview(newData);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data) fetchDataForMonth(monthForGraph);
  }, [data, monthForGraph]);

   // navbar fram
   const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };

  return (
    <div className="w-full h-fit relative ">
      <div onClick={handlefram} className=" lg:w-[93%] h-fit px-[1.5rem] py-[1rem]  gap-10 lg:ml-[7%] ">
        {/*Customer Snapshot div */}
        <div className="px-[.9rem] py-[1.5rem] bg-[#F1F7FF] font-inter rounded-lg mb-[1rem]">
          {/* Top Section */}
          <div className="flex justify-between items-center p-2 ">
            {/* Left Section */}
            <div>
              <h1 className="text-[1.5rem] font-semibold mb-1 text-[#3C3C3C] ">
                Customer Snapshot
              </h1>
              <p className="text-gray-600 text-[.95rem] font-[400] ">
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
          <div className="lg:flex w-full md:flex gap-4 font-inter lg:justify-evenly my-[1rem]  mx-auto">
            <div className="w-[33%] bg-white p-5 shadow-md rounded-md text-left  flex flex-col gap-5 justify-evenly">
              <div className="text-3xl font-bold text-[#505050]">
                {totalCustomers}
              </div>
              <div className="flex justify-start gap-3 items-center">
                <FaUser />
                <p className="text-[#505050] text-lg">Total Customer</p>
              </div>
            </div>
            <div className="w-[33%] bg-white p-5 shadow-md rounded-md text-left gap-5 flex flex-col justify-evenly">
              <div className="text-3xl font-bold  text-[#505050]">
                {newCustomers}
              </div>
              <div className="flex justify-start gap-3 items-center">
                <FaUser />
                <p className="text-[#505050] text-lg">New Customer</p>
              </div>
            </div>
            <div className="w-[33%] bg-white p-5 shadow-md rounded-md text-left gap-5 flex flex-col justify-evenly">
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
        <div className="border border-[#B5CEF0] rounded-lg mt-2 px-6 py-2 font-inter flex flex-col">
          <div className="flex justify-between items-center ">
            <div className="text-xl font-semibold text-[#212B36]">
              New Customer vs Old Customer
            </div>
            <div>
              <select
                id="month"
                name="month"
                value={monthForGraph}
                onChange={handleMonthChangeForGraph}
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
              <span className="text-sm text-[#5E5E5E] font-[600] ">
                New Customer
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#004AAD] rounded-full mr-2"></div>
              <span className="text-sm text-[#5E5E5E] font-[600]">
                Old Customer
              </span>
            </div>
          </div>
          {/*chart */}

          {dataForOverview.datasets.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-start gap-4">
              <img src={noDataFound} className="w-60 h-auto" />
              <p className="w-full text-center">
                No data to display. Once customers starts visiting this will
                look a lot more exciting.
              </p>
            </div>
          ) : (
            <div className=" lg:h-[24rem] md:h-[16rem] mt-6">
              <BarChart
                data={dataForOverview}
                options={options}
                width={500}
                height={150}
              />
            </div>
          )}
        </div>
        {/*Feedback div */}
        <Feedback />
      </div>
    </div>
  );
};

export default Overview;
