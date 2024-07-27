import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Charts from "../../component/Customer/Charts";

//chartjs

import { BarChartc } from "../../component/Customer/Barchartc";

//icons
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

//other components
import BarChart from "../../component/Customer/BarChart";
import SegmentationPopup from "../../component/Customer/SegmentationPopup";

//data
import { months } from "../../constants/index";

//images
import VisitPopup from "../../component/Customer/VisitPopup";
import Feedback from "../../component/outlet/Feedback";

//svg
import i from "/i.svg";

const optionsForBar = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Analytics: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.resturantdata);
  console.log("resData: ", data);

  //weekdays vs weekends
  const [weekMonth, setWeekMonth] = useState<string>(
    months[new Date().getMonth()]
  );
  const [weekendVisit, setWeekendVisit] = useState<number>(0);
  const [weekdayVisit, setWeekdayVisit] = useState<number>(0);

  const handleWeekMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setWeekMonth(e.target.value);
  };

  const index = (month: string): number => months.indexOf(month);

  const countVisits = (
    year: number,
    monthIndex: number,
    data: any
  ): { weekendVisits: number; weekdayVisits: number } => {
    let weekendCount = 0;
    let weekdayCount = 0;

    data?.forEach((customer: any) => {
      customer.visits.forEach((visit: string) => {
        const visitDate = new Date(visit);
        if (
          visitDate.getMonth() === monthIndex &&
          visitDate.getFullYear() === year
        ) {
          const dayOfWeek = visitDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekendCount++;
          } else {
            weekdayCount++;
          }
        }
      });
    });

    return { weekendVisits: weekendCount, weekdayVisits: weekdayCount };
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const selectedMonthIndex = index(weekMonth);

    const { weekendVisits, weekdayVisits } = countVisits(
      currentYear,
      selectedMonthIndex,
      data?.customerData
    );

    setWeekendVisit(weekendVisits);
    setWeekdayVisit(weekdayVisits);

    console.log(weekendVisit, " ", weekdayVisit);
  }, [weekMonth, data?.customerData]);

  const dataForBar = {
    labels: ["Weekdays", "Weekends"],
    datasets: [
      {
        label: "Customer Visits",
        data: [weekdayVisit, weekendVisit],
        backgroundColor: ["#FB7311", "#FFC700"],
        barThickness: 70,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
        },
      },
    ],
  };

  //for celebration
  const [celebrationMonth, setCelebrationMonth] = useState<string>(
    months[new Date().getMonth()]
  );
  const [birthdays, setBirthdays] = useState<number>(0);
  const [anniversaries, setAnniversaries] = useState<number>(0);
  const handleCelebMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCelebrationMonth(e.target.value);
  };
  useEffect(() => {
    const monthIndex = months.indexOf(celebrationMonth);
    console.log("mi : ", monthIndex);

    const filteredBirthdays: number = data?.customerData?.filter((customer: any) => {
      if (!customer?.userId?.birthday) {
        return false; 
      }
      const [birthDay, birthMonth, birthYear] = customer.userId.birthday.split("/").map(Number);
      console.log(birthDay, birthMonth, birthYear);
      return birthMonth - 1 === monthIndex;
    })?.length ?? 0;

    const filteredAnniversaries: number = data?.customerData?.filter((customer: any) => {
      if (!customer?.userId?.anniversary) {
        return false;
      }
    
      const [annDay, annMonth, annYear] = customer.userId.anniversary.split("/").map(Number);
      console.log(annDay, annMonth, annYear);
      return annMonth - 1 === monthIndex;
    })?.length ?? 0;

    setBirthdays(filteredBirthdays);
    setAnniversaries(filteredAnniversaries);
    // console.log(birthdays,"  ",anniversaries);
  }, [celebrationMonth, data.customerData]);

  //for growth rate
  const [growthMonth, setGrowthMonth] = useState<string>(
    months[new Date().getMonth()]
  );
  const [newCustomers, setNewCustomers] = useState<number>(0);
  const [regularCustomers, setRegularCustomers] = useState<number>(0);
  const [newCustomersDiff, setNewCustomersDiff] = useState<number>(0);
  const [regularCustomersDiff, setRegularCustomersDiff] = useState<number>(0);
  const handleGrowthMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGrowthMonth(e.target.value);
  };

  const getMonthIndex = (month: string): number => months.indexOf(month);

  const filterCustomers = (
    year: number,
    monthIndex: number,
    data: any
  ): { newCustomers: number; regularCustomers: number } => {
    const newCustomers = data?.filter((customer: any) => {
      const firstVisitDate = new Date(customer?.visits[0]);
      return (
        firstVisitDate.getMonth() === monthIndex &&
        firstVisitDate.getFullYear() === year
      );
    }).length;

    const regularCustomers = data?.filter((customer: any) => {
      const visitCount = customer.visits.filter((visit: string) => {
        const visitDate = new Date(visit);
        return (
          visitDate.getMonth() === monthIndex &&
          visitDate.getFullYear() === year
        );
      }).length;
      return visitCount > 3;
    }).length;

    return { newCustomers, regularCustomers };
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const monthIndex = getMonthIndex(growthMonth);
    console.log(monthIndex);
    const selectedYear =
      currentDate.getMonth() === monthIndex ? currentYear : currentYear - 1;
    const prevMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1;
    const prevMonthYear = monthIndex === 0 ? selectedYear - 1 : selectedYear;

    const currentMonthData = filterCustomers(
      selectedYear,
      monthIndex,
      data?.customerData
    );
    const prevMonthData = filterCustomers(
      prevMonthYear,
      prevMonthIndex,
      data?.customerData
    );

    setNewCustomers(currentMonthData?.newCustomers);
    console.log(newCustomers, "  ", prevMonthData?.newCustomers);
    setRegularCustomers(currentMonthData?.regularCustomers);
    console.log(regularCustomers, " ", prevMonthData?.regularCustomers);

    setNewCustomersDiff(
      prevMonthData.newCustomers && newCustomers
        ? ((newCustomers - prevMonthData?.newCustomers) /
          prevMonthData?.newCustomers) *
        100
        : prevMonthData.newCustomers == 0 && newCustomers
          ? 100
          : 0
    );

    setRegularCustomersDiff(
      prevMonthData?.regularCustomers && regularCustomers
        ? ((currentMonthData?.regularCustomers -
          prevMonthData?.regularCustomers) /
          prevMonthData?.regularCustomers) *
        100
        : prevMonthData.regularCustomers == 0 && regularCustomers
          ? 100
          : 0
    );
  }, [growthMonth, data?.customerData]);

  const [hoveredSegmentation, setHoveredSegmentation] = useState<
    string | number | null
  >(null);
  const [segmentationVisible, setSegmentationVisible] =
    useState<boolean>(false);
  const [visitBox, setVisitBox] = useState<string | null>(null);
  console.log(segmentationVisible);

  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()]
  );
  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  // const [visitBox, setVisitBox] = useState<string | null>(null);
  const [dailyVisits, setDailyVisits] = useState<{ [key: string]: number }>({});

  const countDailyVisits = (data: any) => {
    const visitCounts: { [key: string]: number } = {};
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Initialize the visitCounts with all days of the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const key = `${day} ${months[currentMonth]}`;
      visitCounts[key] = 0;
    }

    data?.forEach((customer: any) => {
      customer.visits.forEach((visit: string) => {
        const visitDate = new Date(visit);
        if (
          visitDate.getMonth() === currentMonth &&
          visitDate.getFullYear() === currentYear
        ) {
          const day = visitDate.getDate();
          const key = `${day} ${months[currentMonth]}`;
          visitCounts[key]++;
        }
      });
    });

    setDailyVisits(visitCounts);
  };

  useEffect(() => {
    countDailyVisits(data?.customerData);
  }, [data?.customerData]);

  

  return (
    <div className="w-full h-fit relative ">
      <div className=" lg:w-[93%] h-fit px-[2rem] py-[1rem]  gap-10 lg:ml-[7%] ">
        <div className="container mx-auto font-inter">
          <h1 className="text-xl font-semibold">Customer Segmentation</h1>
          <div className="mb-2">
            <span className="text-sm">
              Total Customer Database:{" "}
              <strong className="text-[#004AAD]">
                {data?.customerData?.length} Record
              </strong>
            </span>
          </div>
          <div className="lg:flex md:flex lg:text-left text-[#505050] sm:text-sm ">
            <div
              className={`lg:w-1/4 bg-[#BEFED4] p-4 rounded-lg mx-2 h-32 flex flex-col justify-between px-6 mt-2  sm:h-40 sm:w-1/4 ${hoveredSegmentation === 1 && "z-[90]"
                }`}
              onMouseEnter={() => setHoveredSegmentation(1)}
              onMouseLeave={() => setHoveredSegmentation(null)}
            >
              <p className="">New Customers</p>
              <h2 className="text-3xl font-bold">{data?.newCustomers}%</h2>
              <p className="font-bold">
                {(data?.newCustomers / 100) * data?.customerData?.length}{" "}
                customers
              </p>
            </div>
            {hoveredSegmentation === 1 && (
              <div>
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[80] p-5"></div>
                <div className=" relative -left-1 ">
                  <SegmentationPopup
                    segmentation={"New"}
                    setVisibility={setSegmentationVisible}
                    hoveredSegmentation={setHoveredSegmentation}
                    segIndex={1}
                  />
                </div>
              </div>
            )}
            {hoveredSegmentation === 2 && (
              <div>
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[80] p-5"></div>
                <div className=" relative -left-2 ">
                  <SegmentationPopup
                    segmentation={"Loyal"}
                    setVisibility={setSegmentationVisible}
                    hoveredSegmentation={setHoveredSegmentation}
                    segIndex={2}
                  />
                </div>
              </div>
            )}
            <div
              className={`lg:w-1/4 bg-[#FADBFF] p-4 rounded-lg mx-2 h-32 flex flex-col justify-between px-6 mt-2 sm:h-40 sm:w-1/4 ${hoveredSegmentation === 3 && "z-[90]"
                }`}
              onMouseEnter={() => setHoveredSegmentation(3)}
              onMouseLeave={() => setHoveredSegmentation(null)}
            >
              <p className="">Regular Customers</p>
              <h2 className="text-3xl font-bold">{data?.regularCustomers}%</h2>
              <p className="font-bold">
                {(data?.regularCustomers / 100) * data?.customerData?.length}{" "}
                customers
              </p>
            </div>
            {hoveredSegmentation === 3 && (
              <div>
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[80] p-5"></div>
                <div className="relative -left-1  ">
                  <SegmentationPopup
                    setVisibility={setSegmentationVisible}
                    hoveredSegmentation={setHoveredSegmentation}
                    segIndex={3}
                    segmentation={"Regular"}
                  />
                </div>
              </div>
            )}
            {hoveredSegmentation === 4 && (
              <div>
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[80] p-5"></div>
                <div className=" relative -left-2 ">
                  <SegmentationPopup
                    segmentation={"Risk"}
                    setVisibility={setSegmentationVisible}
                    hoveredSegmentation={setHoveredSegmentation}
                    segIndex={4}
                  />
                </div>
              </div>
            )}
            <div
              className={`lg:w-1/4 bg-[#F9FFB9]  p-4 rounded-lg mx-2 h-32 flex flex-col justify-between px-6 mt-2 sm:h-40 sm:w-1/4 ${hoveredSegmentation === 2 && "z-[90]"
                }`}
              onMouseEnter={() => setHoveredSegmentation(2)}
              onMouseLeave={() => setHoveredSegmentation(null)}
            >
              <p className="">Loyal Customers</p>
              <h2 className="text-3xl font-bold">{data?.loyalCustomers}%</h2>
              <p className="font-bold">
                {(data?.loyalCustomers / 100) * data?.customerData?.length}{" "}
                customers
              </p>
            </div>

            <div
              className={`lg:w-1/4 bg-[#FEC8C8] p-4 rounded-lg mx-2 h-32 flex flex-col justify-between px-6 mt-2 sm:h-40 sm:w-1/4 ${hoveredSegmentation === 4 && "z-[90]"
                }`}
              onMouseEnter={() => setHoveredSegmentation(4)}
              onMouseLeave={() => setHoveredSegmentation(null)}
            >
              <p className="">Customers at risk</p>
              <h2 className="text-3xl font-bold">{data?.riskCustomers}%</h2>
              <p className="font-bold">
                {(data?.riskCustomers / 100) * data?.customerData?.length}{" "}
                customers
              </p>
            </div>
          </div>
        </div>

        {/*Customer visit weekends vs weekdays */}
        <div className="lg:flex gap-4 w-full h-fit  font-inter">
          <div className="bg-[#F1F7FF] relative rounded-lg p-6 lg:w-1/2 flex flex-col justify-evenly gap-4 h-96 mt-4 overflow-x-hidden">
            <div className="w-full h-full flex justify-between">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  Customer Visit
                  <div
                    onMouseEnter={() => setVisitBox("weekend")}
                    onMouseLeave={() => setVisitBox(null)}
                    className="z-[81]"

                  >
                    <img src={i} />
                  </div>
                  {visitBox === "weekend" && (
                    <div>
                      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[50] p-5"></div>{" "}
                      <div className="relative ">
                        <VisitPopup type="weekend" />
                      </div>
                    </div>
                  )}
                </h3>
                <p className="text-base font-medium">Weekdays vs Weekends</p>
              </div>
              {/* Dropdown Button */}

              <select
                id="month"
                name="month"
                value={weekMonth}
                onChange={handleWeekMonthChange}
                className="font-inter px-2 h-[40px] py-2 text-base focus:outline-none sm:text-sm rounded-md border border-black mt-1"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className=" w-full h-fit flex absolute left-4 lg:top-[5rem] md:top-[6rem]  ">
              <div className="w-full h-full lg:block hidden ">
                <BarChart
                  data={dataForBar}
                  options={optionsForBar}
                  width={160}
                  height={80}
                />
              </div>
              <div className="w-full h-full lg:hidden block ">
                <BarChart
                  data={dataForBar}
                  options={optionsForBar}
                  width={160}
                  height={60}
                />
              </div>
            </div>
          </div>

          {/*customer visit monthly pattern */}
          {/* <div className="bg-[#F1F7FF] rounded-lg p-1 mt-4 lg:w-1/2 flex flex-col justify-evenly h-96">
            <div className="px-5 py-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                Customer Visit
                <div
                  onMouseEnter={() => setVisitBox("monthly")}
                  onMouseLeave={() => setVisitBox(null)}
                >
                  <img src={i} />
                </div>
                {visitBox === "monthly" && (
                  <div>
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[50] p-5"></div>{" "}
                    <div className="relative ">
                      <VisitPopup type="monthly" />
                    </div>
                  </div>
                )}
              </h3>

              <p className="text-base font-medium">
                Monthly customer visiting pattern
              </p>
            </div>
            <div className="relative flex justify-center items-center mb-4">
              <div className="w-full h-full overflow-hidden ">
                <BarChartc />
              </div>
            </div>
          </div>
        </div> */}
          <div className="bg-[#F1F7FF] rounded-lg p-1 mt-4 lg:w-1/2 flex flex-col justify-evenly h-96">
            <div className="px-5 py-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                Customer Visit
                <div
                  onMouseEnter={() => setVisitBox("monthly")}
                  onMouseLeave={() => setVisitBox(null)}
                  className="z-[81]"
                >
                  <img src={i} />
                </div>
                {visitBox === "monthly" && (
                  <div>
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[50] p-5"></div>{" "}
                    <div className="relative ">
                      <VisitPopup type="monthly" />
                    </div>
                  </div>
                )}
              </h3>

              <p className="text-base font-medium">
                Monthly customer visiting pattern
              </p>
            </div>
            <div className="relative flex justify-center items-center mb-4">
              <div className="w-full h-full overflow-hidden ">
                <BarChartc dailyVisits={dailyVisits} />
              </div>
            </div>
          </div>
        </div>

        {/*pie chart and customer related div */}
        <div className="lg:flex gap-4">
          {/* Customer Gender Card */}
          <div className="bg-[#F1F7FF] overflow-hidden rounded-lg p-6 lg:w-1/3 flex flex-col justify-between mt-4">
            <h3 className="text-base font-bold mb-4">Customer Gender</h3>
            <div className="relative flex justify-center items-center mb-4">
              <div>
                <div className="w-full h-full ml-[12%] ">
                  <Charts male={100} female={50} other={50} />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">
                    {data?.customerData?.length}
                  </span>
                  <p className="text-sm text-gray-600">Customers</p>
                </div>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="flex items-center">
                <span className="block w-3 h-3 bg-[#34C759] rounded-full mr-2"></span>
                <span>Female</span>
              </div>
              <div className="flex items-center">
                <span className="block w-3 h-3 bg-[#F9AB35] rounded-full mr-2"></span>
                <span>Male</span>
              </div>
              <div className="flex items-center">
                <span className="block w-3 h-3 bg-[#F93535] rounded-full mr-2"></span>
                <span>Others</span>
              </div>
            </div>
          </div>

          {/* Customer Celebration Card */}
          <div className="bg-[#F1F7FF] rounded-lg p-6 lg:w-1/3 font-inter mt-4">
            <div className="flex justify-between items-start pb-4">
              <div className=" mb-4">
                <h3 className="text-base font-bold mb-2">
                  Customer Celebration
                </h3>
                <p className="text-[#434A5E]">
                  {birthdays + anniversaries} Celebration
                </p>{" "}
              </div>
              <select
                id="month"
                name="month"
                value={celebrationMonth}
                onChange={handleCelebMonthChange}
                className="font-inter px-2 py-2 text-base focus:outline-none sm:text-sm rounded-md border border-black mt-1"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="border-t border-gray-200 pt-10 flex flex-col  gap-12">
              <div className="flex justify-between items-center mb-4 xsm:flex-col">
                <div className="flex items-center justify-start gap-4 lg:w-3/5">
                  <p className="text-[2.5rem] text-[#3A9E3E]">{birthdays}</p>
                  <p className="text-sm">
                    <span className="text-[#004AAD] font-semibold ">
                      Birthdays
                    </span>
                    <br />
                    {birthdays} Customers have their birthdays
                  </p>
                </div>
                <button className=" bg-[#004AAD] text-white rounded-xl text-sm px-[0.5rem] py-[0.4rem]">
                  Send Campaign
                </button>
              </div>
              <div className="flex justify-between items-center ">
                <div className="flex items-center justify-start gap-4 lg:w-3/5">
                  <p className="text-[2.5rem] text-[#F9AB35]">
                    {anniversaries}
                  </p>
                  <p className="text-sm">
                    <span className="text-[#004AAD] font-semibold text-sm">
                      Anniversary
                    </span>
                    <br />
                    {anniversaries} Customers have their Anniversary
                  </p>
                </div>
                <button className=" bg-[#004AAD] text-white rounded-xl text-sm px-[0.5rem] py-[0.4rem]">
                  Send Campaign
                </button>
              </div>
            </div>
          </div>

          {/* Customer Growth Rate Card */}
          <div className="bg-[#F1F7FF]  rounded-lg p-6 lg:w-1/3 font-inter mt-4">
            <div className="flex justify-between items-start ">
              <div className=" mb-3 pr-10">
                <h3 className="text-base font-bold mb-2">
                  Customer Growth Rate
                </h3>
                <p className="text-[#434A5E]">
                  Customer growth rate at your business
                </p>
              </div>
              <select
                id="month"
                name="month"
                value={growthMonth}
                onChange={handleGrowthMonthChange}
                className="font-inter px-2 py-2 text-base focus:outline-none rounded-md border border-black mt-1"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="border-t border-gray-200 pt-10 flex flex-col justify-between gap-12">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center justify-start gap-4">
                  <div className="flex items-center ">
                    <p className="text-[2.5rem] text-[#3A9E3E]">
                      {newCustomersDiff}%
                    </p>
                    <FaArrowUpLong className="text-2xl text-[#3A9E3E]" />
                  </div>
                  <p className="text-sm">
                    <span className="text-[#004AAD] font-semibold ">
                      New Customers
                    </span>
                    <br />
                    New customer growth rate at your business in selected month
                  </p>
                </div>
              </div>
              <div className="lg:flex justify-between items-center">
                <div className="flex items-center justify-start gap-4">
                  <div className="flex items-center ">
                    <p className="text-[2.5rem] text-[#F9AB35]">
                      {regularCustomersDiff}%
                    </p>
                    <FaArrowDownLong className="text-2xl text-[#F9AB35]" />
                  </div>
                  <p className="text-sm">
                    <span className="text-[#004AAD] font-semibold text-sm">
                      Regular Customers
                    </span>
                    <br />
                    Regular customer growth rate at your business in selected
                    month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Feedback div */}
        <Feedback />
      </div>
    </div>
  );
};

export default Analytics;
