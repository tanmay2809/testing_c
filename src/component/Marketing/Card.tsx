import React, { useState } from "react";

interface CardProps {
  imageUrl: string;
  message: string;
  createdDate: string;
  delivered: number;
  visits: number;
  visitsRate: number;
  weeklyCost: number;
  schedule: string;
  targetCustomer: string;
  type: string;
  status: string;
}

import whatsapp from "../../assets/whatsapp.png";

import { FaBell } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Card: React.FC<CardProps> = ({
  imageUrl,
  message,
  createdDate,
  delivered,
  visits,
  visitsRate,
  weeklyCost,
  schedule,
  targetCustomer,
  type,
  status,
}) => {
  const [toggle, setToggle] = useState(false);
  const navigate=useNavigate();

  const sendToCampaign=()=>{
    navigate(`/campaign/${type}`)
  }
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="relative h-fit lg:mt-3 md:mt-6 mt-6 font-inter cursor-pointer" >
      <div className="w-full lg:h-[8.5rem] relative bg-[#FFCF27] py-3 lg:pl-[18rem]  md:h-[10rem] pl-[13rem] -mt-2 rounded-tl-xl rounded-tr-xl flex justify-between">
        <div className=" h-full flex flex-col justify-center min-w-52">
          <h1 className="text-xl font-semibold">
            {message}
          </h1>
          <p className="mt-2 text-base">Created on {createdDate}</p>
        </div>
        <div className="lg:flex lg:items-center gap-2 p-4 justify-center flex-wrap">
          <button className="flex items-center space-x-1 text-[#E61856] bg-white p-2 rounded-lg">
            <RiDeleteBinLine />
            <span>Delete</span>
          </button>

          <button className="flex items-center space-x-1 text-[#004AAD] bg-white p-2 rounded-lg" onClick={sendToCampaign}>
            <IoEyeOutline />
            <span>Preview</span>
          </button>

          <div className="flex items-center justify-center ">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={toggle}
                onChange={handleToggle}
              />
              <div
                className={`w-11 h-6 ${
                  toggle ? "bg-[#004AAD]" : "bg-gray-300"
                } rounded-full`}
              ></div>
              <div
                className={`dot absolute left-1 bg-white w-5 h-5 rounded-full transition ${
                  toggle ? "transform translate-x-full" : ""
                }`}
              ></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-[#F1F7FF] absolute w-full pb-2 lg:h-[13rem] md:h-[15rem] h-[16rem] flex justify-start rounded-bl-xl rounded-br-xl">
        <div className="relative w-[16rem] h-[18rem] -mt-28 lg:ml-10 md:ml-2 ml-0 min-w-36">
          <img
            src={imageUrl}
            // src={slide.image}
            // alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-0 left-0 px-6 py-3 w-full">
            <p className="text-white font-medium text-xl">
              {message}
            </p>
          </div>
          <div className="flex gap-2 absolute bottom-0 left-0 px-6 py-3">
            <div className="bg-white rounded-full p-3">
              <FaBell />
            </div>
            <button className="bg-[#F1F1F1] p-2 rounded-full">
              <img src={whatsapp} className="w-6 h-auto" />
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full h-full">
          <div className=" p-4 flex w-full border-b border-dashed border-black text-[#505050]">
            <div className="flex flex-col justify-around h-[5rem] border-r border-[#505050] lg:pr-14 lg:pl-14 md:pr-4 md:pl-4 ">
              <p className="text-lg font-semibold">Delivered</p>
              <p className="text-2xl font-semibold">{delivered}</p>
            </div>
            <div className="flex flex-col justify-around h-[5rem]  border-r border-[#505050] lg:pr-14 lg:pl-14  md:pr-4 md:pl-4 ">
              <p className="text-lg font-semibold">Visits</p>
              <p className="text-2xl font-semibold">{visits}</p>
            </div>
            <div className="flex flex-col justify-around h-[5rem] border-r border-[#505050] lg:pr-14 lg:pl-14  md:pr-4 md:pl-4 ">
              <p className="text-lg font-semibold">Visit Rate</p>
              <p className="text-2xl font-semibold">{visitsRate} %</p>
            </div>
            <div className="flex flex-col justify-around h-[5rem] lg:pr-14 lg:pl-14  md:pr-4 md:pl-4">
              <p className="text-lg font-semibold">Weekly Cost</p>
              <p className="text-2xl font-semibold">{weeklyCost}</p>
            </div>
          </div>
          <div className="h-1/2 w-full text-[#505050]">
            <div className="flex justify-between">
              <div className="flex justify-between gap-2 w-full pl-10 pr-4 pt-4 text-lg ">
                <p className="font-semibold">
                  Schedule:{" "}
                  <span className="font-medium text-base">{schedule}</span>
                </p>
                <div className="flex gap-4">
                  <p className="font-semibold">
                    Type:{" "}
                    <span className="font-medium text-base text-[#004AAD]">
                      {type}
                    </span>
                  </p>
                  <p className="font-semibold ">
                    Status:{" "}
                    <span className="font-medium text-base text-[#EA052E]">
                      {status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-4 text-lg pt-2 pl-10 pr-4">
              <p className="font-semibold">
                Target customer:{" "}
                <span className="font-medium text-base">{targetCustomer}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
