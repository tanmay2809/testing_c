import React, { useState, ChangeEvent, useEffect } from "react";
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

interface RadioOption {
  label: string;
  value: string;
  desc: string;
}

// interface CampaignsPops{
//   tye:string
// }

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
  const [templateCheck, setTemplateCheck] = useState<string>("");
  const [header, setHeader] = useState<string>("Bon Appétit!");
  const [body, setBody] = useState<string>(
    "Hey Customer's Nameenjoy our exclusive deals on thisweekend. Book now and enjoyexclusive offers."
  );
  const [footer, setFooter] = useState<string>("Thank You");
  const [loading, setLoading] = useState<boolean>(false);
  const [Confirmation, setConfirmation] = useState<boolean>(false);

  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [campaignName, setCampaignName] = useState<string>("");

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

  const handleTemplateRadioChange = (value: string) => {
    setTemplateCheck(value);
  };

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

  useEffect(() => {
    setSelectedImage(egImage);
  }, []);

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
    <div className="w-full h-fit relative">
      <div className="w-[93%] h-fit px-[2rem] flex flex-col items-center justify-center gap-10 ml-[7%] ">
        <div className="w-full flex flex-row justify-between mt-[60px] font-inter">
          <div className="bg-white  rounded-lg p-6 w-full ">
            {!Confirmation && (
              <div className="bg-white">
                <div className="flex justify-between w-full">
                  <h2 className="text-xl font-semibold ">Create Campaign</h2>
                  <div className="flex gap-2">
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
                <p>Create campaign from scratch</p>
              </div>
            )}

            {/*main content div */}
            <div className="bg-[#F5F9FF] flex justify-between gap-10 p-10">
              {/*text div */}
              <div className=" w-[65%]">
                {!next && (
                  <>
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
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.443 17.3675C21.233 16.9925 20.978 16.6175 20.693 16.22C20.0148 15.3731 19.5447 14.379 19.3205 13.3175L19.0055 8.8925C18.818 5.465 16.8155 2 12.833 2H11.168C7.18548 2 5.16798 5.465 4.96548 8.885L4.65048 13.3175C4.42721 14.3884 3.95726 15.3925 3.27798 16.25C3.02298 16.64 2.76798 17 2.59548 17.3375C2.41035 17.586 2.29823 17.8812 2.27173 18.1899C2.24523 18.4986 2.3054 18.8086 2.44548 19.085C2.60891 19.3753 2.84968 19.6145 3.14099 19.776C3.4323 19.9375 3.76272 20.0151 4.09548 20H9.88548C9.76213 20.3398 9.7225 20.7044 9.76993 21.0628C9.81736 21.4212 9.95047 21.763 10.158 22.059C10.3655 22.3551 10.6413 22.5968 10.962 22.7636C11.2827 22.9305 11.6389 23.0176 12.0005 23.0176C12.362 23.0176 12.7182 22.9305 13.039 22.7636C13.3597 22.5968 13.6355 22.3551 13.843 22.059C14.0505 21.763 14.1836 21.4212 14.231 21.0628C14.2785 20.7044 14.2388 20.3398 14.1155 20H19.9055C20.2413 20.0122 20.5738 19.9302 20.8654 19.7632C21.1571 19.5961 21.3961 19.3508 21.5555 19.055C21.6957 18.7911 21.7594 18.4934 21.7395 18.1952C21.7197 17.8971 21.617 17.6104 21.443 17.3675ZM12.7505 20.75C12.7505 20.8983 12.7065 21.0433 12.6241 21.1667C12.5417 21.29 12.4245 21.3861 12.2875 21.4429C12.1504 21.4997 11.9997 21.5145 11.8542 21.4856C11.7087 21.4566 11.575 21.3852 11.4702 21.2803C11.3653 21.1754 11.2938 21.0418 11.2649 20.8963C11.236 20.7508 11.2508 20.6 11.3076 20.463C11.3643 20.3259 11.4605 20.2088 11.5838 20.1264C11.7071 20.044 11.8521 20 12.0005 20C12.1994 20 12.3902 20.079 12.5308 20.2197C12.6715 20.3603 12.7505 20.5511 12.7505 20.75ZM20.2505 18.3725C20.2505 18.4325 20.123 18.5 19.9355 18.5H4.09548C3.90798 18.5 3.81048 18.4325 3.78048 18.3725C3.75048 18.3125 3.78048 18.23 3.85548 18.11C4.05798 17.765 4.29048 17.405 4.53048 17.045C5.28048 15.965 6.03048 14.735 6.14298 13.4225L6.46548 8.99C6.62298 6.455 7.95048 3.5 11.168 3.5H12.833C16.0505 3.5 17.378 6.455 17.5355 8.9975L17.858 13.4225C17.948 14.75 18.7505 15.965 19.5005 17.045C19.7405 17.405 19.973 17.795 20.213 18.1775C20.2369 18.2032 20.253 18.2352 20.2597 18.2696C20.2663 18.3041 20.2631 18.3397 20.2505 18.3725Z"
                              fill="black"
                            />
                          </svg>
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
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.98821 16.9716L6.59998 17.9245L7.83527 22.3363C8.08233 23.2186 8.99998 23.8186 10.0235 23.5716C10.9764 23.3245 11.5059 22.3363 11.2588 21.3833L9.98821 16.9716ZM20.4 12.5598C21.7764 11.9951 22.5529 10.4422 22.1647 8.95982C21.7764 7.47746 20.2941 6.55982 18.8117 6.80688L17.4706 2.00688C17.2588 1.30099 16.5529 0.912759 15.8823 1.08923C15.1764 1.30099 14.7882 2.00688 14.9647 2.67746L19.2353 18.0304C19.4117 18.701 20.1176 19.1245 20.8235 18.9481C21.5294 18.7716 21.9176 18.0304 21.7059 17.3598L20.4 12.5598ZM8.36468 8.99511C8.2588 9.10099 8.22351 9.20688 8.2588 9.34805L10.0588 15.8775C10.0941 16.0186 10.2 16.0892 10.3059 16.1245L18.4941 18.101L14.3294 3.0657L8.36468 8.99511ZM9.42351 16.0539C7.55292 9.20688 7.55292 9.55982 7.58821 9.17158L4.41174 10.0539C4.12939 10.1245 3.88233 10.3363 3.74115 10.5833C3.63527 10.7598 3.59998 10.9363 3.59998 11.1481C2.2588 11.6775 1.44704 13.1951 1.87057 14.6422C2.22351 15.9481 3.38821 16.7951 4.6941 16.7951C4.87057 16.7951 5.01174 16.7951 5.18821 16.7598C5.36468 17.1128 5.75292 17.3245 6.14115 17.3245C6.24704 17.3245 6.35292 17.3245 6.42351 17.2892L9.59998 16.4069C9.4941 16.2657 9.42351 16.1598 9.42351 16.0539Z"
                              fill="#404040"
                            />
                          </svg>
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
                  </>
                )}
                {/*booking */}
                {!Confirmation && next && (
                  <>
                    {type === "Marketing" && (
                      <div className=" p-4 rounded-lg mb-4 bg-white flex justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#FFCF27] p-4 rounded-lg">
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.98821 16.9716L6.59998 17.9245L7.83527 22.3363C8.08233 23.2186 8.99998 23.8186 10.0235 23.5716C10.9764 23.3245 11.5059 22.3363 11.2588 21.3833L9.98821 16.9716ZM20.4 12.5598C21.7764 11.9951 22.5529 10.4422 22.1647 8.95982C21.7764 7.47746 20.2941 6.55982 18.8117 6.80688L17.4706 2.00688C17.2588 1.30099 16.5529 0.912759 15.8823 1.08923C15.1764 1.30099 14.7882 2.00688 14.9647 2.67746L19.2353 18.0304C19.4117 18.701 20.1176 19.1245 20.8235 18.9481C21.5294 18.7716 21.9176 18.0304 21.7059 17.3598L20.4 12.5598ZM8.36468 8.99511C8.2588 9.10099 8.22351 9.20688 8.2588 9.34805L10.0588 15.8775C10.0941 16.0186 10.2 16.0892 10.3059 16.1245L18.4941 18.101L14.3294 3.0657L8.36468 8.99511ZM9.42351 16.0539C7.55292 9.20688 7.55292 9.55982 7.58821 9.17158L4.41174 10.0539C4.12939 10.1245 3.88233 10.3363 3.74115 10.5833C3.63527 10.7598 3.59998 10.9363 3.59998 11.1481C2.2588 11.6775 1.44704 13.1951 1.87057 14.6422C2.22351 15.9481 3.38821 16.7951 4.6941 16.7951C4.87057 16.7951 5.01174 16.7951 5.18821 16.7598C5.36468 17.1128 5.75292 17.3245 6.14115 17.3245C6.24704 17.3245 6.35292 17.3245 6.42351 17.2892L9.59998 16.4069C9.4941 16.2657 9.42351 16.1598 9.42351 16.0539Z"
                                fill="#404040"
                              />
                            </svg>
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
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.443 17.3675C21.233 16.9925 20.978 16.6175 20.693 16.22C20.0148 15.3731 19.5447 14.379 19.3205 13.3175L19.0055 8.8925C18.818 5.465 16.8155 2 12.833 2H11.168C7.18548 2 5.16798 5.465 4.96548 8.885L4.65048 13.3175C4.42721 14.3884 3.95726 15.3925 3.27798 16.25C3.02298 16.64 2.76798 17 2.59548 17.3375C2.41035 17.586 2.29823 17.8812 2.27173 18.1899C2.24523 18.4986 2.3054 18.8086 2.44548 19.085C2.60891 19.3753 2.84968 19.6145 3.14099 19.776C3.4323 19.9375 3.76272 20.0151 4.09548 20H9.88548C9.76213 20.3398 9.7225 20.7044 9.76993 21.0628C9.81736 21.4212 9.95047 21.763 10.158 22.059C10.3655 22.3551 10.6413 22.5968 10.962 22.7636C11.2827 22.9305 11.6389 23.0176 12.0005 23.0176C12.362 23.0176 12.7182 22.9305 13.039 22.7636C13.3597 22.5968 13.6355 22.3551 13.843 22.059C14.0505 21.763 14.1836 21.4212 14.231 21.0628C14.2785 20.7044 14.2388 20.3398 14.1155 20H19.9055C20.2413 20.0122 20.5738 19.9302 20.8654 19.7632C21.1571 19.5961 21.3961 19.3508 21.5555 19.055C21.6957 18.7911 21.7594 18.4934 21.7395 18.1952C21.7197 17.8971 21.617 17.6104 21.443 17.3675ZM12.7505 20.75C12.7505 20.8983 12.7065 21.0433 12.6241 21.1667C12.5417 21.29 12.4245 21.3861 12.2875 21.4429C12.1504 21.4997 11.9997 21.5145 11.8542 21.4856C11.7087 21.4566 11.575 21.3852 11.4702 21.2803C11.3653 21.1754 11.2938 21.0418 11.2649 20.8963C11.236 20.7508 11.2508 20.6 11.3076 20.463C11.3643 20.3259 11.4605 20.2088 11.5838 20.1264C11.7071 20.044 11.8521 20 12.0005 20C12.1994 20 12.3902 20.079 12.5308 20.2197C12.6715 20.3603 12.7505 20.5511 12.7505 20.75ZM20.2505 18.3725C20.2505 18.4325 20.123 18.5 19.9355 18.5H4.09548C3.90798 18.5 3.81048 18.4325 3.78048 18.3725C3.75048 18.3125 3.78048 18.23 3.85548 18.11C4.05798 17.765 4.29048 17.405 4.53048 17.045C5.28048 15.965 6.03048 14.735 6.14298 13.4225L6.46548 8.99C6.62298 6.455 7.95048 3.5 11.168 3.5H12.833C16.0505 3.5 17.378 6.455 17.5355 8.9975L17.858 13.4225C17.948 14.75 18.7505 15.965 19.5005 17.045C19.7405 17.405 19.973 17.795 20.213 18.1775C20.2369 18.2032 20.253 18.2352 20.2597 18.2696C20.2663 18.3041 20.2631 18.3397 20.2505 18.3725Z"
                                fill="black"
                              />
                            </svg>
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
                                    className="relative rounded-full -top-12 -left-4"
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
                            <h2 className="font-semibold text-base w-full">
                              <input
                                type="text"
                                id="name"
                                placeholder="Enter the header"
                                className="bg-[#F5F9FF]  h-12 w-full text-black p-3 rounded-lg border-0 outline-none focus:outline-none"
                                value={header}
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>
                                ) => {
                                  setHeader(event.target.value);
                                }}
                              />
                            </h2>
                          </div>
                          {/* <div></div> */}{" "}
                          {/*the bottom characters and colour, bold, italic, etc. */}
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
                              <input
                                type="text"
                                id="body"
                                placeholder="Enter the body"
                                className="bg-[#F5F9FF]  h-12 w-full text-black p-3 rounded-lg border-0 outline-none focus:outline-none"
                                value={body}
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>
                                ) => {
                                  setBody(event.target.value);
                                }}
                              />
                            </h2>
                          </div>
                          {/* <div></div> */}{" "}
                          {/*the bottom characters and colour, bold, italic, etc. */}
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
                              <input
                                type="text"
                                id="footer"
                                placeholder="Enter the footer"
                                className="bg-[#F5F9FF]  h-12 w-full text-black p-3 rounded-lg border-0 outline-none focus:outline-none"
                                value={footer}
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>
                                ) => {
                                  setFooter(event.target.value);
                                }}
                              />
                            </h2>
                          </div>
                          {/* <div></div> */}{" "}
                          {/*the bottom characters and colour, bold, italic, etc. */}
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
                              <div
                                key={option.value}
                                className=" rounded-md w-full p-4 flex items-center gap-3 bg-white"
                              >
                                <input
                                  type="checkbox"
                                  id={option.value}
                                  checked={templateCheck === option.value}
                                  onChange={() =>
                                    handleTemplateRadioChange(option.value)
                                  }
                                  className="h-4 w-4 text-[#004AAD]"
                                />
                                <div className="flex flex-col justify-center items-start">
                                  <label
                                    htmlFor="allCustomers"
                                    className="text-lg font-[500]"
                                  >
                                    {option.label}
                                  </label>
                                  <p className="text-sm">{option.desc}</p>
                                </div>
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
              <div className="relative w-full max-w-xs mx-auto p-3">
                <img
                  src={screen}
                  alt="Phone Screen"
                  className="w-[85%] h-auto mx-auto"
                />
                {next && (
                  <>
                    <div className="absolute inset-0 flex flex-col  gap-1 items-center justify-center text-black h-fit top-[6rem] w-[13.6rem] left-[3rem]">
                      <div className="bg-white  p-4 rounded-md  ">
                        {selectedImage && type === "Marketing" && (
                          <div className="w-[12rem]  h-[6rem]">
                            <img
                              src={selectedImage}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <p className="text-sm text-gray-600 mt-1">{header}</p>
                        <p className="text-sm text-gray-600">{body}</p>
                        <p className="text-sm text-gray-600">{footer}</p>
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
