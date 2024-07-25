import { useEffect, useState } from "react";

// components
import PlansComp from "../../component/PlansComp";

//svg
import premium from "/premium.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Plan {
  type: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  trialUsed: boolean;
}

const MyPlans = () => {
  const [switchTab, setSwitchTab] = useState<string>("quarterly");
  const [planDetails, setPlanDetails] = useState<Plan>();

  const resdata = useSelector((state: RootState) => state.resturantdata);

  useEffect(() => {
    setPlanDetails(resdata.data.subscriptionDetails);
  }, [resdata]);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    const additionalOffset = 80;
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - additionalOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else {
      console.warn(`Element with ID "${id}" not found.`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="w-full h-fit relative font-inter">
        <div className="lg:w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 lg:ml-[7%]">
          <div className="w-full px-6 py-4 bg-[#F1F7FF]">
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[1.3rem] font-[600]">
                  {planDetails?.type}
                </h1>
                <p className="text-[1rem]">Current Plan</p>
              </div>
              <div className="w-fit h-fit">
                <button
                  onClick={() => scrollToElement("upgrade")}
                  className="w-[8rem] flex flex-row justify-center items-center gap-2 bg-[#004AAD] text-white  py-1 text-lg font-[500] rounded-[0.5rem]"
                >
                  Upgrade
                </button>
                <img
                  src={premium}
                  className="relative -top-[3rem] -right-[7.1rem] w-7 h-6"
                />
              </div>
            </div>
            <div className="bg-white rounded-xl flex flex-row flex-wrap justify-between w-full h-fit p-[1rem]">
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">
                  Subscription Period
                </p>
                <h1 className="text-base font-semibold">
                  {planDetails &&
                    Math.floor(
                      (new Date(planDetails.endDate).getTime() -
                        new Date(planDetails.startDate).getTime()) /
                        (1000 * 3600 * 24)
                    )}{" "}
                  Days
                </h1>
              </div>
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">Starting Date</p>
                <h1 className="text-base font-semibold">
                  {planDetails && formatDate(planDetails.startDate)}
                </h1>
              </div>
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">Next Billing Date</p>
                <h1 className="text-base font-semibold">
                  {planDetails && formatDate(planDetails.endDate)}
                </h1>
              </div>
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">Payment status</p>
                <h1 className="text-base font-semibold">Pending</h1>
              </div>
              <div className="flex flex-col">
                <p className=" text-[#616161] font-[400]">Status</p>
                <h1 className="text-base font-semibold">
                  <span>{planDetails?.type}</span> (
                  {planDetails &&
                    Math.floor(
                      (new Date(planDetails.endDate).getTime() -
                        new Date(planDetails.startDate).getTime()) /
                        (1000 * 3600 * 24)
                    )}{" "}
                  Days)
                </h1>
              </div>
            </div>
          </div>
          <div className="px-[1rem] md:px-[5rem] w-full flex flex-row flex-wrap">
            <div className="w-full flex flex-row justify-center items-center -mt-2">
              <div className="w-fit h-fit flex flex-row rounded-[2.5rem] border border-1 border-[#000000CC]">
                <button
                  className={`w-fit px-[1.5rem] py-2 font-[500] rounded-[2.5rem] transition-colors duration-500 ${
                    switchTab === "quarterly"
                      ? "bg-[#004AAD] text-white"
                      : "bg-white text-black"
                  } text-[1.25rem]`}
                  onClick={() => setSwitchTab("quarterly")}
                >
                  Quarterly
                </button>
                <button
                  className={`w-fit px-[1.5rem] font-[500] rounded-[2.5rem] transition-colors duration-500 ${
                    switchTab === "annual"
                      ? "bg-[#004AAD] text-white"
                      : "bg-white text-black"
                  } text-[1.25rem]`}
                  onClick={() => setSwitchTab("annual")}
                >
                  Annually (save 44%)
                </button>
              </div>
            </div>
          </div>
          <div id="upgrade"></div>
          <PlansComp switch={switchTab} />
        </div>
      </div>
    </>
  );
};

export default MyPlans;
