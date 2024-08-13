import React, { useState } from "react";
// import { useEffect } from "react";

interface SwitchProps {
  isActive: boolean | undefined;
  onclick: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isActive, onclick }) => {
  const [switc, setSwitch] = useState<boolean | undefined>(isActive);

  // useEffect(() => {
  //   console.log(dishname+" : "+isActive);
  //   setSwitch(isActive);
  // }, [isActive]);

  const handleClick = () => {
    setSwitch(!switc);
    onclick();
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {!switc ? (
        <div className="w-[40px] h-[22px] bg-slate-400 rounded-full flex items-center">
          <div className="size-[18px] bg-white rounded-full ml-[0.15rem]"></div>
        </div>
      ) : (
        <div className="w-[40px] h-[22px] bg-green-400 rounded-full flex items-center">
          <div className="size-[18px] bg-white rounded-full ml-5"></div>
        </div>
      )}
    </div>
  );
};

export default Switch;
