import React from "react";

const WebsiteButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  return (
    <div className="flex items-center gap-4 rounded-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Button type
        </label>
        <input
          type="text"
          value="Website Link"
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
          value="Book Now"
          className="mt-1 block w-full rounded-md p-2 sm:text-sm outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Link</label>
        <input
          type="text"
          value="abcd.com"
          readOnly
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

export default WebsiteButton;
