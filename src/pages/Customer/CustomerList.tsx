import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";

//icons
import { FaFilter, FaSearch } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";

//other components
import CustomerDetail from "../../component/Customer/CustomerDetail";
import SegmentationPopup from "../../component/Customer/SegmentationPopup";
import CustomerFilter from "../../component/Customer/CustomerFilter";

//images
import noData from "../../assets/undraw_no_data_re_kwbl 1.png";

//data
import { Customer, segmentationColors } from "../../constants/index";
import { baseUrl } from "../../main";

//svg
// import exportIcon from "/exportIcon.svg";
// import premium from "/premium.svg";
import doubleArrow from "/doubleArrow.svg";

const CustomerList: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.resturantdata);

  console.log("resData: ", data);

  const [resData, setResData] = useState<any>(data);
  const [customerData, setCustomerData] = useState<any>(data?.customerData);
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
  const [sort, setSort] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  //filter states
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<string[]>([]);
  const [customDateVisit, setCustomDateVisit] = useState<string>("");
  const [customDateNotVisit, setCustomDateNotVisit] = useState<string>("");
  const [segmentation, setSegmentation] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);

  useEffect(() => {
    setCustomerData(data?.customerData);
  }, [data]);
  useEffect(() => {
    // Only call handleFilter if filterData has been set
    handleFilter();
  }, [filterData]);

  //calculate the indices of first and last customer
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customerData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customerData?.length / itemsPerPage);

  const handleFilter = () => {
    console.log(filterData);
    let filteredCustomers: Customer[] = [];
    let mainData = data?.customerData;
    let genderFiltered: Customer[] = [];
    let segmentationFiltered: Customer[] = [];
    let visitFiltered: Customer[] = [];
    let nonVisitFiltered: Customer[] = [];

    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(now.getDate() - 60);
    const customDateVisitObj = new Date(customDateVisit);
    const customDateNotVisitObj = new Date(customDateNotVisit);

    if (filterData.length > 0) {
      // Filter by visit dates
      visitFiltered = mainData.filter((customer: Customer) => {
        let visitCondition;
        {
          filterData.map((visitFilter) => {
            visitCondition =
              (visitFilter === "Visited in Last 30 days" &&
                customer.visits.some(
                  (visit: string) => new Date(visit) >= thirtyDaysAgo
                )) ||
              (visitFilter === "Visited in Last 60 days" &&
                customer.visits.some(
                  (visit: string) => new Date(visit) >= sixtyDaysAgo
                )) ||
              (visitFilter === "Custom" &&
                customer.visits.some(
                  (visit: string) => new Date(visit) >= customDateVisitObj
                ));
          });
          return visitCondition;
        }
      });
      console.log("After visit: ", visitFiltered);

      // Filter by not visit dates
      nonVisitFiltered = mainData.filter((customer: Customer) => {
        let nonVisitCondition;
        {
          filterData.map((visitFilter) => {
            nonVisitCondition =
              (visitFilter === "Not visited in Last 30 days" &&
                customer.visits.some(
                  (visit: string) => new Date(visit) >= thirtyDaysAgo
                )) ||
              (visitFilter === "Not visited in Last 60 days" &&
                customer.visits.some(
                  (visit: string) => new Date(visit) >= sixtyDaysAgo
                )) ||
              (visitFilter === "Custom" &&
                customer.visits.some(
                  (visit: string) => new Date(visit) >= customDateNotVisitObj
                ));
          });
          return nonVisitCondition;
        }
      });
      console.log("After not visit: ", nonVisitFiltered);

      // Filter by gender
      genderFiltered = mainData.filter((customer: Customer) => {
        return filterData.includes(customer.userId?.gender);
      });
      console.log("After gender: ", genderFiltered);

      // Filter by customer segmentation
      segmentationFiltered = mainData.filter((customer: Customer) => {
        const customerSegment = getCustomerSegment(customer.visits);
        console.log(customerSegment);
        return filterData.includes(customerSegment);
      });
      console.log("After segmentation: ", segmentationFiltered);
      const filteredArrays = [
        genderFiltered,
        segmentationFiltered,
        visitFiltered,
        nonVisitFiltered,
      ];
      const nonEmptyFilteredArrays = filteredArrays.filter(
        (array) => array.length > 0
      );

      if (nonEmptyFilteredArrays.length > 1) {
        // Find the intersection of all non-empty filtered arrays
        filteredCustomers = nonEmptyFilteredArrays.reduce((acc, curr) => {
          return acc.filter((customer: Customer) => curr.includes(customer));
        });
      } else if (nonEmptyFilteredArrays.length === 1) {
        // If only one filtered array is non-empty, use it
        filteredCustomers = nonEmptyFilteredArrays[0];
      }

      // If both filters are non-empty, find the intersection
      // if (
      //   genderFiltered.length > 0 &&
      //   segmentationFiltered.length > 0 &&
      //   visitFiltered.length > 0 &&
      //   nonVisitFiltered.length > 0
      // ) {
      //   filteredCustomers = segmentationFiltered
      //     .filter((customer: Customer) => genderFiltered.includes(customer))
      //     .filter((customer: Customer) => visitFiltered.includes(customer))
      //     .filter((customer: Customer) => nonVisitFiltered.includes(customer));
      // } else if (
      //   genderFiltered.length > 0 &&
      //   segmentationFiltered.length > 0 &&
      //   visitFiltered.length > 0
      // ) {
      //   filteredCustomers = segmentationFiltered
      //     .filter((customer: Customer) => genderFiltered.includes(customer))
      //     .filter((customer: Customer) => visitFiltered.includes(customer));
      // } else {
      //   filteredCustomers.push(...genderFiltered);
      //   console.log("gender added: ", filteredCustomers);
      //   filteredCustomers.push(...segmentationFiltered);
      //   console.log("segmentation added: ", filteredCustomers);
      //   filteredCustomers.push(...visitFiltered);
      //   console.log("segmentation added: ", visitFiltered);
      // }
      console.log("Final result: ", filteredCustomers);
    } else {
      //if filter data is empty then filtered customers=all customers
      filteredCustomers = data?.customerData;
    }
    setCustomerData(filteredCustomers);
  };

  // Helper function to create pagination buttons
  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 3;
    // Add the first page
    buttons.push(
      <button
        key={1}
        className={`mx-1 px-3 py-2 border ${
          currentPage === 1 ? "bg-[#004AAD] text-white" : "bg-white"
        }`}
        onClick={(event) => handleClick(event, 1)}
      >
        1
      </button>
    );
    // If the total pages are more than the max visible buttons, add dots
    if (totalPages+1 > maxVisibleButtons ) {
      // Show the dots after the first page
      if (currentPage > maxVisibleButtons) {
        buttons.push(
          <span key="dots1" className="mx-1">
            ...
          </span>
        );
      }

      // Show middle buttons around the current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            className={`mx-1 px-3 py-2 border ${
              currentPage === i ? "bg-[#004AAD] text-white" : "bg-white"
            }`}
            onClick={(event) => handleClick(event, i)}
          >
            {i}
          </button>
        );
      }

      // Show the dots before the last page
      if (currentPage < totalPages - maxVisibleButtons + 1) {
        buttons.push(
          <span key="dots2" className="mx-1">
            ...
          </span>
        );
      }
    }

    // Add the last page
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          className={`mx-1 px-3 py-2 border ${
            currentPage === totalPages ? "bg-[#004AAD] text-white" : "bg-white"
          }`}
          onClick={(event) => handleClick(event, totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

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
    // setCustomerData(data?.customerData);
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
    //the sorting logic goes here
    const sortedData = [...customerData];

    switch (criteria) {
      case "visit-high":
        sortedData.sort((a, b) => b?.visits?.length - a?.visits?.length);
        break;

      case "visit-low":
        sortedData.sort((a, b) => a?.visits?.length - b?.visits?.length);
        break;

      case "latest-visit":
        sortedData.sort((a, b) => {
          const latestVisitA = new Date(a?.visits[a?.visits?.length - 1]);
          const latestVisitB = new Date(b?.visits[b?.visits?.length - 1]);
          return latestVisitB.getTime() - latestVisitA.getTime();
        });
        break;

      default:
        break;
    }
    setCustomerData(sortedData);
  };

  const getLastVisitDisplay = (visits: string[]): string => {
    if (visits.length === 0) return "No visits";

    const lastVisit = new Date(visits[visits.length - 1]);
    const now = new Date();

    const lastVisitDate = lastVisit.getDate();
    const lastVisitMonth = lastVisit.getMonth();
    const lastVisitYear = lastVisit.getFullYear();

    const currentDate = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    if (
      lastVisitDate === currentDate &&
      lastVisitMonth === currentMonth &&
      lastVisitYear === currentYear
    ) {
      return "Today";
    }

    const yesterday = new Date();
    yesterday.setDate(currentDate - 1);
    if (
      lastVisitDate === yesterday.getDate() &&
      lastVisitMonth === yesterday.getMonth() &&
      lastVisitYear === yesterday.getFullYear()
    ) {
      return "1 day ago";
    }

    if (
      lastVisitMonth === yesterday.getMonth() &&
      lastVisitYear === yesterday.getFullYear() &&
      currentDate - lastVisitDate <= 7
    ) {
      const diff = currentDate - lastVisitDate;
      return `${diff} days ago`;
    }

    return lastVisit.toLocaleDateString("en-GB"); // Format DD/MM/YYYY
  };

  const getCustomerSegment = (
    visits: string[]
  ): "New" | "Regular" | "Risk" | "Loyal" => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(now.getDate() - 60);

    const visitsWithin30Days = visits?.filter(
      (visit) => new Date(visit) >= thirtyDaysAgo
    );
    const visitsWithin60Days = visits?.filter(
      (visit) => new Date(visit) >= sixtyDaysAgo
    );

    if (visitsWithin30Days?.length === 1 || visitsWithin30Days?.length === 2) {
      return "New";
    } else if (visitsWithin30Days?.length >= 3 || (visitsWithin60Days?.length > 3 && visitsWithin60Days?.length <= 5)) {
      return "Regular";
    } else if (visitsWithin60Days?.length > 5) {
      return "Loyal";
    } else {
      return "Risk";
    }
  };

  const searchUser = (searchTerm: string): void => {
    console.log(searchTerm);
    setSearchValue(searchTerm);
    console.log(searchValue, " ", resData._id);
    if (searchTerm == "") {
      setCustomerData(data?.customerData);
    } else {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/searchUser/${data._id}/${searchTerm}`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setCustomerData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log("Segmentation visible: ", segmentationVisible);
  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className=" lg:w-[93%] h-fit px-[2rem] py-[1rem]  gap-10 lg:ml-[7%] ">
        {/*Top div */}
        <div className="mb-4 flex justify-between items-center font-inter">
          <div className="relative flex items-center w-[410px]">
            <FaSearch className="relative left-7 text-gray-400" />
            <input
              type="search"
              onChange={(e) => searchUser(e.target.value)}
              placeholder="Search by customer name, phone number"
              className="w-full h-[50px] bg-gray-100 pl-10 pr-3 py-2 rounded-md "
            />
          </div>
          <div className="flex items-center text-[#004AAD] flex-wrap gap-y-1 justify-center">
            <div className="relative">
              <button
                className="bg-white border rounded-lg px-4 py-3 mx-2 flex items-center text-sm font-Roboto"
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
              className="bg-white border rounded-lg px-4 py-[0.69rem] mx-2 flex items-center text-sm font-Roboto"
              onClick={toggleFilter}
            >
              <FaFilter className="mr-2" />
              Filter Customer
            </button>
            {/* <button className="bg-[#004AAD] text-white rounded-lg px-2 py-1 flex items-center text-base">
              <img src={exportIcon} />
              Export
              <img src={premium} className="relative -top-5 -right-5" />
            </button> */}
          </div>
        </div>
        <div className="mb-4">
          <span className="text-base">
            Total Customer Database:{" "}
            <strong className="text-[#004AAD]">
              {customerData?.length} Record
            </strong>
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
        <div className="">
          <table className=" bg-white border font-inter text-base w-full">
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
            {customerData ? (
              <tbody className="">
                {currentItems?.map((customer: any, index: any) => (
                  <tr key={index} className="border-t text-base text-center">
                    <td className="py-3 px-6">{customer?.userId?.name}</td>
                    <td className="py-3 px-6">
                      +91 {customer?.userId?.phone}{" "}
                    </td>
                    <td className="py-3 px-6">{customer?.visits?.length}</td>
                    <td className="py-3 px-6">
                      {getLastVisitDisplay(customer?.visits)}
                    </td>

                    {/*Segmentation logic */}
                    <td className="py-3 px-6 ">
                      {/*segementation popup */}
                      {hoveredSegmentation === index && (
                        <div>
                          {/*background blur div */}
                          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[80] p-5"></div>
                          {/*div to align popup */}
                          <div className="relative right-[16.5rem] -top-36">
                            <SegmentationPopup
                              setVisibility={setSegmentationVisible}
                              hoveredSegmentation={setHoveredSegmentation}
                              segmentation={getCustomerSegment(
                                customer?.visits || []
                              )}
                              segIndex={index}
                            />
                          </div>
                        </div>
                      )}
                      {/*segmentation column content */}
                      <span
                        className={` relative py-1 px-2 rounded-lg text-sm   ${
                          segmentationColors[
                            getCustomerSegment(customer?.visits)
                          ]
                        } ${hoveredSegmentation === index && "z-[90]"}`}
                        onMouseEnter={() => {
                          setHoveredSegmentation(index);
                        }}
                        onMouseLeave={() => {
                          setHoveredSegmentation(null);
                        }}
                      >
                        {getCustomerSegment(customer.visits)}
                      </span>
                    </td>

                    <td className="py-3 px-6 ">
                      <div
                        className="flex justify-center items-center gap-2 cursor-pointer"
                        onClick={() => handleViewDetails(customer)}
                      >
                        <button className="text-base font-inter font-medium lg:block md:hidden">
                          View Details
                        </button>
                        <img src={doubleArrow} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={6}>
                    <div className="w-full flex flex-col items-center justify-center gap-4 h-60">
                      <img src={noData} className="w-40 h-auto" />
                      <p className="w-full text-center">
                        No data to display. Once customers starts visiting this
                        will look a lot more exciting.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
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
          <div className="flex justify-center items-center mt-4">
            {currentPage > 1 && (
              <button
                className="mx-1 px-3 py-2 border bg-white"
                onClick={(event) => handleClick(event, currentPage - 1)}
              >
                &lt;
              </button>
            )}
            {getPaginationButtons()}
            {currentPage < totalPages && (
              <button
                className="mx-1 px-3 py-2 border bg-white"
                onClick={(event) => handleClick(event, currentPage + 1)}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </div>

      <CustomerDetail
        customer={selectedCustomer}
        isVisible={!!selectedCustomer}
        segmentation={getCustomerSegment(selectedCustomer?.visits || [])}
        onClose={closeModal}
      />
      <CustomerFilter
        isVisible={isFilterVisible}
        onClose={toggleFilter}
        setFilterData={filterElementsAdd}
        // customerData={customerData}
        // setCustomerData={setCustomerData}
        // originalData={data?.customerData}
        customDateVisit={customDateVisit}
        customDateNotVisit={customDateNotVisit}
        setcustomDateVisit={setCustomDateVisit}
        setcustomDateNotVisit={setCustomDateNotVisit}
        gender={gender}
        setGender={setGender}
        segmentation={segmentation}
        setSegmentation={setSegmentation}
      />
    </div>
  );
};

export default CustomerList;
