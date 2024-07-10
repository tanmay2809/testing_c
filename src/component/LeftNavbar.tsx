import { Outlet, Link } from "react-router-dom";
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

  return (
    <>
      <nav
        className={` fixed bg-white z-50  mt-[70px]  h-[calc(100vh-70px)] border-r  shadow-xl shadow-[#00000026] ${
          isOpen ? "w-[15%] duration-100" : "w-[7%] duration-100"
        }`}
      >
        <div className="relative w-full  flex justify-center items-center ">
          <img
            onClick={handleToggle}
            className={`absolute top-2 size-14 cursor-pointer -right-7 ${
              isOpen ? " rotate-180" : " rotate-0"
            }`}
            src={right}
            alt=""
          />

          <ul className="flex flex-col justify-between items-center gap-28 mt-32 text-[#64748B] text-[1.1rem]">
            <div className="flex flex-col  gap-6">
              <li>
                <Link
                  className="flex gap-2 items-center hover:text-[#004AAD]"
                  to="/dashboard"
                >
                  <RiDashboardFill />
                  <span
                    onClick={handleToggle}
                    className={` ${isOpen ? "block text-[.9rem]" : " hidden"}`}
                  >
                    dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2  items-center hover:text-[#004AAD] "
                  to="/menu"
                >
                  <FaConciergeBell />
                  <span
                    onClick={handleToggle}
                    className={` ${isOpen ? "block text-[0.9rem]" : " hidden"}`}
                  >
                    menu
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 items-center hover:text-[#004AAD]"
                  to="/marketing"
                >
                  <HiOutlineSpeakerphone />
                  <span
                    onClick={handleToggle}
                    className={` ${isOpen ? "block text-[0.9rem]" : " hidden"}`}
                  >
                    marketing
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 items-center hover:text-[#004AAD]"
                  to="/customer"
                >
                  <MdOutlinePerson3 />
                  <span
                    onClick={handleToggle}
                    className={` ${isOpen ? "block text-[0.9rem]" : " hidden"}`}
                  >
                    customer
                  </span>
                </Link>
              </li>
            </div>
            <div className="flex flex-col justify-between items-center gap-6">
              <li>
                <Link
                  className="flex items-center justify-center gap-2 hover:text-[#004AAD]"
                  to="/settings"
                >
                  <CiSettings />{" "}
                  <span
                    onClick={handleToggle}
                    className={` ${isOpen ? "block text-[0.9rem]" : " hidden"}`}
                  >
                    setting
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-center gap-2 text-red-500"
                  to="/login"
                >
                  <IoLogOutOutline />{" "}
                  <span
                    onClick={handleToggle}
                    className={` ${
                      isOpen ? "block text-[0.9rem] text-red-500" : " hidden"
                    }`}
                  >
                    Log Out
                  </span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default LeftNavbar;
