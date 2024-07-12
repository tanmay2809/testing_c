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
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  return (
    <>
       <nav className={` fixed bg-white z-50  mt-[70px]  h-[calc(100vh-70px)] border-r  shadow-xl shadow-[#00000026] ${isOpen ? "w-[15%] duration-100" : "w-[7%] duration-100"}`}>
      <div className="relative w-full  flex flex-col justify-evenly items-center ">
          <img onClick={handleToggle}  className={`absolute top-2 size-14 cursor-pointer -right-7 ${isOpen ?" rotate-180":" rotate-0"}`} src={right} alt="" />

          <div className={`flex flex-col justify-between items-center    mt-28 text-[#64748B] text-[1.1rem] ${isOpen ? "gap-8":"gap-20"}`}>
            <div className="flex flex-col  gap-1 ">
            <div>
              <Link  className={`${
                    location.pathname === "/dashboard"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-8 mx-3 py-2.5 ":" p-4 "} `} to="/dashboard"><RiDashboardFill/><span onClick={handleToggle} className={` ${isOpen ? "block text-[1rem]":" hidden"}`}>dashboard</span></Link>
            </div>
            <div >
              <Link className={`${
                    location.pathname === "/menu"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-12 py-2.5 ":" p-4 "} `}  to="/menu"><FaConciergeBell /><span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem]":" hidden"}`}>menu</span></Link>
            </div>
            <div>
                <Link className={`${
                    location.pathname === "/marketing"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-12 py-2.5 ":" p-4 "} `}  to="/marketing"><HiOutlineSpeakerphone /><span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem]":" hidden"}`}>marketing</span></Link>
            </div>
            <div>
                <Link className={`${
                    location.pathname === "/customer"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-12 py-2.5 ":" p-4 "} `}  to="/customer"><MdOutlinePerson3 /><span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem]":" hidden"}`}>customer</span></Link>
            </div>
            </div>
            <div className={`py-2 font-Poppins px-2 text-[1rem] flex  items-center justify-center  flex-col gap-1 rounded-md bg-gradient-to-tl from-[#004AAD] to-[#EAABF0] mx-3  ${isOpen?"block ":"hidden " } `}>
              <p className=" text-white  ">Upgrade to Premium to get access all Features!</p>
              <button className="px-7 py-[.2rem] rounded-3xl bg-white text-[#004AAD]">Get Pro Now!</button>

            </div>
            <div className="flex flex-col text-[1.4rem] justify-between items-center gap-1">

            <div >
                <Link className={`${
                    location.pathname === "/setting"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-12 py-2.5 ":" p-4 "} `} to="/setting"><CiSettings /> <span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem]":" hidden"}`}>setting</span></Link>
            </div>
            <div>
                <Link className={`flex items-center justify-center gap-3 text-red-500 ${isOpen ?"px-12 py-2.5 ":" p-4 "}`} to="/login"><IoLogOutOutline /> <span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem] text-red-500":" hidden"}`}>Log Out</span></Link>
            </div>
            </div>

          </div>
      </div>

    </nav>

      <Outlet />
    </>
  );
};

export default LeftNavbar;
