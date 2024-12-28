import { FaChevronDown } from "react-icons/fa";

export default function PassengerFormTitle({
  index,
  name,
  seat,
}: {
  index: number;
  name: string;
  seat: string;
}) {
  return (
    <div className="flex justify-between items-center space-x-4 capitalize">
      <p className="text-primary">{index}. Passenger&apos;s Info</p>
      <hr className="w-6 h-500 mx-auto rotate-90 inline-block" />
      <p className="text-gray-400 capitalize">{name}</p>
      <p className="text-gray-400"> {seat} </p>
      <FaChevronDown />
    </div>
  );
}
