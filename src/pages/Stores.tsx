import { Store as StoreType } from "../redux/storeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { Link } from "react-router-dom";

// icons
import { FaPlus } from "react-icons/fa6";
import { BiEditAlt } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { FaYoutube, FaFacebook } from "react-icons/fa";

// assets
import image from "../assets/Ellipse 2862.png";
import instagram from "../assets/instagram.svg";
import zomato from "../assets/Zomato.svg";
import google from "../assets/Google-Review.png";

const Stores = () => {
  const { stores } = useSelector((state: RootState) => state.store);
  const [modal, setModal] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

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

  return (
    <div className="w-full h-fit relative ">
      <div className=" w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center gap-2 justify-center ml-[7%]  ">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col -mt-3">
            <h1 className="text-[24px] font-[500]">My stores</h1>
            <p className="text-[16x]">
              You have{" "}
              <span className="text-[#004AAD] font-bold">
                {stores.length} active store
              </span>
            </p>
          </div>
          <div className="w-fit h-fit">
            <button className="w-[150px] flex flex-row justify-center items-center gap-2 bg-[#004AAD] text-white px-2 py-2 text-lg font-[500] rounded-[8px]">
              <FaPlus className="text-lg" />
              Add Store
            </button>
            <svg
              className="relative -top-14 -right-[8.4rem] w-7 h-6"
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
          </div>
        </div>

        <div className="w-full flex flex-col -mt-2">
          {stores.map((store: StoreType) => (
            <div
              key={store.username}
              className="w-full flex flex-col gap-4 rounded-xl px-8 py-4 h-fit bg-[#F1F7FF]"
            >
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                  <img src={image} className="w-[60px] h-[60px] object-cover" />
                  <div className="flex flex-col">
                    <h1 className="text-[24px] font-semibold">
                      {store.username}
                    </h1>
                    <p className="text-[18x] font-[400] text-[#616161]">
                      {store.email}
                    </p>
                  </div>
                </div>
                <div className="w-fit flex flex-col justify-center">
                  <button
                    className="w-fit h-fit flex flex-row justify-center items-center gap-2 text-black text-[20px] font-[500] rounded-[8px]"
                    onClick={() => toggleModal()}
                  >
                    <BiEditAlt className="" />
                    Edit Details
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl flex flex-row flex-wrap gap-x-[1.2rem] gap-y-[2.2rem] w-fit h-fit p-[1.5rem]">
                <div className="w-[200px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Bussiness Type
                  </p>
                  <h1 className=" text-xl font-semibold">{store.type}</h1>
                </div>
                <div className="w-[200px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Bussiness Landmark
                  </p>
                  <h1 className="text-xl font-semibold">{store.landmark}</h1>
                </div>
                <div className="w-[200px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Business City
                  </p>
                  <h1 className="text-xl font-semibold">{store.city}</h1>
                </div>
                <div className="w-[200px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">State</p>
                  <h1 className="text-xl font-semibold">{store.state}</h1>
                </div>
                <div className="w-[20px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Pincode
                  </p>
                  <h1 className="text-xl font-semibold">{store.pincode}</h1>
                </div>
                <div className="w-[200px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Social Handels
                  </p>
                  <div className="w-full flex flex-row items-center gap-4 mt-2">
                    {store.socials.map((social) => (
                      <>
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
                      </>
                    ))}
                  </div>
                </div>
                <div className="w-[200px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Feedback Channels
                  </p>
                  <div className="w-full flex flex-row items-center gap-4 mt-2">
                    {store.channels.map((channel) => (
                      <>
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
                      </>
                    ))}
                  </div>
                </div>
                <div className="w-[200px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Manager Name
                  </p>
                  <h1 className="text-xl font-semibold">{store.manager}</h1>
                </div>
                <div className="w-[220px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Manager Contact
                  </p>
                  <h1 className="text-xl font-semibold">{store.contact}</h1>
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
          className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-2`}
        >
          <div
            className={`bg-white w-[500px] shadow-lg rounded-lg overflow-y-auto ${
              isClosing ? "slide-out-right" : "slide-in-right"
            }`}
          >
            <div className="w-full relative p-6 bg-white rounded-lg shadow">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <h1 className="text-[24px] font-bold">Edit Store Details</h1>
                  <p className="text-[16px] font-medium">
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
              <div className="flex flex-col mt-3">
                <div className="flex justify-center pb-1">
                  <img src={image} className="w-[70px] h-[70px] object-cover" />
                </div>
                <form className="flex flex-col gap-4 justify-center">
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-[14px] font-[500]">
                      Outlet Name
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="country"
                      className="flex flex-row items-center text-[14px] font-[500]"
                    >
                      Outlet Type
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <select
                      className="w-full p-2 border-2 border-[#00000033] rounded-[8px]"
                      id="type"
                      name="type"
                      // value="dw"
                      // onChange={handleInputChange}
                    >
                      <option value="">Select Type</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-[14px] font-[500]">
                      Outlet Mail ID
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                      placeholder="Enter Email ID"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-[14px] font-[500]">
                      Outlet Landmark
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                      placeholder="Enter Landmark"
                    />
                  </div>
                  <div className="flex flex-row gap-5 mt-1">
                    <button
                      className="w-[50%]  text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-2"
                      onClick={() => handleCloseModal()}
                    >
                      Cancel
                    </button>
                    <button className="w-[50%] bg-[#004AAD]  text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-2">
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
