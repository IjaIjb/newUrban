import { cn } from "@/common/helpers";
import { useState } from "react";

interface SwitchProps {
  label: string;
  checked?: any;
  setchecked?: any;
  error?: boolean;
}

const Switch = ({ label, error, checked, setchecked }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    setchecked && setchecked(!checked);
  };

  return (
    <label
      className={cn(
        "relative flex justify-between items-center text-primary group p-1 text-sm",
        error && "text-red-600"
      )}
    >
      {label}
      <input
        type="checkbox"
        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-full"
        checked={!checked ? isChecked : checked}
        onChange={handleToggle}
      />
      <span
        className={cn(
          "w-8 h-5 flex items-center flex-shrink-0 ml-2 p-0.5 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-primary after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300",
          isChecked && "peer-checked:after:translate-x-3",
          error && "bg-red-600 peer-checked:bg-red-600"
        )}
      ></span>
    </label>
  );
};

export default Switch;
