import { useState } from "react"


const SwitchTable = () => {

    const [ison,setison]=useState(true);

    const toggle =()=>{
        setison(!ison);
    }

  return (
    <div className="cursor-pointer">
      {ison ? (
        <div className="w-[40px] h-[22px] bg-slate-400 rounded-full flex items-center">
          <div onClick={toggle} className="size-[18px] bg-white rounded-full ml-[0.15rem]"></div>
        </div>
      ) : (
        <div className="w-[40px] h-[22px] bg-green-400 rounded-full flex items-center">
          <div onClick={toggle} className="size-[18px] bg-white rounded-full ml-5"></div>
        </div>
      )}
    </div>
  )
}

export default SwitchTable