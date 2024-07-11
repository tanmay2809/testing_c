import { Outlet, Link ,useLocation} from "react-router-dom";
import { useState } from "react";

//icon
import { RiDashboardFill } from "react-icons/ri";
import { FaConciergeBell } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlinePerson3 } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

import right from "../assets/right.png";

const LeftNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
   <nav className={` fixed bg-white z-50  mt-[70px]  h-[calc(100vh-70px)] border-r  shadow-xl shadow-[#00000026] ${isOpen ? "w-[15%] duration-100" : "w-[7%] duration-100"}`}>
      <div className="relative w-full  flex flex-col justify-evenly items-center ">
          <img onClick={handleToggle}  className={`absolute top-2 size-14 cursor-pointer -right-7 ${isOpen ?" rotate-180":" rotate-0"}`} src={right} alt="" />

          <div className={`flex flex-col justify-between items-center    mt-32 text-[#64748B] text-[1.4rem] ${isOpen ? "gap-12":"gap-60"}`}>
            <div className="flex flex-col  gap-7 ">
            <div>
              <Link  className="flex gap-3 items-center hover:text-[#004AAD]" to="/dashboard"><RiDashboardFill/><span onClick={handleToggle} className={` ${isOpen ? "block text-[1rem]":" hidden"}`}>dashboard</span></Link>
            </div>
            <div >
              <Link className="flex gap-3  items-center hover:text-[#004AAD] "  to="/menu"><FaConciergeBell /><span onClick={handleToggle} className={` ${isOpen ? "block text-[1rem]":" hidden"}`}>menu</span></Link>
            </div>
            <div>
                <Link className="flex gap-3 items-center hover:text-[#004AAD]"  to="/marketing"><HiOutlineSpeakerphone /><span onClick={handleToggle} className={` ${isOpen ? "block text-[1rem]":" hidden"}`}>marketing</span></Link>
            </div>
            <div>
                <Link className="flex gap-3 items-center hover:text-[#004AAD]"  to="/customer"><MdOutlinePerson3 /><span onClick={handleToggle} className={` ${isOpen ? "block text-[1rem]":" hidden"}`}>customer</span></Link>
            </div>
            </div>
            <div className={`py-4 font-Poppins px-2 text-[1.1rem] flex  items-center justify-center  flex-col gap-1 rounded-md bg-gradient-to-tl from-[#004AAD] to-[#EAABF0] m-3  ${isOpen?"block ":"hidden " } `}>
              <p className=" text-white  ">Upgrade to Premium to get access all Features!</p>
              <button className="px-7 py-[.2rem] rounded-3xl bg-white text-[#004AAD]">Get Pro Now!</button>

            </div>
            <div className="flex flex-col text-[1.5rem] justify-between items-center gap-8">

            <div >
                <Link className="flex items-center justify-center gap-3 hover:text-[#004AAD]" to="/setting"><CiSettings /> <span onClick={handleToggle} className={` ${isOpen ? "block text-[1rem]":" hidden"}`}>setting</span></Link>
            </div>
            <div>
                <Link className="flex items-center justify-center gap-3 text-red-500" to="/login"><IoLogOutOutline /> <span onClick={handleToggle} className={` ${isOpen ? "block text-[1rem] text-red-500":" hidden"}`}>Log Out</span></Link>
            </div>
            </div>

          </div>
      </div></nav>

      <Outlet />
    </>
  );
};

export default LeftNavbar;
