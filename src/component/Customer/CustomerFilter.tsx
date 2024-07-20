import React, { useState } from "react";
import {Customer} from '../../constants/index';
interface FilterProps {
  isVisible: boolean;
  onClose: () => void;
  filterData: (data: string[]) => void;
  customerData: [
    {
      userId: {
        name: string;
        email: string;
        phone: string;
        birthday?: string;
        gender: string;
        anniversary?: string;
      };
      visits: string[];
    }
  ];
  setCustomerData: (data: any) => void;
  originalData : [
    {
      userId: {
        name: string;
        email: string;
        phone: string;
        birthday?: string;
        gender: string;
        anniversary?: string;
      };
      visits: string[];
    }
  ];
}

const CustomerFilter: React.FC<FilterProps> = ({
  isVisible,
  onClose,
  filterData,
  customerData,
  setCustomerData,
  originalData,
}) => {
  const [visitFilter, setVisitFilter] = useState<string>(
    "Visited in Last 30 days"
  );
  const [nonVisitFilter, setNonVisitFilter] = useState<string>(
    "Not visited in Last 30 days"
  );
  const [segmentation, setSegmentation] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [customDateVisit, setCustomDateVisit] = useState<string>("");
  const [customDateNotVisit, setCustomDateNotVisit] = useState<string>("");
  const [isClosing, setIsClosing] = useState<boolean>(false);

  if (!isVisible) return null;

  //add or remove segment
  const toggleSegment = (segment: string) => {
    const updatedSegmentation = segmentation.includes(segment)
      ? segmentation.filter((seg) => seg !== segment)
      : [...segmentation, segment];
    setSegmentation(updatedSegmentation);
  };

  //add or remove gender
  const toggleGender = (gen: string) => {
    const updatedGender = gender.includes(gen)
      ? gender.filter((g) => g !== gen)
      : [...gender, gen];
    setGender(updatedGender);
  };


  const getCustomerSegment = (visits: string[]): string => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(now.getDate() - 60);

    const visitsWithin30Days = visits?.filter(visit => new Date(visit) >= thirtyDaysAgo);
    const visitsWithin60Days = visits?.filter(visit => new Date(visit) >= sixtyDaysAgo);

    if (visitsWithin30Days?.length === 1) {
      return "New";
    } else if (visitsWithin30Days?.length >= 3) {
      return "Regular";
    } else if (visitsWithin60Days?.length > 5) {
      return "Loyal";
    } else {
      return "Risk";
    }
  };

  //apply
  const handleApply = () => {
    const data: string[] = [];
    if (visitFilter === "Custom") {
      data.push(...segmentation, ...gender, customDateVisit, nonVisitFilter);
      filterData(data);
      onClose();
      return;
    }
    if (nonVisitFilter === "Custom") {
      data.push(...segmentation, ...gender, visitFilter, customDateNotVisit);
      filterData(data);
      onClose();
      return;
    }
    data.push(...segmentation, ...gender, visitFilter, nonVisitFilter);
    filterData(data);

    const filteredData = customerData?.filter((customer) => {
      const visitDates = customer?.visits?.map((visit) => new Date(visit));
      const now = new Date();
  
      // Filter based on visit dates
      const visitFilterCheck = () => {
        if (visitFilter === "Visited in Last 30 days") {
          return visitDates.some(
            (visit) =>
              now.getTime() - visit.getTime() <= 30 * 24 * 60 * 60 * 1000
          );
        } else if (visitFilter === "Visited in Last 60 days") {
          return visitDates.some(
            (visit) =>
              now.getTime() - visit.getTime() <= 60 * 24 * 60 * 60 * 1000
          );
        } else if (visitFilter === "Custom") {
          const customDate = new Date(customDateVisit);
          return visitDates.some((visit) => visit == customDate);
        }
        return true;
      };
  
      // Filter based on non-visit dates
      const nonVisitFilterCheck = () => {
        if (nonVisitFilter === "Not visited in Last 30 days") {
          return visitDates.every(
            (visit) =>
              now.getTime() - visit.getTime() > 30 * 24 * 60 * 60 * 1000
          );
        } else if (nonVisitFilter === "Not visited in Last 60 days") {
          return visitDates.every(
            (visit) =>
              now.getTime() - visit.getTime() > 60 * 24 * 60 * 60 * 1000
          );
        } else if (nonVisitFilter === "Custom") {
          const customDate = new Date(customDateNotVisit);
          return visitDates.every((visit) => visit < customDate);
        }
        return true;
      };
  
      // Filter based on segmentation
      const segmentationCheck = segmentation.length
        ? segmentation.includes(getCustomerSegment(customer?.visits))
        : true;
  
      // Filter based on gender
      const genderCheck = gender.length
        ? gender.includes(customer?.userId?.gender)
        : true;
  
      return visitFilterCheck() && nonVisitFilterCheck() && segmentationCheck && genderCheck;
    });
    setCustomerData(filteredData);
    // filterData(filteredData);

    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-5 ">
      <div
        className={`bg-white w-[30rem] h-auto p-5 shadow-lg rounded-lg overflow-y-auto ${
          isClosing ? "slide-out-right" : "slide-in-right"
        }`}
      >
        <div className="flex justify-between items-center pb-2 border-black border-b font-Roboto">
          <div>
            <h2 className="text-2xl font-semibold">Filter Customer</h2>
            <p className="text-base">Filter your customer database easily</p>
          </div>

          <button
            onClick={handleCloseModal}
            className="text-white text-2xl bg-black rounded-full w-8 flex items-center justify-center font-extrabold"
          >
            &times;
          </button>
        </div>
        <div className="mt-1 h-[88%] flex flex-col justify-evenly">
          {/*customer visted in */}
          <div className="mb-2 font-Roboto">
            <p className="text-xl font-medium mb-3">Customer visited in</p>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 border rounded-lg ${
                  visitFilter === "Visited in Last 30 days"
                    ? "bg-[#004AAD] text-white"
                    : ""
                }`}
                onClick={() => setVisitFilter("Visited in Last 30 days")}
              >
                Last 30 days
              </button>
              <button
                className={`px-3 py-1 border rounded-lg ${
                  visitFilter === "Visited in Last 60 days"
                    ? "bg-[#004AAD] text-white"
                    : ""
                }`}
                onClick={() => setVisitFilter("Visited in Last 60 days")}
              >
                Last 60 days
              </button>
              <div>
                <button
                  className={`px-3 py-1 border rounded-lg ${
                    visitFilter === "Custom" ? "bg-[#004AAD] text-white" : ""
                  }`}
                  onClick={() => setVisitFilter("Custom")}
                >
                  Custom
                </button>
                {visitFilter === "Custom" && (
                  <input
                    type="date"
                    id="customDateInput"
                    value={customDateVisit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCustomDateVisit(e.target.value)
                    }
                  />
                )}
              </div>
            </div>
          </div>
          {/*customer not visted in */}
          <div className="pb-4 border-b border-black font-Roboto">
            <p className="text-xl font-medium mb-2">Customer not visited in</p>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 border rounded-lg ${
                  nonVisitFilter === "Not visited in Last 30 days"
                    ? "bg-[#004AAD] text-white"
                    : ""
                }`}
                onClick={() => setNonVisitFilter("Not visited in Last 30 days")}
              >
                Last 30 days
              </button>
              <button
                className={`px-3 py-1 border rounded-lg ${
                  nonVisitFilter === "Not visited in Last 60 days"
                    ? "bg-[#004AAD] text-white"
                    : ""
                }`}
                onClick={() => setNonVisitFilter("Not visited in Last 60 days")}
              >
                Last 60 days
              </button>
              <div>
                <button
                  className={`px-3 py-1 border rounded-lg ${
                    nonVisitFilter === "Custom" ? "bg-[#004AAD] text-white" : ""
                  }`}
                  onClick={() => setNonVisitFilter("Custom")}
                >
                  Custom
                </button>
                {nonVisitFilter === "Custom" && (
                  <input
                    type="date"
                    id="customDateInput"
                    value={customDateNotVisit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCustomDateNotVisit(e.target.value)
                    }
                  />
                )}
              </div>
            </div>
          </div>
          {/*customer segmentation */}
          <div className="mt-4 pb-4 border-b border-black font-inter">
            <p className="text-xl font-medium mb-3">Customer Segmentation</p>
            <div>
              <div className="flex justify-start gap-12 items-center">
                <label
                  className={"flex items-center space-x-2 cursor-pointer "}
                >
                  <input
                    type="checkbox"
                    checked={segmentation.includes("New")}
                    onChange={() => toggleSegment("New")}
                  />
                  <p className={"text-base font-medium "}>New Customer</p>
                </label>
                <label
                  className={"flex items-center space-x-2 cursor-pointer "}
                >
                  <input
                    type="checkbox"
                    checked={segmentation.includes("Regular")}
                    onChange={() => toggleSegment("Regular")}
                  />
                  <p className={"text-base font-medium "}>Regular Customer</p>
                </label>
              </div>
              <div className="flex justify-start gap-12 items-center">
                <label className={"flex items-center space-x-2 cursor-pointer"}>
                  <input
                    type="checkbox"
                    checked={segmentation.includes("Loyal")}
                    onChange={() => toggleSegment("Loyal")}
                  />
                  <p className={"text-base font-medium "}>Loyal Customer</p>
                </label>
                <label
                  className={"flex items-center space-x-2 cursor-pointer "}
                >
                  <input
                    type="checkbox"
                    checked={segmentation.includes("Risk")}
                    onChange={() => toggleSegment("Risk")}
                  />
                  <p className={"text-base font-medium "}>Customer at risk</p>
                </label>
              </div>
            </div>
          </div>
          {/*gender*/}
          <div className="mt-4 font-inter">
            <p className="text-xl font-medium mb-3">Gender</p>
            <div className="flex space-x-2">
              <label className={"flex items-center space-x-2 cursor-pointer "}>
                <input
                  type="checkbox"
                  checked={gender.includes("Male")}
                  onChange={() => toggleGender("Male")}
                />
                <p className={"text-lg font-medium"}>Male</p>
              </label>
              <label className={"flex items-center space-x-2 cursor-pointer "}>
                <input
                  type="checkbox"
                  checked={gender.includes("Female")}
                  onChange={() => toggleGender("Female")}
                />
                <p className={"text-lg font-medium "}>Female</p>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gender.includes("Others")}
                  onChange={() => toggleGender("Others")}
                />
                <p className="text-lg font-medium ">Others</p>
              </label>
            </div>
          </div>
          {/*buttons */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={onClose}
              className=" w-2/5 px-4 py-3 bg-[#E2E8F0] text-black rounded-lg"
            >
              Cancel
            </button>
            <button
              className=" w-3/5 px-4 py-3 bg-[#004AAD] text-white rounded-lg"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFilter;
