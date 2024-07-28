import { MenuItem } from "./AddMenuItem";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "react-toastify";

// icons
import { MdModeEditOutline } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { BiFoodTag } from "react-icons/bi";

// assets
import nosearch from "../../assets/search.jpg";

// components
import Switch from "./switch";
import DeleteModal from "./DeleteModal";

interface Props {
  items?: MenuItem[] | false;
  setIsEditMenuOpen: (isOpen: boolean) => void;
  setSelectedCard: (index: MenuItem) => void;
  setIsSubCategoryOpen: (isOpen: boolean) => void;
  setIsAddMenuOpen: (isOpen: boolean) => void;
  editSubcategoryModal: (isOpen: boolean) => void;
  showActive: boolean;
}

const ItemCard: React.FC<Props> = ({
  items,
  setIsEditMenuOpen,
  setSelectedCard,
  setIsSubCategoryOpen,
  setIsAddMenuOpen,
  editSubcategoryModal,
  showActive,
}) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem>();

  const toggleMenuItem = (item: MenuItem) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/toggleActiveMenu/${item._id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location.reload();
        toast.success("Menu item toggle");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-row flex-wrap px-2 py-4 gap-x-4 gap-y-4">
        {items &&
          items?.map((item) => (
            <div
              key={item._id}
              className="w-[210px] lg:w-[220px] h-[180px] p-4 border-2 rounded-[0.3rem] flex flex-col font-Roboto gap-8"
            >
              <div className="flex flex-row justify-between">
                <p className="text-[1.1rem] font-semibold break-all text-wrap">
                  {item.name}
                </p>
                <BiFoodTag
                  className={`text-[1.5rem] ${
                    item.type === "veg" && "text-[#67CE67]"
                  } ${item.type === "egg" && "text-[#F7C02B]"} ${
                    item.type === "nonveg" && "text-[#ED4F4F]"
                  }
              } `}
                />
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
                      editSubcategoryModal(false);
                      setSelectedCard(item);
                    }}
                  />
                </div>
                <div>
                  <Switch
                    onclick={() => toggleMenuItem(item)}
                    isActive={item.active}
                  />
                </div>
              </div>
            </div>
          ))}
        {items && items?.length === 0 && (
          <div className="w-full h-fit flex flex-col items-center">
            <img src={nosearch} className="w-[150px]" />
            <p className="text-[1.5rem] font-semibold">No Items!</p>
          </div>
        )}
      </div>
      {deleteModal && (
        <DeleteModal setModal={setDeleteModal} setSelectedCard={itemToDelete} />
      )}
    </>
  );
};

export default ItemCard;
