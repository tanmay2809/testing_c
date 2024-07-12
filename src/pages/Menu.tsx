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
import { LuAsterisk } from "react-icons/lu";

// assets
import deleted from "../assets/deleted.png";

interface MenuItem {
  name: string;
  image: string[];
  description?: string;
  price?: string;
  category?: string;
  subcategory?: string;
  serving?: string;
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
    serving: "",
    tag: "",
    active: true,
    categoryActive: true,
    clicks: 0,
    addone: [{ name: "", additionalPrice: "" }],
    type: "",
  });
  const [editFormData, setEditFormData] = useState<MenuItem>({
    name: "",
    image: [],
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
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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

  const handleEditImageChange = (file: File) => {
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

  const addEditAddOn = () => {
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

  const removeEditAddOn = (index: number) => {
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

  const handleCloseCategoryModal = () => {
    setCategoryModal(!categoryModal);
  };

  return (
    <div className="w-full h-fit relative ">
      <Navbar />
      <div className=" w-[93%]  h-fit flex items-center justify-center ml-[7%] mt-2 ">
        <div className="w-full h-fit flex mt-[70px] ">
          {/* left div */}
          <div
            className={` flex flex-col h-fit ${
              isAddMenuOpen || isSubCategoryOpen || isEditMenuOpen
                ? "w-[70%]"
                : "w-[100%]"
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
                    className="px-5 py-2.5 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap"
                    onClick={() => {
                      setIsSubCategoryOpen(!isSubCategoryOpen);
                      setIsAddMenuOpen(false);
                    }}
                  >
                    <FiPlus />
                    Sub-Category
                  </button>
                  <button
                    className="px-5 py-2.5 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap"
                    onClick={() => {
                      setIsAddMenuOpen(!isAddMenuOpen);
                      setIsSubCategoryOpen(false);
                    }}
                  >
                    <FiPlus />
                    Add item
                  </button>
                </div>
              </div>
            </div>

            {/* bottom */}
            <div>
              <div className="flex flex-row items-center gap-4 px-5">
                <button
                  onClick={() => setIsEditMenuOpen(!isEditMenuOpen)}
                  className="bg-[#004AAD] text-white font-semibold text-[18px] px-5 py-2.5 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap"
                >
                  Food Menu
                </button>
                <FiPlus
                  className="text-[2.4rem] rounded-full p-2 bg-[#F0F0F0] text-[#004AAD] hover:cursor-pointer"
                  onClick={() => handleCloseCategoryModal()}
                />
              </div>
            </div>
          </div>

          {/* right div */}
          {(isAddMenuOpen || isSubCategoryOpen || isEditMenuOpen) && (
            <div
              className={`${
                isAddMenuOpen || isSubCategoryOpen || isEditMenuOpen
                  ? "flex bg-[#EEF5FF] flex-col fixed top-[70px] border-l-2 border-l-[#00000050] right-0 h-[calc(100%-70px)] w-[30%] overflow-auto"
                  : "hidden"
              }`}
            >
              {/* add menu item form */}
              {isAddMenuOpen && (
                <div>
                  <form onSubmit={handleSubmit} className="bg-[#EEF5FF]">
                    {/* save and cancel buttons */}
                    <div className="flex flex-row bg-white border-b-2 border-b-[#00000050] mt-2 py-8 px-5 items-center justify-between">
                      <p className="w-[57%] text-[#0F172A] text-[24px] font-semibold">
                        Add Menu Item
                      </p>
                      <div className="w-[43%] flex flex-row items-center justify-between">
                        <button className="rounded-xl text-white bg-[#004AAD] w-fit px-[2.5rem] py-[0.7rem]">
                          Save
                        </button>
                        <IoIosCloseCircleOutline
                          onClick={() => {
                            setIsAddMenuOpen(false);
                          }}
                          className="text-3xl hover:cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="p-5">
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
                            Add Category{" "}
                            <span className="text-[#ED4F4F]">*</span>
                          </label>
                          <select
                            className="w-full focus:outline-none p-2 border border-gray-300 rounded-md"
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
                          htmlFor="type"
                          className="block text-gray-700 text-[18px] font-[400] mb-2"
                        >
                          Food Type <span className="text-[#ED4F4F]">*</span>
                        </label>
                        <div className="bg-white px-5 py-5 rounded-lg border border-[#E2E8F0] flex flex-row justify-center gap-4">
                          <span
                            className={`flex flex-row items-center gap-2 text-[15px] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                              formData.type === "veg"
                                ? "bg-[#004AAD] text-white"
                                : ""
                            }`}
                            onClick={() => handleFoodTypeClick("veg")}
                          >
                            <BiFoodTag className="text-2xl text-[#67CE67]" />
                            Veg
                          </span>
                          <span
                            className={`flex flex-row items-center gap-2 text-[15px] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                              formData.type === "egg"
                                ? "bg-[#004AAD] text-white"
                                : ""
                            }`}
                            onClick={() => handleFoodTypeClick("egg")}
                          >
                            <BiFoodTag className="text-2xl text-[#F7C02B]" />
                            Egg
                          </span>
                          <span
                            className={`flex flex-row items-center gap-2 px-3 text-[15px] border-2 py-1 rounded-md hover:cursor-pointer ${
                              formData.type === "nonveg"
                                ? "bg-[#004AAD] text-white"
                                : ""
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
                          className="block text-[21px] text-gray-700 font-[400] mb-2"
                        >
                          Add-ons
                        </label>
                        <div className="bg-white px-5 py-8 rounded-lg border border-[#E2E8F0]">
                          {formData.addone?.map((addon, index) => (
                            <div
                              key={index}
                              className="mb-2 flex gap-2 items-end"
                            >
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
                                  onChange={(e) =>
                                    handleChange(e, index, "name")
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <div>
                                  <label
                                    htmlFor="addone-price"
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
                                        handleChange(
                                          e,
                                          index,
                                          "additionalPrice"
                                        )
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
                          htmlFor="description"
                          className="block text-gray-700 text-[21px] font-[400] mb-2"
                        >
                          Item Description
                        </label>
                        <textarea
                          rows={4}
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
                              Item Image
                              <span className="text-[#ED4F4F]">*</span>
                            </p>
                            <p className="flex flex-row text-[12px] gap-2">
                              Image format .jpg, .jpeg, .png and minimum size
                              300x300
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* serving info */}
                      <div className="mb-4">
                        <label
                          htmlFor="serving"
                          className="flex flex-col text-gray-700 text-[21px] font-[400] mb-2"
                        >
                          Serving Info
                          <span className="text-sm text-[#8497b3]">
                            Serving is the size/quantity of the dish
                          </span>
                        </label>
                        <div className="bg-white px-5 py-5 mt-4 rounded-lg border border-[#E2E8F0]">
                          <label
                            htmlFor="serving"
                            className="block text-gray-700 text-[21px] font-[400] mb-2"
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
                          className="flex flex-col text-gray-700 text-[21px] font-[400] mb-2"
                        >
                          Dish Tag (Optional)
                          <span className="text-sm text-[#8497b3]">
                            Serving is the size/quantity of the dish
                          </span>
                        </label>
                        <div className="bg-white px-5 py-5 rounded-lg border flex flex-col border-[#E2E8F0] gap-2">
                          <div className="flex flex-row flex-wrap justify-center gap-4">
                            <span
                              className={`flex flex-row items-center gap-2 text-[18px] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                                formData.tag === "Chef's Special"
                                  ? "bg-[#004AAD] text-white"
                                  : ""
                              }`}
                              onClick={() =>
                                handleDishTagClick("Chef's Special")
                              }
                            >
                              Chef's Special
                            </span>
                            <span
                              className={`flex flex-row items-center gap-2 text-[18px] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                                formData.tag === "New Launch"
                                  ? "bg-[#004AAD] text-white"
                                  : ""
                              }`}
                              onClick={() => handleDishTagClick("New Launch")}
                            >
                              New Launch
                            </span>
                            <span
                              className={`flex flex-row items-center gap-2 px-4 text-[18px] border-2 py-1 rounded-md hover:cursor-pointer ${
                                formData.tag === "Dairy free"
                                  ? "bg-[#004AAD] text-white"
                                  : ""
                              }`}
                              onClick={() => handleDishTagClick("Dairy free")}
                            >
                              Dairy free
                            </span>
                            <span
                              className={`flex flex-row items-center gap-2 px-4 text-[18px] border-2 py-1 rounded-md hover:cursor-pointer ${
                                formData.tag === "Vegan"
                                  ? "bg-[#004AAD] text-white"
                                  : ""
                              }`}
                              onClick={() => handleDishTagClick("Vegan")}
                            >
                              Vegan
                            </span>
                            <span
                              className={`flex flex-row items-center gap-2 px-4 text-[18px] border-2 py-1 rounded-md hover:cursor-pointer ${
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
                            <FaPlus className="text-xl" />
                            Request New
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* add sub category form */}
              {isSubCategoryOpen && (
                <div>
                  <form onSubmit={handleSubmit} className="bg-[#EEF5FF]">
                    {/* save and cancel buttons */}
                    <div className="flex flex-row bg-white border-b-2 border-b-[#00000050] mt-2 py-8 px-5 items-center justify-between">
                      <p className="w-[57%] text-[#0F172A] text-[24px] font-semibold">
                        Add Sub-Category
                      </p>
                      <div className="w-[43%] flex flex-row items-center justify-between">
                        <button className="rounded-xl text-white bg-[#004AAD] w-fit px-[2.5rem] py-[0.7rem]">
                          Save
                        </button>
                        <IoIosCloseCircleOutline
                          onClick={() => {
                            setIsSubCategoryOpen(false);
                          }}
                          className="text-3xl hover:cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* sub category name */}
                    <div className="p-5">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-gray-700 text-[21px] font-[400] mb-2"
                        >
                          Sub Category name{" "}
                          <span className="text-[#ED4F4F]">*</span>
                        </label>
                        <input
                          type="text"
                          id="subcategory"
                          name="subcategory"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full focus:outline-none p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      {/* Images */}
                      <div className="mb-4">
                        <label
                          htmlFor="category"
                          className="flex flex-col text-gray-700 text-[21px] font-[400] mb-2"
                        >
                          Sub-Category icon
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
                              sub-category icon
                              <span className="text-[#ED4F4F]">*</span>
                            </p>
                            <p className="flex flex-row text-[12px] gap-2">
                              Image format .jpg, .jpeg, .png and minimum size
                              300x300
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* edit menu form */}
              {isEditMenuOpen && (
                <div>
                  <form onSubmit={handleSubmit} className="bg-[#EEF5FF]">
                    {/* save and cancel buttons */}
                    <div className="flex flex-row bg-white border-b-2 border-b-[#00000050] mt-2 py-8 px-5 items-center justify-between">
                      <p className="w-[57%] text-[#0F172A] text-[24px] font-semibold">
                        Edit Menu Item
                      </p>
                      <div className="w-[43%] flex flex-row items-center justify-between">
                        <button className="rounded-xl text-white bg-[#004AAD] w-fit px-[2.5rem] py-[0.7rem]">
                          Save
                        </button>
                        <IoIosCloseCircleOutline
                          onClick={() => {
                            setIsEditMenuOpen(false);
                          }}
                          className="text-3xl hover:cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="p-5">
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
                            value={editFormData.name}
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
                            Add Category{" "}
                            <span className="text-[#ED4F4F]">*</span>
                          </label>
                          <select
                            className="w-full focus:outline-none p-2 border border-gray-300 rounded-md"
                            id="category"
                            name="category"
                            value={editFormData.category}
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
                              value={editFormData.price}
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
                          htmlFor="type"
                          className="block text-gray-700 text-[18px] font-[400] mb-2"
                        >
                          Food Type <span className="text-[#ED4F4F]">*</span>
                        </label>
                        <div className="bg-white px-5 py-5 rounded-lg border border-[#E2E8F0] flex flex-row justify-center gap-4">
                          <span
                            className={`flex flex-row items-center gap-2 text-[15px] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                              editFormData.type === "veg"
                                ? "bg-[#004AAD] text-white"
                                : ""
                            }`}
                            onClick={() => handleFoodTypeClick("veg")}
                          >
                            <BiFoodTag className="text-2xl text-[#67CE67]" />
                            Veg
                          </span>
                          <span
                            className={`flex flex-row items-center gap-2 text-[15px] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                              editFormData.type === "egg"
                                ? "bg-[#004AAD] text-white"
                                : ""
                            }`}
                            onClick={() => handleFoodTypeClick("egg")}
                          >
                            <BiFoodTag className="text-2xl text-[#F7C02B]" />
                            Egg
                          </span>
                          <span
                            className={`flex flex-row items-center gap-2 px-3 text-[15px] border-2 py-1 rounded-md hover:cursor-pointer ${
                              editFormData.type === "nonveg"
                                ? "bg-[#004AAD] text-white"
                                : ""
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
                          className="block text-[21px] text-gray-700 font-[400] mb-2"
                        >
                          Add-ons
                        </label>
                        <div className="bg-white px-5 py-8 rounded-lg border border-[#E2E8F0]">
                          {editFormData.addone?.map((addon, index) => (
                            <div
                              key={index}
                              className="mb-2 flex gap-2 items-end"
                            >
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
                                  onChange={(e) =>
                                    handleChange(e, index, "name")
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <div>
                                  <label
                                    htmlFor="addone-price"
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
                                        handleChange(
                                          e,
                                          index,
                                          "additionalPrice"
                                        )
                                      }
                                      className="w-full pl-6 p-2 border border-gray-300 rounded-md"
                                    />
                                  </div>
                                </div>
                              </div>
                              <MdOutlineDeleteOutline
                                onClick={() => removeEditAddOn(index)}
                                className="text-red-500 text-[3rem] hover:cursor-pointer"
                              />
                            </div>
                          ))}
                          <p
                            className="text-[#004AAD] font-semibold flex flex-row items-center gap-2 hover:cursor-pointer w-fit mt-4"
                            onClick={addEditAddOn}
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
                          className="block text-gray-700 text-[21px] font-[400] mb-2"
                        >
                          Item Description
                        </label>
                        <textarea
                          rows={4}
                          id="description"
                          name="description"
                          value={editFormData.description}
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
                                        handleEditImageChange(
                                          e.target.files[0]
                                        );
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
                              Item Image
                              <span className="text-[#ED4F4F]">*</span>
                            </p>
                            <p className="flex flex-row text-[12px] gap-2">
                              Image format .jpg, .jpeg, .png and minimum size
                              300x300
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* serving info */}
                      <div className="mb-4">
                        <label
                          htmlFor="serving"
                          className="flex flex-col text-gray-700 text-[21px] font-[400] mb-2"
                        >
                          Serving Info
                          <span className="text-sm text-[#8497b3]">
                            Serving is the size/quantity of the dish
                          </span>
                        </label>
                        <div className="bg-white px-5 py-5 mt-4 rounded-lg border border-[#E2E8F0]">
                          <label
                            htmlFor="serving"
                            className="block text-gray-700 text-[21px] font-[400] mb-2"
                          >
                            Serving info, select no. of people
                          </label>

                          <select
                            className="w-full focus:outline-none p-2 border border-gray-300 rounded-md"
                            id="serving"
                            name="serving"
                            value={editFormData.serving}
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
                          className="flex flex-col text-gray-700 text-[21px] font-[400] mb-2"
                        >
                          Dish Tag (Optional)
                          <span className="text-sm text-[#8497b3]">
                            Serving is the size/quantity of the dish
                          </span>
                        </label>
                        <div className="bg-white px-5 py-5 rounded-lg border flex flex-col border-[#E2E8F0] gap-2">
                          <div className="flex flex-row flex-wrap justify-center gap-4">
                            <span
                              className={`flex flex-row items-center gap-2 text-[18px] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                                editFormData.tag === "Chef's Special"
                                  ? "bg-[#004AAD] text-white"
                                  : ""
                              }`}
                              onClick={() =>
                                handleDishTagClick("Chef's Special")
                              }
                            >
                              Chef's Special
                            </span>
                            <span
                              className={`flex flex-row items-center gap-2 text-[18px] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                                editFormData.tag === "New Launch"
                                  ? "bg-[#004AAD] text-white"
                                  : ""
                              }`}
                              onClick={() => handleDishTagClick("New Launch")}
                            >
                              New Launch
                            </span>
                            <span
                              className={`flex flex-row items-center gap-2 px-4 text-[18px] border-2 py-1 rounded-md hover:cursor-pointer ${
                                editFormData.tag === "Dairy free"
                                  ? "bg-[#004AAD] text-white"
                                  : ""
                              }`}
                              onClick={() => handleDishTagClick("Dairy free")}
                            >
                              Dairy free
                            </span>
                            <span
                              className={`flex flex-row items-center gap-2 px-4 text-[18px] border-2 py-1 rounded-md hover:cursor-pointer ${
                                editFormData.tag === "Vegan"
                                  ? "bg-[#004AAD] text-white"
                                  : ""
                              }`}
                              onClick={() => handleDishTagClick("Vegan")}
                            >
                              Vegan
                            </span>
                            <span
                              className={`flex flex-row items-center gap-2 px-4 text-[18px] border-2 py-1 rounded-md hover:cursor-pointer ${
                                editFormData.tag === "Extra Spicy"
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
                            <FaPlus className="text-xl" />
                            Request New
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* category modal */}
      {categoryModal && (
        <div
          id="default-modal"
          // tabIndex="-1"
          aria-hidden="true"
          className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50`}
        >
          <div className={`p-4 w-full sm:w-fit h-fit`}>
            <div className="w-full relative bg-white rounded-lg shadow">
              <div className="flex flex-row gap-8 border-b-2 px-10 py-4">
                <div className="flex flex-col">
                  <h1 className="text-[28px] font-[500]">Add Main Category</h1>
                </div>
                <IoIosCloseCircleOutline
                  onClick={() => {
                    handleCloseCategoryModal();
                  }}
                  className="text-4xl hover:cursor-pointer"
                />
              </div>
              <div className="flex flex-col mt-2 px-8 pb-5">
                <form className="flex flex-col gap-2 justify-center">
                  <div className="flex flex-col gap-1">
                    <label className="flex flex-row items-center text-[#0F172A] text-[24px] font-[400]">
                      Main Category name
                      <LuAsterisk className="text-sm text-[#C62828]" />
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 mt-2 focus:outline-none border-2 border-[#00000033] rounded-[8px] text-[18px]"
                      placeholder="Ex: Food Menu"
                    />
                    <label className="text-[18px] font-[400] mt-4 text-center flex items-center">
                      <input
                        type="checkbox"
                        // checked={rememberMe}
                        // onChange={() => setRememberMe(!rememberMe)}
                        className="size-[20px] mr-2"
                      />
                      Mark as Primary
                    </label>
                  </div>
                  <div className="flex flex-row gap-5 mt-4">
                    <button
                      className="w-[50%] h-14 text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-[1rem]"
                      onClick={() => handleCloseCategoryModal()}
                    >
                      Cancel
                    </button>
                    <button className="w-[50%] bg-[#004AAD] h-14 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem]">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* delete modal */}
      {deleteModal && (
        <div
          id="default-modal"
          // tabIndex="-1"
          aria-hidden="true"
          className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50`}
        >
          <div className={`p-4 w-full sm:w-fit h-fit`}>
            <div className="w-[350px] relative bg-white rounded-lg shadow">
              <div className="flex flex-col items-center gap-2 px-10 py-4">
                <img src={deleted} className="w-[200px] h-auto" />
                <p className="text-[#0F172A] text-center text-[20px] font-[400]">
                  Are you sure you want to delete ?
                </p>
              </div>
              <div className="flex flex-col mt-2 px-8 pb-5">
                <div className="flex flex-row gap-5 mt-4">
                  <button
                    className="w-[50%] h-14 text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-[1rem]"
                    onClick={() => setDeleteModal(!deleteModal)}
                  >
                    Cancel
                  </button>
                  <button className="w-[50%] bg-[#004AAD] h-14 text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-[1rem]">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
