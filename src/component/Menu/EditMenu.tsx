import { useState } from "react";
import { Item } from "./SubCategoryDropdown";
import { MenuItem } from "./AddMenuItem";

// icons
import { BiFoodTag } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface EditMenuProps {
  setIsEditMenu: (isOpen: boolean) => void;
  item: Item;
}

const EditMenuItem: React.FC<EditMenuProps> = ({ setIsEditMenu, item }) => {
  const [image, setImage] = useState<string | null>(null);

  const [formData, setFormData] = useState<MenuItem>({
    name: "",
    image: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    serving: "",
    tag: "",
    active: true,
    categoryActive: true,
    clicks: 0,
    addone: [{ name: "", additionalPrice: "" }],
    type: "",
  });

  // remove image function
  const removeImage = () => {
    setImage(null);
    setFormData({
      ...formData,
      image: "",
    });
  };

  // addon functions
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

  // food type function
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

  // dish tag click handler
  const handleDishTagClick = (
    type:
      | "Chef's Special"
      | "New Launch"
      | "Dairy free"
      | "Vegan"
      | "Extra Spicy"
  ) => {
    if (formData.tag === type) {
      setFormData({
        ...formData,
        tag: "",
      });
    } else {
      setFormData({
        ...formData,
        tag: type,
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index?: number,
    field?: string
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      if (index !== undefined && field) {
        const updatedAddons = prevData.addone?.map((addon, i) =>
          i === index ? { ...addon, [field]: value } : addon
        );
        return {
          ...prevData,
          addone: updatedAddons || prevData.addone,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const image = URL.createObjectURL(file);
      setImage(image);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-[#EEF5FF]">
        {/* save and cancel buttons */}
        <div className="flex flex-row bg-white border-b-2 border-b-[#00000050] mt-5 py-4  px-5 items-center justify-between">
          <p className="w-[57%] text-[#0F172A] text-[1.4rem] font-semibold">
            Edit Menu Item
          </p>
          <div className="w-[43%] flex flex-row items-center justify-between">
            <button className="rounded-lg text-white bg-[#004AAD] w-fit px-[2.5rem] py-2">
              Save
            </button>
            <IoIosCloseCircleOutline
              onClick={() => {
                setIsEditMenu(false);
              }}
              className="text-2xl hover:cursor-pointer"
            />
          </div>
        </div>

        <div className="p-5">
          {/* item name and category */}
          <div className="flex flex-row gap-4">
            <div className="w-1/2 mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-[1.2rem] font-inter mb-2"
              >
                Item name <span className="text-[#ED4F4F]">*</span>
              </label>
              <input
                placeholder="Eg: Chicken Biryani"
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
                className="block text-gray-700 text-[1.2rem] font-inter mb-2"
              >
                Add Category <span className="text-[#ED4F4F]">*</span>
              </label>
              <select
                className="w-full focus:outline-none p-2 border  border-gray-300 rounded-md"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
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
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Pricing <span className="text-[#ED4F4F]">*</span>
            </label>
            <div className="bg-white px-5 py-3 rounded-lg border border-[#E2E8F0]">
              <label
                htmlFor="price"
                className="block text-gray-700 text-[1rem] font-semibold mb-2"
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
                  className="size-[1rem] mr-2"
                />
                Inclusive of all taxes
              </label>
            </div>
          </div>

          {/* food type */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Food Type <span className="text-[#ED4F4F]">*</span>
            </label>
            <div className="bg-white px-5 py-5 rounded-lg border border-[#E2E8F0] flex items-center justify-evenly gap-4">
              <span
                className={`flex flex-row items-center gap-2 text-[0.9rem] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                  formData.type === "veg" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => handleFoodTypeClick("veg")}
              >
                <BiFoodTag className="text-2xl text-[#67CE67]" />
                Veg
              </span>
              <span
                className={`flex flex-row items-center gap-2 text-[0.9rem] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                  formData.type === "egg" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => handleFoodTypeClick("egg")}
              >
                <BiFoodTag className="text-2xl text-[#F7C02B]" />
                Egg
              </span>
              <span
                className={`flex flex-row items-center gap-2 px-3 text-[0.9rem] border-2 py-1 rounded-md hover:cursor-pointer ${
                  formData.type === "nonveg" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => handleFoodTypeClick("nonveg")}
              >
                <BiFoodTag className="text-2xl text-[#ED4F4F]" />
                Non-Veg
              </span>
            </div>
          </div>

          {/* add-ons */}
          <div className="mb-4">
            <label
              htmlFor="addone"
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Add-ons
            </label>
            <div className="bg-white px-5 py-3 rounded-lg border border-[#E2E8F0]">
              {formData.addone?.map((addon, index) => (
                <div
                  key={index}
                  className="mb-2 flex gap-2 items-end justify-between"
                >
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-gray-700 text-[1.1rem] font-[400] mb-2"
                    >
                      Add-on Name <span className="text-[#ED4F4F]">*</span>
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
                        htmlFor="addone-price"
                        className="block text-gray-700 text-[1.1rem] font-[400] mb-2"
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
                    className="text-red-500 text-[2.5rem] hover:cursor-pointer"
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
              htmlFor="description"
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Item Description
            </label>
            <textarea
              rows={3}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write Description within 100 words to explain your dish better to customers"
              className="w-full resize-none focus:outline-none p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Images */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Images
            </label>
            <div className="flex flex-row gap-8 bg-white px-5 py-5 rounded-lg border border-[#E2E8F0]">
              <div className="size-[90px] bg-[#F8FAFC] rounded-md flex items-center justify-center relative ">
                {image === null ? (
                  <div className="size-[90px] flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col border border-[#004AAD] items-center justify-center w-full h-full rounded-lg cursor-pointer hover:bg-gray-100 "
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <IoCloudUploadOutline className="text-[#004AAD] text-2xl" />
                      </div>
                      <input
                        id="dropzone-file"
                        name="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) handleFileChange(e);
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <img src={image} alt="uploaded"></img>
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 text-red-600"
                    >
                      <IoCloseCircle size={25} />
                    </button>
                  </div>
                )}
              </div>
              <div className="w-1/2 flex flex-col items-start justify-center">
                <p className="flex flex-row gap-2 text-[0.9rem] font-bold">
                  Item Image
                  <span className="text-[#ED4F4F]">*</span>
                </p>
                <p className="flex flex-row text-[0.8rem] gap-2">
                  Image format .jpg, .jpeg, .png and minimum size 300x300
                </p>
              </div>
            </div>
          </div>

          {/* serving info */}
          <div className="mb-4">
            <label
              htmlFor="serving"
              className="block  text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Serving Info
              <p className="text-sm text-[#8497b3]">
                Serving is the size/quantity of the dish
              </p>
            </label>
            <div className="bg-white px-5 py-4 mt-4 rounded-lg border border-[#E2E8F0]">
              <label
                htmlFor="serving"
                className="block text-gray-700 text-[1rem] font-[400] mb-2"
              >
                Serving info, select no. of people
              </label>

              <select
                className="w-full focus:outline-none p-2 border border-gray-300 rounded-md"
                id="serving"
                name="serving"
                value={formData.serving}
                onChange={handleChange}
              >
                <option value="">Serves</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>

          {/* dish tag */}
          <div className="mb-4">
            <label
              htmlFor="dish"
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Dish Tag (Optional)
              <p className="text-sm text-[#8497b3]">
                Serving is the size/quantity of the dish
              </p>
            </label>
            <div className="bg-white px-5 py-5 rounded-lg border flex flex-col border-[#E2E8F0] gap-2">
              <div className="flex flex-row flex-wrap text-[#0F172A82]  gap-4">
                <span
                  className={`flex flex-row items-center  text-[.9rem] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                    formData.tag === "Chef's Special"
                      ? "bg-[#004AAD] text-white"
                      : ""
                  }`}
                  onClick={() => handleDishTagClick("Chef's Special")}
                >
                  Chef's Special
                </span>
                <span
                  className={`flex flex-row items-center text-[.9rem] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                    formData.tag === "New Launch"
                      ? "bg-[#004AAD] text-white"
                      : ""
                  }`}
                  onClick={() => handleDishTagClick("New Launch")}
                >
                  New Launch
                </span>
                <span
                  className={`flex flex-row items-center gap-2 px-4 text-[.9rem] border-2 py-1 rounded-md hover:cursor-pointer ${
                    formData.tag === "Dairy free"
                      ? "bg-[#004AAD] text-white"
                      : ""
                  }`}
                  onClick={() => handleDishTagClick("Dairy free")}
                >
                  Dairy free
                </span>
                <span
                  className={`flex flex-row items-center gap-2 px-4 text-[.9rem] border-2 py-1 rounded-md hover:cursor-pointer ${
                    formData.tag === "Vegan" ? "bg-[#004AAD] text-white" : ""
                  }`}
                  onClick={() => handleDishTagClick("Vegan")}
                >
                  Vegan
                </span>
                <span
                  className={`flex flex-row items-center gap-2 px-4 text-[.9rem] border-2 py-1 rounded-md hover:cursor-pointer ${
                    formData.tag === "Extra Spicy"
                      ? "bg-[#004AAD] text-white"
                      : ""
                  }`}
                  onClick={() => handleDishTagClick("Extra Spicy")}
                >
                  Extra Spicy
                </span>
              </div>
              <p
                className="text-[#004AAD] font-semibold flex flex-row items-center gap-2 hover:cursor-pointer w-fit mt-4"
                // onClick={addAddOn}
              >
                <FaPlus className="text-lg" />
                Request New
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMenuItem;
