import React from "react";
import { RadioProps } from "@/common/types";

export const RadioButton = ({
  name,
  options,
  className = "",
  customContainerStyle,
  customActiveStyle,
  customInputWrapperStyle,
  data,
  onSelect,
}: RadioProps) => {
  const activeClass = customActiveStyle ?? "bg-primary font-bold text-white";
  const containerClass =
    customInputWrapperStyle ?? "p-2 text-center rounded-full cursor-pointer";

  return (
    <div className={`${className}  bg-primary_light rounded-full p-2`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`${containerClass} ${
            option.value === data && activeClass
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            onChange={(e) => onSelect(e.target.value)}
            onBlur={(e) => onSelect(e.target.value)}
            checked={option.value === data}
            className="hidden"
          />
          <span className="">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
