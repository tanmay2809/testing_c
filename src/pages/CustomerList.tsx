import React, { useState } from "react";

//icons
import { FaFilter, FaSearch } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";

//other components
import CustomerDetail from "../component/CustomerDetail";
import SegmentationPopup from "../component/SegmentationPopup";
import CustomerFilter from "../component/CustomerFilter";

//data
import { Customer, customers, segmentationColors } from "../constants/index";

const CustomerList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [hoveredSegmentation, setHoveredSegmentation] = useState<
    number | string | null
  >(null);
  const [segmentationVisible, setSegmentationVisible] =
    useState<boolean>(false);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<string[]>([]);
  const [sort, setSort] = useState<boolean>(false);

  //calculate the indices of first and last customer
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  //page number
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    pageNumber: number
  ) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  //customer details
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  //single customer
  const closeModal = () => {
    setSelectedCustomer(null);
  };

  //filter
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const filterElementsAdd = (data: string[]) => {
    setFilterData(data);
  };
  const handleFilterDataRemove = (data: string) => {
    let newData: string[] = filterData.filter((el: string) => el !== data);
    setFilterData(newData);
  };

  //sort
  const handleSortChange = (criteria: string) => {
    setSort(false);
    console.log(criteria);
    //the sorting logic goes here
  };

  return (
    <div className="w-full h-fit relative ">
      <div className=" w-[93%] h-fit px-[2rem] py-[1rem]  gap-10 ml-[7%] mt-2 ">
        {/*Top div */}
        <div className="mb-4 flex justify-between items-center">
          <div className="relative flex items-center w-[410px]">
            <FaSearch className="relative left-7 text-gray-400" />
            <input
              type="search"
              placeholder="Search by customer name, phone number"
              className="w-full h-[50px] bg-gray-100 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-1"
            />
          </div>
          <div className="flex items-center text-[#004AAD] mt-4">
            <div className="relative">
              <button
                className="bg-white border rounded-lg px-4 py-3 mx-2 flex items-center text-md font-Roboto"
                onClick={() => setSort(!sort)}
              >
                <TbArrowsSort className="mr-2" />
                Sort by
              </button>
              {/* Dropdown menu for sorting */}
              {sort && (
                <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg py-1 z-10">
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortChange("visit-high")}
                  >
                    Visit High to Low
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortChange("visit-low")}
                  >
                    Visit Low to High
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortChange("latest-visit")}
                  >
                    Latest Visit
                  </li>
                </ul>
              )}
            </div>
            <button
              className="bg-white border rounded-lg px-4 py-[0.69rem] mx-2 flex items-center text-md font-Roboto"
              onClick={toggleFilter}
            >
              <FaFilter className="mr-2" />
              Filter Customer
            </button>
            <button className="bg-[#004AAD] text-white rounded-lg px-6 py-2 flex items-center text-[1.3125rem]">
              <svg
                className="mr-2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8327 17.3334H4.16602C3.76819 17.3334 3.38666 17.1754 3.10536 16.8941C2.82405 16.6128 2.66602 16.2312 2.66602 15.8334V14.0001C2.66602 13.8233 2.73625 13.6537 2.86128 13.5287C2.9863 13.4037 3.15587 13.3334 3.33268 13.3334C3.50949 13.3334 3.67906 13.4037 3.80409 13.5287C3.92911 13.6537 3.99935 13.8233 3.99935 14.0001V15.8334C3.99935 15.8776 4.01691 15.92 4.04816 15.9513C4.07942 15.9825 4.12181 16.0001 4.16602 16.0001H15.8327C15.8769 16.0001 15.9193 15.9825 15.9505 15.9513C15.9818 15.92 15.9993 15.8776 15.9993 15.8334V14.0001C15.9993 13.8233 16.0696 13.6537 16.1946 13.5287C16.3196 13.4037 16.4892 13.3334 16.666 13.3334C16.8428 13.3334 17.0124 13.4037 17.1374 13.5287C17.2624 13.6537 17.3327 13.8233 17.3327 14.0001V15.8334C17.3327 16.2312 17.1746 16.6128 16.8933 16.8941C16.612 17.1754 16.2305 17.3334 15.8327 17.3334ZM14.666 4.00008H5.33268C5.15587 4.00008 4.9863 3.92984 4.86128 3.80482C4.73625 3.67979 4.66602 3.51023 4.66602 3.33341C4.66602 3.1566 4.73625 2.98703 4.86128 2.86201C4.9863 2.73699 5.15587 2.66675 5.33268 2.66675H14.666C14.8428 2.66675 15.0124 2.73699 15.1374 2.86201C15.2624 2.98703 15.3327 3.1566 15.3327 3.33341C15.3327 3.51023 15.2624 3.67979 15.1374 3.80482C15.0124 3.92984 14.8428 4.00008 14.666 4.00008Z"
                  fill="white"
                />
                <path
                  d="M13.2801 9.58676C13.2301 9.70851 13.1451 9.81272 13.036 9.88628C12.9269 9.95984 12.7984 9.99944 12.6668 10.0001H10.6668V12.6668C10.6668 12.8436 10.5965 13.0131 10.4715 13.1382C10.3465 13.2632 10.1769 13.3334 10.0001 13.3334C9.82328 13.3334 9.65371 13.2632 9.52869 13.1382C9.40366 13.0131 9.33343 12.8436 9.33343 12.6668V10.0001H7.33343C7.20181 9.99944 7.07333 9.95984 6.96419 9.88628C6.85504 9.81272 6.77011 9.70851 6.72009 9.58676C6.66904 9.46535 6.65509 9.33154 6.68001 9.20222C6.70492 9.07289 6.76759 8.95384 6.86009 8.86009L9.52676 6.19343C9.59016 6.13273 9.66493 6.08516 9.74676 6.05343C9.90907 5.98675 10.0911 5.98675 10.2534 6.05343C10.3353 6.08516 10.41 6.13273 10.4734 6.19343L13.1401 8.86009C13.2326 8.95384 13.2953 9.07289 13.3202 9.20222C13.3451 9.33154 13.3311 9.46535 13.2801 9.58676Z"
                  fill="white"
                />
              </svg>
              Export
              <svg
                className="relative -right-9 -top-5"
                width="32"
                height="34"
                viewBox="0 0 32 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4.5"
                  y="4.5"
                  width="22.38"
                  height="24.54"
                  rx="11.19"
                  fill="white"
                />
                <rect
                  x="4.5"
                  y="4.5"
                  width="22.38"
                  height="24.54"
                  rx="11.19"
                  stroke="white"
                  stroke-width="5"
                />
                <path
                  d="M18.6236 14.7973L24.3745 13.2897L21.785 22.8177L21.7842 22.8206L21.7671 22.82H21.75H9.16H9.15184L9.14369 22.8201L7.41392 13.2914L7.41399 13.2914L7.41201 13.2811L7.42563 13.2861L7.44075 13.291L12.7608 15.021L13.6558 15.312L14.0005 14.4362L15.7095 10.0944L17.4486 14.2186L17.7853 15.0171L18.6236 14.7973ZM20.38 1H11C8.34783 1 5.8043 2.05357 3.92893 3.92893C2.05357 5.8043 1 8.34783 1 11V22.54C1 25.1922 2.05357 27.7357 3.92893 29.6111C5.8043 31.4864 8.34783 32.54 11 32.54H20.38C23.0322 32.54 25.5757 31.4864 27.4511 29.6111C29.3264 27.7357 30.38 25.1922 30.38 22.54V11C30.38 8.34783 29.3264 5.8043 27.4511 3.92893C25.5757 2.05357 23.0322 1 20.38 1Z"
                  fill="black"
                  stroke="white"
                  stroke-width="2"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-md">
            Total Customer Database:{" "}
            <strong className="text-[#004AAD]">100 Record</strong>
          </span>
        </div>

        {/*Filter elements */}
        {filterData.length > 0 && (
          <div className="font-inter flex items-center justify-start gap-2 mb-4">
            <h2 className="font-bold text-base text-[#454545]">Filter</h2>
            {filterData.map((data: string, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-[#F1F7FF] text-xs font-semibold px-2 py-1 rounded-xl text-[#373737]"
                >
                  <p>{data}</p>
                  <IoCloseOutline
                    className="text-lg cursor-pointer"
                    onClick={() => handleFilterDataRemove(data)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/*Customer info table */}
        <table className="min-w-full bg-white border font-inter">
          <thead>
            <tr className="w-full bg-gray-100 text-center text-[#858687] ">
              <th className="py-3 px-6">Customer Name</th>
              <th className="py-3 px-6">Phone Number</th>
              <th className="py-3 px-6">Total Visit</th>
              <th className="py-3 px-6">Last Visit</th>
              <th className="py-3 px-6">Segmentation</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((customer, index) => (
              <tr key={index} className="border-t text-lg text-center">
                <td className="py-3 px-6">{customer.name}</td>
                <td className="py-3 px-6">{customer.phone} </td>
                <td className="py-3 px-6">{customer.visits}</td>
                <td className="py-3 px-6">{customer.lastVisit}</td>

                {/*Segmentation logic */}
                <td className="py-3 px-6 ">
                  {/*segementation popup */}
                  {hoveredSegmentation === index && (
                    <div>
                      {/*background blur div */}
                     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-30 p-5"></div>
                      {/*div to align popup */}
                      <div className="relative right-[16.5rem] -top-36">
                        <SegmentationPopup
                          setVisibility={setSegmentationVisible}
                          hoveredSegmentation={setHoveredSegmentation}
                          segmentation={customer.segmentation}
                          segIndex={index}
                        />
                      </div>
                    </div>
                  )}
                  {/*segmentation column content */}
                  <span
                    className={` relative py-1 px-2 rounded-lg text-sm   ${
                      segmentationColors[customer.segmentation]
                    } ${hoveredSegmentation===index && "z-40"}`}
                    onMouseEnter={() => {
                      setHoveredSegmentation(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredSegmentation(null);
                    }}
                  >
                    {customer.segmentation}
                  </span>
                </td>

                <td className="py-3 px-6 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleViewDetails(customer)}
                    className="text-base font-bold"
                  >
                    View Details
                  </button>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.66602 2L8.53394 9L1.66602 16"
                      stroke="#64748B"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.79883 2L15.6668 9L8.79883 16"
                      stroke="#64748B"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*Bottom part */}
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-center gap-4 items-center">
            <div className=" text-base font-semibold">Show rows:</div>
            <select
              className="border px-4 py-3 rounded-xl bg-[#E2E8F0] text-[#94A3B8] outline-none"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10 items</option>
              <option value={20}>20 items</option>
              <option value={30}>30 items</option>
            </select>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button
              className={`mx-1 px-3 py-2 border ${
                currentPage === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-white"
              }`}
              onClick={(event) => handleClick(event, currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-2 border ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
                onClick={(event) => handleClick(event, index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`mx-1 px-3 py-2 border ${
                currentPage === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-white"
              }`}
              onClick={(event) => handleClick(event, currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <CustomerDetail
        customer={selectedCustomer}
        isVisible={!!selectedCustomer}
        onClose={closeModal}
      />

      <CustomerFilter
        isVisible={isFilterVisible}
        onClose={toggleFilter}
        filterData={filterElementsAdd}
      />
    </div>
  );
};

export default CustomerList;
