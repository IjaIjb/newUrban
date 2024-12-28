"use client";
import { useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdArrowBack } from "react-icons/md";
import Dropdown from "../dropdowns/dropdown";

export default function SubHeader({
  header,
  hideBack,
  hideRight,
  allowFilter,
  vertical,
  inputContainerStyle,
  inputStyle,
  inputText = "Search",
  boxType = "input",
  dropDownOptions,
  showButton,
  buttonText,
  setSelectedOption,
  inputField,
  setInputField,
  onPress,
}: {
  header: string;
  inputContainerStyle?: string;
  inputStyle?: string;
  inputText?: string;
  buttonText?: string;
  hideBack?: boolean;
  showButton?: boolean;
  hideRight?: boolean;
  allowFilter?: boolean;
  vertical?: boolean;
  boxType?: "input" | "dropdown";
  dropDownOptions?: any;
  setSelectedOption?: any;
  setInputField?: any;
  inputField?: any;
  onPress?: () => void;
}) {
  const [search, setSearch] = useState("");

  return (
    <div className={!vertical ? `flex justify-between` : ""}>
      <div className={`flex items-center`}>
        {!hideBack && (
          <MdArrowBack
            className="cursor-pointer"
            onClick={() => {
              window.history.back();
              onPress && onPress();
            }}
            size={24}
          />
        )}
        <p
          data-testid={header}
          className={`text-xl capitalize font-bold ${!hideBack && "ml-2"}`}
        >
          {header}
        </p>
      </div>
      {!hideRight && (
        <div className="flex">
          {boxType == "input"
            ? null
            : // <div className={`flex ${inputContainerStyle}`}>
              //   <Input
              //     containerStyle={`mt-0`}
              //     inputStyle={`${inputStyle} bg-gray-100 border-0 pl-10 `}
              //     placeholder={inputText}
              //     type={"text"}
              //     id="search"
              //     name="search"
              //     value={inputField}
              //     onChange={(e: any) => setInputField(e.target.value)}
              //     // onBlur={formik.handleBlur}
              //     // error={formik.touched.password && formik.errors.password}
              //   />
              //   {showButton && (
              //     <Button
              //       type="button"
              //       // onClick={() => pushWithUserTypePrefix('/park/dispatch-officers')}
              //       className="w-full bg-primary text-primary bg-opacity-20 hover:bg-primary hover:text-white ml-3 h-full"
              //     >
              //       {buttonText}
              //     </Button>
              //   )}
              // </div>
              boxType == "dropdown" && (
                <Dropdown
                  options={dropDownOptions}
                  placeholder="Select Park"
                  label=""
                  onSelect={(e: any) => {}}
                  className="w-[285px]"
                  containerStyle=""
                  setSelectedOption={setSelectedOption}
                />
              )}
          {allowFilter && (
            <div className="bg-gray-100 rounded-lg w-12 h-10 flex items-center justify-center ml-4">
              <GiSettingsKnobs className="text-primary" size={24} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
