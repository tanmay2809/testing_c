import React, { useState } from "react";

//svg
import announcement from "/announcement.svg";
import messages from "/messages.svg";
import shop from "/shop.svg";
import shield from "/shield.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ConnectNumber: React.FC = () => {
  const [ensureReqOpen, setEnsureReqOpen] = useState<boolean>(false);
  const [readCondMain, setReadCondMain] = useState<boolean>(false);
  const [verifyMeta, setVerifyMeta] = useState<boolean>(false);
  const [readCondEnsureReq, setReadCondEnsureReq] = useState<boolean>(false);
  const [gstChecked, setGstChecked] = useState<boolean>(false);
  const [websiteChecked, setWebsiteChecked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleGstChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGstChecked(event.target.checked);
    if (event.target.checked) setWebsiteChecked(false); // Uncheck the other checkbox
  };

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteChecked(event.target.checked);
    if (event.target.checked) setGstChecked(false); // Uncheck the other checkbox
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChangeMain = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReadCondMain(event.target.checked);
  };
  const handleCheckboxChangeEnsureReq = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReadCondEnsureReq(event.target.checked);
  };

  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className="lg:w-[93%]  lg:px-[2rem] py-[1rem] gap-10 lg:ml-[7%] h-[100vh]">
        <div className="w-full flex flex-row justify-between mt-[60px] font-inter h-fit">
          <div className="flex px-8 md:px-3 w-full rounded-md ">
            {/* Left section */}
            <div className="lg:w-[45%] w-full p-4 flex flex-col justify-evenly items-center h-[33rem]">
              <div>
                <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                <DotLottieReact
                  src="https://lottie.host/47db11f3-776f-42b8-a6c5-9b966e9941cd/rDXZ4m4bpJ.json"
                  autoplay
                  loop
                  style={{ width: "300px", height: "200px" }}
                ></DotLottieReact>
              </div>
              <h2 className="text-xl font-semibold mt-4 w-full text-center">
                WHY CONNECT YOUR OWN NUMBER?
              </h2>
              <ul className=" space-y-2 flex flex-col justify-evenly h-1/2">
                <li className="flex items-center justify-center gap-14">
                  <img src={messages} />
                  <span className="w-64">
                    Respond to unlimited customer initiated conversations with
                    auto replies & chatflows
                  </span>
                </li>
                <li className="flex items-center justify-center gap-14">
                  <img src={announcement} />
                  <span className="w-64">
                    Start sending bulk WhatsApp Campaigns to your customers{" "}
                  </span>
                </li>
                <li className="flex items-center justify-center gap-14">
                  <img src={shop} />
                  <span className="w-64">
                    Create & connect your menu and delivery links to your
                    WhatsApp Business Number
                  </span>
                </li>
              </ul>
            </div>
            {/* Right section */}
            <div className="lg:w-[55%] bg-[#F1F7FF] py-4 px-12 rounded-md h-fit min-h-[33rem] flex flex-col justify-evenly">
              <h2 className="text-lg font-semibold w-full text-center mb-2">
                Connect a Number for your WhatsApp Business API Account
              </h2>
              <div
                className="bg-white p-4 rounded-lg text-sm h-[22rem] overflow-y-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div>
                  <h3 className="text-base font-semibold flex justify-start gap-6">
                    <span>01 </span> Before using a number which is already on
                    WhatsApp
                  </h3>
                  <ul className="list-disc list-inside mt-1 space-y-1 ml-12">
                    <li className="-indent-5">
                      You will have to delete the WhatsApp account on the
                      number.
                    </li>
                    <li className="-indent-5">
                      You can't use the number on WhatsApp Personal / Business
                      apps while you use the number with Snackbae.
                    </li>
                    <li className="-indent-5">
                      Due to WhatsApp’s rules, going back to WhatsApp apps from
                      Snackbae is a time taking process & not guaranteed
                    </li>
                    <li className="-indent-5">
                      Old chats on your number’s WhatsApp account will get
                      deleted and won’t show up on Snackbae.
                    </li>
                    <li className="-indent-5">
                      Hence, we recommend using a new number for your WhatsApp
                      Business API account, unless you are absolutely confident
                      of using your current WhatsApp number.
                    </li>
                  </ul>
                </div>
                <div className="mt-2">
                  <h3 className="text-base font-semibold flex justify-start gap-6">
                    <span>02</span> WhatsApp Business API vs Normal WhatsApp
                  </h3>
                  <p className="ml-11 mt-1">
                    Read below to know what all can be done in WhatsApp API but
                    not in Normal WhatsApp & vice versa.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {/* WhatsApp API column */}
                  <div className="border rounded-lg  border-black">
                    <div className="flex items-center flex-col  border-b border-black p-4">
                      <span>WhatsApp API ✅</span>
                      <span>Normal WhatsApp ❌</span>
                    </div>
                    <ul className="list-disc list-inside px-4 ml-5 py-4">
                      <li className="-indent-5">Send bulk campaigns</li>
                      <li className="-indent-5">Send automated campaigns</li>
                      <li className="-indent-5">
                        Target customers, add fields for customers
                      </li>
                      <li className="-indent-5">
                        Send auto-replies and build catelogues
                      </li>
                    </ul>
                  </div>
                  {/* Normal WhatsApp column */}
                  <div className="border rounded-lg  border-black">
                    <div className="flex items-center flex-col  border-b border-black p-4">
                      <span>Normal WhatsApp ✅</span>
                      <span>WhatsApp API ❌</span>
                    </div>
                    <ul className="list-disc list-inside px-4 ml-5 py-4">
                      <li className="-indent-5">
                        Message a customer 24 hours after the customer’s last
                        reply without using an Approved Template
                      </li>
                      <li className="-indent-5">Be part of WhatsApp groups</li>
                      <li className="-indent-5">
                        Can put up WhatsApp statuses
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-base font-semibold flex justify-start gap-6">
                    <span>03</span> Keep the following ready before connecting
                    the number
                  </h3>
                  <ul className="list-disc list-inside ml-11 space-y-1">
                    <li className="-indent-5">
                      Access to your Facebook Business Manager
                    </li>
                    <li className="-indent-5">
                      Your company legal name and address
                    </li>
                    <li className="-indent-5">
                      A phone number which you will use for your WhatsApp
                      Business API account and can recieve an OTP on.
                    </li>
                    <li className="-indent-5">
                      An active website of your business.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <input
                  checked={readCondMain}
                  onChange={handleCheckboxChangeMain}
                  type="checkbox"
                  className="mr-2 w-5 h-8"
                />
                <label className="text-sm">
                  I have read & understood all the above points
                </label>
              </div>
              <button
                onClick={() => {
                  if (readCondMain) {
                    setEnsureReqOpen(true);
                    setReadCondMain(false);
                  }
                }}
                className="mt-2 w-full bg-[#004AAD] text-white py-2 rounded-md"
              >
                Continue
              </button>
              <div className="mt-2 text-center text-[#004AAD]">
                <p className="font-semibold ">Need help? Contact us</p>
              </div>
            </div>
          </div>

          {ensureReqOpen && (
            <div className="h-full fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50">
              <div className="bg-white p-8 rounded-md shadow-md w-[36rem]">
                <h2 className="text-lg font-semibold text-center mb-4">
                  Before proceeding, please ensure you have the following:
                </h2>
                <div className="bg-[#F1F7FF] p-4 rounded-md mb-4">
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li className="-indent-5">
                      A phone number that you will use for your WhatsApp
                      Business API Account and can receive an OTP on.
                    </li>
                    <li className="-indent-5">
                      Access to your Facebook Business Manager.
                    </li>
                    <li className="-indent-5">
                      Your company's legal name and address.
                    </li>
                    <li className="-indent-5">
                      An active website for your business or the GST
                      certificate.
                    </li>
                  </ul>
                </div>
                <div className="flex items-center mb-4 justify-center">
                  <input
                    checked={readCondEnsureReq}
                    onChange={handleCheckboxChangeEnsureReq}
                    type="checkbox"
                    id="agreement"
                    className="mr-2 w-5 h-5"
                  />
                  <label htmlFor="agreement" className="text-sm">
                    I have read & understood all the above points
                  </label>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      if (readCondEnsureReq) {
                        setVerifyMeta(true);
                        setReadCondEnsureReq(false);
                      }
                    }}
                    className="w-full bg-[#004AAD] text-white py-2 rounded-md"
                  >
                    Continue
                  </button>
                  <button
                    className="w-full bg-transparent text-[#004AAD]  py-2 rounded-md"
                    onClick={() => setEnsureReqOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {verifyMeta && (
            <div className="h-full fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50">
              <div className="bg-white px-10  py-6 rounded-lg shadow-lg w-[45rem] h-fit">
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => {
                      setVerifyMeta(false);
                      setEnsureReqOpen(false);
                    }}
                    className=" text-white text-2xl bg-black rounded-full w-8 flex items-center justify-center font-extrabold"
                  >
                    &times;
                  </button>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <img src={shield} />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-center mb-6">
                  Verify Your Business on Meta
                </h2>
                <div className="bg-[#F6F6F6] border border-[#4F4F4F] rounded-lg p-6">
                  <p className=" mb-4 text-[#737373] text-sm font-medium">
                    You can allow Meta to verify your business by providing a
                    functional website or by uploading a business document.
                  </p>
                  <p className="text-black font-medium mb-6 text-sm">
                    Please select one of the options below to continue
                  </p>
                  <div className="flex justify-start items-center mb-4 font-medium text-sm">
                    <input
                      type="checkbox"
                      checked={gstChecked}
                      onChange={handleGstChange}
                      className="mr-2 w-5 h-5"
                    />
                    <label className="mr-4">GST Certificate</label>
                    <input
                      type="checkbox"
                      checked={websiteChecked}
                      onChange={handleWebsiteChange}
                      className="mr-2 w-5 h-5"
                    />
                    <label>Website</label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter GST Number/Website URL"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mb-6 bg-[#F6F6F6] text-sm"
                  />
                  <button className="w-full py-2 bg-[#004AAD] text-white font-semibold rounded">
                    Continue with Facebook
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectNumber;
