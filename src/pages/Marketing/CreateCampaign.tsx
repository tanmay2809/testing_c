import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//images
import screen from "../../assets/Group 1171278587.png";
import egImage from "../../assets/Group 1171278505.png";

//icons
import { BiLinkExternal } from "react-icons/bi";
import { IoIosCloseCircleOutline, IoMdCall, IoMdImages } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

//components
import CallingButton from "../../component/Marketing/CallingButton";
import WebsiteButton from "../../component/Marketing/WebsiteButton";
import FeedbackButton from "../../component/Marketing/FeedbackButton";
import CustomerFilter from "../../component/Customer/CustomerFilter";
import ConfirmCampaign from "./ConfirmCampaign";

//toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormattingControls from "../../component/Marketing/FormattingControls";

//svg
import booking from "/booking.svg";
import utility from "/utility.svg";

interface RadioOption {
  label: string;
  value: string;
  desc: string;
}

// interface CampaignsPops{
//   tye:string
// }

type SectionStyles = {
  color: string;
  bold: boolean;
  italic: boolean;
  emoji: string | null;
};

type StylesState = {
  header: SectionStyles;
  body: SectionStyles;
  footer: SectionStyles;
};

const CreateCampaigns: React.FC = () => {
  const [type, setType] = useState<string>("");
  const [next, setNext] = useState<boolean>(false);
  const [isOpenContent, setIsOpenContent] = useState<boolean>(true);
  const [isOpentarget, setIsOpentarget] = useState<boolean>(false);
  const [isOpenschedule, setIsOpenschedule] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isButton, setIsButton] = useState<boolean>(false);
  const [buttons, setButtons] = useState<{ id: number; type: string }[]>([]);
  const [target, setTarget] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<string[]>([]);
  const [header, setHeader] = useState<string>("Bon Appétit!");
  const [body, setBody] = useState<string>(
    "Hey Customer's Name enjoy our exclusive deals on this weekend."
  );
  const [footer, setFooter] = useState<string>("Thank You");
  const [loading, setLoading] = useState<boolean>(false);
  const [Confirmation, setConfirmation] = useState<boolean>(false);

  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [campaignName, setCampaignName] = useState<string>("");
  const [styles, setStyles] = useState<StylesState>({
    header: {
      color: "#000000",
      bold: false,
      italic: false,
      emoji: null,
    },
    body: {
      color: "#000000",
      bold: false,
      italic: false,
      emoji: null,
    },
    footer: {
      color: "#000000",
      bold: false,
      italic: false,
      emoji: null,
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customDate, setCustomDate] = useState<string | null>(null);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (value !== "customDate") {
      setCustomDate(null);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDate(event.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height based on the scroll height
    }
    setSelectedImage(egImage);
  }, []);

  const handleCreateCampaignCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedCampaign(event.target.id);
  };

  const handleCreateCampaignInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCampaignName(event.target.value);
  };

  const activateCampaign = () => {
    setLoading(true);
    // simulate a network request
    setTimeout(() => {
      if (!Confirmation) toast.success("Campaign Submitted for review");
      setLoading(false);
      setConfirmation(!Confirmation);
    }, 2000);
  };

  const options: RadioOption[] = [
    {
      label: "Custom Date",
      value: "customDate",
      desc: "Choose custom date and time",
    },
    {
      label: "Send Now",
      value: "sendNow",
      desc: "Send immediately after approval",
    },
    {
      label: "Weekly",
      value: "weekly",
      desc: "Send automated weekly camapigns",
    },
    {
      label: "On Visit",
      value: "onVisit",
      desc: "Whenever any customer visits your eatery",
    },
    {
      label: "Post Visit",
      value: "postVisit",
      desc: "Whenever customer completes dining",
    },
    {
      label: "On Birthdays",
      value: "onBirthdays",
      desc: "On customer birthdays",
    },
    {
      label: "Anniversary",
      value: "anniversary",
      desc: "On customer anniversaries",
    },
  ];

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const filterElementsAdd = (data: string[]) => {
    setFilterData(data);
    console.log(filterData);
  };

  const handleCheckboxChange = (value: string) => {
    if (value === "advanceFilter" && target !== "advanceFilter") {
      toggleFilter();
    } else {
      setIsFilterVisible(false);
    }
    setTarget(target === value ? null : value);
  };
  const handleAddButton = (type: string) => {
    setIsButton(!isButton);
    const typeCounts = buttons.reduce((acc, button) => {
      acc[button.type] = (acc[button.type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    if (type === "CallingButton" && typeCounts.CallingButton >= 1) {
      toast.error("Only 1 Calling Button can be added");
      return;
    }
    if (type === "WebsiteButton" && typeCounts.WebsiteButton >= 2) {
      toast.error("Only 2 Website Buttons can be added");
      return;
    }
    if (type === "FeedbackButton" && typeCounts.FeedbackButton >= 1) {
      toast.error("Only 1 Feedback Button can be added");
      return;
    }

    setButtons([...buttons, { id: Date.now(), type }]);
  };

  const handleDeleteButton = (id: number) => {
    setButtons(buttons.filter((button) => button.id !== id));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    setSelectedImage(null);
  };

  const toggleAccordionContent = () => {
    setIsOpenContent(!isOpenContent);
  };
  const toggleAccordiontarget = () => {
    setIsOpentarget(!isOpentarget);
  };
  const toggleAccordionschedule = () => {
    setIsOpenschedule(!isOpenschedule);
  };
  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className="lg:w-[93%] h-fit px-[2rem] flex flex-col items-center justify-center gap-10 lg:ml-[7%] ">
        <div className="w-full flex flex-row justify-between mt-[70px] font-inter">
          <div className="bg-white rounded-lg p-1 w-full ">
            {!Confirmation && (
              <div className="bg-white sticky pt-[1.6rem] top-[4rem] z-10 ">
                <div className="flex justify-between w-full">
                  <h2 className="text-xl font-semibold ">Create Campaign</h2>
                  <div className="flex gap-5">
                    {!next && (
                      <Link to="/marketing">
                        <button className=" text-[#E61856] bg-[#FDF1F1] p-2 rounded-lg">
                          Cancel
                        </button>
                      </Link>
                    )}
                    {next && (
                      <button
                        className=" text-[#E61856] bg-[#FDF1F1] p-2 rounded-lg"
                        onClick={() => setNext(false)}
                      >
                        Cancel
                      </button>
                    )}

                    {/*if clicked next then sbmit for review button shows up else next button shows up */}
                    {!next && (
                      <button
                        className=" flex items-center justify-center text-white bg-[#004AAD] p-2 rounded-lg w-24"
                        onClick={() => {
                          if (selectedCampaign === "") {
                            toast.warn("Please select a campaign type first");
                            return;
                          }
                          if (campaignName === "") {
                            toast.warn("Please give a campaign name");
                            return;
                          }
                          setType(selectedCampaign);
                          setNext(true);
                        }}
                      >
                        <span>Next</span>
                      </button>
                    )}
                    {next && (
                      <button
                        className="min-w-20 flex items-center justify-center text-white bg-[#004AAD] p-2 rounded-lg"
                        onClick={activateCampaign}
                      >
                        {loading ? (
                          <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                        ) : (
                          <span>Submit for review</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <p className="mb-4">Create campaign from scratch</p>
              </div>
            )}

            {/*main content div */}
            <div className="bg-[#F5F9FF] flex justify-between gap-10  lg:px-10 md:p-5 rounded-lg">
              {/*text div */}
              <div className=" lg:w-[65%] md:w-[50%] sm:[w-50%]">
                {!next && (
                  <div className="pb-20">
                    <div className="p-4 rounded-lg mb-4 bg-white flex justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                          Select campaign type
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg mb-4 bg-white flex justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="Utility"
                          className="form-checkbox h-10 w-6 text-[#004AAD] mr-4"
                          checked={selectedCampaign === "Utility"}
                          onChange={handleCreateCampaignCheckboxChange}
                        />
                        <div className="bg-[#FFA858] p-4 rounded-lg">
                          <img src={utility} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Welcome customers with greetings
                          </h3>
                          <p className="text-gray-600 mb-2">Utility</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg mb-4 bg-white flex justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="Marketing"
                          className="form-checkbox h-10 w-6 text-[#004AAD] mr-4"
                          checked={selectedCampaign === "Marketing"}
                          onChange={handleCreateCampaignCheckboxChange}
                        />
                        <div className="bg-[#FFCF27] p-4 rounded-lg">
                          <img src={booking} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Booking Campaign
                          </h3>
                          <p className="text-gray-600 mb-2">Marketing</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg mb-4 bg-white flex justify-between w-full">
                      <div className="flex flex-col justify-start gap-3 w-full">
                        <h3 className="text-lg font-semibold">Campaign Name</h3>
                        <input
                          type="text"
                          id="name"
                          placeholder="Campaign Name"
                          className="outline-[#E2E8F0] h-12 w-full text-black p-3 rounded-lg border border-[#E2E8F0]"
                          value={campaignName}
                          onChange={handleCreateCampaignInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/*booking */}
                {!Confirmation && next && (
                  <>
                    {type === "Marketing" && (
                      <div className=" p-4 rounded-lg mb-4 bg-white flex justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#FFCF27] p-4 rounded-lg">
                            <img src={booking} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">
                              Booking Campaign
                            </h3>
                            <p className="text-gray-600 mb-2">Marketing</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {type === "Utility" && next && (
                      <div className=" p-4 rounded-lg mb-4 bg-white flex justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#FFA858] p-4 rounded-lg">
                            <img src={utility} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">
                              Welcome customers with greetings
                            </h3>
                            <p className="text-gray-600 mb-2">Utility</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mb-4">
                      {/*content */}
                      <div className=" mb-2 ">
                        <div className="flex items-center justify-between rounded-lg gap-5 bg-white p-4 ">
                          <div>
                            <p className="font-semibold">Content</p>
                            <p className="text-gray-600">
                              Fill in the media, header, body, and footer
                              sections of your template.
                            </p>
                          </div>
                          <div
                            onClick={toggleAccordionContent}
                            className={`${
                              isOpenContent && " text-[#004AAD] border-none"
                            } w-7 h-7 lg:w-8 lg:h-8  rounded flex items-center justify-center cursor-pointer text-lg`}
                          >
                            {isOpenContent ? (
                              <FaAngleUp />
                            ) : (
                              <FaAngleDown className="text-[#004AAD] cursor-pointer text-lg" />
                            )}
                          </div>
                        </div>
                        {type === "Marketing" && next && (
                          <div
                            className={`${
                              isOpenContent ? "block" : "hidden"
                            } mt-3 bg-white p-4 rounded-lg flex flex-col gap-2 w-full`}
                          >
                            {/*media */}
                            <h1 className="text-lg font-semibold">
                              Media <span>Optional</span>
                            </h1>
                            <div className="mt-4 flex justify-start gap-10 items-center">
                              <label
                                htmlFor="imageInput"
                                className="flex flex-col items-center justify-center w-[8rem] h-[6rem] border-2 border-dashed bg-[#F1F7FF] border-gray-300 rounded-lg cursor-pointer "
                              >
                                <IoMdImages
                                  size={48}
                                  className="text-[#004AAD]"
                                />
                                <input
                                  type="file"
                                  id="imageInput"
                                  className="hidden"
                                  onChange={handleImageChange}
                                />
                              </label>
                              {selectedImage && (
                                <div className="w-[7rem] h-[7rem] flex items-center justify-center  object-cover cursor-pointer  rounded-lg">
                                  <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="w-[7rem] h-[6rem] object-cover rounded-md "
                                    onClick={handleImageClick}
                                  />
                                  <button
                                    type="button"
                                    className="relative rounded-full -top-12 -left-4 z-0"
                                    onClick={handleImageClick}
                                  >
                                    <IoIosCloseCircleOutline
                                      size={30}
                                      className="text-black bg-white rounded-full"
                                    />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {/*header*/}
                        <div
                          className={`${
                            isOpenContent ? "block" : "hidden"
                          } mt-3 bg-white p-4 rounded-lg flex flex-col gap-2 w-full`}
                        >
                          <h1 className="text-lg font-semibold">
                            Header <span>Optional</span>
                          </h1>
                          <div className="flex items-center gap-1 bg-[#F5F9FF] py-2 px-3 rounded-md">
                            <GiMeal className="text-gray-500" />
                            <h2 className="font-medium text-base w-full">
                              <textarea
                                id="name"
                                placeholder="Enter the header"
                                className="bg-[#F5F9FF] h-12 w-full text-black p-3 rounded-lg border-0 outline-none focus:outline-none"
                                value={header}
                                rows={1}
                                ref={textareaRef}
                                onChange={(
                                  event: ChangeEvent<HTMLTextAreaElement>
                                ) => {
                                  if (event.target.value.length <= 100) {
                                    setHeader(event.target.value);
                                  }
                                }}
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                  color: styles.header.color,
                                  fontWeight: styles.header.bold
                                    ? "bold"
                                    : "normal",
                                  fontStyle: styles.header.italic
                                    ? "italic"
                                    : "",
                                }}
                              />
                            </h2>
                          </div>
                          <FormattingControls
                            content={header}
                            section="header"
                            styles={styles}
                            setStyles={setStyles}
                            setContent={setHeader}
                          />
                        </div>

                        {/*body*/}
                        <div
                          className={`${
                            isOpenContent ? "block" : "hidden"
                          } mt-3 bg-white p-4 rounded-lg flex flex-col gap-2 w-full`}
                        >
                          <h1 className="text-lg font-semibold">
                            Body <span>Optional</span>
                          </h1>
                          <div className="flex items-center gap-1 bg-[#F5F9FF] py-2 px-3 rounded-md">
                            <h2 className=" text-base w-full">
                              <textarea
                                id="name"
                                placeholder="Enter the header"
                                className="bg-[#F5F9FF] h-12 w-full text-black p-3 rounded-lg border-0 outline-none focus:outline-none"
                                value={body}
                                rows={4}
                                ref={textareaRef}
                                onChange={(
                                  event: ChangeEvent<HTMLTextAreaElement>
                                ) => {
                                  if (event.target.value.length <= 1000) {
                                    setBody(event.target.value);
                                  }
                                }}
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                  color: styles.body.color,
                                  fontWeight: styles.body.bold
                                    ? "bold"
                                    : "normal",
                                  fontStyle: styles.body.italic ? "italic" : "",
                                }}
                              />
                            </h2>
                          </div>
                          <FormattingControls
                            content={body}
                            section="body"
                            styles={styles}
                            setStyles={setStyles}
                            setContent={setBody}
                          />
                        </div>

                        {/*footer*/}
                        <div
                          className={`${
                            isOpenContent ? "block" : "hidden"
                          } mt-3 bg-white p-4 rounded-lg flex flex-col gap-2 w-full`}
                        >
                          <h1 className="text-lg font-semibold">
                            Footer <span>Optional</span>
                          </h1>
                          <div className="flex items-center gap-1 bg-[#F5F9FF] py-2 px-3 rounded-md">
                            <h2 className=" text-base w-full">
                              <textarea
                                id="footer"
                                placeholder="Enter the footer"
                                className="bg-[#F5F9FF]  h-12 w-full text-black p-3 rounded-lg border-0 outline-none focus:outline-none"
                                rows={1}
                                value={footer}
                                ref={textareaRef}
                                onChange={(
                                  event: ChangeEvent<HTMLTextAreaElement>
                                ) => {
                                  if (event.target.value.length <= 200) {
                                    setFooter(event.target.value);
                                  }
                                }}
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                  color: styles.footer.color,
                                  fontWeight: styles.footer.bold
                                    ? "bold"
                                    : "normal",
                                  fontStyle: styles.footer.italic
                                    ? "italic"
                                    : "",
                                }}
                              />
                            </h2>
                          </div>
                          <FormattingControls
                            content={footer}
                            section="footer"
                            styles={styles}
                            setStyles={setStyles}
                            setContent={setFooter}
                          />
                        </div>
                        {/*buttons*/}
                        <div
                          className={`${
                            isOpenContent ? "block" : "hidden"
                          } mt-3 bg-white p-4 rounded-lg flex flex-col gap-2 w-full`}
                        >
                          <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold ">
                              Buttons <span>Optional</span>
                            </h1>
                            <div className="relative">
                              <button
                                className="bg-white border rounded-lg px-4 py-2 mx-2 flex items-center text-sm font-Roboto text-[#004AAD] font-semibold"
                                onClick={() => setIsButton(!isButton)}
                              >
                                Add Buttons
                              </button>
                              {/* Dropdown menu for sorting */}
                              {isButton && (
                                <ul className="absolute left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg py-1 z-10">
                                  <li className="cursor-pointer px-2 py-1 hover:bg-gray-100 border-b border-gray-300 ">
                                    <h1
                                      className="text-base font-semibold"
                                      onClick={() =>
                                        handleAddButton("CallingButton")
                                      }
                                    >
                                      Calling Button
                                    </h1>
                                    <p className="text-[0.75rem]">
                                      Maximum 1 button
                                    </p>
                                  </li>
                                  <li className="cursor-pointer px-2 py-1 hover:bg-gray-100 border-b border-gray-300">
                                    <h1
                                      className="text-base font-semibold"
                                      onClick={() =>
                                        handleAddButton("WebsiteButton")
                                      }
                                    >
                                      Website Link
                                    </h1>
                                    <p className="text-[0.75rem]">
                                      Maximum 2 button
                                    </p>
                                  </li>
                                  <li className="cursor-pointer px-2 py-1 hover:bg-gray-100 ">
                                    <h1
                                      className="text-base font-semibold"
                                      onClick={() =>
                                        handleAddButton("FeedbackButton")
                                      }
                                    >
                                      Feedback Link
                                    </h1>
                                    <p className="text-[0.75rem]">
                                      Maximum 1 button
                                    </p>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </div>
                          {buttons.map((button) => (
                            <div
                              key={button.id}
                              className="flex items-center gap-1 bg-[#F5F9FF] py-2 px-3 rounded-md"
                            >
                              <div className="text-base flex gap-4 items-center">
                                {button.type === "CallingButton" && (
                                  <CallingButton
                                    onDelete={() =>
                                      handleDeleteButton(button.id)
                                    }
                                  />
                                )}
                                {button.type === "WebsiteButton" && (
                                  <WebsiteButton
                                    onDelete={() =>
                                      handleDeleteButton(button.id)
                                    }
                                  />
                                )}
                                {button.type === "FeedbackButton" && (
                                  <FeedbackButton
                                    onDelete={() =>
                                      handleDeleteButton(button.id)
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                          {/* <div></div> */}{" "}
                          {/*the bottom characters and colour, bold, italic, etc. */}
                        </div>
                      </div>

                      {/*target customer */}
                      <div className=" mb-2 cursor-pointer ">
                        <div className="flex items-center justify-between rounded-lg gap-5 bg-white p-4 ">
                          <div>
                            <p className="font-semibold">Target Customer</p>
                            <p className="text-gray-600">
                              Fill in the header, body, and footer sections of
                              your template.
                            </p>
                          </div>
                          <div
                            onClick={toggleAccordiontarget}
                            className={`${
                              isOpenContent && " text-[#004AAD] border-none"
                            } w-7 h-7 lg:w-8 lg:h-8  rounded flex items-center justify-center cursor-pointer text-lg`}
                          >
                            {isOpentarget ? (
                              <FaAngleUp />
                            ) : (
                              <FaAngleDown className="text-[#004AAD] cursor-pointer text-lg" />
                            )}
                          </div>
                        </div>
                        <div
                          className={`${
                            isOpentarget ? "block" : "hidden"
                          } mt-3 bg-white  rounded-lg`}
                        >
                          <div className="  rounded-md w-full">
                            <div className=" p-4 flex items-center gap-3 border-b border-b-gray-400">
                              <input
                                type="checkbox"
                                id="allCustomers"
                                checked={target === "allCustomers"}
                                onChange={() =>
                                  handleCheckboxChange("allCustomers")
                                }
                                className="form-checkbox h-4 w-4 text-[#004AAD]"
                              />
                              <div className="flex flex-col justify-center items-start">
                                <label
                                  htmlFor="allCustomers"
                                  className="text-lg font-[500]"
                                >
                                  All Customers
                                </label>
                                <p className="text-sm">
                                  All Customers that are in the database or will
                                  be added to the database
                                </p>
                              </div>
                            </div>
                            <div className=" p-4 flex items-center gap-3">
                              <input
                                type="checkbox"
                                id="advanceFilter"
                                checked={target === "advanceFilter"}
                                onChange={() =>
                                  handleCheckboxChange("advanceFilter")
                                }
                                className="form-checkbox h-4 w-4 text-[#004AAD]"
                              />
                              <div className="flex flex-col justify-center items-start">
                                <label
                                  htmlFor="advanceFilter"
                                  className="text-lg font-[500]"
                                >
                                  Advance Filter
                                </label>
                                <p className="text-sm">
                                  Target customers on the basis of their visit
                                  pattern and segementation
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*schedule */}
                      <div className=" mb-2 cursor-pointer ">
                        <div className="flex items-center justify-between rounded-lg gap-5 bg-white p-4 ">
                          <div>
                            <p className="font-semibold">Schedule</p>
                            <p className="text-gray-600">
                              Fill in the media, header, body, and footer
                              sections of your template.
                            </p>
                          </div>
                          <div
                            onClick={toggleAccordionschedule}
                            className={`${
                              isOpenContent && " text-[#004AAD] border-none"
                            } w-7 h-7 lg:w-8 lg:h-8  rounded flex items-center justify-center cursor-pointer text-lg`}
                          >
                            {isOpenschedule ? (
                              <FaAngleUp />
                            ) : (
                              <FaAngleDown className="text-[#004AAD] cursor-pointer text-lg" />
                            )}
                          </div>
                        </div>
                        <div
                          className={`${
                            isOpenschedule ? "block" : "hidden"
                          } mt-3  rounded-lg`}
                        >
                          <div className=" rounded-md w-full flex flex-col gap-1">
                            {options.map((option) => (
                              <div key={option.value}>
                                <div className="rounded-md w-full p-4 flex items-center gap-3 bg-white">
                                  <input
                                    type="checkbox"
                                    id={option.value}
                                    checked={selectedOption === option.value}
                                    onChange={() =>
                                      handleOptionChange(option.value)
                                    }
                                    className="h-4 w-4 text-[#004AAD]"
                                  />
                                  <div className="flex flex-col justify-center items-start">
                                    <label
                                      htmlFor={option.value}
                                      className="text-lg font-[500]"
                                    >
                                      {option.label}
                                    </label>
                                    <p className="text-sm">{option.desc}</p>
                                  </div>
                                </div>
                                {selectedOption === "customDate" &&
                                  option.value === "customDate" && (
                                    <div className="">
                                      <input
                                        type="date"
                                        id="customDateInput"
                                        value={customDate || ""}
                                        onChange={handleDateChange}
                                        className=" mt-1 "
                                      />
                                    </div>
                                  )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {Confirmation && next && (
                  <ConfirmCampaign backClick={activateCampaign} />
                )}
              </div>

              {/*screen div */}
              <div className="ml-20 fixed w-full max-w-xs mx-auto lg:p-3 lg:right-[3rem] lg:mt-10 md:right-12 md:top-[15rem] sm:right-6  h-fit">
                <img
                  src={screen}
                  alt="Phone Screen"
                  className="lg:w-[88%] md:w-[85%] h-auto mx-auto -mt-7"
                />
                {next && (
                  <>
                    <div className="absolute inset-0 flex flex-col  gap-1 items-center justify-center text-black h-fit top-[6rem] lg:w-[14rem] lg:left-[2.83rem]  md:w-[15.6rem] md:left-[2rem]">
                      <div className="bg-white  p-4 rounded-md  ">
                        {selectedImage && type === "Marketing" && (
                          <div className="w-[12rem]  h-[6rem]">
                            <img
                              src={selectedImage}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <p
                          className="text-sm text-gray-600 mt-1 break-words"
                          style={{
                            color: styles.header.color,
                            fontWeight: styles.header.bold ? "bold" : "normal",
                            fontStyle: styles.header.italic ? "italic" : "",
                          }}
                        >
                          {header}
                        </p>
                        <p
                          className="text-sm text-gray-600 break-words"
                          style={{
                            color: styles.body.color,
                            fontWeight: styles.body.bold ? "bold" : "normal",
                            fontStyle: styles.body.italic ? "italic" : "",
                          }}
                        >
                          {body}
                        </p>
                        <p
                          className="text-sm text-gray-600 break-words"
                          style={{
                            color: styles.footer.color,
                            fontWeight: styles.footer.bold ? "bold" : "normal",
                            fontStyle: styles.footer.italic ? "italic" : "",
                          }}
                        >
                          {footer}
                        </p>
                      </div>
                      {buttons.map((button, index) => {
                        return (
                          <div className="w-full">
                            {button.type === "CallingButton" && (
                              <div
                                key={index}
                                className="flex items-center justify-center bg-white text-[#0096DE] py-1 px-3 rounded-md  w-full"
                              >
                                <IoMdCall />
                                <button>
                                  {button.type === "CallingButton" && "Call"}
                                </button>
                              </div>
                            )}
                            {button.type === "WebsiteButton" && (
                              <div
                                key={index}
                                className="flex items-center justify-center bg-white text-[#0096DE] py-1 px-3 rounded-md  w-full"
                              >
                                <BiLinkExternal />
                                <button>
                                  {button.type === "WebsiteButton" && "Call"}
                                </button>
                              </div>
                            )}
                            {button.type === "FeedbackButton" && (
                              <div
                                key={index}
                                className="flex items-center justify-center bg-white text-[#0096DE] py-1 px-3 rounded-md  w-full"
                              >
                                {/* <BiLinkExternal /> feedback logo */}
                                <button>
                                  {button.type === "FeedbackButton" && "Call"}
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <CustomerFilter
        isVisible={isFilterVisible}
        onClose={toggleFilter}
        filterData={filterElementsAdd}
      /> */}
    </div>
  );
};

export default CreateCampaigns;
