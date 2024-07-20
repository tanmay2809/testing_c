import React from "react";

//other components
import Feedback from "../../component/outlet/Feedback";
import SliderComponent from "../../component/Marketing/SliderComponent";

//swiperjs
import { slidesData } from "../../constants/index";

//lottie
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CampaignLibrary: React.FC = () => {
  const buttons: { name: string }[] = [
    { name: "All" },
    { name: "Utility" },
    { name: "Birthdays" },
    { name: "Anniversaries" },
    { name: "Events" },
  ];

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    const additionalOffset = 80;
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - additionalOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else {
      console.warn(`Element with ID "${id}" not found.`);
    }
  };

  return (
    <div className="w-full h-fit relative">
      <div className="w-[93%] h-fit px-[2rem] py-[1rem] gap-10 ml-[7%]">
        <div className="font-inter">
          {/* Top yellow box */}
          <div className="w-full h-[12.5rem] relative flex justify-between bg-[#FFCF27] py-3 px-6 rounded-lg -mt-2">
            <div className="w-1/2 h-full flex flex-col justify-center">
              <h1 className="text-3xl font-bold">
                Reach out to your customers like never before
              </h1>
              <p className="mt-2 text-lg">
                Explore our pre-made Templates tailored for eateries
              </p>
            </div>
            <DotLottieReact
              className="relative -left-20 rotate-12 w-auto h-80 -top-[3.5rem]"
              src="https://lottie.host/d4be8719-9a6c-4ad1-8cb8-46b28c108c50/b2zAzWhAdV.json"
              loop
              autoplay
              speed={1}
            />
          </div>
          {/* Buttons div */}
          <div className="mt-6 flex items-center gap-3">
            {buttons.map((button, index) => (
              <button
                onClick={() => scrollToElement(button.name)}
                key={index}
                className=" w-28 text-center px-1 py-1 bg-[#F1F7FF] text-[#004AAD] rounded-md border border-gray-200 shadow-md shadow-slate-300 cursor-pointer"
              >
                {button.name}
              </button>
            ))}
          </div>
        </div>

        {/* All swiper div */}
        {Object.entries(slidesData).map(([key, value]) => (
          <div key={key} id={value.title} className="mt-6">
            <h2 className="text-2xl font-bold mb-4">{value.title}</h2>
            <SliderComponent slides={value.slides} />
          </div>
        ))}

        {/* Feedback div */}
        <Feedback />
      </div>
    </div>
  );
};

export default CampaignLibrary;
