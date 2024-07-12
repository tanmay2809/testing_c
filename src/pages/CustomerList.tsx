import React, { useState } from "react";

//icons
import { FaFilter, FaFileExport, FaSearch } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";

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
  const [hoveredSegmentation, setHoveredSegmentation] = useState<number | null>(
    null
  );
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
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
              <FaFileExport className="mr-2" />
              Export
            </button>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-md">
            Total Customer Database:{" "}
            <strong className="text-[#004AAD]">100 Record</strong>
          </span>
        </div>

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
                <td className="py-3 px-6">{customer.phone}</td>
                <td className="py-3 px-6">{customer.visits}</td>
                <td className="py-3 px-6">{customer.lastVisit}</td>
                {/*Segmentation logic */}
                <td className="py-3 px-6">
                  <span
                    className={`py-1 px-2 rounded-lg text-sm ${
                      segmentationColors[customer.segmentation]
                    }`}
                    onMouseEnter={() => setHoveredSegmentation(index)}
                    onMouseLeave={() => setHoveredSegmentation(null)}
                  >
                    {customer.segmentation}
                  </span>
                  {hoveredSegmentation === index && (
                    <div className="relative -left-64 -top-44  ">
                      <SegmentationPopup segmentation={customer.segmentation} />
                    </div>
                  )}
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

      <CustomerFilter isVisible={isFilterVisible} onClose={toggleFilter} />
    </div>
  );
};

export default CustomerList;
