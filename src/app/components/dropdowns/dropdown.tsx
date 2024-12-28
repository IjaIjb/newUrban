import { cn } from "@/common/helpers";
import { DropDownSelectProps, RadioOption } from "@/common/types";
import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

function Dropdown({
  options,
  onSelect,
  placeholder,
  className,
  label,
  containerStyle = "mt-8",
  value,
  error,
  setSelectedOption: setOption,
}: DropDownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<RadioOption>(
    options?.find((option: RadioOption) => option.value === value)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedOption(
      options?.find((option: RadioOption) => option.value === value)
    );
  }, [value, options]);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleOptionClick(option: RadioOption) {
    setOption?.(option);
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
  }

  const filteredOptions = options?.filter((option: RadioOption) =>
    option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`${containerStyle} w-full relative inline-block text-left`}
      ref={dropdownRef}
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div>
        <button
          type="button"
          className={cn(
            "border-arsh border inline-flex justify-between rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
            className,
            error && "border-danger"
          )}
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.label : placeholder}

          <BiChevronDown size={24} />
        </button>
        {error && (
          <p className="text-danger text-sm mt-2 text-right">{error}</p>
        )}
      </div>
      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-2 w-full max-h-[200px] overflow-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <input
              type="text"
              className="w-full px-4 py-2 border-b border-gray-100 text-sm focus:outline-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option: RadioOption) => (
                <button
                  key={option.value}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  onClick={() => handleOptionClick(option)}
                  role="menuitem"
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-700">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
