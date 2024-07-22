import React from "react";

interface ConfirmCampaignProps {
  backClick: () => void;
}

//svg
import caution from "/Caution.svg";
import verifiedTick from "/verifiedTick.svg";

const ConfirmCampaign: React.FC<ConfirmCampaignProps> = ({ backClick }) => {
  return (
    <div className=" mt-10 p-6 bg-white rounded-lg shadow-md h-[80vh] flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center p-4 bg-[#F5F9FF] rounded-lg text-black">
          <div className="flex-shrink-0">
            <img src={verifiedTick} />
          </div>
          <div className="ml-3">
            <p className="text-base font-medium ">
              Your campaign is successfully scheduled
            </p>
            <p className="text-base font-medium">
              Please note Meta is solely responsible for campaign status. We do
              not make the decisions.
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center p-4 bg-[#F5F9FF] rounded-lg text-black">
          <div className="flex-shrink-0">
            <img src={caution} />
          </div>
          <div className="ml-3">
            <p className="text-base font-medium">
              Please maintain sufficient balance in marketing wallet during
              campaign activation otherwise campaign will not be activated
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <button
          className="px-4 py-2 bg-red-100 text-red-700 rounded-md"
          onClick={backClick}
        >
          Back
        </button>
        <button className="px-4 py-2 bg-[#004AAD] text-white rounded-md ">
          Manage Campaign
        </button>
      </div>
    </div>
  );
};

export default ConfirmCampaign;
