import React, { useState } from "react";

interface FilterProps {
  isVisible: boolean;
  onClose: () => void;
}

const CustomerFilter: React.FC<FilterProps> = ({ isVisible, onClose }) => {
  const [visitFilter, setVisitFilter] = useState<string>("30");
  const [nonVisitFilter, setNonVisitFilter] = useState<string>("30");
  const [segmentation, setSegmentation] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);

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

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-5">
      <div className="bg-white w-1/3 h-auto p-5 shadow-lg rounded-lg">
        <div className="flex justify-between items-center pb-5 border-black border-b font-Roboto">
          <div>
            <h2 className="text-[1.75rem] font-semibold">Filter Customer</h2>
            <p className="text-lg">Filter your customer database easily</p>
          </div>

          <button
            onClick={onClose}
            className="text-white text-2xl bg-black rounded-full w-8 flex items-center justify-center font-extrabold"
          >
            &times;
          </button>
        </div>
        {/*customer visted in */}
        <div className="mt-4">
          <div className="mb-4 font-Roboto">
            <p className="text-[1.32rem] font-semibold mb-3">
              Customer visited in
            </p>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 border rounded-lg ${
                  visitFilter === "30" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => setVisitFilter("30")}
              >
                Last 30 days
              </button>
              <button
                className={`px-3 py-1 border rounded-lg ${
                  visitFilter === "60" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => setVisitFilter("60")}
              >
                Last 60 days
              </button>
              <button
                className={`px-3 py-1 border rounded-lg ${
                  visitFilter === "custom" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => setVisitFilter("custom")}
              >
                Custom
              </button>
            </div>
          </div>
          {/*customer not visted in */}
          <div className="pb-4 border-b border-black font-Roboto">
            <p className="text-[1.32rem] font-semibold mb-3">
              Customer not visited in
            </p>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 border rounded-lg ${
                  nonVisitFilter === "30" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => setNonVisitFilter("30")}
              >
                Last 30 days
              </button>
              <button
                className={`px-3 py-1 border rounded-lg ${
                  nonVisitFilter === "60" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => setNonVisitFilter("60")}
              >
                Last 60 days
              </button>
              <button
                className={`px-3 py-1 border rounded-lg ${
                  nonVisitFilter === "custom" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => setNonVisitFilter("custom")}
              >
                Custom
              </button>
            </div>
          </div>
          {/*customer segmentation */}
          <div className="mt-4 pb-4 border-b border-black font-inter">
            <p className="text-[1.32rem] font-semibold mb-3">
              Customer Segmentation
            </p>
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
                  <p className={"text-lg font-medium "}>New Customer</p>
                </label>
                <label
                  className={"flex items-center space-x-2 cursor-pointer "}
                >
                  <input
                    type="checkbox"
                    checked={segmentation.includes("Regular")}
                    onChange={() => toggleSegment("Regular")}
                  />
                  <p className={"text-lg font-medium "}>Regular Customer</p>
                </label>
              </div>
              <div className="flex justify-start gap-12 items-center">
                <label className={"flex items-center space-x-2 cursor-pointer"}>
                  <input
                    type="checkbox"
                    checked={segmentation.includes("Loyal")}
                    onChange={() => toggleSegment("Loyal")}
                  />
                  <p className={"text-lg font-medium "}>Loyal Customer</p>
                </label>
                <label
                  className={"flex items-center space-x-2 cursor-pointer "}
                >
                  <input
                    type="checkbox"
                    checked={segmentation.includes("Risk")}
                    onChange={() => toggleSegment("Risk")}
                  />
                  <p className={"text-lg font-medium "}>Customer at risk</p>
                </label>
              </div>
            </div>
          </div>
          {/*gender*/}
          <div className="mt-4 font-inter">
            <p className="text-[1.32rem] font-semibold mb-3">Gender</p>
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
            <button className=" w-2/5 px-4 py-3 bg-[#E2E8F0] text-black rounded-lg">
              Cancel
            </button>
            <button
              className=" w-3/5 px-4 py-3 bg-[#004AAD] text-white rounded-lg"
              onClick={onClose}
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
