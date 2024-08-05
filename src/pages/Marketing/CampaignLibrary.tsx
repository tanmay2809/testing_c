import React from "react";

//other components
import Feedback from "../../component/outlet/Feedback";
import SliderComponent from "../../component/Marketing/SliderComponent";

//swiperjs
import { slidesData, AllData } from "../../constants/index";
import { FaSearch } from "react-icons/fa";

const CampaignLibrary: React.FC = () => {
  const buttons: { name: string }[] = [
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

  // navbar fram
  const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };

  const searchCampaign = (searchTerm: string): void => {
    console.log(searchTerm);
  };
  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div
        onClick={handlefram}
        className="lg:w-[93%] h-fit px-[2rem] gap-10 lg:ml-[7%] bg-[#F1F7FF]"
      >
        <div className="font-inter bg-white">
          <div className="p-4 rounded-md">
            <div className="flex justify-between items-center text-[#0F172A]">
              <div className="relative flex items-center w-[410px]">
                <FaSearch className="relative left-7 text-gray-400" />
                <input
                  type="search"
                  onChange={(e) => searchCampaign(e.target.value)}
                  placeholder="Search templates"
                  className="w-full h-[50px] pl-10 pr-3 py-2 rounded-md border border-[#E2E8F0]"
                />
              </div>
              {/* Buttons div */}
              <div className=" flex items-center gap-3">
                {buttons.map((button, index) => (
                  <button
                    onClick={() => scrollToElement(button.name)}
                    key={index}
                    className=" w-28 text-center px-1 py-1 bg-white text-[#0F172A] rounded-md border border-[#E2E8F0] cursor-pointer"
                  >
                    {button.name}
                  </button>
                ))}
              </div>
            </div>
            {Object.entries(AllData).map(([key, value]) => (
              <div key={key} id={value.title} className="mt-4">
                <SliderComponent slides={value.slides} />
              </div>
            ))}
          </div>
        </div>

        {/* All swiper div */}
        {Object.entries(slidesData).map(([key, value]) => (
          <div
            key={key}
            id={value.title}
            className="mt-2 bg-white p-4 rounded-md"
          >
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
