import { Store as StoreType } from "../../redux/storeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

// icons
import { FaGoogle, FaInstagram, FaPlus } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { FaYoutube, FaFacebook } from "react-icons/fa";

// assets
import image from "../../assets/Ellipse 2862.png";
import instagram from "../../assets/instagram.svg";
import zomato from "../../assets/Zomato.svg";
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
  socialHandles: { name: string; link: string }[];
  feedbackChannels: { name: string; link: string }[];
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
    socialHandles: [],
    feedbackChannels: [],
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
      socialHandles: store.socials,
      feedbackChannels: store.channels,
    });
    toggleModal();
  };

  return (
    <div className="w-full h-fit relative">
      <div className="w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center gap-2 justify-center ml-[7%]">
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
          >
            <div className="w-full relative px-6 py-3 bg-white rounded-lg shadow h-fit">
              <div className="flex flex-row justify-between">
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
              <div className="flex flex-col  h-full">
                <form
                  className="flex flex-col gap-4  justify-evenly h-full"
                  onSubmit={handleSubmit}
                >
                  <div className="mt-4 flex justify-center flex-col items-center">
                    {selectedImage ? (
                      <div className="w-[7rem] h-[7rem] flex items-center justify-center  object-cover cursor-pointer hover:scale-105 hover:border hover:border-gray-300 rounded-lg">
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
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletName"
                      >
                        Outlet Name
                      </label>
                      <input
                        type="text"
                        id="outletName"
                        name="outletName"
                        value={formData.outletName}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletType"
                      >
                        Outlet Type
                      </label>
                      <input
                        type="text"
                        id="outletType"
                        name="outletType"
                        value={formData.outletType}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletMail"
                      >
                        Outlet Mail
                      </label>
                      <input
                        type="email"
                        id="outletMail"
                        name="outletMail"
                        value={formData.outletMail}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletLandmark"
                      >
                        Outlet Landmark
                      </label>
                      <input
                        type="text"
                        id="outletLandmark"
                        name="outletLandmark"
                        value={formData.outletLandmark}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletCity"
                      >
                        Outlet City
                      </label>
                      <input
                        type="text"
                        id="outletCity"
                        name="outletCity"
                        value={formData.outletCity}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletState"
                      >
                        Outlet State
                      </label>
                      <input
                        type="text"
                        id="outletState"
                        name="outletState"
                        value={formData.outletState}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="outletPincode"
                      >
                        Outlet Pincode
                      </label>
                      <input
                        type="text"
                        id="outletPincode"
                        name="outletPincode"
                        value={formData.outletPincode}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>

                    {/*social handles */}
                    {/* <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="socialHandles"
                      >
                        Social Handles
                      </label>
                      {formData.socialHandles.map((social, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            name="socialHandles"
                            value={social.link}
                            onChange={(e) => {
                              const newSocialHandles = [
                                ...formData.socialHandles,
                              ];
                              newSocialHandles[index].link = e.target.value;
                              setFormData({
                                ...formData,
                                socialHandles: newSocialHandles,
                              });
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      ))}
                    </div> */}

                    {/*feedback */}
                    {/* <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="feedbackChannels"
                      >
                        Feedback Channels
                      </label>
                      {formData.feedbackChannels.map((channel, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            name="feedbackChannels"
                            value={channel.link}
                            onChange={(e) => {
                              const newFeedbackChannles = [
                                ...formData.feedbackChannels,
                              ];
                              newFeedbackChannles[index].link = e.target.value;
                              setFormData({
                                ...formData,
                                feedbackChannels: newFeedbackChannles,
                              });
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      ))}
                    </div> */}
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="managerName"
                      >
                        Manager Name
                      </label>
                      <input
                        type="text"
                        id="managerName"
                        name="managerName"
                        value={formData.managerName}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="managerContact"
                      >
                        Manager Contact
                      </label>
                      <input
                        type="text"
                        id="managerContact"
                        name="managerContact"
                        value={formData.managerContact}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
