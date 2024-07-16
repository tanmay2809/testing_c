import React, { useState } from "react";

interface SwitchOfferProps {
  isActive: boolean; // Adjust the type as needed
}

const Switch: React.FC<SwitchOfferProps> = ({}) => {
  const [switc, setSwitch] = useState(false);

  const switch1 = () => {
    setSwitch(!switc);
  };

  return (
    <div>
      {!switc ? (
        <div
          className="w-[40px] h-[22px] bg-slate-400 rounded-full flex items-center cursor-pointer"
          onClick={switch1}
        >
          <div className="size-[18px] bg-white rounded-full ml-[0.15rem]"></div>
        </div>
      ) : (
        <div
          className="w-[40px] h-[22px] bg-green-400 rounded-full flex items-center cursor-pointer"
          onClick={switch1}
        >
          <div className="size-[18px] bg-white rounded-full ml-5"></div>
        </div>
      )}
    </div>
  );
};

export default Switch;
