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
      <div className="lg:w-[93%] h-fit px-[2rem] py-[1rem] gap-10 lg:ml-[7%]">
        <div className="font-inter">
          {/* reach out your customer */}
          <div className="w-full h-fit flex relative mt-[.5rem] py-[1.5rem] px-[2.5rem] bg-[#FFCF27] rounded-md">
            <div className="font-inter text-black w-[55%]">
              <div className="font-[700] text-[2rem] leading-[2.7rem]">
                <p>Reach out your customers like </p>
                <p>never before</p>
              </div>

              <p className="font-[600] text-[1.1rem] tracking-tighter mt-3">
                Explore our pre-made Templates tailored for eateries
              </p>
            </div>

            <div className=" absolute lg:right-[5rem] -top-[.1rem] rotate-[13deg] md:right-[2rem]  sm:right-[0.5rem]">
              <DotLottieReact
                src="https://lottie.host/d4be8719-9a6c-4ad1-8cb8-46b28c108c50/b2zAzWhAdV.json"
                autoplay
                loop
                style={{ width: "300px", height: "200px" }}
              />
            </div>
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
