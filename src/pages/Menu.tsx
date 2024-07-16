import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantDetails } from "../redux/menuslice";
import type { RootState, AppDispatch } from "../redux/store";
import Switch from "../component/Menu/switch";
import axios from "axios";
import AddMenuItem from "../component/Menu/AddMenuItem";
import EditMenuItem from "../component/Menu/EditMenu";
import AddSubCategory from "../component/Menu/AddSubCategory";
import AddCategory from "../component/Menu/AddCategory";
import EditSubcategory from "../component/Menu/EditSubcategory";
import SubCategoryDropdown from "../component/Menu/SubCategoryDropdown";

//icons
import { FiPlus } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

const Item = [
  {
    id: 1,
    name: "Hulk Beast Burger",
    image: "",
    description: "",
    price: "500",
    category: "",
    subcategory: "",
    serving: "",
    tag: "",
    active: true,
    categoryActive: true,
    clicks: 0,
    addone: [{ name: "", additionalPrice: "" }],
    type: "veg",
  },
];

const Menu = () => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState<boolean>(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState<boolean>(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState<boolean>(false);
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [editSubCategoryModal, setEditSubCategoryModal] =
    useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  console.log(selectedCard);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(search);
    const inputValue = e.target.value;
    setSearch(inputValue);
    if (!inputValue) {
      // If input value is empty or length is less than or equal to 1, clear search menu items
      //setSearchMenuItems([]);
      return;
    }

    setSearch(inputValue);
    //searchMenu();
  };

  const { data, loading, error } = useSelector(
    (state: RootState) => state.resturantdata
  );
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();

  const id: string = "668857dc758bf97a4d1406ab";

  const [category1, setCategory1] = useState<string[]>([]);
  const [subcategory1, setSubCategory1] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantDetails({ id }) as any);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      setCategory1(data.category || []);
      setSubCategory1(data.category?.subcategory || []);
    }
  }, [data]);

  console.log(data);

  // setSubCategory(data?.subcategory);

  //console.log(data.category);

  console.log(category1);
  console.log(subcategory1);

  // post sub category
  const addCategory = async () => {
    const data = mainCategoryFormData;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/addCategory/668857dc758bf97a4d1406ab",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response.data));
      // Handle successful response here
    } catch (error) {
      console.error("Error adding category:", error);
      // Handle error here
    }
  };

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
              </div>

              {/* bottom */}
              <div>
                <div className="flex flex-row items-center gap-4 px-8 py-5">
                  {category1.map((item, index) => (
                    <button
                      key={index}
                      className="bg-[#004AAD] text-white font-semibold text-[1rem] px-5 py-2 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap"
                      onClick={() => setIsEditMenuOpen(!isEditMenuOpen)}
                    >
                      {(item?.name as string) || ""}
                    </button>

                    // setsubcategory1(item?.subcategory || '');
                  ))}
                  {/* <button
              <div className="flex flex-row items-center gap-4 px-8 py-5">
                {category1.map((item, index) => (
                  <button
                    key={index}
                    className="bg-[#004AAD] text-white font-semibold text-[1rem] px-5 py-2 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap"
                    onClick={() => setIsEditMenuOpen(!isEditMenuOpen)}
                  >
                    {(item?.name as string) || ""}
                  </button>

                  // setsubcategory1(item?.subcategory || '');
                ))}
                {/* <button
                  onClick={() => setIsEditMenuOpen(!isEditMenuOpen)}
                  className="bg-[#004AAD] text-white font-semibold text-[1rem] px-5 py-2 border border-[#E2E8F0] rounded-md flex items-center gap-3 text-nowrap"
                >
                  Food Menu
                </button> */}
                  <FiPlus
                    className="text-[2.4rem] rounded-full p-2 bg-[#F0F0F0] text-[#004AAD] hover:cursor-pointer"
                    onClick={() => setCategoryModal(true)}
                  />
                </div>
                <SubCategoryDropdown
                  setIsAddMenuOpen={setIsAddMenuOpen}
                  setIsEditMenuOpen={setIsEditMenuOpen}
                  setIsSubCategoryOpen={setIsSubCategoryOpen}
                  setSelectedCard={setSelectedCard}
                  categories={[{ name: "Pizza", count: 6 }]}
                  items={Item}
                />
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
                  <AddMenuItem setIsAddMenuOpen={setIsAddMenuOpen} />
                )}

                {/* add sub category form */}
                {isSubCategoryOpen && (
                  <AddSubCategory setIsSubCategoryOpen={setIsSubCategoryOpen} />
                )}

                {/* edit menu form */}
                {isEditMenuOpen && selectedCard && (
                  <EditMenuItem
                    setIsEditMenu={setIsEditMenuOpen}
                    item={Item[selectedCard]}
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
          <EditSubcategory setModal={setEditSubCategoryModal} />
        )}
      </div>
    </div>
  );
};

export default Menu;
