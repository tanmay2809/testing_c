import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// icons
import { FaFacebook, FaPlus, FaYoutube } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";

// assets
import instagram from "../../assets/instagram.svg";
import zomato from "../../assets/image 159.png";
import google from "../../assets/Google-Review.png";

//svg
import premium from "/premium.svg";

// redux
import {
  AppThunkDispatch,
  fetchRestaurantDetails,
} from "../../redux/restaurantData";
import { useDispatch } from "react-redux";

interface FormData {
  image: string;
  resName: string;
  businessType: string;
  email?: string;
  additionalDetails?: any;
  landmark: string;
  city: string;
  state: string;
  pincode: number;
  manager: string;
  contact: string;
  instagram: string;
  facebook: string;
  youtube: string;
  google: string;
  zomato: string;
}

const Stores = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [store, setStore] = useState<FormData[]>();

  const dispatch: AppThunkDispatch = useDispatch();
  const resData = useSelector((state: RootState) => state.resturantdata);

  const [formData, setFormData] = useState<FormData>({
    image: selectedImage,
    resName: "",
    businessType: "",
    landmark: "",
    city: "",
    state: "",
    pincode: 9,
    manager: "",
    contact: "",
    instagram: "",
    facebook: "",
    youtube: "",
    google: "",
    zomato: "",
  });

  // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  //   console.log(image)
  // };

  const handleImageChange = async (file: File) => {
    const imageFormData = new FormData();
    imageFormData.append("file", file);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/fileUpload`,
      data: imageFormData,
    };

    try {
      const response = await axios.request(config);
      console.log(response);
      if (response.data.status && response.data.data) {
        const url = response.data.data[0].url;
        console.log(url);
        setSelectedImage(url);
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: url,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = () => {
    setSelectedImage("");
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
    console.log("Form data:", formData);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/updateRestaurantDetails/${resData.data._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        dispatch(fetchRestaurantDetails({ id: resData.data._id }));
        toast.success("Store Details Saved");
      })
      .catch((error) => {
        console.log(error);
      });

    handleCloseModal();
  };

  const handleEditClick = (store: FormData) => {
    setSelectedImage(store.additionalDetails.image);
    setFormData({
      image: store.additionalDetails.image,
      resName: store.resName,
      businessType: store.additionalDetails?.businessType,
      landmark: store.additionalDetails?.landmark,
      city: store.additionalDetails?.city,
      state: store.additionalDetails?.state,
      pincode: store.additionalDetails?.pincode,
      manager: store.additionalDetails?.manager,
      contact: store.additionalDetails?.contact,
      instagram: store.additionalDetails?.instagram,
      facebook: store.additionalDetails?.facebook,
      youtube: store.additionalDetails?.youtube,
      google: store.additionalDetails?.google,
      zomato: store.additionalDetails?.zomato,
    });
    toggleModal();
  };

  useEffect(() => {
    setStore([resData.data]);
  }, [resData]);

  return (
    <div className="w-full h-fit relative">
      <div className="lg:w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center gap-2 justify-center lg:ml-[7%]">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col -mt-3">
            <h1 className="text-2xl font-[500]">My stores</h1>
            <p className="text-[1rem]">
              You have{" "}
              <span className="text-[#004AAD] font-bold">
                {store?.length} active store
              </span>
            </p>
          </div>
          <div className="w-fit h-fit">
            <button className="w-[9.375rem] flex flex-row justify-center items-center gap-2 bg-[#004AAD] text-white px-2 py-2 text-lg font-[500] rounded-[0.5rem]">
              <FaPlus className="text-lg" />
              Add Store
            </button>
            <img
              src={premium}
              className="relative -top-[3.5rem] -right-[8.4rem] w-[1.75rem] h-[1.5rem]"
            />
          </div>
        </div>

        <div className="w-full flex flex-col -mt-2">
          {store?.map((store: FormData) => (
            <div
              key={store.resName}
              className="w-full flex flex-col gap-4 rounded-xl px-[2rem] py-4 h-fit bg-[#F1F7FF]"
            >
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                  <img
                    src={store.additionalDetails?.image}
                    className="w-[3.75rem] h-[3.75rem] object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-[1.5rem] font-semibold">
                      {store.resName}
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
                    {store.additionalDetails?.businessType}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    Business Landmark
                  </p>
                  <h1 className="text-[1.125rem] font-semibold">
                    {store.additionalDetails?.landmark}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    Business City
                  </p>
                  <h1 className="text-[1.125rem] font-semibold">
                    {store.additionalDetails?.city}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    State
                  </p>
                  <h1 className="text-[1.125rem] font-semibold">
                    {store.additionalDetails?.state}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    Pincode
                  </p>
                  <h1 className="text-[1.125rem] font-semibold">
                    {store.additionalDetails?.pincode}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-[1.125rem] text-[#616161] font-[400]">
                    Social Handles
                  </p>
                  <div className="w-full flex flex-row items-center gap-4 mt-2">
                    {store.additionalDetails?.youtube && (
                      <Link
                        className="w-fit h-fit"
                        to={store.additionalDetails?.youtube}
                      >
                        <FaYoutube className="text-3xl text-[#E90303]" />
                      </Link>
                    )}
                    {store.additionalDetails?.facebook && (
                      <Link
                        className="w-fit h-fit"
                        to={store.additionalDetails?.facebook}
                      >
                        <FaFacebook className="text-3xl text-[#004AAD]" />
                      </Link>
                    )}
                    {store.additionalDetails?.instagram && (
                      <Link
                        className="w-fit h-fit"
                        to={store.additionalDetails?.instagram}
                      >
                        <img src={instagram} className="w-7 h-auto" />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-lg text-[#616161] font-[400]">
                    Feedback Channels
                  </p>
                  <div className="w-full flex flex-row items-center gap-4 mt-2">
                    {store.additionalDetails?.zomato && (
                      <Link
                        className="w-fit h-fit"
                        to={store.additionalDetails?.zomato}
                      >
                        <img src={zomato} className="w-16 h-auto" />
                      </Link>
                    )}
                    {store.additionalDetails?.google && (
                      <Link
                        className="w-fit h-fit"
                        to={store.additionalDetails?.google}
                      >
                        <img src={google} className="w-16 h-auto" />
                      </Link>
                    )}
                  </div>
                </div>
                <div className=" w-[13rem] flex flex-col">
                  <p className="text-lg text-[#616161] font-[400]">
                    Manager Name
                  </p>
                  <h1 className="text-lg font-semibold">
                    {store.additionalDetails?.manager}
                  </h1>
                </div>
                <div className="w-[13rem] flex flex-col">
                  <p className="text-lg text-[#616161] font-[400]">
                    Manager Contact
                  </p>
                  <h1 className="text-lg font-semibold">
                    {store.additionalDetails?.contact}
                  </h1>
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
                          name="image"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0])
                              handleImageChange(e.target.files[0]);
                          }}
                        />
                      </label>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="resName"
                      >
                        Outlet Name
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="resName"
                        name="resName"
                        value={formData.resName}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="businessType"
                      >
                        Outlet Type
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="landmark"
                      >
                        Outlet Landmark
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="city"
                      >
                        Outlet City
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="state"
                      >
                        Outlet State
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="pincode"
                      >
                        Outlet Pincode
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
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
                            name="instagram"
                            placeholder="Instagram link"
                            value={formData.instagram}
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
                            name="google"
                            placeholder="Google review"
                            value={formData.google}
                            onChange={handleInputChange}
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={zomato} width="29" height="29" />
                          <input
                            type="text"
                            placeholder="Zomato review"
                            name="zomato"
                            value={formData.zomato}
                            onChange={handleInputChange}
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="manager"
                      >
                        Manager Name
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="manager"
                        name="manager"
                        value={formData.manager}
                        onChange={handleInputChange}
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 "
                      />
                    </div>
                    <div className="">
                      <label
                        className="flex text-gray-700 text-sm font-bold mb-2"
                        htmlFor="contact"
                      >
                        Manager Contact
                        <LuAsterisk className="text-sm text-[#C62828]" />
                      </label>
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
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
