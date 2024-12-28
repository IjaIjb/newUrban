import React from "react";
import { TbCar } from "react-icons/tb";
import { BsArrowUpShort } from "react-icons/bs";
import CardBg from "../../custom svg/card-bg";

export default function DataCard({
  title,
  amount,
  percentage,
}: {
  title: string;
  amount: string;
  percentage: string;
}) {
  return (
    <div className="flex bg-primary h-[173px] rounded-xl mt-8 justify-between">
      <div className="text-white  pl-8 py-8 flex flex-col justify-between">
        <div className="flex items-center">
          <div className="bg-primary_light rounded-full w-12 h-12 flex items-center justify-center">
            <TbCar className="text-light" size={24} />
          </div>
          <p className="ml-2">
            {title}
            {/* Total Trips Set */}
          </p>
        </div>
        <div className="flex">
          <p className="font-bold text-5xl">
            {amount}
            {/*  */}
          </p>
          <p className="font-bold text-primary2 ml-4">{percentage}</p>
          <BsArrowUpShort className="text-primary2" size={20} />
        </div>
      </div>
      <CardBg />
    </div>
  );
}
