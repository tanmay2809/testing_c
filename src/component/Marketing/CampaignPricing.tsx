import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { pricingData, Campaigns } from "../../constants";

interface FilterProps {
  isVisible: boolean;
  onClose: () => void;
}

const CampaignPricing: React.FC<FilterProps> = ({ isVisible, onClose }) => {
  const [activePlan, setActivePlan] = useState<"Basic" | "Premium">("Basic");
  const [isClosing, setIsClosing] = useState<boolean>(false);

  if (!isVisible) return null;

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  const getPricing = () => {
    return activePlan === "Basic" ? pricingData.basic : pricingData.premium;
  };

  const currentPricing = getPricing();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-4">
      <div
        className={`bg-white w-[30rem] h-auto px-5 py-3 shadow-lg rounded-lg overflow-y-auto ${
          isClosing ? "slide-out-right" : "slide-in-right"
        }`}
      >
          {/* top div */}
          <div className="flex justify-between items-center pb-3 border-black border-b">
            <div>
              <h2 className="text-[1.5rem] font-semibold">Campaign Pricing</h2>
              <p className="text-lg">Simple pricing for your business</p>
            </div>
            <IoCloseCircle
              onClick={handleCloseModal}
              className="text-3xl cursor-pointer font-extrabold"
            />
          </div>

          <div className="h-[85%] flex flex-col justify-evenly">
          {/*basic and premium buttons div */}
          <div className="w-full flex flex-row justify-center items-center mt-2 ">
            <div className="w-fit h-fit flex flex-row rounded-[2.5rem] border border-1 border-[#000000CC]">
              <button
                className={`w-fit px-[1.2rem] py-1 font-[500] rounded-[2.5rem] transition-colors duration-500 ${
                  activePlan === "Basic"
                    ? "bg-[#004AAD] text-white"
                    : "bg-white text-black"
                } text-[1rem]`}
                onClick={() => setActivePlan("Basic")}
              >
                Basic
              </button>
              <button
                className={`w-fit px-[1.2rem] font-[500] rounded-[2.5rem] transition-colors duration-500 ${
                  activePlan === "Premium"
                    ? "bg-[#004AAD] text-white"
                    : "bg-white text-black"
                } text-[1rem]`}
                onClick={() => setActivePlan("Premium")}
              >
                Premium
              </button>
            </div>
          </div>

          {/*pricing divs */}
          <div className="flex justify-between mb-2 gap-2">
            <div className="h-[6rem] w-1/2 bg-[#FFA858] py-4 rounded-lg flex flex-col justify-between gap-2 px-2 mt-2">
              <p className="text-lg">Utility</p>
              <h2 className="text-lg font-medium">
                ₹ {currentPricing[0].utility}/ Campaign Send
              </h2>
            </div>
            <div className="h-[6rem] w-1/2 bg-[#FFCF27] py-4 rounded-lg flex flex-col justify-between gap-2 px-2 mt-2">
              <p className="text-lg">Marketing</p>
              <h2 className="text-lg font-medium">
                ₹ {currentPricing[1].marketing}/ Campaign Send
              </h2>
            </div>
          </div>

          {/*questions and there answers */}
          <div className="mb-2 bg-[#FFF2E6] p-4 rounded-md">
            <h3 className="text-md font-bold">{Campaigns.Questions[1]}</h3>
            <p className="text-sm">{Campaigns.answers[1]} </p>
          </div>
          <div className="mb-2 bg-[#FFCF2759] p-4 rounded-md">
            <h3 className="text-md font-bold">{Campaigns.Questions[2]}</h3>
            <p className="text-sm">{Campaigns.answers[2]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPricing;
