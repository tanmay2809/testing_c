import React from "react";

export interface SegmentationPopupProps {
  segmentation: "New" | "Regular" | "Risk" | "Loyal";
}

//data
import {segmentationDetails} from "../constants/index"

const SegmentationPopup: React.FC<SegmentationPopupProps> = ({
  segmentation,
}) => {
  const details = segmentationDetails[segmentation];

  return (
    <div >
      <div className="absolute bg-white border rounded-lg p-4 shadow-lg w-80 h-72 text-left flex flex-col justify-between ">
        <span
          className={`py-1 px-3 w-1/3  text-center rounded-lg text-[0.94rem] font-semibold text-[#4B4B4B] ${[
            details.color,
          ]}}`}
        >
          {details.title}
        </span>
        <p className="mt-2 text-[#505050] text-base pb-2 border-b border-black">
          {details.description}
        </p>
        <p className="mt-2 text-[0.94rem] font-semibold text-[#4B4B4B]">
          Pro Tips
        </p>
        <p className="text-[#505050] text-base">{details.proTip}</p>
        <button className="mt-4 bg-[#004AAD] text-white py-2 px-2 rounded-lg">
          Send Campaign
        </button>
      </div>
    </div>
  );
};

export default SegmentationPopup;
