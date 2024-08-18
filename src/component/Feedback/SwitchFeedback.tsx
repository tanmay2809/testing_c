import { useState,useEffect } from "react";



const SwitchFeedback = () => {

    const [switc, setSwitch] = useState<boolean | undefined>(true);

  useEffect(() => {
    setSwitch(true);
  }, [true]);

  const handleClick = () => {
    setSwitch(!switc);
    
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
  )
}

export default SwitchFeedback