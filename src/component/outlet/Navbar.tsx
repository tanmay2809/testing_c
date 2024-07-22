import icon from "../../assets/icon.png";
import { IoMdWallet } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import logo1 from "../../assets/Group 1171278064 (1).png";
import { useState } from "react";

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

  return (
    <div className=" fixed bg-white z-50 w-full h-[70px] flex flex-row lg:justify-between gap-[45%] items-center px-[2.5rem] border-b shadow-xl py-[.5rem] shadow-[#00000026]">
      {/* logo */}
      <img
        src={icon}
        alt="logo"
        className="h-[100%] w-auto max-w-[25%] ml-[1rem] aspect-auto  cursor-pointer  "
      />

      <div className="flex items-center justify-evenly w-[25%]">
        <div className="text-[#64748B] text-[1.1rem] font-bold flex items-center gap-5 bg-[#EFF6FF] px-6 py-2 rounded-xl ">
          <IoMdWallet />
          <p>₹1000</p>
          <FaPlus className="bg-white rounded size-5 " />
        </div>
        <p className="w-[1.5px] bg-[#0000004F] h-10 ml-6  "></p>

        <img
          onClick={handlefram}
          src={logo1}
          className="size-24 object-cover cursor-pointer"
          alt="logo1"
        />
      </div>
    </div>
  );
};

export default Navbar;
