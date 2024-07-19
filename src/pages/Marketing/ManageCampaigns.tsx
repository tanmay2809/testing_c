import React, { useState } from "react";
import Card from "../../component/Marketing/Card";
import image1 from "../../assets/Group 1171278507.png";
const ManageCampaigns: React.FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const buttons: string[] = ["All", "Utility", "Marketing"];

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="w-full h-fit relative">
      <div className="w-[93%] h-fit px-[2rem] ml-[7%]">
        <div className="flex items-center justify-between p-4 -mt-2">
          {/* Buttons div */}
          <div className=" flex items-center gap-3">
            {buttons.map((button, index) => (
              <button
                key={index}
                className="w-[100px] text-center px-1 py-1 bg-[#F1F7FF] text-[#004AAD] rounded-md border border-gray-200 shadow-md shadow-slate-300 cursor-pointer"
              >
                {button}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            <span className="mr-2">Active Campaign</span>
            <div className="flex items-center justify-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isToggled}
                  onChange={handleToggle}
                />
                <div
                  className={`w-11 h-6 ${
                    isToggled ? "bg-[#004AAD]" : "bg-gray-300"
                  } rounded-full`}
                ></div>
                <div
                  className={`dot absolute left-1 bg-white w-5 h-5 rounded-full transition ${
                    isToggled ? "transform translate-x-full" : ""
                  }`}
                ></div>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-60">
          <Card
            imageUrl={image1}
            message="Happy birthday to you! Free dessert on us"
            createdDate="01-08-22"
            delivered={0}
            visits={0}
            visitsRate={0}
            weeklyCost={0}
            schedule="On Birthdays"
            targetCustomer="Advance Filter"
            type="Marketing"
            status="Under Review"
          />
          <Card
            imageUrl={image1}
            message="Happy birthday to you! Free dessert on us"
            createdDate="01-08-22"
            delivered={0}
            visits={0}
            visitsRate={0}
            weeklyCost={0}
            schedule="On Birthdays"
            targetCustomer="Advance Filter"
            type="Marketing"
            status="Under Review"
          />
          <Card
            imageUrl={image1}
            message="Happy birthday to you! Free dessert on us"
            createdDate="01-08-22"
            delivered={0}
            visits={0}
            visitsRate={0}
            weeklyCost={0}
            schedule="On Birthdays"
            targetCustomer="Advance Filter"
            type="Marketing"
            status="Under Review"
          />
          <Card
            imageUrl={image1}
            message="Happy birthday to you! Free dessert on us"
            createdDate="01-08-22"
            delivered={0}
            visits={0}
            visitsRate={0}
            weeklyCost={0}
            schedule="On Birthdays"
            targetCustomer="Advance Filter"
            type="Marketing"
            status="Under Review"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageCampaigns;
