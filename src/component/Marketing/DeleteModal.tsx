import React from "react";

//images
import deleted from "../../assets/deleted.png";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg  max-w-sm text-center relative w-[18rem]">
        <div className="flex flex-col items-center">
          <img src={deleted} />
          <h2 className="text-base font-normal mb-4">
            Are you sure you want to delete?
          </h2>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white text-black rounded-md border border-[#E2E8F0]"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-[#004AAD] text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
