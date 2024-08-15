import React from "react";

export interface MessageData {
  time: string;
  users: any[]; // Use appropriate type instead of 'any[]' if possible
  messageData: {
    messaging_product: string;
    type: string;
    template: {
      name: string;
      language: {
        code: string;
      };
      components: {
        type: string;
        parameters: {
          type: string;
          text: string;
        }[];
      }[];
    };
  };
}
export interface ContentData {
  header?: string;
  body?: string;
  footer?: string;
}
interface CampaignContent {
  msData: MessageData | null;
  coData: ContentData | null;
}

//swiperjs
import { Pagination, A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

//swiperjs css
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//icons
import { FaBell } from "react-icons/fa";
import { Slide } from "../../constants/index";

//images
import whatsapp from "../../assets/whatsapp.png";
import image1 from "../../assets/Group 1171278507.png";
import { useNavigate } from "react-router-dom";

import {
  order_action_required_1,
  order_action_required_2,
  content_2,
  content_1,
} from "./data";

interface SliderComponentProps {
  slides: Slide[];
}

const SliderComponent: React.FC<SliderComponentProps> = ({ slides }) => {
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling animation
    });
  };

  const sendToCampaign = (type: string, index: number) => {
    let campaignContent: CampaignContent[] = [{ msData: null, coData: null }];

    switch (index + 1) {
      case 1:
        campaignContent[0].msData = order_action_required_1;
        campaignContent[0].coData = content_1;
        break;

      // rest of the cases
      case 2:
        campaignContent[0].msData = order_action_required_2;
        campaignContent[0].coData = content_2;
        break;
      // Add more cases if you have more content
      default:
        break;
    }

    // Store the content in local storage
    console.log(campaignContent);
    sessionStorage.setItem("campaignContent", JSON.stringify(campaignContent));
    navigate(`/campaign/${type}`);
    handleScrollToTop();
  };
  return (
    <div className="mx-auto w-full ">
      <Swiper
        modules={[Pagination, A11y, Mousewheel]}
        spaceBetween={10}
        slidesPerView="auto"
        mousewheel={{ forceToAxis: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "12rem", height: "16.5rem" }}
            onClick={() => sendToCampaign(slide.type, index)}
            className="cursor-pointer"
          >
            <div className="relative h-full">
              <img
                src={image1}
                // src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-0 left-0 px-4 py-3 w-full">
                <p className="text-white font-semibold text-lg">
                  {slide.title}
                </p>
              </div>
              <div className="flex gap-2 absolute bottom-0 left-0 px-4 py-3">
                <div className="bg-white rounded-full p-3">
                  <FaBell />
                </div>
                <button className="bg-[#F1F1F1] p-2 rounded-full">
                  <img src={whatsapp} className="w-6 h-auto" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
