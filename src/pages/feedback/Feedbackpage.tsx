
import SwitchFeedback from "../../component/Feedback/SwitchFeedback";
import Feedback from "../../component/outlet/Feedback";
const Feedbackpage = () => {

  // navbar fram
  const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };
  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className=" lg:w-[93%] h-fit px-[1.5rem] py-[1rem] flex flex-col items-center justify-center  lg:ml-[7%] bg-[#F5F9FF] ">
        <div onClick={handlefram} className="w-full  h-fit flex flex-col items-center gap-2 mt-[80px]  mb-[2rem] mx-[1.5rem]  ">

          <div className="w-full h-fit ">
            <p className="text-[1.7rem] font-bold text-[#000000]">
              Feedback Automation
            </p>
            <p className="text-[1rem] font-semibold text-[#000000] text-nowrap">
              Easily manage and automate feedback collection
            </p>
          </div>

          {/* reach out your customer */}
          <div className="w-full h-fit flex relative mt-[.5rem] py-[1.5rem] px-[2.5rem] bg-[#FFCF27] rounded-md">
            <div className="font-inter text-black w-[70%]">
              <div className="font-[700] text-[2rem] leading-[2.7rem]">
                <p>Turn Negative Feedback into Positive  </p>
                <p>Relationships!</p>
              </div>

              <p className="font-[600] text-[1.1rem] tracking-tighter mt-3">
                With our new feedback feature, you can easily send discount or apologies to your customers in just a few clicks.
              </p>
            </div>


          </div>

          {/* Track your customer feedback with real-time analytics */}

          <div className="w-full h-fit flex flex-col relative  py-[1.5rem]  rounded-md">

            <div className="w-full h-fit flex items-center justify-between">
              <p className="font-inter font-[600] text-[1.2rem]">Track your customer feedback with real-time analytics</p>
              <button>Last 30 days

              </button>
            </div>

            <div className="w-full h-fit flex  gap-3 mt-[1rem] flex-wrap">
              <div className="md:w-[31%] lg:w-[23%] bg-[#E7FFB4]  h-[200px] rounded-lg p-[1rem] flex flex-col justify-between">
                <p className="font-Roboto font-[600] text-[1.2rem]">Total Feedback</p>
                <p className="font-inter font-[600] text-[2.8rem] ">1590</p>

              </div>
              <div className="md:w-[31%] lg:w-[23%] bg-[#FFDB8F]  h-[200px] rounded-lg p-[1rem] flex flex-col justify-between">
                <p className="font-Roboto font-[600] text-[1.2rem]">Average Rating</p>
                <p className="font-inter font-[600] text-[2.8rem] ">4.6</p>

              </div>


              <div className="md:w-[100%] lg:w-[48%] bg-[#DEEDFF]  h-[200px] rounded-lg p-[1rem] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-Roboto font-[600] text-[1.2rem]">Feedback Control</p>
                    <p className=" font-[600] text-[.8rem]">Created on 15 Feb 2022</p>
                  </div>
                  <div className="flex flex-col items-end ">
                    <p className=" font-[600] text-[.9rem]">channel</p>
                    <button className=" font-[600] text-[.8rem] px-2 py-[.1rem] bg-white rounded-md"> whatsApp Utility</button>
                  </div>

                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-[#65C466] font-Roboto text-[1.1rem]">Action</p>
                    <SwitchFeedback />
                  </div>
                  <button className="text-[#585858] text-[1rem] bg-white px-2 py-1 rounded-sm">Edit Feedback settings</button>
                </div>

              </div>
              <div className="md:w-[31%] lg:w-[23%] bg-[#DFE7FF]  h-[200px] rounded-lg">

              </div>



              <div className="md:w-[100%] lg:w-[73%] bg-[#D0FFF8]  h-[200px] rounded-lg">

              </div>

            </div>

          </div>







          {/*Feedback div */}
          <Feedback />
        </div>
      </div>
    </div>
  )
}

export default Feedbackpage