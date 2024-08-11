import React from "react";
import { Link } from "react-router-dom";

//images
import whatsapp from "../../assets/whatsapp.png";

//svg
import manage from "/manage.svg";
import instagram from "/instagram.svg";
import facebook from "/facebook.svg";
import googleAds from "/googleAds.svg";
import blurManage from "/blurManage.svg";
import blurInsta from "/blurInsta.svg";
import blurFacebook from "/blurFacebook.svg";
import blurgoogleAds from "/blurGoogleAds.svg";

//lottie
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Integrations: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling animation
    });
  };
  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className="lg:w-[93%] h-fit px-[2rem] py-[0.5rem] gap-10 lg:ml-[7%]">
        {/* reach out your customer */}
        <div className="w-full h-fit flex relative py-[1.5rem] px-[2.5rem] bg-[#FFCF27] rounded-md">
          <div className="font-inter text-black w-[70%]">
            <div className="font-[700] text-[2rem] leading-[2.7rem]">
              <p>Reach out your customers like never before</p>
            </div>

            <p className="font-[600] text-[1.1rem]  mt-3 tracking-wide">
              Lets SnackBAE automates your marketing on the right platform for
              you & get the best possible results.
            </p>
          </div>

          <div className="absolute lg:right-[2rem] -top-[0.4rem] md:right-[2rem] sm:right-[0.5rem]">
            <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            {/* <DotLottieReact
              src="https://lottie.host/262044b0-d5af-46ed-bf78-5b4a2c9ae2d9/drLoFDQofB.json"
              autoplay
              loop
              style={{ width: "250px" }}
            ></DotLottieReact> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-3">
          <div className="flex flex-col border-2 rounded-lg shadow-sm p-4 h-[12rem] justify-between">
            <div className="flex items-center mb-2 justify-start gap-4">
              <div className="bg-[#F2F0F0] p-3 rounded-lg">
                <img src={whatsapp} className="w-6" />
              </div>

              <div>
                <h3 className="font-semibold">WhatsApp Business Manager</h3>
                <span className="text-green-500 flex font-[600] items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>{" "}
                  Active
                </span>
              </div>
            </div>
            <div className="flex items-center w-full mt-4  text-[#7C7C7C] text-sm">
              <Link to="/manager" onClick={handleScrollToTop} className="w-3/5">
                <button className="flex items-center justify-evenly border-2 border-gray-300 rounded-lg py-[0.63rem] px-2 w-[90%] mr-2">
                  <img src={manage} />
                  <p className="font-[600] ">Manage</p>
                </button>
              </Link>
              <Link
                to="/manager/header"
                onClick={handleScrollToTop}
                className="w-full"
              >
                <button className="flex items-center justify-evenly bg-white border-2 border-gray-300 rounded-lg p-2 mr-2 w-full">
                  <img src={whatsapp} className="w-6" />
                  <p className="whitespace-nowrap font-[600]">Connect Number</p>
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col border rounded-lg shadow-sm p-4 h-[12rem] justify-between">
            <div className="flex items-center mb-2 justify-start gap-4">
              <div className="bg-[#F2F0F0] p-3 rounded-lg">
                <img src={instagram} className="w-6" />
              </div>

              <div>
                <h3 className="font-semibold">Instagram Business Manager</h3>
                <span className="text-[#FF6B26] flex font-[600] items-center">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B26] mr-1"></span>{" "}
                  Upgrade Plan
                </span>
              </div>
            </div>
            <div className="flex items-center w-full mt-4  text-[#D7D5D5] text-sm">
              <button className="flex items-center justify-evenly border border-[#D7D5D5] rounded-lg py-[0.63rem] px-2 w-3/5 mr-2">
                <img src={blurManage} />
                <p>Manage</p>
              </button>

              <button className="flex items-center justify-evenly bg-white border border-[#D7D5D5] rounded-lg p-2 mr-2 w-full">
                <img src={blurInsta} className="w-6" />
                <p className="whitespace-nowrap">Connect Instagram</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col border rounded-lg shadow-sm p-4 h-[12rem] justify-between">
            <div className="flex items-center mb-2 justify-start gap-4">
              <div className="bg-[#F2F0F0] p-3 rounded-lg">
                <img src={facebook} className="w-6" />
              </div>

              <div>
                <h3 className="font-semibold">Facebook Business Manager</h3>
                <span className="text-[#FF6B26] flex font-[600] items-center">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B26] mr-1"></span>{" "}
                  Upgrade Plan
                </span>
              </div>
            </div>
            <div className="flex items-center w-full mt-4  text-[#D7D5D5] text-sm">
              <button className="flex items-center justify-evenly border border-[#D7D5D5] rounded-lg py-[0.63rem] px-2 w-3/5 mr-2">
                <img src={blurManage} />
                <p>Manage</p>
              </button>

              <button className="flex items-center justify-evenly bg-white border border-[#D7D5D5] rounded-lg p-2 mr-2 w-full">
                <img src={blurFacebook} className="w-6" />
                <p className="whitespace-nowrap">Connect Facebook</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col border rounded-lg shadow-sm p-4 h-[12rem] justify-between">
            <div className="flex items-center mb-2 justify-start gap-4">
              <div className="bg-[#F2F0F0] p-3 rounded-lg">
                <img src={googleAds} className="w-6" />
              </div>

              <div>
                <h3 className="font-semibold">Google Ads Business Manager</h3>
                <span className="text-[#FF6B26] flex font-[600] items-center">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B26] mr-1"></span>{" "}
                  Upgrade Plan
                </span>
              </div>
            </div>
            <div className="flex items-center w-full mt-4  text-[#D7D5D5] text-sm">
              <button className="flex items-center justify-evenly border border-[#D7D5D5] rounded-lg py-[0.63rem] px-2 w-3/5 mr-2">
                <img src={blurManage} />
                <p>Manage</p>
              </button>

              <button className="flex items-center justify-evenly bg-white border border-[#D7D5D5] rounded-lg p-2 mr-2 w-full">
                <img src={blurgoogleAds} className="w-6" />
                <p className="whitespace-nowrap">Connect Google Ads</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
