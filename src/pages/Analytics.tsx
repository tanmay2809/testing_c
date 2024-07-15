import { useState } from "react";

//chartjs
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

//icons
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

//other components
import BarChart from "../component/Customer/BarChart";
import SegmentationPopup from "../component/Customer/SegmentationPopup";

//data
import { months } from "../constants/index";

//images
import feedback from "../assets/undraw_feedback_re_urmj 1.png";
import VisitPopup from "../component/VisitPopup";

ChartJS.register(ArcElement, Tooltip, Legend);

//for gender graph
const dataForDoughnut = {
  labels: ["Female", "Male", "Others"],
  datasets: [
    {
      label: "Customer Gender",
      data: [12, 19, 4],
      backgroundColor: ["#34C759", "#F9AB35", "#F93535"],
      borderColor: ["#34C759", "#F9AB35", "#F93535"],
      borderWidth: 1,
    },
  ],
};
const optionsForDoughnut = {
  plugins: {
    legend: {
      display: false, // Hides the legend
    },
  },
};

//for customer visit graph
const dataForBar = {
  labels: ["Weekdays", "Weekends"],
  datasets: [
    {
      label: "Customer Visits",
      data: [12, 19],
      backgroundColor: ["#FB7311", "#FFC700"],
      barThickness: 80,
      borderRadius: {
        topLeft: 10,
        topRight: 10,
      },
    },
  ],
};
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
  const [hoveredSegmentation, setHoveredSegmentation] = useState<
    string | number | null
  >(null);
  const [segmentationVisible, setSegmentationVisible] =
    useState<boolean>(false);
  const [visitBox, setVisitBox] = useState<string | null>(null);
  console.log(segmentationVisible);

  return (
    <div className="w-full h-fit relative ">
      <div className=" w-[93%] h-fit px-[2rem] py-[1rem]  gap-10 ml-[7%] ">
        <div className="container mx-auto font-inter">
          <h1 className="text-xl font-semibold">Customer Segmentation</h1>
          <div className="mb-2">
            <span className="text-sm">
              Total Customer Database:{" "}
              <strong className="text-[#004AAD]">100 Record</strong>
            </span>
          </div>
          <div className="lg:flex md:flex lg:text-left text-[#505050]">
            <div
              className={`lg:w-1/4 bg-[#BEFED4] p-4 rounded-lg mx-2 h-32 flex flex-col justify-between px-6 mt-2  ${
                hoveredSegmentation === 1 && "z-[90]"
              }`}
              onMouseEnter={() => setHoveredSegmentation(1)}
              onMouseLeave={() => setHoveredSegmentation(null)}
            >
              <p className="">New Customers</p>
              <h2 className="text-3xl font-bold">60%</h2>
              <p className="font-bold">60 customers</p>
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
              className={`lg:w-1/4 bg-[#FADBFF] p-4 rounded-lg mx-2 h-32 flex flex-col justify-between px-6 mt-2 ${
                hoveredSegmentation === 3 && "z-[90]"
              }`}
              onMouseEnter={() => setHoveredSegmentation(3)}
              onMouseLeave={() => setHoveredSegmentation(null)}
            >
              <p className="">Regular Customers</p>
              <h2 className="text-3xl font-bold">20%</h2>
              <p className="font-bold">20 customers</p>
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
              className={`lg:w-1/4 bg-[#F9FFB9]  p-4 rounded-lg mx-2 h-32 flex flex-col justify-between px-6 mt-2  ${
                hoveredSegmentation === 2 && "z-[90]"
              }`}
              onMouseEnter={() => setHoveredSegmentation(2)}
              onMouseLeave={() => setHoveredSegmentation(null)}
            >
              <p className="">Loyal Customers</p>
              <h2 className="text-3xl font-bold">5%</h2>
              <p className="font-bold">5 customers</p>
            </div>

            <div
              className={`lg:w-1/4 bg-[#FEC8C8] p-4 rounded-lg mx-2 h-32 flex flex-col justify-between px-6 mt-2 ${
                hoveredSegmentation === 4 && "z-[90]"
              }`}
              onMouseEnter={() => setHoveredSegmentation(4)}
              onMouseLeave={() => setHoveredSegmentation(null)}
            >
              <p className="">Customers at risk</p>
              <h2 className="text-3xl font-bold">15%</h2>
              <p className="font-bold">15 customers</p>
            </div>
          </div>
        </div>

        {/*Customer visit weekends vs weekdays */}
        <div className="lg:flex gap-4  font-inter">
          <div className="bg-[#F1F7FF] rounded-lg p-6 lg:w-1/2 flex flex-col justify-evenly gap-4 h-96 mt-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Customer Visit
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={() => setVisitBox("weekend")}
                  onMouseLeave={() => setVisitBox(null)}
                >
                  <path
                    d="M12 3C10.22 3 8.47991 3.52784 6.99987 4.51677C5.51983 5.50571 4.36628 6.91131 3.68509 8.55585C3.0039 10.2004 2.82567 12.01 3.17294 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89472 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.387 3 12 3ZM12 19.5C10.5166 19.5 9.0666 19.0601 7.83323 18.236C6.59986 17.4119 5.63856 16.2406 5.07091 14.8701C4.50325 13.4997 4.35473 11.9917 4.64411 10.5368C4.9335 9.08197 5.64781 7.74559 6.6967 6.6967C7.7456 5.64781 9.08197 4.9335 10.5368 4.64411C11.9917 4.35472 13.4997 4.50325 14.8701 5.0709C16.2406 5.63856 17.4119 6.59985 18.236 7.83322C19.0601 9.06659 19.5 10.5166 19.5 12C19.5 13.9891 18.7098 15.8968 17.3033 17.3033C15.8968 18.7098 13.9891 19.5 12 19.5Z"
                    fill="#231F20"
                  />
                  <path
                    d="M11.9994 10.275C11.8005 10.275 11.6097 10.354 11.4691 10.4947C11.3284 10.6353 11.2494 10.8261 11.2494 11.025V16.125C11.2494 16.3239 11.3284 16.5147 11.4691 16.6553C11.6097 16.796 11.8005 16.875 11.9994 16.875C12.1983 16.875 12.3891 16.796 12.5297 16.6553C12.6704 16.5147 12.7494 16.3239 12.7494 16.125V11.025C12.7494 10.8261 12.6704 10.6353 12.5297 10.4947C12.3891 10.354 12.1983 10.275 11.9994 10.275ZM11.9994 7.19998C11.7963 7.20762 11.6039 7.2927 11.4617 7.43775C11.3194 7.58281 11.2381 7.77684 11.2344 7.97998V8.09998C11.234 8.19784 11.254 8.29469 11.2932 8.38439C11.3323 8.47408 11.3897 8.55465 11.4616 8.62097C11.5336 8.68728 11.6185 8.73789 11.7111 8.76957C11.8037 8.80125 11.9019 8.81331 11.9994 8.80498C12.1959 8.79756 12.3824 8.71616 12.5215 8.57708C12.6606 8.43801 12.742 8.25152 12.7494 8.05498V7.87498C12.75 7.77966 12.7304 7.68529 12.6919 7.5981C12.6533 7.5109 12.5968 7.43285 12.5259 7.36908C12.4551 7.30531 12.3715 7.25727 12.2808 7.22813C12.19 7.19898 12.0941 7.18939 11.9994 7.19998Z"
                    fill="#231F20"
                  />
                </svg>
                <div className="absolute left-[21rem]">
                  {visitBox === "weekend" ? <VisitPopup type="weekend" /> : ""}
                </div>
              </h3>
              <p className="text-base font-medium">Weekdays vs Weekends</p>
            </div>
            <div className="relative flex justify-center items-center mb-4">
              <div className="w-full h-full">
                <BarChart data={dataForBar} options={optionsForBar}  width={200} height={75}/>
              </div>
            </div>
          </div>

          {/*customer visit monthly pattern */}
          <div className="bg-[#F1F7FF] rounded-lg p-6 mt-4 lg:w-1/2 flex flex-col justify-evenly h-96">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                Customer Visit
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={() => setVisitBox("monthly")}
                  onMouseLeave={() => setVisitBox(null)}
                >
                  <path
                    d="M12 3C10.22 3 8.47991 3.52784 6.99987 4.51677C5.51983 5.50571 4.36628 6.91131 3.68509 8.55585C3.0039 10.2004 2.82567 12.01 3.17294 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89472 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.387 3 12 3ZM12 19.5C10.5166 19.5 9.0666 19.0601 7.83323 18.236C6.59986 17.4119 5.63856 16.2406 5.07091 14.8701C4.50325 13.4997 4.35473 11.9917 4.64411 10.5368C4.9335 9.08197 5.64781 7.74559 6.6967 6.6967C7.7456 5.64781 9.08197 4.9335 10.5368 4.64411C11.9917 4.35472 13.4997 4.50325 14.8701 5.0709C16.2406 5.63856 17.4119 6.59985 18.236 7.83322C19.0601 9.06659 19.5 10.5166 19.5 12C19.5 13.9891 18.7098 15.8968 17.3033 17.3033C15.8968 18.7098 13.9891 19.5 12 19.5Z"
                    fill="#231F20"
                  />
                  <path
                    d="M11.9994 10.275C11.8005 10.275 11.6097 10.354 11.4691 10.4947C11.3284 10.6353 11.2494 10.8261 11.2494 11.025V16.125C11.2494 16.3239 11.3284 16.5147 11.4691 16.6553C11.6097 16.796 11.8005 16.875 11.9994 16.875C12.1983 16.875 12.3891 16.796 12.5297 16.6553C12.6704 16.5147 12.7494 16.3239 12.7494 16.125V11.025C12.7494 10.8261 12.6704 10.6353 12.5297 10.4947C12.3891 10.354 12.1983 10.275 11.9994 10.275ZM11.9994 7.19998C11.7963 7.20762 11.6039 7.2927 11.4617 7.43775C11.3194 7.58281 11.2381 7.77684 11.2344 7.97998V8.09998C11.234 8.19784 11.254 8.29469 11.2932 8.38439C11.3323 8.47408 11.3897 8.55465 11.4616 8.62097C11.5336 8.68728 11.6185 8.73789 11.7111 8.76957C11.8037 8.80125 11.9019 8.81331 11.9994 8.80498C12.1959 8.79756 12.3824 8.71616 12.5215 8.57708C12.6606 8.43801 12.742 8.25152 12.7494 8.05498V7.87498C12.75 7.77966 12.7304 7.68529 12.6919 7.5981C12.6533 7.5109 12.5968 7.43285 12.5259 7.36908C12.4551 7.30531 12.3715 7.25727 12.2808 7.22813C12.19 7.19898 12.0941 7.18939 11.9994 7.19998Z"
                    fill="#231F20"
                  />
                </svg>
                <div className="absolute right-0">
                  {visitBox === "monthly" ? <VisitPopup type="monthly" /> : ""}
                </div>
              </h3>

              <p className="text-base font-medium">
                Monthly customer visiting pattern
              </p>
            </div>
            <div className="relative flex justify-center items-center mb-4">
              <div className="w-full h-full"></div>
            </div>
          </div>
        </div>

        {/*pie chart and customer related div */}
        <div className="lg:flex  gap-4 ">
          {/* Customer Gender Card */}
          <div className="bg-[#F1F7FF] rounded-lg p-6 lg:w-1/3 flex flex-col justify-between mt-4">
            <h3 className="text-base font-bold mb-4">Customer Gender</h3>
            <div className="relative flex justify-center items-center mb-4">
              <div>
                <div className="w-full h-full ">
                  <Doughnut
                    data={dataForDoughnut}
                    options={optionsForDoughnut}
                    height={150}
                    width={250}
                  />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">100</span>
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
                <p className="text-[#434A5E]">08 Celebration</p>{" "}
              </div>
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
            <div className="border-t border-gray-200 pt-10 flex flex-col  gap-12">
              <div className="flex justify-between items-center mb-4 xsm:flex-col">
                <div className="flex items-center justify-start gap-4 lg:w-3/5">
                  <p className="text-[2.5rem] text-[#3A9E3E]">02</p>
                  <p className="text-sm">
                    <span className="text-[#004AAD] font-semibold ">
                      Birthdays
                    </span>
                    <br />6 Customers have their birthdays
                  </p>
                </div>
                <button className=" bg-[#004AAD] text-white rounded-xl text-sm px-[0.3rem] py-[0.3rem]">
                  Send Campaign
                </button>
              </div>
              <div className="flex justify-between items-center ">
                <div className="flex items-center justify-start gap-4 lg:w-3/5">
                  <p className="text-[2.5rem] text-[#F9AB35]">02</p>
                  <p className="text-sm">
                    <span className="text-[#004AAD] font-semibold text-sm">
                      Anniversary
                    </span>
                    <br />8 Customers have their Anniversary
                  </p>
                </div>
                <button className=" bg-[#004AAD] text-white rounded-xl text-sm px-[0.3rem] py-[0.3rem]">
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
                    <p className="text-[2.5rem] text-[#3A9E3E]">12%</p>
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
                    <p className="text-[2.5rem] text-[#F9AB35]">10%</p>
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
        <div className="py-4 px-8 flex items-center justify-evenly gap-10 border border-[#505050] font-inter mt-4">
          <img
            src={feedback}
            alt="Feedback image"
            className="w-[70px] h-auto"
          />
          <div className="flex flex-col gap-4">
            <p className=" text-base font-medium text-[#555555]">
              Help us to make snackBAE better by adding a feedback or request
              features that are best for your business
            </p>
            <p className="text-[#004AAD] text-base font-bold">Give Feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
