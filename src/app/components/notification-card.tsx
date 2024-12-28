import React from "react";
import Image from "next/image";

export default function NotificationCard({
  left,
  middle,
  right,
  textBody,
  hideRight,
  onClick,
}: {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
  hideLeft?: boolean;
  hideRight?: boolean;
  textBody?: string | React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className={`w-[671px] px-4 h-[91px] bg-primary_light flex justify-between rounded-lg items-center text-center ${
        onClick && "hover:cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {left ?? (
          <Image
            src="/img/svg/icon.svg"
            alt="urban logo"
            width={24}
            height={24}
            priority
          />
        )}
        <p className="ml-4">
          {textBody ??
            "Dispatch officer registration request is been processed"}
        </p>
      </div>
      {hideRight ?? (
        <div className="text-sm">
          <p>Sept 10,2022</p>
          <p className="text-primary ">Just Now</p>
        </div>
      )}
    </div>
  );
}
