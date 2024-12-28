import { cn } from "@/common/helpers";
import { InputProps } from "@/common/types";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import React, { forwardRef } from "react";
import { BiSearchAlt } from "react-icons/bi";

const Input = forwardRef<HTMLInputElement, InputProps>(function InputComponent(
  {
    id,
    name,
    label,
    type,
    value,
    onChange,
    onBlur,
    icon,
    containerStyle = "mt-8",
    inputStyle = "w-full",
    error,
    placeholder,
    ignoreMinDate,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  function getCurrentDate() {
    const today: any = new Date();
    let month: any = today.getMonth() + 1;
    let day: any = today.getDate();

    // Format month and day to have leading zeroes if needed
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${today.getFullYear()}-${month}-${day}`;
  }

  const renderIcon = () => {
    if (icon) {
      return (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {icon}
        </div>
      );
    }

    if (type === "password") {
      const Icon = showPassword ? EyeOffIcon : EyeIcon;

      return (
        <>
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            type="button"
            onClick={togglePasswordVisibility}
          >
            <Icon className="h-5 w-5 text-gray-500" />
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <div className={` ${containerStyle}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative rounded-md w-full">
        {id === "search" && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            <BiSearchAlt size={24} className="text-gray-500" />
          </div>
        )}
        <input
          ref={ref}
          type={!showPassword ? type : "text"}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          {...(type === "date" && !ignoreMinDate && { min: getCurrentDate() })}
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn(
            "appearance-none w-full rounded-md px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100",
            error ? "border-red-600" : "border-arsh",
            id === "search" && "px-10",
            inputStyle
          )}
          {...props}
        />
        {error && (
          <span
            className={cn(
              "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
              renderIcon() && "pr-10"
            )}
          >
            <p>
              <span className="text-red-500 text-sm">{error}</span>
            </p>
          </span>
        )}

        {renderIcon()}
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
