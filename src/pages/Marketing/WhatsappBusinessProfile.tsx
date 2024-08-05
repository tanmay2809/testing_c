import React, { useState } from "react";

//components
import Profile from "./Profile";
import SaveChangesModal from "../../component/Marketing/SaveChangesModal";

const WhatsappBusinessProfile: React.FC = () => {
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


  return (
    <div className="w-full h-fit relative ">
      <div className="lg:w-[93%]  lg:px-[2rem] py-[1rem] gap-10 lg:ml-[7%] bg-[#F1F7FF] ">
        <div className="w-full flex flex-row justify-between mt-[60px] font-inter">
          <div className="w-full p-6 min-h-[86vh] max-h-[110vh]">
            <header className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold">WhatsApp Business Profile</h1>
                <p>Manage your whatsApp business profile seemlessly</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Foodoos</span>
              </div>
            </header>
            <div className="w-full bg-white mb-3 h-14 p-4 flex justify-between items-center rounded-tl-lg rounded-tr-lg">
              <p className="text-lg font-bold">Profile</p>
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
            </div>
            <div className="flex gap-3 w-full">
              <Profile />
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

export default WhatsappBusinessProfile;
