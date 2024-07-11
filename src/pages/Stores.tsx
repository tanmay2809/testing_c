import { Store as StoreType } from "../redux/storeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { Link } from "react-router-dom";

// icons
import { FaPlus } from "react-icons/fa6";
import { TbChessQueenFilled } from "react-icons/tb";
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
      <div className=" w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 ml-[7%] mt-2 ">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-[24px] font-[500]">My stores</h1>
            <p className="text-[16x]">
              You have
              <span className="text-[#004AAD] font-bold">
                {stores.length} active store
              </span>
            </p>
          </div>
          <div className="w-fit h-fit">
            <button className="w-[180px] flex flex-row justify-center items-center gap-2 bg-[#004AAD] text-white px-4 py-2 text-[21px] font-[500] rounded-[8px]">
              <FaPlus className="text-2xl" />
              Add Store
            </button>
            <div className="relative bg-black rounded-xl outline outline-3 w-fit h-fit p-[3px] bottom-[60px] left-[90%] text-2xl text-white">
              <TbChessQueenFilled />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">
          {stores.map((store: StoreType) => (
            <div
              key={store.username}
              className="w-full flex flex-col gap-4 rounded-xl px-8 py-4 h-fit bg-[#F1F7FF]"
            >
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                  <img src={image} className="w-[70px] h-[70px] object-cover" />
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
                    className="w-fit h-fit flex flex-row justify-center items-center gap-2 text-black text-[21px] font-[500] rounded-[8px]"
                    onClick={() => toggleModal()}
                  >
                    <BiEditAlt className="" />
                    Edit Details
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl flex flex-row flex-wrap gap-x-[1.2rem] gap-y-[3rem] w-fit h-fit p-[3rem]">
                <div className="w-[220px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Bussiness Type
                  </p>
                  <h1 className="text-[28px] font-semibold">{store.type}</h1>
                </div>
                <div className="w-[220px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Bussiness Landmark
                  </p>
                  <h1 className="text-[28px] font-semibold">
                    {store.landmark}
                  </h1>
                </div>
                <div className="w-[220px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Business City
                  </p>
                  <h1 className="text-[28px] font-semibold">{store.city}</h1>
                </div>
                <div className="w-[220px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">State</p>
                  <h1 className="text-[28px] font-semibold">{store.state}</h1>
                </div>
                <div className="w-[220px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Pincode
                  </p>
                  <h1 className="text-[28px] font-semibold">{store.pincode}</h1>
                </div>
                <div className="w-[220px] flex flex-col">
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
                <div className="w-[220px] flex flex-col">
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
                <div className="w-[220px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Manager Name
                  </p>
                  <h1 className="text-[28px] font-semibold">{store.manager}</h1>
                </div>
                <div className="w-[220px] flex flex-col">
                  <p className="text-[18px] text-[#616161] font-[400]">
                    Manager Contact
                  </p>
                  <h1 className="text-[28px] font-semibold">{store.contact}</h1>
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
          className={`fixed inset-0 z-50 flex items-center justify-end w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50`}
        >
          <div
            className={`relative p-4 w-full sm:w-fit h-fit ${
              isClosing ? "slide-out-right" : "slide-in-right"
            }`}
          >
            <div className="w-full relative p-8 bg-white rounded-lg shadow">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <h1 className="text-[28px] font-bold">Edit Store Details</h1>
                  <p className="text-[18px] font-bold">
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
              <div className="flex flex-col mt-5">
                <form className="flex flex-col gap-4 justify-center">
                  <div className="flex flex-col gap-2">
                    <label className="flex flex-row items-center text-[14px] font-[500]">
                      Outlet Name
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
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
                      className="w-full p-4 border-2 border-[#00000033] rounded-[8px]"
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
                      className="w-full p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
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
                      className="w-full p-4 border-2 border-[#00000033] rounded-[8px] text-[18px]"
                      placeholder="Enter Landmark"
                    />
                  </div>
                  <div className="flex flex-row gap-5">
                    <button
                      className="w-[50%] h-14 text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-[1rem]"
                      onClick={() => handleCloseModal()}
                    >
                      Cancel
                    </button>
                    <button className="w-[50%] bg-[#004AAD] h-14 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem]">
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
