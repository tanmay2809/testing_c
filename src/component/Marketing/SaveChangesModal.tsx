import React from 'react';

interface SaveChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

//svg
import saved from "/saved.svg";

const SaveChangesModal: React.FC<SaveChangesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Changes have been saved</h2>
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-2 rounded-full">
            <img src={saved}/>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          It may take a few minutes for your changes to show up on WhatsApp.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SaveChangesModal;
