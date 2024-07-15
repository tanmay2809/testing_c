import deleted from "../../assets/deleted.png";

interface DeleteProps {
  setModal: (isOpen: boolean) => void;
}

const DeleteModal: React.FC<DeleteProps> = ({ setModal }) => {
  return (
    <div
      id="default-modal"
      // tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50`}
    >
      <div className={`p-4 w-full sm:w-fit h-fit`}>
        <div className="w-[350px] relative bg-white rounded-lg shadow">
          <div className="flex flex-col items-center gap-2 px-10 py-4">
            <img src={deleted} className="w-[200px] h-auto" />
            <p className="text-[#0F172A] text-center text-[20px] font-[400]">
              Are you sure you want to delete ?
            </p>
          </div>
          <div className="flex flex-col mt-2 px-8 pb-5">
            <div className="flex flex-row gap-5 mt-4">
              <button
                className="w-[50%]  text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-2"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button className="w-[50%] bg-[#004AAD]  text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
