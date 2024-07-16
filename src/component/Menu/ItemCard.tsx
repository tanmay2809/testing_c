import { BiFoodTag } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import Switch from "../switch";
import { MenuItem } from "./AddMenuItem";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

interface ItemProps {
  item: MenuItem;
  setEditMenuItem: (isOpen: boolean) => void;
  setSelectedCard: (index: number) => void;
}

const ItemCard: React.FC<ItemProps> = ({
  item,
  setEditMenuItem,
  setSelectedCard,
}) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  return (
    <>
      <div className="w-[250px] h-[180px] p-4 border-2 rounded-[0.3rem] flex flex-col font-Roboto gap-8">
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
              onClick={() => setDeleteModal(true)}
            />
            <MdModeEditOutline
              className="hover:cursor-pointer"
              onClick={() => {
                setEditMenuItem(true);
                setSelectedCard(item.id);
              }}
            />
          </div>
          <div>
            <Switch isActive={item.active} />
          </div>
        </div>
      </div>
      {deleteModal && <DeleteModal setModal={setDeleteModal} />}
    </>
  );
};

export default ItemCard;
