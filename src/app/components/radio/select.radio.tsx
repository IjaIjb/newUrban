import { RadioSelectProps } from "@/common/types";
import { useFormik } from "formik";
import Image from "next/image";

const activeStyle = "border-primary text-primary border-2 ";
const conStyle =
  "p-2 text-center rounded-lg cursor-pointer h-[109px] shadow-lg flex  items-center";

export const RadioSelect = ({ name, options, formik }: RadioSelectProps) => {
  return (
    <div className="space-y-4 grid grid-rows-3 ">
      {options.map((option: any) => (
        <label
          key={option.value}
          // className='inline-flex items-center p-2 text-center rounded-full cursor-pointer bg-primary font-bold text-white'>
          className={`${conStyle} ${
            option.value === formik.values[name] && activeStyle
          } flex justify-between p-3`}
        >
          <div>
            <input
              type="radio"
              name={name}
              value={option.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values[name] === option.value}
              // className='form-radio h-5 w-5 text-gray-600'
              className="hidden"
            />
            <span className="text-gray-700">{option.label}</span>
          </div>
          {option.value === "paystack" ? (
            <Image
              src="/img/logos/paystack.png"
              alt="urban logo"
              width={94}
              height={27}
              priority
            />
          ) : (
            option.value === "rave" && (
              <Image
                src="/img/logos/rave.png"
                alt="urban logo"
                width={74}
                height={27}
                priority
              />
            )
          )}
        </label>
      ))}
    </div>
  );
};
