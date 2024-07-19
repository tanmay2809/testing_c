//icon
import { useState } from "react";



import { IoPeopleSharp } from "react-icons/io5";

const TableComponent = () => {

    const [Today, setToday] = useState(true);
    const [Week, setWeek] = useState(false);
    const [Month, setMonth] = useState(false);
  
    const today = () => {
      setToday(true)
      setWeek(false)
      setMonth(false)
    }
  
    const weekly = () => {
      setToday(false)
      setWeek(true)
      setMonth(false)
    }
  
    const Monthly = () => {
      setToday(false)
      setWeek(false)
      setMonth(true)
    }
  return (
    <div className="bg-[#F1F7FF] w-full h-fit flex flex-col  font-inter  rounded-lg">
            <div className="flex w-full justify-between items-center py-[1.2rem] px-[2.5rem] border-b border-dashed border-black ">
              <p className='text-[#505050] font-semibold w-[700] text-[1.8rem] '>Table NO 1</p>
              <div className='flex items-center justify-center gap-4'>
                
              <button onClick={today} className={` border  px-4 py-2 rounded-lg font-semibold ${Today ? "text-white bg-[#004AAD]" : "text-[#0F172ACC] bg-white border-[#00000080]"} `}>Today</button>
              <button onClick={weekly} className={` border  px-4 py-2 rounded-lg font-semibold ${Week ? "text-white bg-[#004AAD]" : "text-[#0F172ACC] bg-white border-[#00000080]"} `}>Weekly</button>
              <button onClick={Monthly} className={` border  px-4 py-2 rounded-lg font-semibold ${Month ? "text-white bg-[#004AAD]" : "text-[#0F172ACC] bg-white border-[#00000080]"} `}>Monthly</button>
              </div>

            </div>
            {/* <div className="flex justify-between">
                <div>
                    Button
                </div>
                <div>
                    <p>Copy Link</p>
                    <p>Download</p>
                    <p>Preview</p>
                </div>
                
            </div> */}

            <div className='w-full h-fit px-[2.5rem] flex flex-col gap-4 py-[1rem] '>

              <div className='w-full h-fit flex gap-2 justify-between'>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>1000</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><IoPeopleSharp className='size-5' /></span>Total campaign sent</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>1000</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><IoPeopleSharp className='size-5' /></span>Total campaign sent</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>1000</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><IoPeopleSharp className='size-5' /></span>Total campaign sent</p>
                </div>

              </div>
              

            </div>

          </div>
  )
}

export default TableComponent