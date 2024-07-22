import React, { useState } from "react";

//images
import phone from "../../assets/Pixel 6 Pro.png";
import whatsapp from "../../assets/whatsapp.png";

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

              <div className="flex justify-start gap-9 flex-wrap ">
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

            {selectedCheckbox==="Custom" && (
              <div className=" flex justify-between bg-[#F1F7FF] p-6 rounded-2xl">
                <p className="text-lg font-medium ">Manage WhatsApp Profile</p>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66602 2L8.53394 9L1.66602 16"
                    stroke="#64748B"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.79883 2L15.6668 9L8.79883 16"
                    stroke="#64748B"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            <div className="p-6 bg-[#F1F7FF] rounded-2xl gap-6 flex justify-between">
              <svg
                width="55"
                height="53"
                viewBox="0 0 55 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M55 26.25L48.9 19.275L49.75 10.05L40.725 8L36 0L27.5 3.65L19 0L14.275 7.975L5.25 10L6.1 19.25L0 26.25L6.1 33.225L5.25 42.475L14.275 44.525L19 52.5L27.5 48.825L36 52.475L40.725 44.5L49.75 42.45L48.9 33.225L55 26.25ZM22.725 38.05L13.225 28.525L16.925 24.825L22.725 30.65L37.35 15.975L41.05 19.675L22.725 38.05Z"
                  fill="#00E25C"
                />
              </svg>
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
            {selectedCheckbox==="SnackBAE" && (
              <div className=" flex justify-between items-center bg-[#F1F7FF] p-4 rounded-2xl">
                <p className="text-lg font-medium ">
                  Want to connect your custom number?
                </p>
                <button className="flex items-center lg:gap-2 bg-[#60D66A] text-white py-2 lg:px-3 md:px-1 rounded-lg">
                  <img src={whatsapp} className="w-7" />
                  Connect Number
                </button>
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
