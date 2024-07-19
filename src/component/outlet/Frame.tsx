import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { IoLogoWhatsapp } from "react-icons/io";

const frame = () => {
 
  const handlefram =()=>{
    document.getElementById("frame")!.style.display = "none";
  }

  return (
    <div> {/* frame */}
    <div
      id="frame"
      className="hidden fixed right-6 z-[900] sm:w-[23%]   w-[60%] bg-white  h-fit mt-[70px] rounded-lg sm:px-[30px] px-[15px] py-2 border-b shadow-lg border-[#D1C8C899]"
    >

      <div className="flex  flex-col   p-1 border-b border-[#00000080]">
         <p className="text-[1.15rem] font-bold text-nowrap">
         Foodoos - Salt Lake
            </p>

        
        <Link to="/setting" onClick={handlefram} className='flex  items-center text-[1.1rem] justify-start   text-[#64748B]'>
          <CiSettings className="text-[1.2rem]" />
          <button
            
            className="px-2 py-1    border-[#EBEBEB]    "
          >
            Manage Setting
          </button>
        </Link>


      </div>
      <div className="flex flex-col p-2 border-b gap-1 border-[#aca9a9] text-[#64748B] ">

        <Link onClick={handlefram}
          to="https://www.snackbae.in/termsCondition"
          className="px-2  text-[1.1rem]  flex items-center justify-start  "
        >
          Terms & condition
        </Link>
        <Link onClick={handlefram}
          to="https://www.snackbae.in/privacyPolicy"
          className="px-2  text-[1.1rem]   flex items-center justify-start  "
        >
          Privacy Policy
        </Link>
        
      </div>
      <div className="flex flex-col p-2 border-b gap-1 border-[#aca9a9] text-[#64748B] ">

        <Link
          to="/plans" onClick={handlefram}
          className="px-2  text-[1.1rem]  flex items-center justify-start  "
        >
          Book a demo
        </Link>
        <Link
          to="/plans" onClick={handlefram}
          className="px-2  text-[1.1rem]   flex items-center justify-start  "
        >
          Pricing
        </Link>
        
      </div>
      <div onClick={handlefram} className="flex cursor-pointer px-2  text-[1.1rem]  gap-3 items-center text-[#64748B] justify-start p-2 ">
      <IoLogoWhatsapp className="text-green-500 size-6" />
        <p className="font-semibold">Contact Us</p>
      </div>

    </div></div>
  )
}

export default frame