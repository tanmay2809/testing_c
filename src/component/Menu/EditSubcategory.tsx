import { useState } from "react";
import { CategoryItem, SubcategoryItem } from "../../pages/Menu";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "react-toastify";

// icons
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";

// redux
import {
  AppThunkDispatch,
  fetchRestaurantDetails,
} from "../../redux/restaurantData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface EditSubCategoryProps {
  setModal: (isOpen: boolean) => void;
  subcategoryToEdit: SubcategoryItem | undefined;
  categories: CategoryItem[];
  activeCategory: CategoryItem[];
}

interface EditSubCategory {
  name?: string;
  category?: string;
  image?: string;
  subcategory?: string;
}

const EditSubcategory: React.FC<EditSubCategoryProps> = ({
  setModal,
  subcategoryToEdit,
  activeCategory,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | undefined>(
    subcategoryToEdit?.image
  );
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<EditSubCategory>({
    name: subcategoryToEdit?.name,
    image: subcategoryToEdit?.image,
    category: activeCategory[0]._id,
    subcategory: subcategoryToEdit?._id,
  });

  // remove image function
  const removeImage = () => {
    setImage("");
    setFormData({
      ...formData,
      image: "",
    });
  };

  // onchange handler
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // file change handler
  const handleImageChange = async (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Only .jpg, .jpeg, .png are allowed.");
      return;
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

    if (!isValidSize) return;

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
      if (response.data.status && response.data.data) {
        const url = response.data.data[0].url;
        setImage(url);
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: url,
        }));
        setError("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch: AppThunkDispatch = useDispatch();
  const resData = useSelector((state: RootState) => state.resturantdata);

  // form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/editSubCategory`,
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
        setLoading(false);
        setModal(false);
        toast.success("Subcategory Edit successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-full overflow-y-scroll no-scrollbar">
      <form onSubmit={handleSubmit} className="bg-[#EEF5FF]">
        {/* save and cancel buttons */}
        <div className="w-full flex flex-row fixed z-[100] bg-white border-b-2 border-b-[#00000050] py-4  px-5 items-center justify-between">
          <p className="w-[57%] text-[#0F172A] text-[1.4rem] font-semibold font-Roboto">
            Edit Sub-Category
          </p>
          <div className="w-[43%] flex flex-row items-center justify-between font-Roboto">
            <button className="rounded-lg text-white bg-[#004AAD] w-fit px-[2.5rem] py-2">
              {loading ? (
                <div className="inline-block  h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              ) : (
                <span>Save</span>
              )}
            </button>
            <IoIosCloseCircleOutline
              onClick={() => {
                setModal(false);
              }}
              className="text-2xl hover:cursor-pointer"
            />
          </div>
        </div>

        {/* sub category name */}
        <div className="p-5 relative top-[70px]">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-[1.2rem] font-inter mb-2"
            >
              Sub Category name <span className="text-[#ED4F4F]">*</span>
            </label>
            <input
              placeholder="Eg: Starter"
              type="text"
              id="subcategory"
              name="name"
              value={formData.name}
              onChange={handleChange}
              // required
              className="w-full focus:outline-none p-2 border border-gray-300 rounded-md font-inter"
            />
          </div>

          {/* Images */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-[1.2rem] font-Roboto mb-2"
            >
              Sub-Category icon
              <p className=" font-Roboto text-[.8rem] m-1">
                one image at a time allowed
              </p>
            </label>
            <div className="flex flex-row gap-8 bg-white px-5 py-3 rounded-lg border border-[#E2E8F0]">
              <div className="size-[90px] bg-[#F8FAFC] rounded-md flex items-center justify-center relative ">
                {image === "" ? (
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
                          if (e.target.files && e.target.files[0])
                            handleImageChange(e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <img src={image} alt="uploaded"></img>
                    <span
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 text-red-600 hover:cursor-pointer"
                    >
                      <IoCloseCircle size={24} />
                    </span>
                  </div>
                )}
              </div>
              <div className="w-1/2 flex flex-col items-start justify-center font-inter">
                <p className="flex flex-row gap-2 text-[0.9rem] font-bold">
                  sub-category icon
                  <span className="text-[#ED4F4F]">*</span>
                </p>
                <p className="flex flex-row text-[0.8rem] gap-2">
                  Image format .jpg, .jpeg, .png and minimum size 300x300
                </p>
                {error && <p className="text-[0.9rem] text-red-600">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSubcategory;
