//icons
import { FiPlus } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";


import { useState } from "react";

import mobile from "../../assets/mobile.png";
import mobile2 from "../../assets/Group 1171278587.png";

import zomato from "../../assets/Rectangle 3463841.png";
import swiggy1 from "../../assets/Rectangle 3463840 (1).png"


import swiggy from "../../assets/Rectangle 3463840.png";
import SwitchCustomTheme from "../../component/setting/SwitchCustomTheme";



const CustomiseTheme = () => {
   

    const delivery = [{
        icon: zomato,
        Link: "www.zomato.com/foodoos/Book Now.."
    }, {
        icon: swiggy1,
        Link: "www.Swiggydineout.com/foodoos/Book..."
    },
    {
        icon: swiggy1,
        Link: "www.Swiggydineout.com/foodoos/Book..."
    }]

    const [adddelivery, setadddelivery] = useState<boolean>(false);

    // navbar frame
    const handleFrame = () => {
        document.getElementById("frame")!.style.display = "none";
    };

    const [switchTab, setSwitchTab] = useState<string>("Dine-in Preview");
    return (
        <div
            onClick={handleFrame}
            className="w-full h-fit relative md:mb-[80px] lg:mb-0 "
        >
            {/* Main Content Area */}
            <div className="bg-[#F1F7FF] lg:w-[93%] h-fit px-[1rem] py-[1.5rem] flex flex-col items-center justify-center gap- lg:ml-[7%]">
                <div className="w-full flex flex-row justify-between mt-[60px] bg-white px-[1rem] rounded-lg py-[.8rem]">
                    <div className="flex flex-col">
                        <h1 className="text-[28px] font-semibold ">Customise your menu theme</h1>
                        <p className="text-[18px] font-[400]">Customise according to your brand needs</p>
                    </div>
                    <div className="flex items-center justify-center gap-5">
                        <button className="px-[2rem] py-2 bg-[#FDF1F1] text-[#B71734] font-[600] text-[1rem] rounded-md">Cancel</button>
                        <button className="px-[2.6rem] py-2 bg-[#004AAD] text-white font-[600] text-[1rem] rounded-md">Save</button>

                    </div>
                </div>

                <div className="w-full h-fit flex gap-4   rounded-lg py-[1rem]  ">
                    {/* right */}
                    <div className="w-[50%] h-fit pb-[3rem] bg-white flex  flex-col justify-center items-center gap-[3rem] pt-[2rem] rounded-lg ">

                        <div className="w-fit h-fit flex flex-row rounded-[2.5rem] border border-1 border-[#000000CC] ">
                            <button
                                className={`w-fit px-[1.5rem] py-2 font-[500] rounded-[2.5rem] transition-colors duration-500 ${switchTab === "Dine-in Preview"
                                    ? "bg-[#004AAD] text-white"
                                    : "bg-white text-black"
                                    } text-[1.25rem]`}
                                onClick={() => setSwitchTab("Dine-in Preview")}
                            >
                                Dine-in Preview
                            </button>
                            <button
                                className={`w-fit px-[1.5rem] font-[500] rounded-[2.5rem] transition-colors duration-500 ${switchTab === "Public Profile Preview"
                                    ? "bg-[#004AAD] text-white"
                                    : "bg-white text-black"
                                    } text-[1.25rem]`}
                                onClick={() => setSwitchTab("Public Profile Preview")}
                            >
                                Public Profile Preview
                            </button>

                        </div>

                        {
                            switchTab === "Dine-in Preview" ? (
                                <img src={mobile} alt="mobile" className="w-[230px]  aspect-auto object-cover" />
                            ) : (<img src={mobile2} alt="mobile" className="w-[235px] aspect-auto object-cover" />)
                        }

                    </div>

                    {/* left */}

                    <div className="w-[50%] h-fit flex flex-col justify-center items-center gap-[1rem]  ">

                        {/* colour theme */}

                        <div className="flex flex-col gap-[.5rem] w-full h-fit">
                            <p className="w-full font-bold text-[1.3rem] text-black bg-white px-[2rem] py-3 rounded-t-lg items-center">Colour Theme Control</p>

                            <div className="w-full font-semibold text-[1.2rem] text-black bg-white px-[2rem] py-3 rounded-b-lg items-center flex flex-col gap-[.8rem]">
                                <div className=" flex item items-center justify-between w-full">
                                    <p>Primary Brand Colour</p>
                                    <div className="flex items-center gap-[1rem]">
                                        <input type="color" className="w-[100px] h-[40px]  border rounded-xl" />
                                    </div>
                                </div>
                                <div className=" flex item items-center justify-between w-full">
                                    <p>Secondary Colour</p>
                                    <div className="flex items-center gap-[1rem]">
                                        <input type="color" className="w-[100px] h-[40px]  border rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* booking links */}

                        <div className="flex flex-col gap-[.5rem] w-full h-fit">
                            <div className="w-full font-bold text-[1.3rem] text-black bg-white px-[2rem] py-3 rounded-t-lg items-center flex justify-between">
                                <p>Booking Links</p>
                                <button className="text-[#004AAD] font-semibold text-[1.3rem] flex items-center gap-3"> <FiPlus className="font-bold size-8" /> Add New</button>
                            </div>

                            <div className="w-full  bg-white px-[2rem] py-3 rounded-b-lg items-center flex  gap-[1rem]">
                                <img src={swiggy} alt="swiggy" className="w-[60px] aspect-auto object-cover" />
                                <p className="w-[70%] px-4 rounded-lg py-2 border border-black font-[400] text-black text-[1rem]">www.zomato.com/foodoos/Book Now</p>
                                <div className="flex gap-4 items-center ">
                                    <SwitchCustomTheme />
                                    <MdDeleteForever className="text-[#004AAD] size-8" />
                                </div>


                            </div>

                        </div>

                        {/* Delivery Links */}

                        <div className="flex flex-col gap-[.5rem] w-full h-fit">
                            <div className="w-full font-bold text-[1.3rem] text-black bg-white px-[2rem] py-3 rounded-t-lg items-center flex justify-between">
                                <p>Delivery Links</p>
                                <button className="text-[#004AAD] font-semibold text-[1.3rem] flex items-center gap-3"> <FiPlus className="font-bold size-8" /> Add New</button>
                            </div>
                            {
                                delivery.map((item, index) => (
                                    <div key={index} className="w-full  bg-white px-[2rem] py-3 rounded-b-lg items-center flex  gap-[1rem]">
                                        <img src={item.icon} alt="swiggy" className="w-[60px] aspect-auto object-cover" />
                                        <p className="w-[70%] h-[40px] px-4 rounded-lg py-2 border border-black font-[400] text-black text-[1rem]">{item.Link}</p>
                                        <div className="flex gap-4 items-center ">
                                            <SwitchCustomTheme />
                                            <MdDeleteForever className="text-[#004AAD] size-8" />
                                        </div>

                                    </div>
                                ))
                            }



                        </div>




                    </div>

                    <div>

                    </div>





                </div>

            </div>

            {
                adddelivery && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white w-[40%] h-[60%] rounded-lg py-6">
                            <div className="flex justify-between items-center text-[#0F172A] font-Roboto font-[500] text-[1.8rem] px-6 border-b border-b-[#0F172A] pb-3">
                                <p>Add Delivery Link</p>
                                <RxCrossCircled onClick={() => setadddelivery(false)} className="cursor-pointer" />
                            </div>

                            
                        </div>

                    </div>
                )

            }





        </div>
    )
}

export default CustomiseTheme