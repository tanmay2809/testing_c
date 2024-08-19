import React from "react";

//swiperjs
import { Pagination, A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

//swiperjs css
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ReviewCard } from "../../constants";

//images
import snackbae from "../../assets/logo2.png";

interface FeedbackSliderProps {
  slides: ReviewCard[];
}

const FeedbackSlider: React.FC<FeedbackSliderProps> = ({ slides }) => {
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
            style={{ width: "23rem", height: "17rem" }}
          >
            <div
              className="bg-white p-4 rounded-lg max-w-md mx-auto shadow-md overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-lg font-bold">{slide.name}</p>
                  <p className="text-sm text-gray-600">{slide.phone}</p>
                </div>
                <p className="text-sm text-gray-500">{slide.date}</p>
              </div>

              {/* Feedback Content */}
              <div className="border-t border-gray-300 pt-2 mb-2">
                <p className="text-base leading-relaxed">{slide.feedback}</p>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-300 pt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                <p>Captured by </p>
                <img src={snackbae} className="w-12" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackSlider;
