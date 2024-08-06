import React, { useState } from "react";

//icons
import { IoCloseCircle } from "react-icons/io5";

//images
import whatsapp from "../../assets/whatsapp.png";

interface Customer {
  // segmentation: "New" | "Regular" | "Risk" | "Loyal";
  userId: {
    name: string;
    // email:string;
    phone: string;
    birthday?: string;
    gender: string;
    anniversary?: string;
  };
  visits: string[];
}

interface CustomerDetailsProps {
  customer: Customer | null;
  segmentation: "New" | "Regular" | "Risk" | "Loyal";
  isVisible: boolean;
  onClose: () => void;
}

const segmentationColors: Record<string, string> = {
  New: "bg-green-200 text-green-800",
  Regular: "bg-purple-200 text-purple-800",
  Risk: "bg-red-200 text-red-800",
  Loyal: "bg-yellow-200 text-yellow-800",
};

const formatDate = (visits: string[]): string => {
  const date = new Date(visits[0]);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const daysSinceFirstVisit = (visits: string[]): number => {
  if (!visits || visits.length === 0) {
    return -1;
  }

  const firstVisitDate = new Date(visits[0]);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - firstVisitDate.getTime();

  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
};

const getLastVisitDisplay = (visits: string[]): string => {
  if (visits.length === 0) return "No visits";

  const lastVisit = new Date(visits[visits.length - 1]);
  const now = new Date();

  lastVisit.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const timeDifference = now.getTime() - lastVisit.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "1 day ago";
  } else if (daysDifference <= 7) {
    return `${daysDifference} days ago`;
  } else {
    return lastVisit.toLocaleDateString("en-GB"); // Format DD/MM/YYYY
  }
};

const getFirstVisitDisplay = (visits: string[]): string => {
  if (visits.length === 0) return "No visits";

  const firstVisit = new Date(visits[0]);
  const now = new Date();

  firstVisit.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const timeDifference = now.getTime() - firstVisit.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "1 day ago";
  } else if (daysDifference <= 7) {
    return `${daysDifference} days ago`;
  } else {
    return firstVisit.toLocaleDateString("en-GB"); // Format DD/MM/YYYY
  }
};


const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  segmentation,
  isVisible,
  onClose,
}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  if (!isVisible || !customer) return null;

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-5">
      <div
        className={`bg-white w-[31.25rem] h-full p-7 shadow-lg overflow-y-auto rounded-xl ${isClosing ? "slide-out-right" : "slide-in-right"
          }`}
      >
        {/*top div*/}
        <div className="flex justify-between items-center pb-7 border-black border-b">
          <div>
            <h2 className="text-[1.75rem] font-semibold">Customer Details</h2>
            <p className="text-lg">
              Detailed data of your customers at your business
            </p>
          </div>

          <IoCloseCircle
            onClick={handleCloseModal}
            className=" text-3xl cursor-pointer  font-extrabold"
          />
        </div>
        {/*customer contact and site info */}
        <div className="mt-4">
          <div className="flex items-center">
            <div className="bg-[#D5E7FF] rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-700">
                {customer?.userId?.name?.charAt(0)}
              </span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold flex items-center">
                {customer?.userId?.name}
                <span
                  className={`ml-2 py-1 px-3 rounded-full text-sm ${segmentationColors[segmentation]}`}
                >
                  {segmentation}
                </span>
              </h3>
              <div className="flex justify-start gap-[0.2rem] items-center">
                <p className="text-sm text-gray-500 ">
                  Customer Since {formatDate(customer?.visits)}
                </p>
                <span className="text-xs text-gray-500 bg-[#D5E7FF] rounded-full px-2 py-1 ml-2">
                  {daysSinceFirstVisit(customer?.visits)} Days
                </span>
              </div>
            </div>
            <div className="ml-auto flex items-center">
              <button className="bg-[#F1F1F1] p-2 rounded-lg">
                <img src={whatsapp} className="w-6 h-auto" />
              </button>
            </div>
          </div>
          {/*customer related information */}
          <div className="mt-6 bg-[#e3ecfd] p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Customer Name</p>
                <div className="flex gap-3">
                  <p>{customer?.userId?.name}</p>
                  <p className="bg-white rounded-xl px-2">
                    {customer?.userId?.gender}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold">Customer Phone Number</p>
                <p>{customer?.userId?.phone}</p>
              </div>
              <div>
                <p className="font-semibold">Birthday</p>
                <p>{customer?.userId?.birthday}</p>
              </div>
              <div>
                <p className="font-semibold">Anniversary</p>
                <p>{customer?.userId?.anniversary}</p>
              </div>
              <div>
                <p className="font-semibold">Total Visit</p>
                <p>{customer?.visits?.length}</p>
              </div>
              <div>
                <p className="font-semibold">First Visited</p>
                <p>{getFirstVisitDisplay(customer?.visits)}</p>
              </div>
              <div>
                <p className="font-semibold">Last Visited</p>
                <p>{getLastVisitDisplay(customer?.visits)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
