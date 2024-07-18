import { useState } from "react";

// icons
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CategoryItem, SubcategoryItem } from "../../pages/Menu";

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
}

const EditSubcategory: React.FC<EditSubCategoryProps> = ({
  setModal,
  subcategoryToEdit,
  categories,
  activeCategory,
}) => {
  const [formData, setFormData] = useState<EditSubCategory>({
    name: subcategoryToEdit?.name,
    image: subcategoryToEdit?.image,
    category: activeCategory[0]._id,
  });

  // onchange handler
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      id="default-modal"
      // tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50`}
    >
      <div className={`p-4 w-full sm:w-fit h-fit`}>
        <div className="w-[380px] relative bg-white rounded-lg shadow">
          <div className="flex flex-row items-center justify-between gap-8 border-b-2 px-10 py-4">
            <div className="flex flex-col">
              <h1 className="text-[1.5rem] font-[500]">Edit Sub Category</h1>
            </div>
            <IoIosCloseCircleOutline
              onClick={() => {
                setModal(false);
              }}
              className="text-[1.7rem] hover:cursor-pointer"
            />
          </div>
          <div className="flex flex-col mt-2 px-8 pb-5">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 justify-center"
            >
              <div className="flex flex-col gap-1">
                <label className="flex flex-row mt-2 items-center text-[#0F172A] text-[1.2rem] font-Roboto">
                  Sub Category name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full py-2 px-4 mt-2 focus:outline-none border-2 border-[#00000033] rounded-[8px] text-[18px]"
                  placeholder="Sub-Category name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label className="text-[18px] font-[400] mt-2 gap-3 text-center flex justify-betwee items-center">
                  <input
                    type="checkbox"
                    // checked={rememberMe}
                    // onChange={() => setRememberMe(!rememberMe)}
                    className="size-[16px] "
                  />
                  Mark as Main Primary
                </label>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-[1.2rem] font-inter mb-2"
                >
                  Select Main Category
                </label>
                <select
                  className="w-full focus:outline-none p-2 border  border-gray-300 rounded-md"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Main Category</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-row gap-5 mt-3">
                <button
                  className="w-[50%]  text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-2"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
                <button className="w-[50%] bg-[#004AAD]  text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-2">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubcategory;
