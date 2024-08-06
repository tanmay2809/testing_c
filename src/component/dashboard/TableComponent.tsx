import { useState } from "react";
// import SwitchTable from "./SwitchTable";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineFolderCopy } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { FaRegEye } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { toast } from "react-toastify";
// import TableData from "../../pages/Dashboard/Table";


const TableComponent = ({ data ,totaltable }: { data: any , totaltable:any }) => {
  const [Today, setToday] = useState(true);
  const [Week, setWeek] = useState(false);
  const [Month, setMonth] = useState(false);

  const today = () => {
    setToday(true);
    setWeek(false);
    setMonth(false);
  };

  const weekly = () => {
    setToday(false);
    setWeek(true);
    setMonth(false);
  };

  const Monthly = () => {
    setToday(false);
    setWeek(false);
    setMonth(true);
  };

  const downloadImage = (url: string, filename: string) => {
    // Create a new link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Append link to the body (it needs to be in the DOM to work)
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the DOM
    document.body.removeChild(link);
  };


  function copyHandler(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
      toast.success('copy to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
      toast.error(err);
    });
  }

  return (
    <div className="bg-[#F1F7FF] w-full h-fit flex flex-col font-inter rounded-lg">
      <div className="flex w-full justify-between items-center py-[1.2rem] px-[2.5rem] border-b border-dashed border-black">
        <div className="flex items-center gap-7">
          <p className="text-[#505050] font-semibold w-[700] text-[1.6rem]">Table NO {data?.tableNo}</p>
          {
            data?.tableNo != totaltable  ? <button className="px-[1.3rem] py-1.5 text-white bg-[#FF950A] rounded-lg">Default</button>
              : <button className="px-[1.3rem] py-1.5 text-white bg-red-700 rounded-lg">Delete</button>
          }

        </div>

        <div className="flex items-center justify-center gap-4">
          <button onClick={today} className={`border px-4 py-2 rounded-lg font-semibold ${Today ? "text-white bg-[#004AAD]" : "text-[#0F172ACC] bg-white border-[#00000080]"}`}>Today</button>
          <button onClick={weekly} className={`border px-4 py-2 rounded-lg font-semibold ${Week ? "text-white bg-[#004AAD]" : "text-[#0F172ACC] bg-white border-[#00000080]"}`}>Weekly</button>
          <button onClick={Monthly} className={`border px-4 py-2 rounded-lg font-semibold ${Month ? "text-white bg-[#004AAD]" : "text-[#0F172ACC] bg-white border-[#00000080]"}`}>Monthly</button>
        </div>
      </div>
      <div className="flex justify-between w-full items-center py-[1rem] px-[2rem]">
        <div className="flex items-center gap-4">
          {/* <SwitchTable /> */}
          <p className="font-inter font-[400] text-[1rem] text-nowrap text-[#505050]">Active since Nov 03, 2022 ( 605 Days )</p>
        </div>
        <div className="flex w-[50%] text-black font-inter font-[600] text-[1.15rem] gap-3 items-center justify-end">
          <p onClick={() => {
            copyHandler(data?.url);
          }} className="flex items-center gap-1 cursor-pointer"><MdOutlineFolderCopy className="size-5" />Copy Link</p>
          <p
            onClick={() => {
              const filename = 'downloaded-image.png'; // Desired file name
              downloadImage(data?.image, filename);
            }}
            className="flex items-center gap-1 cursor-pointer"><GoDownload className="size-5" />Download</p>
          <p
            onClick={
              () => {
                window.open(data?.url, "_blank");
              }
            } className="flex items-center gap-1 cursor-pointer"><FaRegEye className="size-5" />Preview</p>
        </div>
      </div>
      <div className="w-full h-fit px-[2.5rem] flex flex-col gap-4 pt-[1rem] pb-[2rem]">
        <div className="w-full h-fit flex gap-2 justify-between">
          <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
            <p className="font-[700] text-[1.8rem]">0</p>
            <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2"><span><IoPeopleSharp className="size-5" /></span>Customer captured</p>
          </div>
          <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
            <p className="font-[700] text-[1.8rem]">0</p>
            <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2"><span><RiDashboardFill className="size-5" /></span>Unique customer</p>
          </div>
          <div className="w-[32%] h-fit flex flex-col px-[1.5rem] py-[1rem] leading-[1.8rem] rounded-md gap-4 font-inter bg-white text-[#505050]">
            <p className="font-[700] text-[1.8rem]">{data?.count}</p>
            <p className="flex text-nowrap font-[500] text-[1rem] items-center gap-2"><span><RiDashboardFill className="size-5" /></span>Total QR Scans</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
