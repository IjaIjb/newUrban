import { cn } from "@/common/helpers";
import React from "react";
import { ClipLoader } from "react-spinners";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type: "button" | "submit" | "reset" | undefined;
  style?: "outline" | "solid" | "danger";
  isLoading?: boolean;
};

const Button = ({
  children,
  onClick,
  disabled = false,
  className = "",
  type,
  style = "solid",
  size,
  isLoading = false,
}: ButtonProps) => {
  const buttonSize = {
    xs: "px-4 py-2 text-sm",
    sm: "px-4 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-4 py-2 text-lg",
    xl: "px-4 py-2 text-xl",
    default: "px-4 py-2 text-base",
  };

  return (
    <button
      type={type}
      className={cn(
        "px-4 font-semibold rounded-[10px] text-white",
        style === "solid" && "bg-primary hover:bg-green-600",
        style === "outline" && "bg-white border border-primary text-primary",
        style === "danger" && "bg-danger",
        disabled && "opacity-50 cursor-not-allowed",
        className,
        buttonSize[size || disabled ? "xs" : "default"]
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <ClipLoader color="#ffffff" /> : children}
    </button>
  );
};

export default Button;
