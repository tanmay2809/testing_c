import React, { useState } from "react";

// icons
import { MdDragIndicator, MdModeEditOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";

// assets
import pizza from "../../assets/pizza.png";
import Switch from "../switch";
import { BiFoodTag } from "react-icons/bi";
import DeleteModal from "./DeleteModal";

export interface Item {
  id: number;
  name: string;
  image: string;
  description?: string;
  price?: string;
  category?: string;
  subcategory?: string;
  serving?: string;
  tag?: string;
  active: boolean;
  categoryActive: boolean;
  clicks: number;
  addone?: {
    name: string;
    additionalPrice: string;
  }[];
  type?: string;
}

interface Category {
  name: string;
  count: number;
}

interface Props {
  categories: Category[];
  items: Item[];
  setIsEditMenuOpen: (isOpen: boolean) => void;
  setSelectedCard: (index: number) => void;
  setIsSubCategoryOpen: (isOpen: boolean) => void;
  setIsAddMenuOpen: (isOpen: boolean) => void;
}

const CategoryDropdown: React.FC<Props> = ({
  categories,
  items,
  setIsEditMenuOpen,
  setSelectedCard,
  setIsSubCategoryOpen,
  setIsAddMenuOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <div className="space-y-2">
      {categories.map((category, index) => (
        <div key={index}>
          <div
            className="w-full h-fit px-4 py-3 border-2 rounded-[0.5rem] flex flex-row justify-between items-center font-Roboto"
            role="button"
          >
            <div className="w-fit flex flex-row items-center text-[1.5rem] gap-4">
              <MdDragIndicator />
              <IoMdArrowDropdown
                className={`text-[#004AAD] ${isOpen && "transform rotate-180"}`}
                onClick={() => setIsOpen(!isOpen)}
              />
              <img src={pizza} alt="Pizza" className="w-10" />
              <p className="text-[1.2rem] font-semibold">
                {category.name} ({category.count})
              </p>
            </div>
            <div className="w-fit flex flex-row items-center text-[1.5rem] gap-4 text-[#004AAD]">
              <IoTrashOutline className="hover:cursor-pointer" />
              <MdModeEditOutline className="hover:cursor-pointer" />
            </div>
          </div>
          {/* Items cards */}
          {isOpen && (
            <div className="flex flex-row flex-wrap px-2 py-4 gap-x-4 gap-y-4">
              {items.map((item) => (
                <div className="w-[240px] h-[180px] p-4 border-2 rounded-[0.3rem] flex flex-col font-Roboto gap-8">
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
                          setIsEditMenuOpen(true);
                          setIsSubCategoryOpen(false);
                          setIsAddMenuOpen(false);
                          setSelectedCard(item.id);
                        }}
                      />
                    </div>
                    <div>
                      <Switch isActive={item.active} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {deleteModal && <DeleteModal setModal={setDeleteModal} />}
    </div>
  );
};

export default CategoryDropdown;
