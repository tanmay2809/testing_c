import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { SubcategoryItem } from "../../pages/Menu";
import { toast } from "react-toastify";

// icons
import { BiFoodTag } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";

// redux
import {
  AppThunkDispatch,
  fetchRestaurantDetails,
} from "../../redux/restaurantData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export interface MenuItem {
  _id?: string;
  name: string;
  image: { url: string }[];
  description: string;
  price: string;
  category: string;
  subcategory: string;
  serves: string;
  tag: string;
  active?: boolean;
  categoryActive?: boolean;
  clicks?: number;
  addone: string[];
  type: string;
}

interface AddMenuProps {
  setIsAddMenuOpen: (isOpen: boolean) => void;
  categories: { _id: string; name: string; subcategory: SubcategoryItem[] }[];
}

const AddMenuItem: React.FC<AddMenuProps> = ({
  categories,
  setIsAddMenuOpen,
}) => {
  const [image, setImage] = useState<string[]>([]);

  const [formData, setFormData] = useState<MenuItem>({
    name: "",
    image: [],
    description: "",
    price: "",
    category: categories[0]?._id,
    subcategory: "",
    serves: "",
    tag: "",
    addone: [],
    type: "",
  });

  const [addonDetails, setAddonDetails] = useState<
    { name: string; additionalPrice: string; id: string }[]
  >([{ name: "", additionalPrice: "", id: "" }]);

  const [showAddNewButton, setShowAddNewButton] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const dispatch: AppThunkDispatch = useDispatch();
  const resData = useSelector((state: RootState) => state.resturantdata);

  // remove image function
  const removeImage = (index: number) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: prevFormData.image.filter((_, i) => i !== index),
    }));
  };

  // addone functions
  const removeAddOn = (index: number) => {
    const addOnId = addonDetails[index].id;
    if (addOnId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        addone: prevFormData.addone.filter((id) => id !== addOnId),
      }));
    }
    setAddonDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
  };

  const addAddOn = () => {
    setAddonDetails((prevDetails) => [
      ...prevDetails,
      { name: "", additionalPrice: "", id: "" },
    ]);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index?: number,
    field?: string
  ) => {
    const { name, value } = event.target;
    if (index !== undefined && field) {
      setAddonDetails((prevDetails) => {
        const newDetails = [...prevDetails];
        newDetails[index] = { ...newDetails[index], [field]: value };
        return newDetails;
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = async (files: FileList) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const uploadedImageUrls: string[] = [];
    let hasError = false;

    setError("");

    for (const file of Array.from(files)) {
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Only .jpg, .jpeg, .png are allowed.");
        hasError = true;
        break;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);
      const isValidSize = await new Promise((resolve) => {
        img.onload = () => {
          if (img.width < 300 || img.height < 300) {
            setError("Image size must be at least 300x300.");
            resolve(false);
          } else {
            resolve(true);
          }
        };
      });

      if (!isValidSize) {
        hasError = true;
        break;
      }

      const imageFormData = new FormData();
      imageFormData.append("file", file);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/fileUpload`,
        data: imageFormData,
      };

      try {
        const response = await axios.request(config);
        console.log(response.data);
        if (response.data.status && response.data.data) {
          const urls = response.data.data.map(
            (item: { url: string }) => item.url
          );
          uploadedImageUrls.push(...urls);
        }
      } catch (error) {
        console.log(error);
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      setImage((prevImages) => [...prevImages, ...uploadedImageUrls]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: [
          ...prevFormData.image,
          ...uploadedImageUrls.map((url) => ({ url })),
        ],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/addMenuItem`,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        dispatch(fetchRestaurantDetails({ id: resData.data._id }));
        setIsAddMenuOpen(false);
        setImage([]);
        toast.success("Menu Item Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddone = async (index: number) => {
    let addon = addonDetails[index];
    let data = JSON.stringify({
      name: addon.name,
      price: addon.additionalPrice,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/addAddons`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      if (response.data.Addone) {
        const newAddOnId = response.data.Addone._id;
        console.log(newAddOnId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          addone: [...prevFormData.addone, newAddOnId],
        }));
        setAddonDetails((prevDetails) =>
          prevDetails.map((addon, i) =>
            i === index ? { ...addon, id: newAddOnId } : addon
          )
        );
        setShowAddNewButton(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-y-scroll no-scrollbar">
      <form onSubmit={handleSubmit} className="bg-[#EEF5FF]  ">
        {/* save and cancel buttons */}
        <div className="w-full flex flex-row fixed z-[100] bg-white border-b-2 border-b-[#00000050] py-4 px-5 items-center justify-between">
          <p className="w-[57%] text-[#0F172A] text-[1.4rem] font-semibold font-inter">
            Add Menu Item
          </p>
          <div className="w-[43%] flex flex-row items-center justify-between">
            <button className="rounded-lg text-white bg-[#004AAD] w-fit px-[2.5rem] py-2 font-Roboto">
              Save
            </button>
            <IoIosCloseCircleOutline
              onClick={() => {
                setIsAddMenuOpen(false);
              }}
              className="text-2xl hover:cursor-pointer"
            />
          </div>
        </div>

        <div className="p-5 relative top-[70px]">
          {/* item name and subcategory */}
          <div className="flex flex-row gap-4 font-inter">
            <div className="w-1/2 mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-[1.2rem] mb-2"
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
                Add Sub Category <span className="text-[#ED4F4F]">*</span>
              </label>
              {categories?.map((category) => (
                <select
                  className="w-full focus:outline-none p-2 border  border-gray-300 rounded-md"
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  key={category._id}
                  required
                >
                  <option value="">Select</option>
                  {category.subcategory.map((subcategory) => (
                    <option value={subcategory._id} key={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              ))}
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
                className="block text-gray-700 text-[1rem] font-inter font-semibold mb-2"
              >
                Base Price <span className="text-[#ED4F4F]">*</span>
              </label>
              <div className="relative font-inter">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold">
                  ₹
                </span>
                <input
                  type="text"
                  id="price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-6 focus:outline-none p-2 border border-gray-300 rounded-md"
                />
              </div>
              <label className="text-[14px] font-[400] mt-4 text-center flex items-center">
                <input type="checkbox" className="size-[1rem] mr-2" />
                Inclusive of all taxes
              </label>
            </div>
          </div>

          {/* food type */}
          <div className="mb-4 font-inter">
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
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    type: prevData.type === "veg" ? "" : "veg",
                  }));
                }}
              >
                <BiFoodTag className="text-2xl text-[#67CE67]" />
                Veg
              </span>
              <span
                className={`flex flex-row items-center gap-2 text-[0.9rem] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                  formData.type === "egg" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    type: prevData.type === "egg" ? "" : "egg",
                  }));
                }}
              >
                <BiFoodTag className="text-2xl text-[#F7C02B]" />
                Egg
              </span>
              <span
                className={`flex flex-row items-center gap-2 px-3 text-[0.9rem] border-2 py-1 rounded-md hover:cursor-pointer ${
                  formData.type === "nonveg" ? "bg-[#004AAD] text-white" : ""
                }`}
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    type: prevData.type === "nonveg" ? "" : "nonveg",
                  }));
                }}
              >
                <BiFoodTag className="text-2xl text-[#ED4F4F]" />
                Non-Veg
              </span>
            </div>
          </div>

          {/* add-ons */}
          <div className="mb-4 font-inter">
            <label
              htmlFor="addone"
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Add-ons
            </label>
            <div className="bg-white px-5 py-3 rounded-lg border border-[#E2E8F0]">
              {addonDetails.map((addon, index) => (
                <div
                  key={index}
                  className="mb-2 flex gap-2 items-end justify-between"
                >
                  <div>
                    <label
                      htmlFor={`addone-name-${index}`}
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
                    <label
                      htmlFor={`addone-price-${index}`}
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
                  <MdOutlineTaskAlt
                    onClick={() => {
                      handleAddone(index);
                    }}
                    className={`${
                      addon.id && "hidden"
                    } text-[#004AAD] bg-white text-[2.5rem] hover:cursor-pointer hover:bg-[#004AAD] hover:text-white transition-all mb-2 rounded-full w-fit h-fit`}
                  />
                  {addon.id && (
                    <MdOutlineDeleteOutline
                      onClick={() => removeAddOn(index)}
                      className="text-red-500 text-[2.5rem] mb-1 hover:cursor-pointer"
                    />
                  )}
                </div>
              ))}
              {showAddNewButton && (
                <p
                  className="text-[#004AAD] font-semibold flex flex-row items-center gap-2 hover:cursor-pointer w-fit mt-4"
                  onClick={addAddOn}
                >
                  <FaPlus className="text-xl" />
                  Add New
                </p>
              )}
            </div>
          </div>

          {/* item description */}
          <div className="mb-4 font-inter">
            <label
              htmlFor="description"
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
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
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Images
            </label>
            <div className="flex flex-col gap-8 bg-white px-5 py-5 rounded-lg border border-[#E2E8F0]">
              <div className="flex flex-row gap-8">
                <div className="size-[90px] bg-[#F8FAFC] rounded-md flex items-center justify-center relative ">
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
                        multiple
                        onChange={(e) => {
                          if (e.target.files) handleImageChange(e.target.files);
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col items-start justify-center">
                  <p className="flex flex-row gap-2 text-[0.9rem] font-bold">
                    Item Image
                  </p>
                  <p className="flex flex-row text-[0.8rem] gap-2">
                    Image format .jpg, .jpeg, .png and minimum size 300x300
                  </p>
                  {error && (
                    <p className="text-[0.9rem] text-red-600">{error}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-4">
                {image.map((image, index) => (
                  <div
                    key={index}
                    className="size-[5.5rem] rounded-md bg-[#F8FAFC] relative"
                  >
                    <img
                      src={image}
                      alt="uploaded"
                      className="w-full h-full rounded-md"
                    />
                    <span
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 text-red-600 hover:cursor-pointer"
                    >
                      <IoCloseCircle size={25} />
                    </span>
                  </div>
                ))}
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
                htmlFor="serves"
                className="block text-gray-700 text-[1rem] font-[400] mb-2"
              >
                Serving info, select no. of people
              </label>

              <select
                className="w-full focus:outline-none p-2 border border-gray-300 rounded-md"
                id="serves"
                name="serves"
                value={formData.serves}
                onChange={handleChange}
              >
                <option value="">Serves</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>

          {/* dish tag */}
          <div className=" lg:mb-4 mb-[200px]">
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
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      tag:
                        prevData.tag === "Chef's Special"
                          ? ""
                          : "Chef's Special",
                    }));
                  }}
                >
                  Chef's Special
                </span>
                <span
                  className={`flex flex-row items-center text-[.9rem] border-2 px-3 py-1 rounded-md hover:cursor-pointer ${
                    formData.tag === "New Launch"
                      ? "bg-[#004AAD] text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      tag: prevData.tag === "New Launch" ? "" : "New Launch",
                    }));
                  }}
                >
                  New Launch
                </span>
                <span
                  className={`flex flex-row items-center gap-2 px-4 text-[.9rem] border-2 py-1 rounded-md hover:cursor-pointer ${
                    formData.tag === "Dairy free"
                      ? "bg-[#004AAD] text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      tag: prevData.tag === "Dairy free" ? "" : "Dairy free",
                    }));
                  }}
                >
                  Dairy free
                </span>
                <span
                  className={`flex flex-row items-center gap-2 px-4 text-[.9rem] border-2 py-1 rounded-md hover:cursor-pointer ${
                    formData.tag === "Vegan" ? "bg-[#004AAD] text-white" : ""
                  }`}
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      tag: prevData.tag === "Vegan" ? "" : "Vegan",
                    }));
                  }}
                >
                  Vegan
                </span>
                <span
                  className={`flex flex-row items-center gap-2 px-4 text-[.9rem] border-2 py-1 rounded-md hover:cursor-pointer ${
                    formData.tag === "Extra Spicy"
                      ? "bg-[#004AAD] text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      tag: prevData.tag === "Extra Spicy" ? "" : "Extra Spicy",
                    }));
                  }}
                >
                  Extra Spicy
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMenuItem;
