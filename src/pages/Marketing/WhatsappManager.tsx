import React, { ChangeEvent, useState } from "react";

//svg
import insights from "/insights.svg";
import profile from "/profile.svg";
import managerBookings from "/managerBookings.svg";
import chats from "/chats.svg";

//data
import { months } from "../../constants/index";
import Insights from "./Insights";
import Profile from "./Profile";
import SaveChangesModal from "../../component/Marketing/SaveChangesModal";

const WhatsAppManager: React.FC = () => {
  const [selected, setSelected] = useState<string | null>("Insights");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()]
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const openModal = () => {
    setLoading(true);
    // simulate a network request
    setTimeout(() => {
      setModalOpen(true);
      setLoading(false);
    }, 2000);
  };
  const closeModal = () => setModalOpen(false);

  const handleClick = (item: string) => {
    setSelected(item);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const menuItems = [
    { name: "Insights", icon: insights },
    { name: "Profile", icon: profile },
    { name: "Chats", icon: chats, coming: true },
    { name: "Bookings", icon: managerBookings, coming: true },
  ];

  return (
    <div className="w-full h-fit relative">
      <div className="lg:w-[93%]  lg:px-[2rem] py-[1rem] gap-10 lg:ml-[7%]">
        <div className="w-full flex flex-row justify-between mt-[60px] font-inter">
          <div className="w-full p-6 bg-[#F1F7FF] max-h-[110vh]">
            <header className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-bold">WhatsApp Manager</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Foodoos</span>
              </div>
            </header>
            <div className="w-full bg-white mb-3 h-14 p-4 flex justify-between items-center rounded-tl-lg rounded-tr-lg">
              <p className="text-lg font-bold">{selected}</p>
              {/* Dropdown Button */}
              {selected === "Insights" ? (
                <select
                  id="month"
                  name="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="font-inter px-2 py-2 text-base focus:outline-none sm:text-sm rounded-md border border-black mt-1"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              ) : (
                <button
                  className="bg-[#004AAD] h-7 flex items-center justify-center text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-2"
                  onClick={openModal}
                >
                  {loading ? (
                    <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  ) : (
                    <span>Save</span>
                  )}
                </button>
              )}
            </div>
            <div className="flex gap-3 ">
              <div className=" text-[#7C7C7C] w-[25%] rounded-bl-lg mx-auto bg-white p-6 flex flex-col justify-start gap-7 min-h-fit max-h-[80vh]">
                {menuItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleClick(item.name)}
                    className={`flex justify-center items-center gap-3 cursor-pointer p-2 ${
                      selected === item.name
                        ? "bg-[#EDF5FF] text-[#004AAD]"
                        : ""
                    }`}
                  >
                    <img src={item.icon} alt={item.name} />
                    <p>{item.name}</p>
                    {item.coming && (
                      <span className="bg-[#C3DDFF] text-black rounded-xl p-[0.25rem] text-[0.6rem]">
                        Coming
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {selected === "Insights" && <Insights />}
              {selected === "Profile" && <Profile />}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SaveChangesModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default WhatsAppManager;
