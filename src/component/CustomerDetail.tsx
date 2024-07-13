import React from "react";

//icons
import { FaPhone, FaWhatsapp } from "react-icons/fa";

interface Customer {
  name: string;
  phone: string;
  segmentation: "New" | "Regular" | "Risk" | "Loyal";
}

interface CustomerDetailsProps {
  customer: Customer | null;
  isVisible: boolean;
  onClose: () => void;
}

const segmentationColors: { [key in Customer["segmentation"]]: string } = {
  New: "bg-green-200 text-green-800",
  Regular: "bg-purple-200 text-purple-800",
  Risk: "bg-red-200 text-red-800",
  Loyal: "bg-yellow-200 text-yellow-800",
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  isVisible,
  onClose,
}) => {
  if (!isVisible || !customer) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-5">
      <div className="bg-white lg:w-2/5 md:w-1/3 h-full p-7 shadow-lg overflow-y-auto rounded-xl">
        {/*top div*/}
        <div className="flex justify-between items-center pb-7 border-black border-b">
          <div>
            <h2 className="text-[1.75rem] font-semibold">Customer Details</h2>
            <p className="text-lg">
              Detailed data of your customers at your business
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white text-2xl bg-black rounded-full w-8 flex items-center justify-center font-extrabold"
          >
            &times;
          </button>
        </div>
        {/*customer contact and site info */}
        <div className="mt-4">
          <div className="flex items-center">
            <div className="bg-[#D5E7FF] rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-700">
                {customer.name.charAt(0)}
              </span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold flex items-center">
                {customer.name}
                <span
                  className={`ml-2 py-1 px-3 rounded-full text-sm ${
                    segmentationColors[customer.segmentation]
                  }`}
                >
                  {customer.segmentation}
                </span>
              </h3>
              <div className="flex justify-start gap-[0.2rem] items-center">
                <p className="text-sm text-gray-500 w-1/2">
                  Customer Since 20 April 2023
                </p>
                <span className="text-xs text-gray-500 bg-[#D5E7FF] rounded-full px-2 py-1 ml-2">
                  64 Days
                </span>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <button className="bg-blue-200 p-2 rounded-full">
                <FaPhone className="text-blue-600" />
              </button>
              <button className="bg-green-200 p-2 rounded-full">
                <FaWhatsapp className="text-green-600" />
              </button>
            </div>
          </div>
          {/*customer related information */}
          <div className="mt-6 bg-[#F1F7FF] p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Customer Name</p>
                <p>{customer.name}</p>
              </div>
              <div>
                <p className="font-semibold">Customer Phone Number</p>
                <p>{customer.phone}</p>
              </div>
              <div>
                <p className="font-semibold">Birthday</p>
                <p>01-09-2001</p>
              </div>
              <div>
                <p className="font-semibold">Anniversary</p>
                <p>01-09-2001</p>
              </div>
              <div>
                <p className="font-semibold">Total Visit</p>
                <p>8</p>
              </div>
              <div>
                <p className="font-semibold">First Visited</p>
                <p>01-09-2001</p>
              </div>
              <div>
                <p className="font-semibold">Last Visited</p>
                <p>Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
