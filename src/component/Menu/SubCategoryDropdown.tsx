import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
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

// redux
import {
  AppThunkDispatch,
  fetchRestaurantDetails,
} from "../../redux/restaurantData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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

const id = localStorage.getItem("id");

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

  const dispatch: AppThunkDispatch = useDispatch();
  const resData = useSelector((state: RootState) => state.resturantdata);

  const handleToggle = (id: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
        dispatch(fetchRestaurantDetails({ id: resData.data._id }));
        toast.success("Subcategory toggle");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [subcategory, setSubcategory] = useState<SubcategoryItem[]>();

  let updatedCategories = Array.from(category?.[0]?.subcategory || []);

  useEffect(() => {
    if (category && category.length > 0 && category[0].subcategory.length > 0) {
      setSubcategory(category[0]?.subcategory);
    }
    
    
  }, [category]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const [reorderedCategory] = updatedCategories.splice(
      result.source.index,
      1
    );
    updatedCategories.splice(result.destination.index, 0, reorderedCategory);

    // if (category && category[0]) {
    //   const updatedCategory = { ...category[0], subcategory: updatedCategories };
    //   setCategory([updatedCategory]);
    // }

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/order/${id}/${category?.[0]?._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: updatedCategories,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        dispatch(fetchRestaurantDetails({ id: resData.data._id }));
       
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  return (
    <div className="space-y-2">
      <div>
        <DragDropContext onDragEnd={handleDragEnd}>
          {category?.map((cat) => (
            <Droppable
              droppableId={`subcategory-${cat._id}`}
              direction="vertical"
              type="subcategory"
              key={cat._id}
            >
              {(provided) => (
                <div
                  className="flex flex-col gap-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {subcategory?.map((subcategory, index) => (
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
                          id={subcategory._id}
                        >
                          <div>
                            <div
                              className="w-full h-fit px-4 py-3 border-2 rounded-[0.5rem] flex flex-row justify-between items-center font-Roboto"
                              role="button"
                            >
                              <div className="w-fit flex flex-row items-center text-[1.5rem] gap-4">
                                <MdDragIndicator />
                                <IoMdArrowDropdown
                                  className={`text-[#004AAD] ${
                                    isOpen[subcategory._id]
                                      ? "transform"
                                      : "-rotate-90"
                                  }`}
                                  onClick={() => handleToggle(subcategory._id)}
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
                                <Switch
                                  isActive={subcategory.active}
                                  onclick={() =>
                                    handleSubcategoryToggle(subcategory._id)
                                  }
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
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
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
