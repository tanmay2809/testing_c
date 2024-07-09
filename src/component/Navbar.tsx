import icon from "../assets/icon.png";
import { IoMdWallet } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className=" bg-white  z-[900] w-full h-[70px] flex justify-between items-center px-[1.5rem] border-b shadow-xl shadow-[#00000026]">
        {/* logo */}
        <img
          
          src={icon}
          alt="logo"
          className="h-[85%] w-[130px]  aspect-auto  cursor-pointer  "
        />

        <div>
            <div className="text-[#64748B] text-[1.1rem] font-bold flex items-center gap-5 bg-[#EFF6FF] px-6 py-2 rounded-xl ">
            <IoMdWallet />
            <p>₹1000</p>
            <FaPlus className="bg-white " />
            </div>
            <div>
              
            </div>
        </div>

    </div>
  )
}

export default Navbar