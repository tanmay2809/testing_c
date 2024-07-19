//icon
import { useState } from "react";

import SwitchTable from "./SwitchTable";



import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineFolderCopy } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { FaRegEye } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";


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
            <div className="flex justify-between w-full items-center py-[1rem] px-[2rem] ">
                <div className="flex items-center gap-4">
                    <SwitchTable/>
                    <p className="font-inter font-[400] text-[1rem] text-nowrap text-[#505050]">Active since Nov 03, 2022 ( 605 Days )</p>

                </div>
                <div className="flex w-[50%] text-black font-inter font-[600] text-[1.3rem] gap-3 items-center justify-end">
                    <p className="flex items-center gap-2 "> <MdOutlineFolderCopy className="size-6" />Copy Link</p>
                    <p className="flex items-center gap-2 "> <GoDownload className="size-6"/>Download</p>
                    <p className="flex items-center gap-2 "> <FaRegEye className="size-6" />Preview</p>
                </div>
                
            </div>

            <div className='w-full h-fit px-[2.5rem] flex flex-col gap-4 pt-[1rem] pb-[2rem] '>

              <div className='w-full h-fit flex gap-2 justify-between'>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>30</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><IoPeopleSharp className='size-5' /></span>Customer captured</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>10</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><RiDashboardFill  className='size-5' /></span>Unique customer</p>
                </div>
                <div className='w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]'>
                  <p className='font-[700] text-[1.8rem]'>100</p>
                  <p className='flex text-nowrap font-[500] text-[1rem] items-center gap-2 '><span><RiDashboardFill  className='size-5' /></span>Total QR Scans</p>
                </div>

              </div>
              

            </div>

          </div>
  )
}

export default TableComponent