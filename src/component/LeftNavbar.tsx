import { Outlet, Link ,useLocation} from "react-router-dom";
import { useState } from "react";
import Frame from "../component/Frame";


//icon
import { RiDashboardFill } from "react-icons/ri";
import { FaConciergeBell } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlinePerson3 } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { HiChevronUpDown } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";

import right from "../assets/right.png";

const LeftNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    
  };

  const [outlet, setoutlet] = useState(false);

  const handleToggle1 = () => {
    setoutlet(!outlet);
  };

  const location = useLocation();

  const data = [
    {
      name: "Foodoos",
      id:"1234567",
    },
    {
      name: "Foodoos",
      id:"1234567",
    }
   
  ];

  return (
    <>
       <nav className={` fixed bg-white z-50  mt-[70px]  h-[calc(100vh-70px)] border-r  shadow-xl shadow-[#00000026] ${isOpen ? "w-[15%] duration-100" : "w-[7%] duration-100"}`}>
      <div className="relative w-full  flex flex-col justify-evenly items-center ">
          <img onClick={handleToggle}  className={`absolute top-5 size-14 cursor-pointer -right-7 ${isOpen ?" rotate-180":" rotate-0"}`} src={right} alt="" />
          <div className={`w-[80%] h-[70px] flex items-center justify-evenly p-2  border border-[#000000] mt-4 rounded-md ${isOpen ?"block":"hidden"}`}>
            <div className="font-inter ">
                <p className="text-[#4E4E4E] text-[.8rem]">Your Outlet</p>
                <p className="text-[#64748B] text-[.9rem]">Foodoos</p>
            </div>
            <HiChevronUpDown className="size-6" onClick={handleToggle1} />
          </div>

          <div className={`absolute top-[5.55rem] border border-[#757474]    w-[80%] h-fit rounded-xl bg-white opacity-100 ${outlet ?"block":"hidden"}  ${isOpen ?"block":"hidden"}`}>
            {
              data.map((item,index) => (
                <div key={index} className="flex flex-col   justify-between w-full  border-b border-[#706e6e] ">
                  <div className="px-4 p-1 ">
                  <p className="text-[#64748B] text-[.9rem]">{item.name}</p>
                  <p className="text-[#4E4E4E] text-[.8rem]">Id: {item.id}</p>
                  </div>
                   
                </div>
              ))
            }
            <div className="flex items-center justify-cente gap-2 px-3 font-semibold text-[.9rem] py-1.5 bg-slate-200 rounded-xl rounded-t-none">
             <FiPlus />
              <p>Add Outlet</p>
            </div>
          </div>

          

          <div className={`flex flex-col justify-between    text-[#64748B] text-[1.1rem] ${isOpen ? "gap-8 mt-6":"gap-20 mt-28"}`}>
            <div className="flex flex-col  gap-1 ">
            <div>
              <Link  className={`${
                    location.pathname === "/dashboard"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-5 mx-3 py-2.5 ":" p-4 "} `} to="/dashboard"><RiDashboardFill/><span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem]":" hidden"}`}>dashboard </span></Link>
            </div>
            <div >
              <Link className={`${
                    location.pathname === "/menu"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-5 mx-3 py-2.5  ":" p-4 "} `}  to="/menu"><FaConciergeBell /><span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem]":" hidden"}`}>menu <span className="text-slate-100">........</span></span></Link>
            </div>
            <div>
                <Link className={`${
                    location.pathname === "/marketing"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-5 mx-3 py-2.5  ":" p-4 "} `}  to="/marketing"><HiOutlineSpeakerphone /><span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem]":" hidden"}`}>marketing   </span></Link>
            </div>
            <div>
                <Link className={`${
                    location.pathname === "/customer"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-5 mx-3 py-2.5 ":" p-4 "} `}  to="/customer"><MdOutlinePerson3 /><span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem]":" hidden"}`}>customer   </span></Link>
            </div>
            </div>
            <div className={`py-3 font-semibold Poppins px-2 text-[.9rem] flex  items-center justify-center  flex-col gap-1 rounded-md bg-gradient-to-tl from-[#004AAD] to-[#EAABF0] mx-3  ${isOpen?"block ":"hidden " } `}>
              <p className=" text-white  text-[.7rem] mx-3 ">Upgrade to Premium to access all Features!</p>
              <Link to="/plans" className="px-6 py-[.1rem] rounded-2xl bg-white text-[#004AAD]">Get Pro Now!</Link>

            </div>
            <div className="flex flex-col text-[1.4rem] justify-between  ">

            <div >
                <Link className={`${
                    location.pathname === "/setting"
                      ? "text-[#004AAD] bg-slate-100  "
                      : "text-[#64748B]"
                  } flex gap-2  items-center hover:text-[#004AAD] rounded-xl ${isOpen ?"px-5 mx-3 py-2.5  ":" p-4 "} `} to="/setting"><CiSettings /> <span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem]":" hidden"}`}>setting  </span></Link>
            </div>
            <div>
                <Link className={`flex items-center  gap-3 text-red-500 ${isOpen ?"px-5 mx-3 py-2.5  ":" p-4 "}`} to="/login"><IoLogOutOutline /> <span onClick={handleToggle} className={` ${isOpen ? "block text-[.9rem] text-red-500":" hidden"}`}>Log Out</span></Link>
            </div>
            </div>

          </div>
      </div>

      </nav>
      <Frame/>

      <Outlet />
    </>
  );
};

export default LeftNavbar;
