
//icon
import { BiSolidError } from "react-icons/bi";
import { GiChessKing } from "react-icons/gi";
import { IoPeopleSharp } from "react-icons/io5";



//lottie
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import TableComponent from "../../component/dashboard/TableComponent";
const Table = () => {
  return (
    <div className="w-full h-fit relative ">
     <div className=" w-[93%] h-fit flex items-center justify-center ml-[7%]  ">
        <div className="w-full  h-fit flex flex-col items-center gap-2 mt-[80px] mx-[1.5rem]  ">
            
            <div className="w-full h-fit flex items-center justify-between bg-[#D7E8FF] font-inter font-[400] text-[.9rem] text-black px-[1rem] py-[.5rem]  rounded-xl ">
                <div className='flex items-center gap-2'>
                <BiSolidError  className='size-5 text-[#004AADC9] ' />
                <p>Your are using a free trial ! switch to Premium for maximum utilisation</p>
                </div>
                <button className='px-[.9rem] py-[.3rem] bg-white rounded-lg'>Upgrade Now</button>
            </div>

            <div className="w-full h-fit flex items-center justify-between py-1 ">
                <div>
                    <p className="font-Roboto font-[600] text-[1.6rem] text-black">Manage Tables</p>
                    <p className="font-inter font-[400] text-[1rem] text-[#7F7E7E]">Total Table count : <span className="font-[500] text-[#004AAD]">10 Tables</span> </p>
                </div>
                <div className="relative mr-[1rem]">
                    <GiChessKing className=" absolute text-white bg-black -right-2 -top-2 size-7 p-[.1rem] border-2 rounded-md " />
                    <button className="bg-[#004AAD] text-white border border-[#000000CC] rounded-lg px-[2rem] py-[.5rem] ">Add Table</button>

                </div>
            </div>

             {/* reach out your customer */}
            <div className="w-full h-fit flex relative py-[1.5rem] px-[2.5rem] bg-[#FFCF27] rounded-md">
                <div className="font-inter text-black w-[55%]">
                <div className="font-[700] text-[2rem] leading-[2.7rem]">
                <p>Reach out your customers like </p>
                <p>never before</p>
                </div>
                
                <p className="font-[600] text-[1.1rem] tracking-tighter mt-3">Explore our pre-made Templates tailored for eateries</p>
                </div>

                <div className=" absolute right-[5rem] -top-[.1rem] rotate-[13deg] ">
                <DotLottieReact
                    src="https://lottie.host/d4be8719-9a6c-4ad1-8cb8-46b28c108c50/b2zAzWhAdV.json"
                    autoplay
                    loop
                    style={{ width: "300px", height: "200px", }}
                />
                </div>
            </div>

            {/* table */}
            <TableComponent />
           
          
        </div>
    </div>
    </div>
  )
}

export default Table