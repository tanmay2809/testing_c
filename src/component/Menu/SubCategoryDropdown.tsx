import React, { useState } from "react";

// icons
import { MdDragIndicator, MdModeEditOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";

// assets
import { SubcategoryItem } from "../../pages/Menu";
import { MenuItem } from "./AddMenuItem";
import ItemCard from "./ItemCard";
import SubCategoryDeleteModal from "./SubCategoryDelete";

interface Props {
  category:
    | { _id: string; name: string; subcategory: SubcategoryItem[] }[]
    | undefined;
  setIsEditMenuOpen: (isOpen: boolean) => void;
  setSelectedCard: (index: MenuItem) => void;
  setIsSubCategoryOpen: (isOpen: boolean) => void;
  setIsAddMenuOpen: (isOpen: boolean) => void;
  subcategoryToEdit: (index: SubcategoryItem) => void;
  editSubcategoryModal: (index: boolean) => void;
}

const SubCategoryDropdown: React.FC<Props> = ({
  category,
  setIsEditMenuOpen,
  setSelectedCard,
  setIsSubCategoryOpen,
  setIsAddMenuOpen,
  subcategoryToEdit,
  editSubcategoryModal,
}) => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [subDeleteModal, setSubDeleteModal] = useState<boolean>(false);
  const [subcategoryToDelete, setSubcategoryToDelete] =
    useState<SubcategoryItem>();
  const [categoryID, setCategoryID] = useState<string>("");

  // toggle function to differentiate in dropwdowns
  const handleToggle = (id: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="space-y-2">
      {category?.map((cat) => (
        <div className="flex flex-col gap-4" key={cat.name}>
          {cat.subcategory.map((subcategory) => (
            <div key={subcategory._id}>
              <div
                className="w-full h-fit px-4 py-3 border-2 rounded-[0.5rem] flex flex-row justify-between items-center font-Roboto"
                role="button"
              >
                <div className="w-fit flex flex-row items-center text-[1.5rem] gap-4">
                  <MdDragIndicator />
                  <IoMdArrowDropdown
                    className={`text-[#004AAD] ${
                      isOpen[subcategory._id] && "transform rotate-180"
                    }`}
                    onClick={() => handleToggle(subcategory._id)}
                  />
                  <img src={subcategory.image} alt="Pizza" className="w-10" />
                  <p className="text-[1.2rem] font-semibold">
                    {subcategory.name} ({subcategory.menuItems.length})
                  </p>
                </div>
                <div className="w-fit flex flex-row items-center text-[1.5rem] gap-4 text-[#004AAD]">
                  <IoTrashOutline
                    onClick={() => {
                      setCategoryID(cat._id);
                      setSubcategoryToDelete(subcategory);
                      setSubDeleteModal(true);
                    }}
                    className="hover:cursor-pointer"
                  />
                  <MdModeEditOutline
                    onClick={() => {
                      editSubcategoryModal(true);
                      subcategoryToEdit(subcategory);
                    }}
                    className="hover:cursor-pointer"
                  />
                </div>
              </div>
              {/* Items cards */}
              {isOpen[subcategory._id] && (
                <div className="flex flex-row flex-wrap px-2 py-4 gap-x-4 gap-y-4">
                  {/* {subcategory.menuItems.map((item) => (
                    <div
                      key={item._id}
                      className="w-[240px] h-[180px] p-4 border-2 rounded-[0.3rem] flex flex-col font-Roboto gap-8"
                    >
                      <div className="flex flex-row justify-between">
                        <p className="text-[1.1rem] font-semibold break-all text-wrap">
                          {item.name}
                        </p>
                        <BiFoodTag className="text-[1.5rem] text-[#67CE67]" />
                      </div>
                      <button className="bg-[#004AAD] text-white text-[1rem] w-fit px-[1rem] py-1 rounded-md">
                        ₹ {item.price}
                      </button>
                      <div className="flex flex-row justify-between">
                        <div className="w-[30%] text-[1.5rem] flex flex-row justify-between text-[#004AAD]">
                          <IoTrashOutline
                            className="hover:cursor-pointer"
                            onClick={() => {
                              setItemToDelete(item);
                              setDeleteModal(true);
                            }}
                          />
                          <MdModeEditOutline
                            className="hover:cursor-pointer"
                            onClick={() => {
                              setIsEditMenuOpen(true);
                              setIsSubCategoryOpen(false);
                              setIsAddMenuOpen(false);
                              setSelectedCard(item);
                            }}
                          />
                        </div>
                        <div>
                          <Switch isActive={item.active} />
                        </div>
                      </div>
                    </div>
                  ))} */}
                  <ItemCard
                    items={subcategory.menuItems}
                    setIsAddMenuOpen={setIsAddMenuOpen}
                    setIsEditMenuOpen={setIsEditMenuOpen}
                    setIsSubCategoryOpen={setIsSubCategoryOpen}
                    setSelectedCard={setSelectedCard}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      {subDeleteModal && (
        <SubCategoryDeleteModal
          setModal={setSubDeleteModal}
          setSelectedCard={subcategoryToDelete}
          category={categoryID}
        />
      )}
    </div>
  );
};

export default SubCategoryDropdown;
