import { useState } from "react";

// icons
import { GrFormCheckmark } from "react-icons/gr";

const PlansData = [
    {
        name: "Free trial",
        desc: "Kickstart your journey with our free trial without any credit card",
        price: 0,
        validity: "(15 days free trial)",
        features: [
            "Digital QR menu with 5 tables",
            "Social media integration",
            "Automated customer data collection",
            "Automated feedback collection",
            "Partial Customer insights"
        ]
    },
    {
        name: "Free trial",
        desc: "Kickstart your journey with our free trial without any credit card",
        price: 0,
        validity: "(15 days free trial)",
        features: [
            "Digital QR menu with 5 tables",
            "Social media integration",
            "Automated customer data collection",
            "Automated feedback collection",
            "Partial Customer insights"
        ]
    },
    {
        name: "Free trial",
        desc: "Kickstart your journey with our free trial without any credit card",
        price: 0,
        validity: "(15 days free trial)",
        features: [
            "Digital QR menu with 5 tables",
            "Social media integration",
            "Automated customer data collection",
            "Automated feedback collection",
            "Partial Customer insights"
        ]
    }
]

const Plans = () => {
    const [switchTab, setSwitchTab] = useState<string>("quarterly");

    return (
        <>
            <div className="w-full h-[100vh] flex flex-col items-center">
                <img src="" />
                <div className="px-[1rem] md:px-[5rem] w-full mt-20 flex flex-row flex-wrap">
                    <div className="w-full flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-[28px] font-bold">Select Plan</h1>
                            <p className="text-[1rem] font-bold text-[#64748B]">Plans that are carefully crafted to suit your business.</p>
                        </div>
                        <div className="w-fit flex flex-row rounded-[40px] border border-1 border-[#000000CC]">
                            <button
                                className={`w-fit px-[2.5rem] rounded-[40px] transition-colors duration-500 ${switchTab === "quarterly" ? "bg-[#004AAD] text-white" : "bg-white text-black"} text-[24px]`}
                                onClick={() => setSwitchTab("quarterly")}
                            >
                                Quarterly
                            </button>
                            <button
                                className={`w-fit px-[1.5rem] rounded-[40px] transition-colors duration-500 ${switchTab === "annual" ? "bg-[#004AAD] text-white" : "bg-white text-black"} text-[24px]`}
                                onClick={() => setSwitchTab("annual")}
                            >
                                Annually (save 44%)
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap px-[1rem] gap-x-[1.2rem] gap-y-[1.2rem] mt-20">
                    {PlansData.map((plan) => (
                        <div className="w-[438px] flex flex-col gap-4 shadow-2xl border rounded-3xl p-[1.5rem]">
                            <h1 className="text-[35px] text-[#1B223C] font-[500]">{plan.name}</h1>
                            <p className="text-[21px] text-[#797878]">{plan.desc}</p>
                            <p className="text-[24px] text-[#797878] border-b border-b-[#E7EBFF] pb-2"><span className="text-[40px] text-[#1B223C] font-[700]">₹{plan.price}</span> {plan.validity}</p>
                            <div className="flex flex-col gap-2 mt-2">
                                {plan.features.map((feature) => (
                                    <p className="flex flex-row items-center text-[18px]"><GrFormCheckmark className="text-3xl" />{feature}</p>
                                ))}
                            </div>
                            <button className="bg-[#004AAD] h-16 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem] mt-6">
                                Lets get started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Plans;