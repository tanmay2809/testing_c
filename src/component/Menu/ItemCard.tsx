import { MdModeEditOutline } from "react-icons/md";
import { MenuItem } from "./AddMenuItem";
import Switch from "./switch";
import { IoTrashOutline } from "react-icons/io5";
import { BiFoodTag } from "react-icons/bi";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../main";

interface Props {
  items: MenuItem[];
  setIsEditMenuOpen: (isOpen: boolean) => void;
  setSelectedCard: (index: MenuItem) => void;
  setIsSubCategoryOpen: (isOpen: boolean) => void;
  setIsAddMenuOpen: (isOpen: boolean) => void;
}

const ItemCard: React.FC<Props> = ({
  items,
  setIsEditMenuOpen,
  setSelectedCard,
  setIsSubCategoryOpen,
  setIsAddMenuOpen,
}) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem>();
  const [itemToToggle, setItemToToggle] = useState<MenuItem>();

  const toggleMenuItem = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/toggleActiveMenu/${itemToToggle?._id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item._id}
          className="w-[240px] h-[180px] p-4 border-2 rounded-[0.3rem] flex flex-col font-Roboto gap-8"
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
                  setSelectedCard(item);
                }}
              />
            </div>
            <div>
              <Switch
                onclick={() => {
                  setItemToToggle(item);
                  itemToToggle && toggleMenuItem();
                }}
                isActive={item.active}
              />
            </div>
          </div>
        </div>
      ))}
      {deleteModal && (
        <DeleteModal setModal={setDeleteModal} setSelectedCard={itemToDelete} />
      )}
    </>
  );
};

export default ItemCard;
