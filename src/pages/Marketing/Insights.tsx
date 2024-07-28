import React from "react";

//svg
import utility from "/utility.svg";
import booking from "/booking.svg";
import edit from "/edit.svg";

//images
import foodos from "../../assets/Ellipse 2862.png";

const Insights: React.FC = () => {

  return (
    <div className="w-[75%] mx-auto bg-white p-6  rounded-br-lg ">
      <section className="grid grid-cols-3 gap-6 mb-6 text-[#505050]">
        <div className=" p-4 rounded-lg  text-left border border-[#505050] ">
          <p className="text-2xl font-bold">0</p>
          <p>Total campaign sent</p>
        </div>
        <div className=" p-4 rounded-lg  text-left border border-[#505050] ">
          <p className="text-2xl font-bold">0</p>
          <p>Customer revisit</p>
        </div>
        <div className=" p-4 rounded-lg  text-left border border-[#505050] ">
          <p className="text-2xl font-bold">0%</p>
          <p>Visit ratio</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-6 mb-6 text-[#505050]">
        <div className=" p-4 rounded-lg  text-left border border-[#505050] ">
          <p className="text-2xl font-bold">₹ 0</p>
          <p className="flex items-center gap-2 mt-2">
            <span>
              <img src={utility} />
            </span>
            Utility Cost
          </p>
        </div>
        <div className=" p-4 rounded-lg  text-left border border-[#505050] ">
          <p className="text-2xl font-bold">₹ 0</p>
          <p className="flex items-center gap-2 mt-2">
            <span>
              <img src={booking} />
            </span>
            Marketing Cost
          </p>
        </div>
      </section>

      <section className=" p-4 rounded-md border border-[#505050] flex justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-base font-bold ">WhatsApp Account</h2>
          <p className="text-gray-600 text-sm">
            This is the WhatsApp Account associated with this account
          </p>
        </div>
        <div className="flex items-center space-x-4 ">
          <img src={foodos} className="w-10 h-auto" />
          <div>
            <p className="font-bold">Foodoos</p>
            <p className="text-gray-600">+91 7000000000</p>
          </div>
          <button className="ml-auto bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            <img src={edit} />
          </button>
        </div>
      </section>
    </div>
  );
};
export default Insights;
