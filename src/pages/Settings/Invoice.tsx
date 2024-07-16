import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Invoice as InvoiceType } from "../../redux/invoiceSlice";

// icons
import { IoMdCloseCircle } from "react-icons/io";
import { FaAnglesRight } from "react-icons/fa6";

// assets
import invoice from "../assets/Invoice Template.png";

const Invoice = () => {
  const { invoices } = useSelector((state: RootState) => state.invoice);
  const [model, setModel] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const toggleModel = () => {
    setModel(!model);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      toggleModel();
    }, 500);
  };

  return (
    <>
      <div className="w-full h-fit relative">
        <div className="w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%]">
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col -mt-4">
              <h1 className="text-[1.5rem] text-[#4D4D4D] font-[500]">
                My Invoices
              </h1>
              <p className="text-[1rem]">
                You have{" "}
                <span className="text-[#004AAD] font-bold">
                  {invoices.length} invoice
                </span>
              </p>
            </div>
            <div className="flex flex-col">
              {invoices.map((invoice: InvoiceType) => (
                <div
                  key={invoice.number}
                  className="p-5 flex flex-row justify-between border-2 rounded-xl"
                >
                  <div className="flex flex-col">
                    <p className="text-[0.875rem] text-[#616161] font-[700]">
                      Invoice Number
                    </p>
                    <p className="text-[1rem] text-[#616161] font-[400]">
                      {invoice.number}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.875rem] text-[#616161] font-[700]">
                      Company invoice name
                    </p>
                    <p className="text-[1rem] text-[#616161] font-[400]">
                      {invoice.name}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.875rem] text-[#616161] font-[700]">
                      Invoice Date
                    </p>
                    <p className="text-[1rem] text-[#616161] font-[400]">
                      {invoice.date}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.875rem] text-[#616161] font-[700]">
                      Invoice Amount
                    </p>
                    <p className="text-[1rem] text-[#616161] font-[400]">
                      ₹{invoice.amount}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.875rem] text-[#616161] font-[700]">
                      GST Charges
                    </p>
                    <p className="text-[1rem] text-[#616161] font-[400]">
                      ₹{invoice.charges}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.875rem] text-[#616161] font-[700]">
                      Payment Mode
                    </p>
                    <p className="text-[1rem] text-[#616161] font-[400]">
                      {invoice.mode}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.875rem] text-[#616161] font-[700]">
                      Billing period
                    </p>
                    <p className="text-[1rem] text-[#616161] font-[400]">
                      {invoice.period}
                    </p>
                  </div>
                  <button
                    className="flex flex-row items-center gap-2 text-[1.125rem] font-[600]"
                    onClick={() => toggleModel()}
                  >
                    View Details{" "}
                    <FaAnglesRight className="text-[#64748B] text-xl" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model */}
        {model && (
          <div
            id="default-modal"
            // tabIndex="-1"
            aria-hidden="true"
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-2`}
          >
            <div
              className={`bg-white w-[34.375rem] shadow-lg rounded-lg overflow-y-auto ${
                isClosing ? "slide-out-right" : "slide-in-right"
              }`}
            >
              <div className="w-full relative px-8 py-5 bg-white rounded-lg shadow h-full">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-[1.5rem] font-bold">Billing Invoice</h1>
                    <p className="text-[1rem] font-medium">
                      Edit your billing details at convenience
                    </p>
                  </div>
                  <IoMdCloseCircle
                    onClick={() => {
                      handleCloseModal();
                    }}
                    className="text-[2.5rem] hover:cursor-pointer"
                  />
                </div>
                <div className="flex flex-col items-center justify-evenly mt-3 h-[90%]">
                  <img src={invoice} className="w-[88%] h-auto" />
                  <div className="flex flex-row gap-5 mt-3">
                    <button
                      className="w-[11.25rem] h-14 text-[1.1rem] rounded-[0.5rem] border-2 font-bold text-richblack-900 px-[0.75rem] py-[1rem]"
                      onClick={() => handleCloseModal()}
                    >
                      Cancel
                    </button>
                    <button className="w-[11.25rem] bg-[#004AAD] text-[1.1rem] rounded-[0.5rem] text-white font-bold text-richblack-900 px-[0.75rem] py-2">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Invoice;
