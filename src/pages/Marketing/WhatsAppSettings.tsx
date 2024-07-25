import React, { useState } from "react";

//images
import phone from "../../assets/Pixel 6 Pro.png";
import whatsapp from "../../assets/whatsapp.png";

//svg
import greenTick from "/greenTick.svg";
import doubleArrow from "/doubleArrow.svg";
import { Link } from "react-router-dom";

const WhatsAppSettings: React.FC = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

  const handleCheckboxChange = (checkboxName: string) => {
    setSelectedCheckbox(
      checkboxName === selectedCheckbox ? null : checkboxName
    );
  };
  return (
    <div className="w-full h-fit relative">
      <div className="lg:w-[93%] h-fit px-[2rem] lg:ml-[7%]">
        <div className="flex gap-6 mb-6 font-inter">
          <div className=" w-1/2 flex flex-col justify-start gap-6">
            <div className="bg-[#F1F7FF] p-6 rounded-2xl flex flex-col justify-between h-fit">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Current Header</h2>
                <p className="text-gray-600">
                  Customers will receive WhatsApp Communication from default
                  SnackBAE account or you can add your own
                </p>
              </div>

              <div className="flex justify-start lg:gap-9 flex-wrap md:gap-3 ">
                <label className="inline-flex items-center mr-6">
                  <input
                    type="checkbox"
                    className="form-checkbox text-[#004AAD]"
                    checked={selectedCheckbox === "SnackBAE"}
                    onChange={() => handleCheckboxChange("SnackBAE")}
                  />
                  <span className="ml-2">SnackBAE</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-[#004AAD]"
                    checked={selectedCheckbox === "Custom"}
                    onChange={() => handleCheckboxChange("Custom")}
                  />
                  <span className="ml-2">Custom</span>
                  <span className="ml-2 text-base text-white bg-[#004AAD] px-2 py-1 rounded-lg">
                    Paid Add-on
                  </span>
                </label>
              </div>
            </div>

            {selectedCheckbox === "Custom" && (
              <Link to="/manager">
                <button className="w-full">
                  <div className=" flex justify-between bg-[#F1F7FF] p-6 rounded-2xl">
                    <p className="text-lg font-medium ">
                      Manage WhatsApp Profile
                    </p>
                    <img src={doubleArrow} />
                  </div>
                </button>
              </Link>
            )}
            <div className="p-6 bg-[#F1F7FF] rounded-2xl gap-6 flex justify-between">
              <img src={greenTick} />
              <div className="flex flex-col ">
                <p className="">
                  Meta is solely responsible for providing Business Name and
                  Green tick. We do not make the decisions.
                </p>
                <a href="#" className="text-[#004AAD] ">
                  Learn More
                </a>
              </div>
            </div>
            {selectedCheckbox === "SnackBAE" && (
              <div className=" flex justify-between items-center bg-[#F1F7FF] p-4 rounded-2xl">
                <p className="text-lg font-medium ">
                  Want to connect your custom number?
                </p>
                <Link to="/connectNumber">
                  <button className="flex items-center lg:gap-2 bg-[#60D66A] text-white py-2 lg:px-3 md:px-1 rounded-lg">
                    <img src={whatsapp} className="w-7" />
                    Connect Number
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="w-1/2 flex justify-center px-14 pt-20 bg-[#F1F7FF] rounded-2xl ">
            <img src={phone} className="h-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSettings;
