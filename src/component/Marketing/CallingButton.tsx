import React from "react";

const CallingButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Button type
        </label>
        <input
          type="text"
          value="Phone Call"
          readOnly
          className="mt-1 block w-full rounded-md p-2 sm:text-sm outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Button text
        </label>
        <input
          type="text"
          placeholder="Call"
          className="mt-1 block w-full rounded-md p-2 sm:text-sm outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select className="mt-1 block w-full rounded-md p-2 sm:text-sm">
          <option value="IND" className="p-2 py-4">
            IND +91
          </option>
          {/* Add other countries here */}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          placeholder="Number"
          className="mt-1 block w-full rounded-md p-2 sm:text-sm outline-none"
        />
      </div>
      <button
        onClick={onDelete}
        className="mt-6 py-2 px-4 rounded-md text-[#E61856] bg-[#FDF1F1] font-medium"
      >
        Delete
      </button>
    </div>
  );
};

export default CallingButton;
