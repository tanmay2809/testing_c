// React import removed as it's not used in this component

import { useState } from "react";

import mobile from "../../assets/mobile.png";

const CustomiseTheme = () => {

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

                <div className="w-full h-fit flex gap-2   rounded-lg py-[1rem]  ">
                    {/* right */}
                    <div className="w-[50%] h-fit  bg-white flex  flex-col justify-center items-center gap-[3rem] pt-[2rem] rounded-lg ">

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
                            ) : (<img src={mobile} alt="mobile" className="w-[235px] aspect-auto object-cover" />)
                        }

                    </div>

                    {/* left */}

                    <div className="w-[50%] h-fit flex flex-col justify-center items-center gap-[1rem]  ">

                        <p className="w-full font-bold text-[1.3rem] text-black bg-white px-[2rem] py-2 rounded-lg items-center">Colour Theme Control</p>

                        <div className="w-full font-semibold text-[1.2rem] text-black bg-white px-[2rem] py-2 rounded-lg items-center flex flex-col gap-[.8rem]">
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

                    <div>

                    </div>





                </div>

            </div>


        </div>
    )
}

export default CustomiseTheme