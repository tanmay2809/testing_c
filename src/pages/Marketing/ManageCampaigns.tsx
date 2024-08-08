import React, { ChangeEvent, useState } from "react";

// data
import { months, manageCampaigns } from "../../constants";

// icons
import { FaSearch, FaPen } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

// svg
import threeDots from "/threeDots.svg";
import whatsapp from "../../assets/whatsapp.png";

// modal component
import DeleteModal from "../../component/Marketing/DeleteModal";

//images
import noDataFound from "../../assets/No data found.png";

const ManageCampaigns: React.FC = () => {
  const [month, setMonth] = useState<string>(months[new Date().getMonth()]);
  const [actionIndex, setActionIndex] = useState<number | null>(null); // State to track which campaign's action menu is open
  const [status, setStatus] = useState(true);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [campaignToDelete, setCampaignToDelete] = useState<number | null>(null);

  // navbar fram
  const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  const searchCampaign = (searchTerm: string): void => {
    console.log(searchTerm);
  };

  const statusClasses: { [key: string]: string } = {
    "Under Review": "text-red-500",
    Active: "text-green-500",
    Pause: "text-red-500",
  };

  const openDeleteModal = (index: number) => {
    setCampaignToDelete(index);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (campaignToDelete !== null) {
      // Handle the delete logic here, e.g., remove the campaign from the list
      console.log(`Deleting campaign at index: ${campaignToDelete}`);
      setDeleteModalOpen(false);
      setActionIndex(null);
      setCampaignToDelete(null);
    }
  };
  const isEmpty = Object.keys(manageCampaigns).length === 0;

  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setActionIndex(null);
        }}
        onDelete={handleDelete}
      />
      <div
        onClick={handlefram}
        className="lg:w-[93%] h-fit px-[2rem] lg:ml-[7%]"
      >
        <div className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Campaign Performance</h2>
            <div className="flex items-center space-x-4">
              <select
                id="month"
                name="month"
                value={month}
                onChange={handleMonthChange}
                className="font-inter px-2 h-[40px] py-2 text-base focus:outline-none sm:text-sm rounded-md border border-black mt-1"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <div
              className={`flex-1 p-4 bg-[#BEFED4] flex flex-col justify-between rounded shadow text-left text-[#505050]`}
            >
              <p>Active Campaign</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div
              className={`flex-1 p-4 bg-[#FADBFF] flex flex-col justify-between rounded shadow text-left text-[#505050]`}
            >
              <p>Total Campaign sent</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div
              className={`flex-1 p-4 bg-[#F9FFB9] flex flex-col justify-between rounded shadow text-left text-[#505050]`}
            >
              <p>Customer Visit</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div
              className={`flex-1 p-4 bg-[#FFDA75] flex flex-col justify-between rounded shadow text-left text-[#505050]`}
            >
              <p>Total Cost</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div
              className={`flex-1 p-4 bg-[#B3FFEF] flex flex-col justify-between rounded shadow text-left text-[#505050]`}
            >
              <p>Return on ad spend</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center -ml-4 justify-start">
              <FaSearch className="relative left-7 text-gray-400" />
              <input
                type="search"
                onChange={(e) => searchCampaign(e.target.value)}
                placeholder="Search anything..."
                className="w-full pl-10 pr-3 py-2 rounded-md border border-[#E2E8F0]"
              />
            </div>
            <select className="px-4 py-2 border rounded text-[#004AAD]">
              <option>Status</option>
              <option>Active</option>
              <option>Under Review</option>
              <option>Pause</option>
            </select>
          </div>
          <div
            className="mt-4 mb-6 h-[25rem] overflow-y-auto bg-[#F1F7FF]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <table className="min-w-full bg-white text-[#434343] font-inter text-sm ">
              <thead>
                <tr className="bg-[#F1F7FF] w-full border-b-4 border-white p-3">
                  <th className="px-4 py-4 text-left">Channel/Type</th>
                  <th className="px-4 py-4 text-left">Campaign name</th>
                  <th className="px-4 py-4 text-left">Delivered</th>
                  <th className="px-4 py-4 text-left">Total Re-visit</th>
                  <th className="px-4 py-4 text-left">Conversion rate</th>
                  <th className="px-4 py-4 text-left">Total Cost</th>
                  <th className="px-4 py-4 text-center">Status</th>
                  <th className="px-4 py-4 text-center">Action</th>
                </tr>
              </thead>
              {isEmpty ? (
                <tbody className="bg-[#F1F7FF] ">
                  <tr>
                    <td colSpan={8} className="pb-4">
                      <div className=" flex flex-col items-center justify-start w-full">
                        <img src={noDataFound} className="w-60 h-auto" />
                        <p className="w-full text-center font-semibold">
                          No data to display. Once customers starts visiting
                          this will look a lot more exciting.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="bg-[#F1F7FF] ">
                  {manageCampaigns.map((campaign, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#8B8B8B] relative"
                    >
                      <td className="px-2 py-4 flex items-center gap-1">
                        <div className="bg-[#F2F0F0] p-2 rounded-lg">
                          <img src={whatsapp} className="w-5" />
                        </div>
                        <p>{campaign.channel}</p>
                      </td>
                      <td className="px-4 py-4">{campaign.name}</td>
                      <td className="px-4 py-4">{campaign.delivered}</td>
                      <td className="px-4 py-4">{campaign.revisit}</td>
                      <td className="px-4 py-4">{campaign.conversionRate}</td>
                      <td className="px-4 py-4 font-semibold">
                        {campaign.cost}
                      </td>
                      <td
                        className={`px-4 py-4 font-semibold ${
                          statusClasses[campaign.status]
                        } text-center`}
                      >
                        {campaign.status}
                      </td>
                      <td className="px-4 py-4 text-center relative">
                        {actionIndex === index && (
                          <div className="bg-white rounded shadow-md w-40 absolute right-14 top-0 z-10">
                            <div className="flex items-center justify-between mb-2 border-b border-b-[#CBC6C6] p-2">
                              <span>Status</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={status}
                                  onChange={() => setStatus(!status)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500"></div>
                                <div className="absolute left-1 top-1 bg-white border border-gray-300 rounded-full h-4 w-4 transition peer-checked:translate-x-full peer-checked:border-white"></div>
                              </label>
                            </div>
                            <div className="flex items-center justify-between mb-2 cursor-pointer border-b border-b-[#CBC6C6] p-2">
                              <span>Edit</span>
                              <FaPen className="text-[#004AAD]" />
                            </div>
                            <div
                              className="flex items-center justify-between cursor-pointer border-b border-b-[#CBC6C6] p-2"
                              onClick={() => openDeleteModal(index)}
                            >
                              <span>Delete</span>
                              <RiDeleteBin6Line className="text-[#BE1D3A]" />
                            </div>
                          </div>
                        )}
                        <button
                          className="text-gray-500"
                          onClick={() =>
                            setActionIndex(actionIndex === index ? null : index)
                          }
                        >
                          <img src={threeDots} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCampaigns;
