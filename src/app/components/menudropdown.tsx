import React from "react";
import { BsThreeDots } from "react-icons/bs";

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

type Props = {
  items: MenuItem[];
  onItemClick: () => void;
};

const MenuDropdown = ({ items, onItemClick }: Props) => {
  const handleItemClick = (onClick: () => void) => {
    onClick();
    onItemClick();
  };

  return (
    <div className="relative">
      <button
        className="text-primary"
        onClick={() => handleItemClick(items[0].onClick)}
      >
        <BsThreeDots />
      </button>
      <ul className="absolute right-0 w-40 py-2 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
        {items.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <div
              className="flex items-center space-x-2"
              onClick={() => handleItemClick(item.onClick)}
            >
              {item.icon && <span className="text-primary">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuDropdown;
