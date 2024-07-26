// VisitPopup.tsx
import React from "react";
import { weekVisit, monthlyVisit } from "../../constants/index";

interface VisitPopupProps {
  type: "weekend" | "monthly";
}
type VisitData = {
  headline: string;
  body: string;
};

const VisitPopup: React.FC<VisitPopupProps> = ({ type }) => {
  const visitData: VisitData = type === "weekend" ? weekVisit : monthlyVisit;
  return (
    <>
      <div className="absolute bg-white p-4 rounded-lg w-[300px] z-[100]">
        <h2 className="text-base font-semibold text-[#4B4B4B] bg-[#D4E7FF] w-fit px-2 rounded-md">
          {visitData.headline}
        </h2>
        <p className="text-[#505050] text-base ">{visitData.body}</p>
      </div>
    </>
  );
};

export default VisitPopup;
