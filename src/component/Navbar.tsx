import icon from "../assets/icon.png";
import { IoMdWallet } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import logo1 from "../assets/Group 1171278064 (1).png"
import { useState } from "react";


const Navbar = () => {

  const [fram, setfram] = useState<boolean>(false);

  const handlefram = () => {
    setfram(!fram);
    if (fram) {
      document.getElementById('frame')!.style.display = "none";
    } else {
      document.getElementById('frame')!.style.display = "block";
    }
  };

  return (
    <div className=" fixed bg-white  z-50 w-full h-[70px] flex justify-between items-center px-[1.5rem] border-b shadow-xl shadow-[#00000026]">
        {/* logo */}
        <img
          
          src={icon}
          alt="logo"
          className="h-[85%] w-[130px] z-50  aspect-auto  cursor-pointer  "
        />

        <div className="flex items-center justify-evenly w-[25%]  ">
            <div className="text-[#64748B] text-[1.1rem] font-bold flex items-center gap-5 bg-[#EFF6FF] px-6 py-2 rounded-xl ">
            <IoMdWallet />
            <p>₹1000</p>
            <FaPlus className="bg-white rounded size-6 " />
            </div>
            <p className="w-[2px] bg-slate-600 h-5 ml-6  "></p>
            
             <img onClick={handlefram} src={logo1} className="size-24  object-cover" alt="" />
              
            
        </div>


         

    </div>
  )
}

export default Navbar