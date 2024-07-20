import React, { ChangeEvent, useEffect, useState } from "react";
import Switch from "../component/Menu/switch";
import axios from "axios";
import AddMenuItem, { MenuItem } from "../component/Menu/AddMenuItem";
import EditMenuItem from "../component/Menu/EditMenu";
import AddSubCategory from "../component/Menu/AddSubCategory";
import AddCategory from "../component/Menu/AddCategory";
import EditSubcategory from "../component/Menu/EditSubcategory";
import SubCategoryDropdown from "../component/Menu/SubCategoryDropdown";

//redux
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

//icons
import { FiPlus } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { baseUrl } from "../main";
import ItemCard from "../component/Menu/ItemCard";

// assets
import FoodMenu from "../assets/Food Menu.png";
import Burger from "../assets/Burger.png";
import Category from "../assets/category.png";
import Bussiness from "../assets/Business Task list.png";
import { MdDelete } from "react-icons/md";

export interface SubcategoryItem {
  _id: string;
  name: string;
  image: string;
  menuItems: MenuItem[];
  active: boolean;
}

export interface CategoryItem {
  _id: string;
  name: string;
  subcategory: any[];
}

const Menu = () => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState<boolean>(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState<boolean>(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState<boolean>(false);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [editSubCategoryModal, setEditSubCategoryModal] =
    useState<boolean>(false);

  const [selectedCard, setSelectedCard] = useState<MenuItem | null>(null);

  const [subCategoryToEdit, setSubCategoryToEdit] = useState<SubcategoryItem>();

  const [hoveredCategoryId, setHoveredCategoryId] = useState<string>();

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subcategory1, setSubCategory1] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    categories[0]?._id
  );

  const getSubcategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/getsubcategory/6694e0b752c576ffb9881135`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.subcategories));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //search bar
  const [search, setSearch] = useState<string>("");
  const [searchMenuItems, setSearchMenuItems] = useState<
    MenuItem[] | undefined
  >();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    if (!inputValue) {
      setSearchMenuItems(undefined);
      return;
    }
    searchMenu(inputValue);
  };

  const searchMenu = async (inputValue: string) => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/searchMenuItems/668857dc758bf97a4d1406ab/${inputValue}`,
        headers: {},
      };

      const response = await axios.request(config);
      console.log(response.data.menuItems);
      setSearchMenuItems(response.data.menuItems);
    } catch (error) {
      console.log(error);
    }
  };
  // // handle search
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // console.log(search);
  //   const inputValue = e.target.value;
  //   setSearch(inputValue);
  //   if (!inputValue) {
  //     // If input value is empty or length is less than or equal to 1, clear search menu items
  //     //setSearchMenuItems([]);
  //     return;
  //   }

  //   setSearch(inputValue);
  //   //searchMenu();
  // };

  // fetch categories
  const { data, loading, error } = useSelector(
    (state: RootState) => state.resturantdata
  );

  useEffect(() => {
    getSubcategories();
    if (data) {
      setCategories(data.category || []);
      setSubCategory1(data.category?.subcategory || []);
    }
    if (categories.length > 0) {
      setSelectedCategoryId(categories[0]._id);
    }
  }, [data, categories]);

  console.log([categories[0]]);

  const filteredCategory = selectedCategoryId
    ? categories.filter((category) => category._id === selectedCategoryId)
    : categories.length > 0
    ? [categories[0]]
    : [];

  const handleSelectedType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  // console.log(data);

  // setSubCategory(data?.subcategory);

  //console.log(data.category);

  console.log(categories);
  console.log(subcategory1);
  console.log(selectedType);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {/* <Loader /> */}
        loading.....
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full h-fit flex justify-center items-center">
        error.....
      </div>
    );
  }
  return (
    <div className="w-full h-fit relative ">
      <div className=" w-[93%]  h-fit flex items-center justify-center ml-[7%]  ">
        <div className="w-full h-fit flex mt-[70px] ">
          {/* left div */}
          <div
            className={` flex flex-col h-fit ${
              isAddMenuOpen ||
              isSubCategoryOpen ||
              isEditMenuOpen ||
              editSubCategoryModal
                ? "w-[65%] pr-5"
                : "w-[100%]"
            }`}
          >
            {/* top */}
            <div className="w-full h-fit flex flex-col px-10 py-5  border-b  ">
              <div className="w-full h-fit flex flex-col px-10 py-5  border-b  ">
                <div className="w-full h-fit flex  items-center justify-between">
                  <div className="w-[50%]">
                    <p className="text-[1.7rem] font-bold text-[#000000]">
                      Menu
                    </p>
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
                        setIsEditMenuOpen(false);
                        setEditSubCategoryModal(false);
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
                        setIsEditMenuOpen(false);
                        setEditSubCategoryModal(false);
                      }}
                    >
                      <FiPlus />
                      Add item
                    </button>
                  </div>
                </div>

                <div className="w-full h-fit flex items-center justify-between mt-5">
                  {/* Search result */}
                  <div className="relative w-[35%]  flex items-center rounded-md border border-[#407fd1]  ">
                    <input
                      className="w-full sm:py-2 py-3 px-8 rounded-lg"
                      type="text"
                      value={search}
                      onChange={handleSearch}
                      placeholder="Search menu ..."
                    />
                    <CiSearch className="absolute text-[1.3rem] font-semibold ml-2 " />
                  </div>

                  <div className="flex items-center gap-5">
                    <div>
                      <select
                        className="w-full px-8 focus:outline-none p-2 border  border-gray-300 rounded-md"
                        id="filter"
                        name="filter"
                        value={selectedType}
                        onChange={handleSelectedType}
                      >
                        <option value="">All Menu</option>
                        <option value="Veg">Veg</option>
                        <option value="Egg">Egg</option>
                        <option value="Non-Veg">Non-Veg</option>
                      </select>
                    </div>
                    <div className="flex gap-5">
                      <p>Active items </p>
                      <Switch onclick={() => {}} isActive={true} />
                    </div>
                  </div>
                </div>
                {searchMenuItems && (
                  <div className="w-full h-fit ml-2 mt-4 text-[1.5rem] font-semibold">
                    <p className="border-b pb-3 border-black mb-3">
                      Search result
                    </p>
                  </div>
                )}

                <div className="flex flex-row flex-wrap gap-2 sm:gap-4">
                  {search && searchMenuItems && (
                    <ItemCard
                      setIsEditMenuOpen={setIsEditMenuOpen}
                      setSelectedCard={setSelectedCard}
                      setIsSubCategoryOpen={setIsSubCategoryOpen}
                      setIsAddMenuOpen={setIsAddMenuOpen}
                      editSubcategoryModal={setEditSubCategoryModal}
                      items={searchMenuItems}
                    />
                  )}
                </div>
              </div>

              {/* bottom */}
              <div>
                {/* If no category present */}
                {categories.length === 0 && (
                  <div className="w-full h-fit sm:p-9 px-1 py-4 flex flex-col sm:gap-10 gap-7 sm:mb-0 mb-5 font-inter">
                    <div className="flex items-center gap-6 ">
                      <img className=" size-20" src={FoodMenu} alt="" />
                      <p className="sm:text-[1.7rem] text-[1.5rem] text-[#4B4B4B] font-semibold">
                        Create Menu in 2 easy steps
                      </p>
                    </div>
                    <div className="flex items-center gap-10 sm:ml-3 ml-4 ">
                      <img className="size-12" src={Category} alt="" />
                      <div>
                        <p className="sm:text-[1.2rem] text-[1.1rem] font-[500]">
                          Add Main Category + Under-Category
                        </p>
                        <p className="text-[.9rem]">
                          Helps to structure your menu for customers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-10 sm:ml-3 ml-4 ">
                      <img className="size-12" src={Burger} alt="" />
                      <div>
                        <p className="sm:text-[1.2rem] text-[1.1rem] font-[500]">
                          Add items and their details
                        </p>
                        <p className="text-[.9rem]">
                          The right price and description helps in increasing
                          orders
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCategoryModal(true)}
                      className="bg-[#004AAD] sm:w-[20%] px-5 py-3 rounded-md border text-[1.1rem] font-semibold  border-[#000000B2] text-white"
                    >
                      Start Creating !
                    </button>
                  </div>
                )}

                {/* Main category buttons */}
                <div className="flex flex-row flex-wrap items-center gap-4 px-8 py-5">
                  {categories.map((item) => (
                    <button
                      key={item._id}
                      className={`${
                        item._id === selectedCategoryId
                          ? "bg-white text-[#004AAD]"
                          : "bg-[#004AAD] text-white"
                      } font-semibold text-[1rem] px-5 py-2 border-[0.1rem] border-[#004AAD] rounded-md flex items-center gap-3 text-nowrap relative`}
                      onClick={() => setSelectedCategoryId(item._id)}
                      onMouseEnter={() => setHoveredCategoryId(item._id)}
                      onMouseLeave={() => setHoveredCategoryId("")}
                    >
                      {item?.name}
                      {hoveredCategoryId === item._id && (
                        <MdDelete
                          className="bg-white outline-1 outline-white rounded-md absolute text-[1.7rem] -top-3 -right-3 text-red-500"
                          onClick={() => {}}
                        />
                      )}
                    </button>
                  ))}
                  <FiPlus
                    className="text-[2.4rem] rounded-full p-2 bg-[#F0F0F0] text-[#004AAD] hover:cursor-pointer"
                    onClick={() => setCategoryModal(true)}
                  />
                </div>

                {/* If no subcategory present */}
                {filteredCategory[0]?.subcategory.length === 0 && (
                  <div className="w-full flex flex-col items-center gap-10 font-inter">
                    <img src={Bussiness} className="w-[15%] h-auto" />
                    <div className="flex flex-col gap-2 items-center">
                      <h1 className="text-[1.5rem] text-[#4B4B4B] font-semibold">
                        Main Category successfully created
                      </h1>
                      <p className="text-[1.3rem] text-[#AAA5A5] font-semibold">
                        Now Add sub category & Menu items
                      </p>
                    </div>
                  </div>
                )}

                <SubCategoryDropdown
                  setIsAddMenuOpen={setIsAddMenuOpen}
                  setIsEditMenuOpen={setIsEditMenuOpen}
                  setIsSubCategoryOpen={setIsSubCategoryOpen}
                  setSelectedCard={setSelectedCard}
                  category={filteredCategory}
                  subcategoryToEdit={setSubCategoryToEdit}
                  editSubcategoryModal={setEditSubCategoryModal}
                />
              </div>
            </div>

            {/* right div */}
            {(isAddMenuOpen ||
              isSubCategoryOpen ||
              isEditMenuOpen ||
              editSubCategoryModal) && (
              <div
                className={`${
                  isAddMenuOpen ||
                  isSubCategoryOpen ||
                  isEditMenuOpen ||
                  editSubCategoryModal
                    ? "flex bg-[#EEF5FF] flex-col fixed top-[70px] border-l-2 border-l-[#00000050] right-0 h-[calc(100%-70px)] w-[35%] overflow-auto"
                    : "hidden"
                }`}
              >
                {/* add menu item form */}
                {isAddMenuOpen && (
                  <AddMenuItem
                    categories={filteredCategory}
                    setIsAddMenuOpen={setIsAddMenuOpen}
                  />
                )}

                {/* add sub category form */}
                {isSubCategoryOpen && (
                  <AddSubCategory
                    category={filteredCategory}
                    setIsSubCategoryOpen={setIsSubCategoryOpen}
                  />
                )}

                {/* edit menu form */}
                {isEditMenuOpen && selectedCard && (
                  <EditMenuItem
                    setIsEditMenu={setIsEditMenuOpen}
                    item={selectedCard}
                  />
                )}
                {editSubCategoryModal && (
                  <EditSubcategory
                    activeCategory={filteredCategory}
                    categories={categories}
                    subcategoryToEdit={subCategoryToEdit}
                    setModal={setEditSubCategoryModal}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* category modal */}
        {categoryModal && <AddCategory isCategoryOpen={setCategoryModal} />}
      </div>
    </div>
  );
};

export default Menu;
