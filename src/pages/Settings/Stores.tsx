import { Store as StoreType } from "../../redux/storeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

// icons
import { FaPlus } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { FaYoutube, FaFacebook } from "react-icons/fa";

// assets
import image from "../../assets/Ellipse 2862.png";
import instagram from "../../assets/instagram.svg";
import zomato from "../../assets/image 159.png";
import google from "../../assets/Google-Review.png";

interface FormData {
  image: string | null;
  outletName: string;
  outletType: string;
  outletMail: string;
  outletLandmark: string;
  outletCity: string;
  outletState: string;
  outletPincode: number;
  managerName: string;
  managerContact: string;
  insta: string;
  facebook: string;
  youtube: string;
  googleReview: string;
  zomatoReview: string;
}

const Stores = () => {
  const { stores } = useSelector((state: RootState) => state.store);
  const [modal, setModal] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    image: selectedImage,
    outletName: "",
    outletType: "",
    outletMail: "",
    outletLandmark: "",
    outletCity: "",
    outletState: "",
    outletPincode: 9,
    managerName: "",
    managerContact: "",
    insta: "",
    facebook: "",
    youtube: "",
    googleReview: "",
    zomatoReview: "",
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    setSelectedImage(null);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      toggleModal();
    }, 500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formData);
    handleCloseModal();
  };

  const handleEditClick = (store: StoreType) => {
    setSelectedImage(image);
    setFormData({
      image: image,
      outletName: store.username,
      outletType: store.type,
      outletMail: store.email,
      outletLandmark: store.landmark,
      outletCity: store.city,
      outletState: store.state,
      outletPincode: store.pincode,
      managerName: store.manager,
      managerContact: store.contact,
      insta: "", //store.insta,
      facebook: "", //store.facebook,
      youtube: "", //store.youtube,
      googleReview: "", //store.googleReview,
      zomatoReview: "", //store.zomatoReiew,
    });
    toggleModal();
  };

  return (
    <div className="w-full h-fit relative">
      <div className="lg:w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center gap-2 justify-center lg:ml-[7%]">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col -mt-3">
            <h1 className="text-2xl font-[500]">My stores</h1>
            <p className="text-[1rem]">
              You have{" "}
              <span className="text-[#004AAD] font-bold">
                {stores.length} active store
              </span>
            </p>
          </div>
          <div className="w-fit h-fit">
            <button className="w-[9.375rem] flex flex-row justify-center items-center gap-2 bg-[#004AAD] text-white px-2 py-2 text-lg font-[500] rounded-[0.5rem]">
              <FaPlus className="text-lg" />
              Add Store
            </button>
            <svg
              className="relative -top-[3.5rem] -right-[8.4rem] w-[1.75rem] h-[1.5rem]"
              width="2rem"
              height="2.125rem"
              viewBox="0 0 32 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.281rem"
                y="0.281rem"
                width="1.4rem"
                height="1.534rem"
                rx="0.699rem"
                fill="white"
              />
              <rect
                x="0.281rem"
                y="0.281rem"
                width="1.4rem"
                height="1.534rem"
                rx="0.699rem"
                stroke="white"
                strokeWidth="0.313rem"
              />
              <path
                d="M18.6236 14.7973L24.3745 13.2897L21.785 22.8177L21.7842 22.8206L21.7671 22.82H21.75H9.16H9.15184L9.14369 22.8201L7.41392 13.2914L7.41399 13.2914L7.41201 13.2811L7.42563 13.2861L7.44075 13.291L12.7608 15.021L13.6558 15.312L14.0005 14.4362L15.7095 10.0944L17.4486 14.2186L17.7853 15.0171L18.6236 14.7973ZM20.38 1H11C8.34783 1 5.8043 2.05357 3.92893 3.92893C2.05357 5.8043 1 8.34783 1 11V22.54C1 25.1922 2.05357 27.7357 3.92893 29.6111C5.8043 31.4864 8.34783 32.54 11 32.54H20.38C23.0322 32.54 25.5757 31.4864 27.4511 29.6111C29.3264 27.7357 30.38 25.1922 30.38 22.54V11C30.38 8.34783 29.3264 5.8043 27.4511 3.92893C25.5757 2.05357 23.0322 1 20.38 1Z"
                fill="black"
                stroke="white"
                strokeWidth="0.125rem"
              />
            </svg>
          </div>
        </div>

        <div className="w-full flex flex-col -mt-2">
          {stores.map((store: StoreType) => (
            <div
              key={store.username}
              className="w-full flex flex-col gap-4 rounded-xl px-[2rem] py-4 h-fit bg-[#F1F7FF]"
            >
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                  <img
                    //when image comes from store the src={store.image}
                    src={image}
                    className="w-[3.75rem] h-[3.75rem] object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-[1.5rem] font-semibold">
                      {store.username}
                    </h1>
                    <p className="text-[1.125rem] font-[400] text-[#616161]">
                      {store.email}
                    </p>
                  </div>
                </div>
                <div className="w-fit flex flex-col justify-center">
                  <button
                    className="w-fit h-fit flex flex-row justify-center items-center gap-2 text-black text-[1.25rem] font-[500] rounded-[0.5rem]"
                    onClick={() => handleEditClick(store)}
                  >
                    <BiEditAlt />
                    Edit Details
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl flex flex-row flex-wrap gap-x-[0.75rem] gap-y-[1.375rem] w-fit h-fit p-[1.5rem]">
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    Business Type
                  </p>
                  <h1 className="text-[1.125rem] font-semibold">
                    {store.type}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    Business Landmark
                  </p>
                  <h1 className="text-[1.125rem] font-semibold">
                    {store.landmark}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    Business City
                  </p>
                  <h1 className="text-[1.125rem] font-semibold">
                    {store.city}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    State
                  </p>
                  <h1 className="text-[1.125rem] font-semibold">
                    {store.state}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    Pincode
                  </p>
                  <h1 className="text-[1.125rem] font-semibold">
                    {store.pincode}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    Social Handles
                  </p>
                  <div className="w-full flex flex-row items-center gap-4 mt-2">
                    {store.socials.map((social, index) => (
                      <div key={index}>
                        {social.name === "youtube" && (
                          <Link className="w-fit h-fit" to={social.link}>
                            <FaYoutube className="text-3xl text-[#E90303]" />
                          </Link>
                        )}
                        {social.name === "facebook" && (
                          <Link className="w-fit h-fit" to={social.link}>
                            <FaFacebook className="text-3xl text-[#004AAD]" />
                          </Link>
                        )}
                        {social.name === "instagram" && (
                          <Link className="w-fit h-fit" to={social.link}>
                            <img src={instagram} className="w-7 h-auto" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-lg text-[#616161] font-[400]">
                    Feedback Channels
                  </p>
                  <div className="w-full flex flex-row items-center gap-4 mt-2">
                    {store.channels.map((channel, index) => (
                      <div key={index}>
                        {channel.name === "zomato" && (
                          <Link className="w-fit h-fit" to={channel.link}>
                            <img src={zomato} className="w-16 h-auto" />
                          </Link>
                        )}
                        {channel.name === "google" && (
                          <Link className="w-fit h-fit" to={channel.link}>
                            <img src={google} className="w-16 h-auto" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className=" w-[13rem] flex flex-col">
                  <p className="text-lg text-[#616161] font-[400]">
                    Manager Name
                  </p>
                  <h1 className="text-lg font-semibold">{store.manager}</h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-lg text-[#616161] font-[400]">
                    Manager Contact
                  </p>
                  <h1 className="text-lg font-semibold">{store.contact}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div
          id="default-modal"
          // tabIndex="-1"
          aria-hidden="true"
          className={
            "fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-2"
          }
        >
          <div
            className={`bg-white w-[31.25rem] shadow-lg rounded-lg overflow-y-auto h-full ${
              isClosing ? "slide-out-right" : "slide-in-right"
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className=" w-full relative  bg-white rounded-lg shadow h-fit">
              <div className="px-6 py-3 flex flex-row justify-between sticky top-0 bg-white pb-2 border-b border-b-gray-400 w-full">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold">Edit Store Details</h1>
                  <p className="text-base font-medium">
                    Edit your store details at convinience
                  </p>
                </div>
                <IoMdCloseCircle
                  onClick={() => {
                    handleCloseModal();
                  }}
                  className="text-4xl hover:cursor-pointer"
                />
              </div>
              <div className="flex flex-col px-6 py-3 h-full">
                <form
                  className="flex flex-col gap-4  justify-evenly h-full"
                  onSubmit={handleSubmit}
                >
                  <div className="mt-4 flex justify-center flex-col items-center">
                    {selectedImage ? (
                      <div className="w-[6rem] h-[6rem] flex items-center justify-center  object-cover cursor-pointer hover:scale-105 hover:border hover:border-gray-300 rounded-lg">
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="w-[6rem] h-[6rem] object-cover rounded-md "
                          onClick={handleImageClick}
                        />
                        {/* <button
                          type="button"
                          className="relative -top-28 -right-20  p-1 rounded-full shadow-lg"
                          onClick={handleImageClick}
                        >
                          <IoMdCloseCircle size={24} className="text-[white]" />
                        </button> */}
                      </div>
                    ) : (
                      <label
                        htmlFor="imageInput"
                        className="flex flex-col items-center justify-center w-[8rem] h-[6rem] border-2 border-dashed bg-[#F1F7FF] border-gray-300 rounded-lg cursor-pointer "
                      >
                        <IoMdImages size={48} className="text-[#004AAD]" />
                        <input
                          type="file"
                          id="imageInput"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletName"
                      >
                        Outlet Name
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="outletName"
                        name="outletName"
                        value={formData.outletName}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletType"
                      >
                        Outlet Type
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="outletType"
                        name="outletType"
                        value={formData.outletType}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletMail"
                      >
                        Outlet Mail
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="email"
                        id="outletMail"
                        name="outletMail"
                        value={formData.outletMail}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletLandmark"
                      >
                        Outlet Landmark
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="outletLandmark"
                        name="outletLandmark"
                        value={formData.outletLandmark}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletCity"
                      >
                        Outlet City
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="outletCity"
                        name="outletCity"
                        value={formData.outletCity}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletState"
                      >
                        Outlet State
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="outletState"
                        name="outletState"
                        value={formData.outletState}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletPincode"
                      >
                        Outlet Pincode
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="outletPincode"
                        name="outletPincode"
                        value={formData.outletPincode}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>

                    {/*social handles */}
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="socialHandles"
                      >
                        Social Handles
                      </label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <svg
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_223_38425)">
                              <rect
                                x="0.283203"
                                y="0.5"
                                width="239"
                                height="73"
                                rx="15"
                                fill="white"
                              />
                              <g clip-path="url(#clip1_223_38425)">
                                <path
                                  d="M19.5332 0.5H9.0332C6.71256 0.5 4.48696 1.42187 2.84602 3.06282C1.20508 4.70376 0.283203 6.92936 0.283203 9.25L0.283203 19.75C0.283203 22.0706 1.20508 24.2962 2.84602 25.9372C4.48696 27.5781 6.71256 28.5 9.0332 28.5H19.5332C21.8538 28.5 24.0794 27.5781 25.7204 25.9372C27.3613 24.2962 28.2832 22.0706 28.2832 19.75V9.25C28.2832 6.92936 27.3613 4.70376 25.7204 3.06282C24.0794 1.42187 21.8538 0.5 19.5332 0.5ZM25.6582 19.75C25.6582 23.1275 22.9107 25.875 19.5332 25.875H9.0332C5.6557 25.875 2.9082 23.1275 2.9082 19.75V9.25C2.9082 5.8725 5.6557 3.125 9.0332 3.125H19.5332C22.9107 3.125 25.6582 5.8725 25.6582 9.25V19.75Z"
                                  fill="url(#paint0_linear_223_38425)"
                                />
                                <path
                                  d="M14.2832 7.5C12.4267 7.5 10.6462 8.2375 9.33346 9.55025C8.0207 10.863 7.2832 12.6435 7.2832 14.5C7.2832 16.3565 8.0207 18.137 9.33346 19.4497C10.6462 20.7625 12.4267 21.5 14.2832 21.5C16.1397 21.5 17.9202 20.7625 19.233 19.4497C20.5457 18.137 21.2832 16.3565 21.2832 14.5C21.2832 12.6435 20.5457 10.863 19.233 9.55025C17.9202 8.2375 16.1397 7.5 14.2832 7.5ZM14.2832 18.875C13.1233 18.8736 12.0113 18.4122 11.1911 17.5921C10.371 16.7719 9.90959 15.6599 9.9082 14.5C9.9082 12.0868 11.8717 10.125 14.2832 10.125C16.6947 10.125 18.6582 12.0868 18.6582 14.5C18.6582 16.9115 16.6947 18.875 14.2832 18.875Z"
                                  fill="url(#paint1_linear_223_38425)"
                                />
                                <path
                                  d="M21.8117 7.90725C22.3268 7.90725 22.7444 7.48964 22.7444 6.9745C22.7444 6.45935 22.3268 6.04175 21.8117 6.04175C21.2965 6.04175 20.8789 6.45935 20.8789 6.9745C20.8789 7.48964 21.2965 7.90725 21.8117 7.90725Z"
                                  fill="url(#paint2_linear_223_38425)"
                                />
                              </g>
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_223_38425"
                                x1="2.8452"
                                y1="25.938"
                                x2="25.7212"
                                y2="3.062"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#FFC107" />
                                <stop offset="0.507" stop-color="#F44336" />
                                <stop offset="0.99" stop-color="#9C27B0" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_223_38425"
                                x1="9.3342"
                                y1="19.449"
                                x2="19.2322"
                                y2="9.551"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#FFC107" />
                                <stop offset="0.507" stop-color="#F44336" />
                                <stop offset="0.99" stop-color="#9C27B0" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_223_38425"
                                x1="21.1519"
                                y1="7.63425"
                                x2="22.4714"
                                y2="6.31475"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#FFC107" />
                                <stop offset="0.507" stop-color="#F44336" />
                                <stop offset="0.99" stop-color="#9C27B0" />
                              </linearGradient>
                              <clipPath id="clip0_223_38425">
                                <rect
                                  x="0.283203"
                                  y="0.5"
                                  width="28"
                                  height="28"
                                  rx="8"
                                  fill="white"
                                />
                              </clipPath>
                              <clipPath id="clip1_223_38425">
                                <rect
                                  width="28"
                                  height="28"
                                  fill="white"
                                  transform="translate(0.283203 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <input
                            type="text"
                            name="insta"
                            placeholder="Instagram link"
                            value={formData.insta}
                            onChange={handleInputChange}
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_223_38422)">
                              <path
                                d="M14.2832 0.5C6.55083 0.5 0.283203 6.76762 0.283203 14.5C0.283203 22.2315 6.55083 28.5 14.2832 28.5C22.0156 28.5 28.2832 22.2315 28.2832 14.5C28.2832 6.76762 22.0156 0.5 14.2832 0.5Z"
                                fill="#004AAD"
                              />
                              <path
                                d="M12.2606 22.289H15.4797V14.498H17.627L17.9113 11.8135H15.4797L15.4832 10.4695C15.4832 9.76949 15.5497 9.39412 16.5542 9.39412H17.8965V6.70874H15.7483C13.168 6.70874 12.2606 8.01161 12.2606 10.2017V11.8135H10.6523V14.4989H12.2606V22.289Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_223_38422">
                                <rect
                                  width="28"
                                  height="28"
                                  fill="white"
                                  transform="translate(0.283203 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

                          <input
                            type="text"
                            name="facebook"
                            placeholder="Facebook link"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_223_38418)">
                              <path
                                d="M12.3838 17.3522L17.1368 14.5006L12.3838 11.6489V17.3522Z"
                                fill="#E90303"
                              />
                              <path
                                d="M14.2832 0.5C6.5517 0.5 0.283203 6.76762 0.283203 14.5C0.283203 22.2324 6.5517 28.5 14.2832 28.5C22.0147 28.5 28.2832 22.2315 28.2832 14.5C28.2832 6.7685 22.0147 0.5 14.2832 0.5ZM21.8852 15.1134C21.8852 16.4259 21.733 17.7384 21.733 17.7384C21.733 17.7384 21.5842 18.8566 21.1292 19.3475C20.5508 19.9932 19.9033 19.9967 19.6058 20.0352C17.4778 20.198 14.2832 20.2032 14.2832 20.2032C14.2832 20.2032 10.33 20.1648 9.1137 20.0405C8.77508 19.9731 8.01645 19.9924 7.4372 19.3475C6.98133 18.8558 6.83345 17.7384 6.83345 17.7384C6.83345 17.7384 6.6812 16.4268 6.6812 15.1134V13.8831C6.6812 12.5706 6.83345 11.259 6.83345 11.259C6.83345 11.259 6.9822 10.1407 7.4372 9.64812C8.01558 9.0015 8.66308 8.998 8.96058 8.96125C11.0877 8.79675 14.2797 8.79675 14.2797 8.79675H14.2867C14.2867 8.79675 17.4787 8.79675 19.6058 8.96125C19.9025 8.998 20.5508 9.0015 21.1292 9.64725C21.5851 10.1399 21.733 11.2581 21.733 11.2581C21.733 11.2581 21.8852 12.5706 21.8852 13.8831V15.1134Z"
                                fill="#E90303"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_223_38418">
                                <rect
                                  width="28"
                                  height="28"
                                  fill="white"
                                  transform="translate(0.283203 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <input
                            type="text"
                            name="youtube"
                            placeholder="Youtube link"
                            value={formData.youtube}
                            onChange={handleInputChange}
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                          />
                        </div>
                      </div>
                    </div>

                    {/*feedback */}
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="feedbackChannels"
                      >
                        Feedback Channels
                      </label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <img src={google} width="29" height="29" />
                          <input
                            type="text"
                            name="googleReview"
                            placeholder="Google review"
                            value={formData.googleReview}
                            onChange={handleInputChange}
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={zomato} width="29" height="29" />
                          <input
                            type="text"
                            placeholder="Zomato review"
                            name="zomatoReview"
                            value={formData.zomatoReview}
                            onChange={handleInputChange}
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="managerName"
                      >
                        Manager Name
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="managerName"
                        name="managerName"
                        value={formData.managerName}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="managerContact"
                      >
                        Manager Contact
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="managerContact"
                        name="managerContact"
                        value={formData.managerContact}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-5 mt-3">
                    <button
                      className="w-[50%]  text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-3 py-2"
                      onClick={() => handleCloseModal()}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-[50%] bg-[#004AAD]  text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-3 py-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores;
