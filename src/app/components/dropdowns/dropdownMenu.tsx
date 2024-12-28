import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface MenuItemProps {
  label: React.ReactNode;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <li>
      <button
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  );
};

interface MenuDropdownProps {
  label: string;
  items: MenuItemProps[];
  customButton?: any;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  label,
  items,
  customButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        {customButton ? (
          <div onClick={toggleMenu}>{customButton}</div>
        ) : (
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleMenu}
          >
            {label}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <p className="mx-4 mt-2 text-primary">Download Receipt As</p>
          <ul className="py-1" role="none">
            {items?.map((item, index) => (
              <MenuItem key={index} label={item.label} onClick={item.onClick} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
