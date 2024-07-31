import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl } from "../main";
import { toast } from "react-toastify";

// components
import EditMenuItem, { EditItem } from "../component/Menu/EditMenu";
import AddSubCategory from "../component/Menu/AddSubCategory";
import AddCategory from "../component/Menu/AddCategory";
import EditSubcategory from "../component/Menu/EditSubcategory";
import SubCategoryDropdown from "../component/Menu/SubCategoryDropdown";
import ItemCard from "../component/Menu/ItemCard";
import AddMenuItem, { MenuItem } from "../component/Menu/AddMenuItem";
import Switch from "../component/Menu/switch";
import CategoryDelete from "../component/Menu/CategoryDelete";
import EditCategory from "../component/Menu/EditCategory";
import Loaging from "../component/outlet/Loader1/Loaging";

//redux
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  AppThunkDispatch,
  fetchRestaurantDetails,
} from "../redux/restaurantData";
import { useDispatch } from "react-redux";

//icons
import { FiPlus } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoIosCloseCircleOutline, IoMdMore } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

// assets
import FoodMenu from "../assets/Food Menu.png";
import Burger from "../assets/Burger.png";
import Category from "../assets/category.png";
import Bussiness from "../assets/Business Task list.png";

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
  active: boolean;
}

const Menu = () => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState<boolean>(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState<boolean>(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState<boolean>(false);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [editCategoryModal, setEditCategoryModal] = useState<boolean>(false);
  const [editSubCategoryModal, setEditSubCategoryModal] =
    useState<boolean>(false);

  const [selectedCard, setSelectedCard] = useState<MenuItem | EditItem | null>(
    null
  );

  const [categoryName, setCategoryName] = useState<string>("");

  const resdata = useSelector((state: RootState) => state.resturantdata);

  const isAnyMenuOpen =
    isAddMenuOpen ||
    isSubCategoryOpen ||
    isEditMenuOpen ||
    editSubCategoryModal;

  const [subCategoryToEdit, setSubCategoryToEdit] = useState<SubcategoryItem>();

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [showActive, setShowActive] = useState<boolean>(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    categories[0]?._id
  );

  const [categoryDelete, setCategoryDelete] = useState<boolean>(false);

  const [dropdownVisible, setDropdownVisible] = useState<string>("");

  const isFirstLoad = useRef(true);

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
        url: `${baseUrl}/api/searchMenuItems/${resdata.data._id}/${inputValue}`,
        headers: {},
      };

      const response = await axios.request(config);
      console.log(response.data.menuItems);
      const items = response.data.menuItems.filter(
        (item: MenuItem) => item.category === selectedCategoryId
      );
      setSearchMenuItems(items);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch: AppThunkDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.resturantdata
  );

  // more button of category
  const handleMoreClick = (categoryId: string) => {
    setDropdownVisible(dropdownVisible === categoryId ? "" : categoryId);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownVisible("");
  };

  useEffect(() => {
    if (data) {
      setCategories(data.category || []);
    }
    if (isFirstLoad.current && categories.length > 0) {
      setSelectedCategoryId(categories[0]._id);
      isFirstLoad.current = false;
    }
  }, [data, categories]);

  const filteredCategory = selectedCategoryId
    ? categories.filter((category) => category._id === selectedCategoryId)
    : categories.length > 0
    ? [categories[0]]
    : [];

  const handleSelectedType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  const filterItems = (items: MenuItem[]) => {
    return items.filter((item) => {
      const types =
        selectedType === "" ||
        (selectedType === "Veg" && item.type === "veg") ||
        (selectedType === "Non-Veg" && item.type === "nonveg") ||
        (selectedType === "Egg" && item.type === "egg");
      const active = showActive ? item.active : !item.active || true;
      return types && active;
    });
  };

  const handleToggleCategory = (id: string) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/toggleCategory/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        dispatch(fetchRestaurantDetails({ id: data._id }));
        toast.success("Category Toggled");
      })
      .catch((error) => {
        console.log(error);
      });
  };


   // navbar fram
   const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {/* <Loader /> */}
        <Loaging />
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
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className="w-full lg:w-[93%]  h-fit flex items-center justify-center lg:ml-[7%]  ">
        <div onClick={handlefram} className="w-full h-fit flex mt-[70px]  ">
          {/* left div */}
          <div
            className={` flex flex-col h-fit ${
              isAddMenuOpen ||
              isSubCategoryOpen ||
              isEditMenuOpen ||
              editSubCategoryModal
                ? "w-[100%] lg:w-[65%] pr-5"
                : "w-[100%]"
            }`}
          >
            {/* top */}
            <div className="w-full h-fit flex flex-col px-10 py-5  border-b  ">
              <div className="w-full h-fit flex flex-col py-5  border-b  ">
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
                  <div className="relative w-[35%] flex items-center rounded-md border border-[#407fd1]">
                    <input
                      className="w-full sm:py-2 py-3 px-8 rounded-lg"
                      type="text"
                      value={search}
                      onChange={handleSearch}
                      placeholder="Search menu ..."
                    />
                    <CiSearch className="absolute text-[1.3rem] font-semibold ml-2" />
                    {search && (
                      <button
                        type="button"
                        className="absolute right-2 text-[1.3rem] font-semibold"
                        onClick={() => setSearch("")}
                      >
                        <IoIosCloseCircleOutline className="text-[1.5rem]" />
                      </button>
                    )}
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
                      <Switch
                        onclick={() => {
                          setShowActive(!showActive);
                        }}
                        isActive={showActive}
                      />
                    </div>
                  </div>
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
                <div className="flex flex-row flex-wrap items-center gap-4 py-5">
                  {categories.map((item) => (
                    <div key={item._id} className="relative">
                      <button
                        className={`${
                          item._id === selectedCategoryId
                            ? "bg-white text-[#004AAD]"
                            : "bg-[#004AAD] text-white"
                        } font-semibold text-[1rem] px-5 py-2 border-[0.1rem] border-[#004AAD] rounded-md flex items-center gap-3 text-nowrap`}
                        onClick={() => {
                          setSelectedCategoryId(item._id);
                        }}
                      >
                        {item?.name}
                        <div
                          className="text-[1.2rem] ml-auto cursor-pointer"
                          onClick={(e) => {
                            setSelectedCategoryId(item._id);
                            handleActionClick(e);
                            handleMoreClick(item._id);
                          }}
                        >
                          <IoMdMore className="text-[1.5rem]" />
                        </div>
                        {dropdownVisible === item._id && (
                          <div className="absolute w-fit z-[100] right-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                            <button
                              className="flex flex-row gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={(e) => {
                                setDropdownVisible("");
                                handleToggleCategory(item._id);
                                handleActionClick(e);
                              }}
                            >
                              Status
                              <Switch
                                onclick={() => {}}
                                isActive={item.active}
                              />
                            </button>
                            <button
                              className="flex flex-row justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={(e) => {
                                setDropdownVisible("");
                                setEditCategoryModal(true);
                                setCategoryName(item.name);
                                handleActionClick(e);
                              }}
                            >
                              Edit
                              <MdModeEditOutline className="text-[1.2rem] text-[#004AAD]" />
                            </button>
                            <button
                              className="flex flex-row justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={(e) => {
                                setCategoryDelete(true);
                                setDropdownVisible("");
                                handleActionClick(e);
                              }}
                            >
                              Delete
                              <FiTrash2 className="bg-transparent text-[1.4rem] -top-3 -right-3 text-[#BE1D3A]" />
                            </button>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                  {categories.length > 0 && (
                    <FiPlus
                      className="text-[2.4rem] rounded-full p-2 bg-[#F0F0F0] text-[#004AAD] hover:cursor-pointer"
                      onClick={() => setCategoryModal(true)}
                    />
                  )}
                </div>

                {/* If no subcategory present */}
                {search === "" &&
                  filteredCategory[0]?.subcategory.length === 0 && (
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

                {/* Search Results */}
                {searchMenuItems && (
                  <div className="w-full flex flex-row items-center gap-2 h-fit ml-2 mb-4 mt-4 text-[1.5rem] font-semibold">
                    <BiSearchAlt2 className="text-[2rem] rotate-90 mt-1" />
                    <p className="text-[1.7rem] font-semibold">Search result</p>
                  </div>
                )}

                {search && searchMenuItems ? (
                  <ItemCard
                    setIsEditMenuOpen={setIsEditMenuOpen}
                    setSelectedCard={setSelectedCard}
                    setIsSubCategoryOpen={setIsSubCategoryOpen}
                    setIsAddMenuOpen={setIsAddMenuOpen}
                    editSubcategoryModal={setEditSubCategoryModal}
                    items={filterItems(searchMenuItems)}
                    showActive={showActive}
                  />
                ) : (
                  <SubCategoryDropdown
                    setIsAddMenuOpen={setIsAddMenuOpen}
                    setIsEditMenuOpen={setIsEditMenuOpen}
                    setIsSubCategoryOpen={setIsSubCategoryOpen}
                    setSelectedCard={setSelectedCard}
                    subcategoryToEdit={setSubCategoryToEdit}
                    editSubcategoryModal={setEditSubCategoryModal}
                    selectedType={selectedType}
                    category={filteredCategory}
                    showActive={showActive}
                  />
                )}
              </div>
            </div>

            {/* right div */}
            <div className="">
              {/* Overlay */}
              {isAnyMenuOpen && (
                <div className="fixed inset-0 lg:inset-auto bg-gray-500 w-full h-full lg:opacity-0 opacity-50 transition-opacity duration-300" />
              )}
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
                      ? "flex bg-[#EEF5FF] flex-col fixed top-[70px] border-l-2 border-l-[#00000050] right-0 h-full lg:h-[calc(100%-70px)] w-[100%] sm:w-[75%] md:w-[65%] lg:w-[35%] overflow-auto transition-transform transform translate-x-full md:translate-x-0"
                      : "hidden"
                  } slide-in-right`}
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
                      item={selectedCard as EditItem}
                      categories={filteredCategory}
                    />
                  )}

                  {/* edit subcategory form */}
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
        </div>

        {/* category modal */}
        {categoryModal && <AddCategory isCategoryOpen={setCategoryModal} />}

        {/* edit category modal */}
        {editCategoryModal && (
          <EditCategory
            categoryID={selectedCategoryId}
            categoryName={categoryName}
            isCategoryOpen={setEditCategoryModal}
          />
        )}

        {/* category delete modal */}
        {categoryDelete && (
          <CategoryDelete
            setModal={setCategoryDelete}
            categoryID={selectedCategoryId}
            restaurantID={resdata.data._id}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
