import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "react-toastify";

// icons
import { MdDragIndicator, MdModeEditOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";

// components
import { SubcategoryItem } from "../../pages/Menu";
import { MenuItem } from "./AddMenuItem";
import ItemCard from "./ItemCard";
import SubCategoryDeleteModal from "./SubCategoryDelete";
import Switch from "./switch";

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
  selectedType: string;
  showActive: boolean;
}

const SubCategoryDropdown: React.FC<Props> = ({
  category,
  setIsEditMenuOpen,
  setSelectedCard,
  setIsSubCategoryOpen,
  setIsAddMenuOpen,
  subcategoryToEdit,
  editSubcategoryModal,
  selectedType,
  showActive,
}) => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [subDeleteModal, setSubDeleteModal] = useState<boolean>(false);
  const [subcategoryToDelete, setSubcategoryToDelete] =
    useState<SubcategoryItem>();
  const [categoryID, setCategoryID] = useState<string>("");
  // const [categories, setCategories] = useState<Category>();
  // const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  // toggle function to differentiate in dropwdowns
  const handleToggle = (id: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // const handleDragEnd = (result: DropResult) => {
  //   if (!result.destination) {
  //     return;
  //   }
  //   const { source, destination } = result;
  //   if (
  //     source.index === destination.index &&
  //     source.droppableId === destination.droppableId
  //   ) {
  //     return;
  //   }

  //   // const updatedCategory = Array.from(category!);
  //   // const [movedCategory] = updatedCategory.splice(source.index, 1);
  //   // updatedCategory.splice(destination.index, 0, movedCategory);
  //   // setCategories(updatedCategory);
  // };

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

  const handleSubcategoryToggle = (id: string) => {
    let data = JSON.stringify({
      subcategory: id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/togglesubcategory`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location.reload();
        toast.success("Subcategory toggle");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (category && category.length > 0 && category[0].subcategory.length > 0) {
      setIsOpen({ [category[0].subcategory[0]._id]: true });
    }
  }, [category, ]);

  return (
    <div className="space-y-2">
      {/* <div>
        {category?.map((cat) => (
          <div>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="category">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {cat.subcategory.map((subcategory, index) => (
                      <div>
                        {subcategory.active && (
                          <Draggable
                            key={subcategory._id}
                            draggableId={subcategory._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={subcategory._id}
                                id={subcategory._id}
                                className="w-full h-fit font-Roboto text-[1.3rem] sm:px-6 my-7 border-b"
                              >
                                <div key={subcategory._id}>
                                  <div
                                    className="w-full h-fit px-4 py-3 border-2 rounded-[0.5rem] flex flex-row justify-between items-center font-Roboto"
                                    role="button"
                                  >
                                    <div className="w-fit flex flex-row items-center text-[1.5rem] gap-4">
                                      <MdDragIndicator />
                                      <IoMdArrowDropdown
                                        className={`text-[#004AAD] ${
                                          isOpen[subcategory._id] &&
                                          "transform rotate-180"
                                        }`}
                                        onClick={() =>
                                          handleToggle(subcategory._id)
                                        }
                                      />
                                      <img
                                        src={subcategory.image}
                                        alt="Pizza"
                                        className="w-10"
                                      />
                                      <p className="text-[1.2rem] font-semibold">
                                        {subcategory.name} (
                                        {subcategory.menuItems.length})
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
                                          setIsAddMenuOpen(false);
                                          setIsEditMenuOpen(false);
                                          setIsSubCategoryOpen(false);
                                          subcategoryToEdit(subcategory);
                                        }}
                                        className="hover:cursor-pointer"
                                      />
                                    </div>
                                  </div>

                                  {isOpen[subcategory._id] && (
                                    <div className="flex flex-row flex-wrap px-2 py-4 gap-x-4 gap-y-4">
                                      <ItemCard
                                        items={subcategory.menuItems}
                                        setIsAddMenuOpen={setIsAddMenuOpen}
                                        setIsEditMenuOpen={setIsEditMenuOpen}
                                        setIsSubCategoryOpen={
                                          setIsSubCategoryOpen
                                        }
                                        setSelectedCard={setSelectedCard}
                                        editSubcategoryModal={
                                          editSubcategoryModal
                                        }
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )}
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        ))}
      </div> */}

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
                      isOpen[subcategory._id] ? "transform" : "-rotate-90"
                    }`}
                    onClick={() => handleToggle(subcategory._id)}
                  />
                  <img src={subcategory.image} alt="Pizza" className="w-10" />
                  <p className="text-[1.2rem] font-semibold">
                    {subcategory.name} ({subcategory.menuItems.length})
                  </p>
                </div>
                <div className="w-fit flex flex-row items-center text-[1.5rem] gap-4 text-[#004AAD]">
                  <Switch
                    isActive={subcategory.active}
                    onclick={() => handleSubcategoryToggle(subcategory._id)}
                  />
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
                      setIsAddMenuOpen(false);
                      setIsEditMenuOpen(false);
                      setIsSubCategoryOpen(false);
                      subcategoryToEdit(subcategory);
                    }}
                    className="hover:cursor-pointer"
                  />
                </div>
              </div>
              {/* Items cards */}
              {isOpen[subcategory._id] && (
                <>
                  <ItemCard
                    items={filterItems(subcategory.menuItems)}
                    showActive={showActive}
                    setIsAddMenuOpen={setIsAddMenuOpen}
                    setIsEditMenuOpen={setIsEditMenuOpen}
                    setIsSubCategoryOpen={setIsSubCategoryOpen}
                    setSelectedCard={setSelectedCard}
                    editSubcategoryModal={editSubcategoryModal}
                  />
                </>
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
