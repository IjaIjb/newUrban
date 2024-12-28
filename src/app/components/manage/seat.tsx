"use client";
import { useState } from "react";

interface SeatProps {
  onSeatSelect: (selectedSeat: string | null) => void;
  initiallySelectedSeats?: string[];
  vehicleType: "minbus" | "bus" | "car";
}

type SeatLayout = {
  rows: string[];
  cols: { [key: string]: string[] };
};

const getSeatLayout = (type: string): SeatLayout => {
  switch (type) {
    case "bus":
      return {
        rows: ["A", "B", "C", "D", "E"],
        cols: {
          A: ["1", "2"],
          B: ["1", "2", "3", "4"],
          C: ["1", "2", "3", "4"],
          D: ["1", "2", "3", "4"],
          E: ["1", "2", "3", "4"],
        },
      };
    case "minbus":
      return {
        rows: ["A", "B", "C", "D"],
        cols: {
          A: ["1", "2", "3"],
          B: ["1", "2", "3"],
          C: ["1", "2", "3"],
          D: ["1", "2", "3"],
        },
      };
    case "car":
      return {
        rows: ["A", "B"],
        cols: {
          A: ["1", "2"],
          B: ["1", "2"],
        },
      };
    default:
      return {
        rows: [],
        cols: {},
      };
  }
};

export default function Seat({
  onSeatSelect,
  initiallySelectedSeats = [],
  vehicleType,
}: SeatProps) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const { rows, cols } = getSeatLayout(vehicleType);

  const handleSeatClick = (seat: string) => {
    if (!isSeatSelected(seat)) {
      setSelectedSeat(seat);
      onSeatSelect(seat);
    }
  };

  const isSeatSelected = (seat: string) =>
    initiallySelectedSeats.includes(seat) || selectedSeat === seat;

  return (
    <div className="">
      {rows.map((row) => (
        <div key={row} className="grid grid-cols-4 gap-4 mb-4">
          {cols[row]?.map((col) => (
            <button
              key={`${row}${col}`}
              type="button"
              onClick={() => handleSeatClick(`${row}${col}`)}
              disabled={isSeatSelected(`${row}${col}`)}
              className={`h-14 font-bold rounded-lg ${
                isSeatSelected(`${row}${col}`)
                  ? "bg-gray-300 text-white"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {`${row}${col}`}
            </button>
          ))}
        </div>
      ))}
      <div className="flex mt-3 gap-4 justify-center ml-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-4 flex bg-green-600" />
          <p className="text-xs">Empty Seats</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-4 flex border bg-gray-300" />
          <p className="text-xs">Number of Seats Occupied</p>
        </div>
      </div>
    </div>
  );
}
