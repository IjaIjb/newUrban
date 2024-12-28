"use client";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { InputProps } from "@/common/types";
import { BiSearchAlt } from "react-icons/bi";

const Textarea = ({
  id,
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  icon,
  containerStyle = "mt-8",
  inputStyle,
  error,
  placeholder,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const renderIcon = () => {
    // if (icon) {
    // 	return (
    // 		<div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
    // 			{icon}
    // 		</div>
    // 	)
    // }

    if (type === "password") {
      const Icon = showPassword ? EyeOffIcon : EyeIcon;

      return (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button type="button" onClick={togglePasswordVisibility}>
            <Icon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={` ${containerStyle}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="mt-1 relative rounded-md">
        {id === "search" && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <BiSearchAlt size={24} />
          </span>
        )}
        <textarea
          // type={type === 'password' && !showPassword ? 'password' : type}
          name={name}
          id={id}
          value={value}
          rows={3}
          onChange={onChange}
          // onBlur={onBlur}
          placeholder={placeholder}
          className={`appearance-none rounded-md px-4 py-2 border ${
            error ? "border-red-600" : "border-arsh"
          } w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            icon ? "pl-10" : ""
          } ${inputStyle} bg-gray-100`}
          // className='focus:ring-green-500 focus:bg-white bg-white appearance-none focus:border-green-500 block w-full pr-10 py-3 pl-2 sm:text-sm border-gray-300 rounded-md'
        />

        {renderIcon()}
      </div>
    </div>
  );
};

export default Textarea;
