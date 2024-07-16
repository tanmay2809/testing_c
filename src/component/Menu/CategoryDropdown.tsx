import React, { useState } from "react";
import { MdDragIndicator, MdModeEditOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import pizza from "../../assets/pizza.png"; // Replace with your actual image import
import { IoTrashOutline } from "react-icons/io5";
import ItemCard from "./ItemCard";

interface Category {
  name: string;
  count: number;
}

interface Item {
  name: string;
}

interface Props {
  categories: Category[];
  items: Item[];
  setIsEditMenuOpen: (isOpen: boolean) => void;
  setSelectedCard: (index: number) => void;
}

const CategoryDropdown: React.FC<Props> = ({
  categories,
  items,
  setIsEditMenuOpen,
  setSelectedCard,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
          {/* Items */}
          {isOpen && (
            <div className="flex flex-row flex-wrap px-2 py-4 gap-x-4 gap-y-4">
              {items.map((item, i) => (
                <ItemCard
                  item={item}
                  setEditMenuItem={setIsEditMenuOpen}
                  setSelectedCard={setSelectedCard}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryDropdown;
