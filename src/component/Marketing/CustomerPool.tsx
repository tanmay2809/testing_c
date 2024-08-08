import React, { useState } from "react";

interface FilterProps {
  isVisible: boolean;
  onClose: () => void;
}
const visitingPref = [
  "Fine-Dining",
  "Café's",
  "Pubs",
  "Italian",
  "Open-Air",
  "Rooftop",
  "Bakery",
  "Barista",
  "QSRs",
  "Hookah Bar",
  "Live Music",
  "Experience",
];
const foodPref = [
  "Indian",
  "Chinese",
  "Tandoor",
  "Italian",
  "Asian",
  "Tibetan",
  "American",
  "Bengali",
  "Beer",
  "Whiskey",
  "Rum",
  "Mocktails",
];
const spendPow = [
  "₹ 0 - 500",
  "₹500 - 1000",
  "₹1000 - 1500",
  "₹1500 - 2000",
  "₹2000 - 5000",
  "₹5000 - 10,000",
  "₹10,000 - 20,000",
  "Above ₹30,000",
];
const CustomerPool: React.FC<FilterProps> = ({ isVisible, onClose }) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [visitPreferences, setVisitPreferences] = useState<string[]>([]);
  const [foodPreferences, setFoodPreferences] = useState<string[]>([]);
  const [spendingPower, setSpendingPower] = useState<string>("");

  if (!isVisible) return null;

  // Toggle selection for visit preferences
  const toggleVisitPreference = (preference: string) => {
    const updatedPreferences = visitPreferences.includes(preference)
      ? visitPreferences.filter((pref) => pref !== preference)
      : [...visitPreferences, preference];
    setVisitPreferences(updatedPreferences);
  };

  // Toggle selection for food preferences
  const toggleFoodPreference = (preference: string) => {
    const updatedPreferences = foodPreferences.includes(preference)
      ? foodPreferences.filter((pref) => pref !== preference)
      : [...foodPreferences, preference];
    setFoodPreferences(updatedPreferences);
  };

  // Set spending power
  const setSpendingPowerFilter = (range: string) => {
    setSpendingPower(range === spendingPower ? "" : range);
  };

  // Apply filters
  const handleApply = () => {
    const data = {
      visitPreferences,
      foodPreferences,
      spendingPower,
    };
    console.log(data);
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-5">
      <div
        className={`bg-white w-[31rem] h-auto shadow-lg rounded-lg overflow-y-auto ${
          isClosing ? "slide-out-right" : "slide-in-right"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="p-5  sticky top-0 flex justify-between bg-white items-center pb-2 border-black border-b font-Roboto">
          <div>
            <h2 className="text-2xl font-semibold">Customer Pool</h2>
            <p className="text-base">
              Target all customers visiting multiple eateries
            </p>
          </div>
          <button
            onClick={handleCloseModal}
            className="text-white text-2xl bg-black rounded-full w-8 flex items-center justify-center font-extrabold"
          >
            &times;
          </button>
        </div>
        <div className="px-5 py-2 h-[88%] flex flex-col justify-evenly">
          {/* Customer Visiting Preference */}
          <div className="mb-3 font-Roboto">
            <p className="text-xl font-medium mb-1">
              Customer visiting preference
            </p>
            <div className="grid grid-cols-4 gap-2">
              {visitingPref.map((preference) => (
                <button
                  key={preference}
                  className={`px-3 py-2 border rounded-lg text-sm ${
                    visitPreferences.includes(preference)
                      ? "bg-[#004AAD] text-white"
                      : ""
                  }`}
                  onClick={() => toggleVisitPreference(preference)}
                >
                  {preference}
                </button>
              ))}
            </div>
          </div>
          
          {/* Customer Food Preference */}
          <div className="mb-3 font-Roboto">
            <p className="text-xl font-medium mb-1">Customer Food preference</p>
            <div className="grid grid-cols-4 gap-2">
              {foodPref.map((preference) => (
                <button
                  key={preference}
                  className={`px-3 py-2 border rounded-lg text-sm ${
                    foodPreferences.includes(preference)
                      ? "bg-[#004AAD] text-white"
                      : ""
                  }`}
                  onClick={() => toggleFoodPreference(preference)}
                >
                  {preference}
                </button>
              ))}
            </div>
          </div>
          
          {/* Customer Spending Power */}
          <div className=" font-Roboto">
            <p className="text-xl font-medium mb-1">Customer spending power</p>
            <div className="grid grid-cols-4 gap-2">
              {spendPow.map((range) => (
                <button
                  key={range}
                  className={`px-1 py-2 border rounded-lg text-[14px] whitespace-nowrap ${
                    spendingPower === range ? "bg-[#004AAD] text-white" : ""
                  }`}
                  onClick={() => setSpendingPowerFilter(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={onClose}
              className="w-2/5 px-4 py-3 bg-[#E2E8F0] text-black rounded-lg"
            >
              Cancel
            </button>
            <button
              className="w-3/5 px-4 py-3 bg-[#004AAD] text-white rounded-lg"
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

export default CustomerPool;
