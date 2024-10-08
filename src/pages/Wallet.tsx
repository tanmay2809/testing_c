import { RxReload } from "react-icons/rx";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import whatsapp from "../assets/whatsapp.png";
import { ChangeEvent, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import recharge from "../assets/recharge.png";
import { months } from "../constants";

// interface data {
//   id: number;
//   cycle: string;
//   status: string;
//   billAmount: string;
//   paidAmount: string;
// }

// const data = [
//   {
//     id: 1,
//     cycle: "1 August-31 August",
//     status: "ongoing",
//     billAmount: "100",
//     paidAmount: "50",
//   },
//   {
//     id: 2,
//     cycle: "1 August-31 August",
//     status: "completed",
//     billAmount: "100",
//     paidAmount: "50",
//   },
//   {
//     id: 3,
//     cycle: "1 August-31 August",
//     status: "defaulted",
//     billAmount: "100",
//     paidAmount: "50",
//   },
// ];

const Wallet: React.FC = () => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [rechargeModal, setRechargeModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [balance, setBalance] = useState<string>("1000");
  const [credits, setCredits] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()]
  );

  const handleAmountClick = (amount: string) => {
    setInputValue(amount);
  };

  const handleReload = async () => {
    setLoading(true);
    const newBalance = await fetchBalance();
    setBalance(newBalance[0]);
    setCredits(newBalance[1]);
    setLoading(false);
  };

  const fetchBalance = async () => {
    return ["1200", "0"];
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="w-full bg-[#EFF6FF] h-[100vh] relative md:mb-[140px] lg:mb-0">
      <div className="w-full lg:w-[93%] h-fit flex items-center justify-center lg:ml-[7%]">
        <div className="w-full h-fit mt-[70px]">
          <div className="flex flex-row justify-between bg-white px-10 py-8">
            <div className="w-fit flex flex-col items-start font-Roboto">
              <h1 className="text-[1.6rem] font-bold">Wallet</h1>
              <p className="text-[1rem]">
                Pay as you use campaigns with easy wallet recharge
              </p>
            </div>
            <div className="w-fit">
              <Link to="https://wa.me/917044292143?text=Hi%20" target="_blank">
                <button className="w-[160px] flex flex-row items-center gap-2 px-4 py-2 border-2 text-[18px] font-[500] rounded-[8px]">
                  <img className="w-6 h-6" src={whatsapp} />
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          <div className=" font-inter px-10 py-8 bg-[#F5F9FF]">
            <div className="w-fit h-fit flex flex-col gap-10 rounded-xl border-[2px] border-[#DDDDDD] bg-[#FAFCFF] p-5">
              <div className="flex flex-row justify-center">
                <div className="w-1/2 flex flex-col items-center border-r-2 border-r-black">
                  <p className="text-[2.2rem] text-[#004AAD] font-semibold">
                    ₹{balance}
                  </p>
                  <p className="text-[1rem] text-[#6B6B6B] font-semibold">
                    Wallet Balance
                  </p>
                </div>
                <div className="w-1/2 flex flex-row items-between justify-between px-5">
                  <div className="flex flex-col justify-start relative">
                    <p className="text-[2.2rem] font-semibold">₹{credits}</p>
                    <p className="text-[1rem] text-[#6B6B6B] font-semibold flex flex-row items-center gap-1">
                      Credits
                      <span
                        className="relative"
                        onMouseEnter={() => setPopupVisible(true)}
                        onMouseLeave={() => setPopupVisible(false)}
                      >
                        <IoMdInformationCircleOutline className="text-[1rem] text-[#231F20] hover:cursor-pointer" />
                        {popupVisible && (
                          <div
                            className="absolute top-full left-0 bg-white border rounded-lg p-4 shadow-lg w-[250px] h-fit flex flex-col gap-2 font-inter z-[100]"
                            onMouseOver={() => setPopupVisible(true)}
                            onMouseLeave={() => setPopupVisible(false)}
                          >
                            <span className="w-fit px-2 text-center bg-[#D4E7FF] rounded-lg text-[0.94rem] font-semibold text-[#4B4B4B]">
                              What is credits ?
                            </span>
                            <p className="text-[#505050]">
                              Credits can be used to pay for campaign charges ,
                              subscription charges can't be paid via this
                            </p>
                          </div>
                        )}
                      </span>
                    </p>
                  </div>
                  {loading ? (
                    <div className="inline-block  h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  ) : (
                    <RxReload
                      className="text-[1.5rem] hover:cursor-pointer"
                      onClick={() => handleReload()}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <button
                  className="w-[180px] h-fit bg-[#004AAD] border-[2px] border-[#004AAD] px-4 py-2 text-white rounded-[0.5rem] text-[0.9rem] font-semibold"
                  onClick={() => setRechargeModal(true)}
                >
                  Recharge Wallet
                </button>
                <Link
                  to="/setting/billing"
                  className="w-[180px] text-center h-fit border-[2px] border-[#004AAD] px-4 py-2 text-[#004AAD] rounded-[0.5rem] text-[0.9rem] font-semibold"
                >
                  Manage Billing
                </Link>
              </div>
            </div>

            {/* Activity Table */}
            <div className="mt-8">
              <div className="flex flex-row justify-between pr-24 py-8">
                <h1 className="text-[1.5rem] text-[#505050] font-semibold mb-[1rem] ml-2">
                  Balance Utilisation
                </h1>
                <select
                  id="month"
                  name="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="font-inter border-none px-2 py-2 text-base focus:outline-none sm:text-sm rounded-md border border-black mt-1"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="overflow-x-scroll no-scrollbar rounded-[12px] border-[2px] border-[#DDDDDD] bg-[#FAFCFF]">
                <table className="w-full text-base mt-4">
                  <thead>
                    <tr className="w-full text-center text-[#858687] text-nowrap">
                      <th className="py-3 px-6">Reference ID</th>
                      <th className="py-3 px-6">Billing cycle</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6">Bill Amount</th>
                      <th className="py-3 px-6">Paid Amount</th>
                      <th className="py-3 px-6">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((data) => (
                      <tr
                        key={data.id}
                        className="w-full border-t-[2px] border-t-[#DDDDDD] text-base text-center text-nowrap"
                      >
                        <td className="py-3 px-6">{data.id}</td>
                        <td className="py-3 px-6">{data.cycle}</td>
                        <td className="py-3 px-6">
                          <span
                            className={`${
                              (data.status.toLowerCase() === "ongoing" &&
                                "bg-[#BFFFD4]") ||
                              (data.status.toLowerCase() === "completed" &&
                                "bg-[#004AAD] text-white") ||
                              (data.status.toLowerCase() === "defaulted" &&
                                "bg-[#FFBFBF]")
                            } rounded-[0.5rem] px-2 py-1`}
                          >
                            {data.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 font-semibold">
                          ₹{data.billAmount}
                        </td>
                        <td className="py-3 px-6 font-semibold">
                          ₹{data.paidAmount}
                        </td>
                        <td className="py-3 px-6 font-semibold">
                          <Link
                            to=""
                            className="flex flex-row items-center gap-2 justify-center"
                          >
                            <BsDownload />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
              <div className="flex flex-row flex-wrap gap-x-5 gap-y-5 text-[#505050] font-inter">
                <div className="w-[22%] h-[150px] bg-[#FADBFF] flex flex-col justify-between rounded-md p-5">
                  <p className="text-[1rem]">Total Cost</p>
                  <p className="text-[2.5rem] font-bold">₹400</p>
                </div>
                <div className="w-[22%] h-[150px] bg-[#F9FFB9] flex flex-col justify-between rounded-md p-5">
                  <p className="text-[1rem]">WhatsApp Utility Cost</p>
                  <p className="text-[2.5rem] font-bold">₹200</p>
                </div>
                <div className="w-[22%] h-[150px] bg-[#FEC8C8] flex flex-col justify-between rounded-md p-5">
                  <p className="text-[1rem]">WhatsApp Marketing Cost</p>
                  <p className="text-[2.5rem] font-bold">₹200</p>
                </div>
                <div className="w-[22%] h-[150px] bg-[#BEFED4] flex flex-col justify-between rounded-md p-5">
                  <p className="text-[1rem]">Total Due Amount</p>
                  <p className="text-[2.5rem] font-bold">₹200</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recharge Modal */}
      {rechargeModal && (
        <div
          id="default-modal"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-[320px] sm:w-fit h-fit">
            <div className="relative flex flex-col bg-white w-fit max-w-[500px] h-fit rounded-lg shadow">
              <div className="flex flex-row items-center justify-center gap-20 p-4 font-Roboto">
                <div className="flex flex-col">
                  <p className="text-[1.5rem] font-semibold">Recharge Wallet</p>
                  <p className="text-[1rem]">
                    Recharge your wallet with any payment method
                  </p>
                </div>
                <IoCloseCircle
                  className="text-[2rem] hover:cursor-pointer"
                  onClick={() => setRechargeModal(false)}
                />
              </div>
              <form className="bg-[#F1F7FF] flex flex-col items-center justify-center px-8 pb-10 rounded-b-lg">
                <div className="p-8">
                  <img
                    src={recharge}
                    className="w-[250px] h-auto"
                    alt="Recharge"
                  />
                </div>
                <div className="w-full relative font-inter">
                  <span className="absolute text-[1.5rem] text-[#494949] font-semibold left-4 top-1/2 transform -translate-y-1/2 ">
                    ₹
                  </span>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                    placeholder="Enter Amount"
                    className="w-full text-[1.2rem] pl-10 focus:outline-none p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-row flex-wrap gap-x-4 font-inter py-4">
                  {[1000, 2000, 5000, 10000].map((amount) => (
                    <span
                      key={amount}
                      className="bg-white px-4 py-2 rounded-[0.5rem] text-[1.1rem] text-[#494949] font-semibold cursor-pointer"
                      onClick={() => handleAmountClick(amount.toString())}
                    >
                      ₹ {amount}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="w-full text-white bg-[#004AAD] text-[1rem] font-inter hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2 text-center"
                >
                  Add Amount
                </button>
              </form>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
