import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";

interface SubCategory {
  name: string;
  image: string;
}

interface SubCategoryProps {
  setIsSubCategoryOpen: (isOpen: boolean) => void;
}

const AddSubCategory: React.FC<SubCategoryProps> = ({
  setIsSubCategoryOpen,
}) => {
  const [image, setImage] = useState<string | null>(null);

  const [formData, setFormData] = useState<SubCategory>({
    name: "",
    image: "",
  });

  // onchange handler
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // file change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const image = URL.createObjectURL(file);
      setImage(image);
      setFormData({
        ...formData,
        image: image,
      });
    }
  };

  // remove image function
  const removeImage = () => {
    setImage(null);
    setFormData({
      ...formData,
      image: "",
    });
  };

  // form submit handler
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
          <p className="w-[57%] text-[#0F172A] text-[1.4rem] font-semibold font-Roboto">
            Add Sub-Category
          </p>
          <div className="w-[43%] flex flex-row items-center justify-between font-Roboto">
            <button className="rounded-xl text-white bg-[#004AAD] w-fit px-[2.5rem] py-2">
              Save
            </button>
            <IoIosCloseCircleOutline
              onClick={() => {
                setIsSubCategoryOpen(false);
              }}
              className="text-2xl hover:cursor-pointer"
            />
          </div>
        </div>

        {/* sub category name */}
        <div className="p-5">
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
              Sub-Category icon{" "}
              <p className=" font-Roboto text-[.8rem] m-1">
                one image at a time allowed
              </p>
            </label>
            <div className="flex flex-row gap-8 bg-white px-5 py-3 rounded-lg border border-[#E2E8F0]">
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
                      <IoCloseCircle size={24} />
                    </button>
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSubCategory;
