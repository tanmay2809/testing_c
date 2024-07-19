import { ChangeEvent, useEffect, useState } from "react";
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

  // const [search, setSearch] = useState("");

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subcategory1, setSubCategory1] = useState<string[]>([]);

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
    console.log(search);
    const inputValue = e.target.value;
    setSearch(inputValue);
    if (!inputValue) {
      // If input value is empty or length is less than or equal to 1, clear search menu items
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
  }, []);

  useEffect(() => {
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

  // console.log(data);

  // setSubCategory(data?.subcategory);

  //console.log(data.category);

  console.log(categories);
  console.log(subcategory1);

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
              isAddMenuOpen || isSubCategoryOpen || isEditMenuOpen
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
                    <div></div>
                    <div className="flex gap-5">
                      <p>Action items </p>
                      <Switch isActive={true} />
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
                    <ItemCard  items={searchMenuItems} />
                  )}
                </div>
              </div>

              {/* bottom */}
              <div>
                <div className="flex flex-row flex-wrap items-center gap-4 px-8 py-5">
                  {categories.map((item) => (
                    <button
                      key={item._id}
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
                    </button>
                  ))}
                  <FiPlus
                    className="text-[2.4rem] rounded-full p-2 bg-[#F0F0F0] text-[#004AAD] hover:cursor-pointer"
                    onClick={() => setCategoryModal(true)}
                  />
                </div>
                {/* {subcategories?.map((subcategory) => ( */}
                <SubCategoryDropdown
                  setIsAddMenuOpen={setIsAddMenuOpen}
                  setIsEditMenuOpen={setIsEditMenuOpen}
                  setIsSubCategoryOpen={setIsSubCategoryOpen}
                  setSelectedCard={setSelectedCard}
                  category={filteredCategory}
                  subcategoryToEdit={setSubCategoryToEdit}
                  editSubcategoryModal={setEditSubCategoryModal}
                />
                {/* ))} */}
              </div>
            </div>

            {/* right div */}
            {(isAddMenuOpen || isSubCategoryOpen || isEditMenuOpen) && (
              <div
                className={`${
                  isAddMenuOpen || isSubCategoryOpen || isEditMenuOpen
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
              </div>
            )}
          </div>
        </div>

        {/* category modal */}
        {categoryModal && <AddCategory isCategoryOpen={setCategoryModal} />}

        {/* edit subcategory modal */}
        {editSubCategoryModal && (
          <EditSubcategory
            activeCategory={filteredCategory}
            categories={categories}
            subcategoryToEdit={subCategoryToEdit}
            setModal={setEditSubCategoryModal}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;