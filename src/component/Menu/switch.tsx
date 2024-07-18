import React, { useState } from "react";

interface SwitchOfferProps {
  isActive: boolean | undefined;
  onclick: (index: any) => void;
}

const Switch: React.FC<SwitchOfferProps> = ({ isActive, onclick }) => {
  const [switc, setSwitch] = useState(isActive);

  return (
    <div>
      {!switc ? (
        <div
          className="w-[40px] h-[22px] bg-slate-400 rounded-full flex items-center cursor-pointer"
          onClick={onclick}
        >
          <div className="size-[18px] bg-white rounded-full ml-[0.15rem]"></div>
        </div>
      ) : (
        <div
          className="w-[40px] h-[22px] bg-green-400 rounded-full flex items-center cursor-pointer"
          onClick={onclick}
        >
          <div className="size-[18px] bg-white rounded-full ml-5"></div>
        </div>
      )}
    </div>
  );
};

export default Switch;