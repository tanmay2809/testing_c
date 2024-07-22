import React from "react";

interface ConfirmCampaignProps {
  backClick: () => void;
}
const ConfirmCampaign: React.FC<ConfirmCampaignProps> = ({backClick}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-[80vh] flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center p-4 bg-[#F5F9FF] rounded-lg text-black">
          <div className="flex-shrink-0">
            <svg
              width="55"
              height="53"
              viewBox="0 0 55 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M55 26.25L48.9 19.275L49.75 10.05L40.725 8L36 0L27.5 3.65L19 0L14.275 7.975L5.25 10L6.1 19.25L0 26.25L6.1 33.225L5.25 42.475L14.275 44.525L19 52.5L27.5 48.825L36 52.475L40.725 44.5L49.75 42.45L48.9 33.225L55 26.25ZM22.725 38.05L13.225 28.525L16.925 24.825L22.725 30.65L37.35 15.975L41.05 19.675L22.725 38.05Z"
                fill="#004AAD"
              />
            </svg>
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
            <svg
              width="55"
              height="50"
              viewBox="0 0 55 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M54.381 42.97C56.1435 46.0944 53.9311 50 50.4109 50H4.58852C1.06155 50 -1.14055 46.0884 0.618491 42.97L23.53 2.34229C25.2933 -0.783593 29.7099 -0.777929 31.47 2.34229L54.381 42.97ZM27.5 34.5703C25.0742 34.5703 23.1077 36.5815 23.1077 39.0625C23.1077 41.5435 25.0742 43.5547 27.5 43.5547C29.9258 43.5547 31.8924 41.5435 31.8924 39.0625C31.8924 36.5815 29.9258 34.5703 27.5 34.5703ZM23.3299 18.4232L24.0382 31.7045C24.0713 32.326 24.5737 32.8125 25.1823 32.8125H29.8178C30.4263 32.8125 30.9287 32.326 30.9619 31.7045L31.6702 18.4232C31.706 17.752 31.1834 17.1875 30.5261 17.1875H24.4739C23.8165 17.1875 23.294 17.752 23.3299 18.4232Z"
                fill="#DBBD1D"
                fill-opacity="0.79"
              />
            </svg>
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
        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-md" onClick={backClick}>
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
