"use client";

import React, { ReactNode, useState } from "react";

type AccordionProps = {
  items: {
    title: string | ReactNode;
    content: string | ReactNode;
  }[];
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" p-2 space-y-4  ">
      {items.map((item, index) => (
        <div key={index} className="shadow-md  shadow-gray-100">
          <button
            type="button"
            onClick={() => handleToggle(index)}
            className="w-full p-4 text-left rounded-lg focus:outline-none"
          >
            {item.title}
          </button>
          <div
            className={`transition-all duration-300 ${
              activeIndex === index ? "block" : "hidden"
            }`}
          >
            <div className="p-6 bg-white">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
