import Navbar from "../component/Navbar";
import { useState } from "react";

//icons
import { FiPlus } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

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
  type?: "veg" | "nonveg" | "egg";
}

const Menu = () => {
  const [formData, setFormData] = useState<MenuItem>({
    name: "",
    image: [""],
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
    type: "veg",
  });
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
                <div className="mb-4">
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
                {formData.image.map((img, index) => (
                  <div key={index} className="mb-4">
                    <label
                      htmlFor={`image-${index}`}
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Image URL {index + 1}:
                    </label>
                    <input
                      type="text"
                      id={`image-${index}`}
                      name={`image-${index}`}
                      value={img}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ))}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Category:
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subcategory"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Subcategory:
                  </label>
                  <input
                    type="text"
                    id="subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="serves"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Serves:
                  </label>
                  <input
                    type="text"
                    id="serves"
                    name="serves"
                    value={formData.serves}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="tag"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Tag:
                  </label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="type"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Type:
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                    <option value="egg">Egg</option>
                  </select>
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
