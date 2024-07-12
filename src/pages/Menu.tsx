import Navbar from "../component/Navbar";
import { useState } from "react";

//icons
import { FiPlus } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { BiFoodTag } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";

interface MenuItem {
  name: string;
  image: string[];
  description?: string;
  price?: string;
  category?: string;
  subcategory?: string;
  serves?: string;
  tag?: string;
  active: boolean;
  categoryActive: boolean;
  clicks: number;
  addone?: {
    name: string;
    additionalPrice: string;
  }[];
  type?: "veg" | "nonveg" | "egg" | "";
}

const Menu = () => {
  const [pic, setPic] = useState<string>("");
  const [formData, setFormData] = useState<MenuItem>({
    name: "",
    image: [],
    description: "",
    price: "",
    category: "",
    subcategory: "",
    serves: "",
    tag: "",
    active: true,
    categoryActive: true,
    clicks: 0,
    addone: [{ name: "", additionalPrice: "" }],
    type: "",
  });
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setPic(reader.result as string);
        setFormData({
          ...formData,
          image: [reader.result as string],
        });
      }
    };
  };

  const removeImage = () => {
    setPic("");
    setFormData({
      ...formData,
      image: [],
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index?: number,
    field?: string
  ) => {
    const { name, value } = e.target;

    if (index !== undefined && field) {
      setFormData({
        ...formData,
        image: formData.image.map((img, i) => (i === index ? value : img)),
        addone: formData.addone?.map((addon, i) =>
          i === index ? { ...addon, [field]: value } : addon
        ),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addAddOn = () => {
    setFormData({
      ...formData,
      addone: [...(formData.addone || []), { name: "", additionalPrice: "" }],
    });
  };

  const removeAddOn = (index: number) => {
    setFormData({
      ...formData,
      addone: formData.addone?.filter((_, i) => i !== index),
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleFoodTypeClick = (type: "veg" | "nonveg" | "egg") => {
    if (formData.type === type) {
      setFormData({
        ...formData,
        type: "",
      });
    } else {
      setFormData({
        ...formData,
        type: type,
      });
    }
  };

  return (
    <div className="w-full h-fit relative ">
      <Navbar />
      <div className=" w-[93%]  h-fit flex items-center justify-center ml-[7%] mt-2 ">
        <div className="w-full h-fit flex mt-[70px] ">
          {/* left div */}
          <div
            className={` flex flex-col h-fit ${
              isOpen ? "w-[100%] " : "w-[70%]"
            }`}
          >
            {/* top */}
            <div className="w-full h-fit flex flex-co px-10 py-5  ">
              <div className="w-full h-fit flex  items-center justify-between">
                <div className="w-[50%]">
                  <p className="text-[1.7rem] font-bold text-[#000000]">Menu</p>
                  <p className="text-[1rem] font-semibold text-[#000000] text-nowrap">
                    Manage your menu item here
                  </p>
                </div>
                <div className="flex w-[50%]  h-fit  items-center justify-end gap-5 font-semibold text-[#004AAD]">
                  <button
                    onClick={handleToggle}
                    className="px-5 py-2.5 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap "
                  >
                    <FiPlus />
                    Sub-Category
                  </button>
                  <button className="px-5 py-2.5 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap ">
                    <FiPlus />
                    Add item
                  </button>
                </div>
              </div>
            </div>
            {/* bottom */}
            <div></div>
          </div>

          {/* right div */}
          <div
            className={`${
              isOpen
                ? "hidden"
                : "flex flex-col fixed top-[70px] border-l-2 border-l-[#00000050] right-0 h-[calc(100%-70px)] w-[30%] overflow-auto"
            }`}
          >
            {/* Add item form */}
            <div>
              {/* save and cancel buttons */}
              <div className="flex flex-row bg-white border-b-2 border-b-[#00000050] mt-2 py-8 px-5 items-center justify-between">
                <p className="w-[57%] text-[#0F172A] text-[24px] font-semibold">
                  Add Menu Item
                </p>
                <div className="w-[43%] flex flex-row items-center justify-between">
                  <button className="rounded-xl text-white bg-[#004AAD] w-fit px-[3rem] py-[0.8rem]">
                    Save
                  </button>
                  <IoIosCloseCircleOutline
                    onClick={() => handleToggle()}
                    className="text-3xl hover:cursor-pointer"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-5 bg-[#EEF5FF]">
                {/* item name and category */}
                <div className="flex flex-row gap-4">
                  <div className="w-1/2 mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-[21px] font-[400] mb-2"
                    >
                      Item name <span className="text-[#ED4F4F]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full focus:outline-none p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/2 mb-4">
                    <label
                      htmlFor="category"
                      className="block text-gray-700 text-[21px] font-[400] mb-2"
                    >
                      Add Category <span className="text-[#ED4F4F]">*</span>
                    </label>
                    <select
                      className="w-full focus:outline-none p-2 border border-gray-300 rounded-md"
                      id="category"
                      name="category"
                      // value="dw"
                      // onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>

                {/* pricing */}
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 text-[21px] font-[400] mb-2"
                  >
                    Pricing <span className="text-[#ED4F4F]">*</span>
                  </label>
                  <div className="bg-white px-5 py-5 rounded-lg border border-[#E2E8F0]">
                    <label
                      htmlFor="price"
                      className="block text-gray-700 text-[18px] font-[400] mb-2"
                    >
                      Base Price <span className="text-[#ED4F4F]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold">
                        ₹
                      </span>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-6 focus:outline-none p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <label className="text-[14px] font-[400] mt-4 text-center flex items-center">
                      <input
                        type="checkbox"
                        // checked={rememberMe}
                        // onChange={() => setRememberMe(!rememberMe)}
                        className="size-[20px] mr-2"
                      />
                      Inclusive of all taxes
                    </label>
                  </div>
                </div>

                {/* food type */}
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 text-[18px] font-[400] mb-2"
                  >
                    Food Type <span className="text-[#ED4F4F]">*</span>
                  </label>
                  <div className="bg-white px-5 py-5 rounded-lg border border-[#E2E8F0] flex flex-row justify-center gap-4">
                    <button
                      className={`flex flex-row items-center gap-2 text-[18px] border-2 px-3 py-1 rounded-md ${
                        formData.type === "veg" ? "bg-[#004AAD] text-white" : ""
                      }`}
                      onClick={() => handleFoodTypeClick("veg")}
                    >
                      <BiFoodTag className="text-2xl text-[#67CE67]" />
                      Veg
                    </button>
                    <button
                      className={`flex flex-row items-center gap-2 text-[18px] border-2 px-3 py-1 rounded-md ${
                        formData.type === "egg" ? "bg-[#004AAD] text-white" : ""
                      }`}
                      onClick={() => handleFoodTypeClick("egg")}
                    >
                      <BiFoodTag className="text-2xl text-[#F7C02B]" />
                      Egg
                    </button>
                    <button
                      className={`flex flex-row items-center gap-2 px-4 text-[18px] border-2 py-1 rounded-md ${
                        formData.type === "nonveg"
                          ? "bg-[#004AAD] text-white"
                          : ""
                      }`}
                      onClick={() => handleFoodTypeClick("nonveg")}
                    >
                      <BiFoodTag className="text-2xl text-[#ED4F4F]" />
                      Non-Veg
                    </button>
                  </div>
                </div>

                {/* add-ons */}
                <div className="mb-4">
                  <label
                    htmlFor="addone"
                    className="block text-[21px] text-gray-700 font-[400] mb-2"
                  >
                    Add-ons
                  </label>
                  <div className="bg-white px-5 py-8 rounded-lg border border-[#E2E8F0]">
                    {formData.addone?.map((addon, index) => (
                      <div key={index} className="mb-2 flex gap-2 items-end">
                        <div>
                          <label
                            htmlFor="price"
                            className="block text-gray-700 text-[18px] font-[400] mb-2"
                          >
                            Add-on Name{" "}
                            <span className="text-[#ED4F4F]">*</span>
                          </label>
                          <input
                            type="text"
                            id={`addone-name-${index}`}
                            name={`addone-name-${index}`}
                            value={addon.name}
                            onChange={(e) => handleChange(e, index, "name")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <div>
                            <label
                              htmlFor="price"
                              className="block text-gray-700 text-[18px] font-[400] mb-2"
                            >
                              Additional Price
                            </label>

                            <div className="relative">
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold">
                                ₹
                              </span>

                              <input
                                type="text"
                                id={`addone-price-${index}`}
                                name={`addone-price-${index}`}
                                value={addon.additionalPrice}
                                onChange={(e) =>
                                  handleChange(e, index, "additionalPrice")
                                }
                                className="w-full pl-6 p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                        <MdOutlineDeleteOutline
                          onClick={() => removeAddOn(index)}
                          className="text-red-500 text-[3rem] hover:cursor-pointer"
                        />
                      </div>
                    ))}
                    <p
                      className="text-[#004AAD] font-semibold flex flex-row items-center gap-2 hover:cursor-pointer w-fit mt-4"
                      onClick={addAddOn}
                    >
                      <FaPlus className="text-xl" />
                      Add New
                    </p>
                  </div>
                </div>

                {/* item description */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-[21px] font-[400] mb-2"
                  >
                    Item Description
                  </label>
                  <textarea
                    rows={4}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Write Description within 100 words to explain your dish better to customers"
                    className="w-full resize-none focus:outline-none p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Images */}
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="flex flex-col text-gray-700 text-[21px] font-[400] mb-2"
                  >
                    Images
                  </label>
                  <div className="flex flex-row gap-8 bg-white px-5 py-5 rounded-lg border border-[#E2E8F0]">
                    <div className="size-[120px] bg-[#F8FAFC] rounded-md flex items-center justify-center relative ">
                      {pic == "" ? (
                        <div className="size-[120px] flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col border border-[#004AAD] items-center justify-center w-full h-full rounded-lg cursor-pointer hover:bg-gray-100 "
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <IoCloudUploadOutline className="text-[#004AAD] text-3xl" />
                            </div>
                            <input
                              id="dropzone-file"
                              name="image"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files)
                                  handleImageChange(e.target.files[0]);
                              }}
                            />
                          </label>
                        </div>
                      ) : (
                        <div>
                          <img src={pic} alt="uploaded"></img>
                          <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 text-red-600"
                          >
                            <IoCloseCircle size={24} />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="w-1/2 flex flex-col items-start justify-center">
                      <p className="flex flex-row gap-2 text-[15px] font-bold">
                        Item Image<span className="text-[#ED4F4F]">*</span>
                      </p>
                      <p className="flex flex-row text-[12px] gap-2">
                        Image format .jpg, .jpeg, .png and minimum size 300x300
                      </p>
                    </div>
                  </div>
                </div>

                {/* serving info */}
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="flex flex-col text-gray-700 text-[21px] font-[400] mb-2"
                  >
                    Serving Info
                    <span className="text-sm text-[#8497b3]">
                      Serving is the size/quantity of the dish
                    </span>
                  </label>
                  <div className="bg-white px-5 py-5 mt-4 rounded-lg border border-[#E2E8F0]">
                    <label
                      htmlFor="category"
                      className="block text-gray-700 text-[21px] font-[400] mb-2"
                    >
                      Serving info, select no. of people
                    </label>

                    <select
                      className="w-full focus:outline-none p-2 border border-gray-300 rounded-md"
                      id="category"
                      name="category"
                      // value="dw"
                      // onChange={handleInputChange}
                    >
                      <option value="">Serves</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Active:
                  </label>
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={formData.active}
                    onChange={handleCheckboxChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Is the menu item active?</span>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Category Active:
                  </label>
                  <input
                    type="checkbox"
                    id="categoryActive"
                    name="categoryActive"
                    checked={formData.categoryActive}
                    onChange={handleCheckboxChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Is the category active?</span>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="clicks"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Clicks:
                  </label>
                  <input
                    type="number"
                    id="clicks"
                    name="clicks"
                    value={formData.clicks}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
