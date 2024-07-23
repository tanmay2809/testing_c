import React, { useState } from "react";

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
  originalData: [
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
  customDateVisit: string;
  customDateNotVisit: string;
  setcustomDateVisit: (date: string) => void;
  setcustomDateNotVisit: (date: string) => void;
  gender: string[];
  segmentation: string[];
  setGender: (data: string[]) => void;
  setSegmentation: (data: string[]) => void;
}

const CustomerFilter: React.FC<FilterProps> = ({
  isVisible,
  onClose,
  filterData,
  setCustomerData,
  originalData,
  customDateVisit,
  customDateNotVisit,
  setcustomDateVisit,
  setcustomDateNotVisit,
  gender,
  segmentation,
  setGender,
  setSegmentation,
}) => {
  const [visitFilter, setVisitFilter] = useState<string>("");
  const [nonVisitFilter, setNonVisitFilter] = useState<string>("");
  // const [segmentation, setSegmentation] = useState<string[]>([]);
  // const [gender, setGender] = useState<string[]>([]);
  // const [customDateVisit, setCustomDateVisit] = useState<string>("");
  // const [customDateNotVisit, setCustomDateNotVisit] = useState<string>("");
  const [isClosing, setIsClosing] = useState<boolean>(false);

  if (!isVisible) return null;
  console.log(originalData);

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

    const visitsWithin30Days = visits?.filter(
      (visit) => new Date(visit) >= thirtyDaysAgo
    );
    const visitsWithin60Days = visits?.filter(
      (visit) => new Date(visit) >= sixtyDaysAgo
    );

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
    console.log(originalData);
    const filteredCustomers = originalData?.filter((customer) => {
      const customerSegment = getCustomerSegment(customer.visits);
      // Filter by visitFilter
      const now = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(now.getDate() - 60);
      const customDateVisitObj = new Date(customDateVisit);
      const customDateNotVisitObj = new Date(customDateNotVisit);

      const visitCondition =
        (visitFilter === "Visited in Last 30 days" &&
          customer.visits.some((visit) => new Date(visit) >= thirtyDaysAgo)) ||
        (visitFilter === "Visited in Last 60 days" &&
          customer.visits.some((visit) => new Date(visit) >= sixtyDaysAgo)) ||
        (visitFilter === "Custom" &&
          customer.visits.some(
            (visit) => new Date(visit) >= customDateVisitObj
          ));

      const nonVisitCondition =
        (nonVisitFilter === "Not visited in Last 30 days" &&
          customer.visits.every((visit) => new Date(visit) < thirtyDaysAgo)) ||
        (nonVisitFilter === "Not visited in Last 60 days" &&
          customer.visits.every((visit) => new Date(visit) < sixtyDaysAgo)) ||
        (nonVisitFilter === "Custom" &&
          customer.visits.every(
            (visit) => new Date(visit) < customDateNotVisitObj
          ));

      const segmentCondition =
        segmentation.length === 0 || segmentation.includes(customerSegment);

      const genderCondition =
        gender.length === 0 || gender.includes(customer.userId.gender);

      return (
        (!visitFilter || visitCondition) &&
        (!nonVisitFilter || nonVisitCondition) &&
        segmentCondition &&
        genderCondition
      );
    });
    const data: string[] = [];
    if (visitFilter && visitFilter !== "Custom") {
      data.push(visitFilter);
    }
    if (nonVisitFilter && nonVisitFilter !== "Custom") {
      data.push(nonVisitFilter);
    }
    if (segmentation.length > 0) {
      data.push(...segmentation);
    }
    if (gender.length > 0) {
      data.push(...gender);
    }
    if (visitFilter === "Custom" && customDateVisit) {
      data.push(customDateVisit);
    }
    if (nonVisitFilter === "Custom" && customDateNotVisit) {
      data.push(customDateNotVisit);
    }

    filterData(data);
    setCustomerData(filteredCustomers);
    onClose();
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
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className=" sticky top-0 flex justify-between items-center pb-2 border-black border-b font-Roboto">
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
                onClick={() => {
                  if (visitFilter !== "Visited in Last 30 days") {
                    setVisitFilter("Visited in Last 30 days");
                  } else {
                    setVisitFilter("");
                  }
                }}
              >
                Last 30 days
              </button>
              <button
                className={`px-3 py-1 border rounded-lg ${
                  visitFilter === "Visited in Last 60 days"
                    ? "bg-[#004AAD] text-white"
                    : ""
                }`}
                onClick={() => {
                  if (visitFilter !== "Visited in Last 60 days") {
                    setVisitFilter("Visited in Last 60 days");
                  } else {
                    setVisitFilter("");
                  }
                }}
              >
                Last 60 days
              </button>
              <div>
                <button
                  className={`px-3 py-1 border rounded-lg ${
                    visitFilter === "Custom" ? "bg-[#004AAD] text-white" : ""
                  }`}
                  onClick={() => {
                    if (visitFilter !== "Custom") {
                      setVisitFilter("Custom");
                    } else {
                      setVisitFilter("");
                    }
                  }}
                >
                  Custom
                </button>
                {visitFilter === "Custom" && (
                  <div>
                    <input
                      className="absolute right-36 top-[8.5rem] w-10 opacity-0"
                      type="date"
                      id="customDateInput"
                      value={customDateVisit}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setcustomDateVisit(e.target.value)
                      }
                    />
                  </div>
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
                onClick={() => {
                  if (nonVisitFilter !== "Not visited in Last 30 days") {
                    setNonVisitFilter("Not visited in Last 30 days");
                  } else {
                    setNonVisitFilter("");
                  }
                }}
              >
                Last 30 days
              </button>
              <button
                className={`px-3 py-1 border rounded-lg ${
                  nonVisitFilter === "Not visited in Last 60 days"
                    ? "bg-[#004AAD] text-white"
                    : ""
                }`}
                onClick={() => {
                  if (nonVisitFilter !== "Not visited in Last 60 days") {
                    setNonVisitFilter("Not visited in Last 60 days");
                  } else {
                    setNonVisitFilter("");
                  }
                }}
              >
                Last 60 days
              </button>
              <div>
                <button
                  className={`px-3 py-1 border rounded-lg ${
                    nonVisitFilter === "Custom" ? "bg-[#004AAD] text-white" : ""
                  }`}
                  onClick={() => {
                    if (nonVisitFilter !== "Custom") {
                      setNonVisitFilter("Custom");
                    } else {
                      setNonVisitFilter("");
                    }
                  }}
                >
                  Custom
                </button>
                {nonVisitFilter === "Custom" && (
                  <input
                    type="date"
                    id="customDateInput"
                    value={customDateNotVisit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setcustomDateNotVisit(e.target.value)
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
