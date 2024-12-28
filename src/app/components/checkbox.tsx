import React from "react";

interface CheckboxProps {
  label: string | React.ReactNode;
  inputStyle?: string;
  labelStyle?: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox<T extends CheckboxProps>({
  label,
  checked,
  onChange,
  inputStyle,
  labelStyle,
}: T) {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`form-checkbox h-2 w-2 text-primary ${inputStyle}`}
      />
      <span className={`ml-2 text-gray-700 text-xs text-primary ${labelStyle}`}>
        {label}
      </span>
    </label>
  );
}
