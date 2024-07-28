import icon from "../../assets/icon.png";
import { IoMdWallet } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Navbar = () => {
  const [fram, setfram] = useState<boolean>(false);

  const handlefram = () => {
    setfram(!fram);
    if (fram) {
      document.getElementById("frame")!.style.display = "none";
    } else {
      document.getElementById("frame")!.style.display = "block";
    }
  };

  const { data } = useSelector((state: RootState) => state.resturantdata);

  return (
    <div className=" fixed bg-white  z-50 w-full h-[70px] flex justify-between items-center px-[1rem] border-b shadow-xl py-[.5rem] shadow-[#00000026]">
      {/* logo */}
      <img
        src={icon}
        alt="logo"
        className="h-[100%] ml-[1rem] aspect-auto cursor-pointer"
      />

      <div className="flex items-center justify-evenly w-fit  ">
        <Link
          to="/wallet"
          className="text-[#64748B] text-[1.1rem] font-bold flex items-center gap-5 bg-[#EFF6FF] px-6 py-2 rounded-xl "
        >
          <IoMdWallet />
          <p>₹1000</p>
          <FaPlus className="bg-white rounded size-5 " />
        </Link>
        <p className="w-[1.5px] bg-[#0000004F] h-10 ml-6  "></p>

        <img
          onClick={handlefram}
          src={data.additionalDetails?.image}
          className="size-[3rem] ml-5 object-cover rounded-full cursor-pointer"
          alt="logo1"
        />
      </div>
    </div>
  );
};

export default Navbar;
