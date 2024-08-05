import React, { useState } from "react";

//svg
import tag from "/tag.svg";
import location from "/location.svg";
import mail from "/mail.svg";
import globe from "/globe.svg";
import shop from "/shop.svg";
import greenTick from "/greenTick.svg";

//images
import foodos from "../../assets/Ellipse 2862.png";

const Profile: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 512) {
      setDescription(e.target.value);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 256) {
      setAddress(e.target.value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 128) {
      setEmail(e.target.value);
    }
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 256) {
      setWebsite(e.target.value);
    }
  };

  return (
    <div className="w-full flex  gap-3">
      {/* Left Section */}
      <div
        className="w-2/3 rounded-lg flex flex-col gap-1 h-[80vh] overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="bg-white p-4 ">
          <h2 className="text-lg font-semibold ">Profile photo</h2>
          <p className="mb-2 text-sm">
            This will be visible on your business profile
          </p>
          <input type="file" />
        </div>

        <div className="bg-white p-4 ">
          <div className="w-3/5">
            <h2 className="text-lg font-semibold mb-2">Display Name</h2>
            <input
              type="text"
              placeholder="Foodoos"
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">Category</h2>
            <select className="p-2 border border-gray-300 rounded w-full mb-4">
              <option>Food & Beverage</option>
            </select>
            <h2 className="text-lg font-semibold mb-2">
              Official business account
            </h2>
            <p className="text-gray-600 mb-4">
              An official business account has a green tick{" "}
              <span>
                <img
                  className="w-4 h-auto inline align-middle"
                  src={greenTick}
                />
              </span>{" "}
              next to its name. This shows that WhatsApp has confirmed that an
              authentic and notable brand owns this account. Learn more.
            </p>
            <button className="bg-[#F4F2F2] text-[#626262] p-2 rounded">
              Submit Request
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full bg-white p-6">
          <div className="  w-3/5 ">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 mb-2">
              Tell your customers about your business
            </p>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="p-2 border border-gray-300 rounded w-full h-20 resize-none"
              placeholder="Description"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            />
            <div className="text-right text-gray-500">
              {description.length}/512
            </div>
            <h2 className="text-xl font-semibold mb-2 ">Contact information</h2>
            <p className="text-gray-600 mb-2">
              Add some contact details for your business
            </p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <textarea
                value={address}
                onChange={handleAddressChange}
                className="p-2 border border-gray-300 h-10 rounded w-full"
                placeholder="Address"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              />
              <div className="text-right text-gray-500">
                {address.length}/256
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Email address</h3>
              <textarea
                value={email}
                onChange={handleEmailChange}
                className="p-2 border border-gray-300 h-10 rounded w-full"
                placeholder="Email address"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              />
              <div className="text-right text-gray-500">{email.length}/128</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Website</h3>
              <textarea
                value={website}
                onChange={handleWebsiteChange}
                className="p-2 border border-gray-300 h-10 rounded w-full"
                placeholder="Website"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              />
              <div className="text-right text-gray-500">
                {website.length}/256
              </div>
            </div>
            <button className="bg-gray-200 p-2 rounded">
              + Add another website
            </button>
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex flex-col gap-1  w-1/3  rounded-lg text-[#505050] h-[80vh]">
        <div className=" bg-white flex flex-col items-center p-4 h-1/3">
          <h2 className="text-xl font-semibold mb-4">
            Business Profile Preview
          </h2>
          <img src={foodos} />
          <span className="text-lg font-semibold">Foodoos</span>
        </div>
        <p className="bg-white p-4">Business Account</p>
        <div className="flex flex-col items-start bg-white p-4 h-2/3">
          <p className="flex items-center gap-2 mt-2">
            <span>
              <img src={shop} />
            </span>
            Meet eat celebrate
          </p>
          <p className="flex items-center gap-2 mt-2">
            <span>
              <img src={tag} />
            </span>
            Others
          </p>
          <p className="flex items-center gap-2 mt-2">
            <span>
              <img src={location} />
            </span>
            Kolkata
          </p>
          <p className="flex items-center gap-2 mt-2">
            <span>
              <img src={mail} />
            </span>
            <a
              href="mailto:connect.snackbae@gmail.com"
              className="text-blue-500"
            >
              connect.snackbae@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2 mt-2">
            <span>
              <img src={globe} />
            </span>
            <a href="https://www.snackbae.in/" className="text-blue-500">
              https://www.snackbae.in/
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
