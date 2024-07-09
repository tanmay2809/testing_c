import Navbar from "../component/Navbar"
import { useState } from "react";

//icon
import { FiPlus } from "react-icons/fi";

const Menu = () => {


  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="w-full h-fit relative ">
        <Navbar />
        <div className=" w-[93%] h-fit flex items-center justify-center ml-[7%] mt-2 ">
                <div className="w-full h-fit flex ">
                  {/* left div */}
                  <div className={` flex flex-col h-fit ${isOpen ? "w-[80]":"w-full"}`}>
                    {/* top */}
                    <div className="w-full h-fit flex flex-co px-10 py-5  ">
                        <div className="w-full h-fit flex  items-center justify-between">
                          <div className="w-[50%]">
                            <p className="text-[1.7rem] font-bold text-[#000000]">Menu</p>
                            <p className="text-[1rem] font-semibold text-[#000000] text-nowrap">Manage your menu item here</p>
                          </div>
                          <div className="flex w-[50%]  h-fit  items-center justify-end gap-5 font-semibold text-[#004AAD]">
                            <button onClick={handleToggle} className="px-5 py-2.5 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap "><FiPlus />Sub-Category</button>
                            <button className="px-5 py-2.5 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap "><FiPlus />Add item</button>
                          </div>

                        </div>
                    </div>
                    {/* bottom */}
                    <div>

                    </div>

                  </div>


                  {/* right div */}
                  <div>

                  </div>
                </div>
        </div>
    </div>
  )
}

export default Menu