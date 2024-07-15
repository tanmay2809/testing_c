import React, { useState } from "react";

interface FilterProps {
  isVisible: boolean;
  onClose: () => void;
  filterData: (data: string[]) => void;
}

const CustomerFilter: React.FC<FilterProps> = ({
  isVisible,
  onClose,
  filterData,
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

  //apply
  const handleApply = () => {
    const data: string[] = [];
    if (visitFilter === "Custom") {
      data.push(...segmentation, ...gender, customDateVisit, nonVisitFilter);
      filterData(data)
      onClose();
      return
    }
    if (nonVisitFilter === "Custom") {
      data.push(...segmentation, ...gender, visitFilter, customDateNotVisit);
      filterData(data)
      onClose();
      return
    }
    data.push(...segmentation, ...gender, visitFilter, nonVisitFilter);
    console.log(data);
    filterData(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-5 ">
      <div className="bg-white w-1/3 h-auto p-5 shadow-lg rounded-lg overflow-y-auto ">
        <div className="flex justify-between items-center pb-2 border-black border-b font-Roboto">
          <div>
            <h2 className="text-2xl font-semibold">Filter Customer</h2>
            <p className="text-base">Filter your customer database easily</p>
          </div>

          <button
            onClick={onClose}
            className="text-white text-2xl bg-black rounded-full w-8 flex items-center justify-center font-extrabold"
          >
            &times;
          </button>
        </div>
        {/*customer visted in */}
        <div className="mt-2">
          <div className="mb-2 font-Roboto">
            <p className="text-xl font-semibold mb-3">
              Customer visited in
            </p>
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
            <p className="text-xl font-semibold mb-2">
              Customer not visited in
            </p>
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
            <p className="text-xl font-semibold mb-3">
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
            <p className="text-xl font-semibold mb-3">Gender</p>
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
