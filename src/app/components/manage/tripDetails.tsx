import React from "react";
import Button from "../button";
import { GoDotFill } from "react-icons/go";
import { MdMyLocation } from "react-icons/md";

export default function TripDetails({
  trip,
  type,
}: {
  type?: string;
  trip: any;
}) {
  console.log("🚀 ~ trip:", trip);
  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="text-sm italic">
        {type !== "companyTrack" ? (
          <div className="flex ">
            <div className="flex flex-col items-center">
              <GoDotFill size={30} className="text-primary" />
              <span className="border-r border-primary h-full mx-auto  " />

              <MdMyLocation size={30} className="text-primary" />
            </div>
            <div className=" ml-3 flex flex-col justify-between ">
              <p>
                Departure Park from
                <span className="font-bold ml-2">{trip?.park?.name}</span>
              </p>
              <p>
                Destination City
                <span className="font-bold ml-2">{trip?.endState}</span>
              </p>
            </div>
          </div>
        ) : (
          <p>
            Company Name<span className="font-bold ml-2">Adetayo PLCk</span>
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-sm">Park Address</p>
        <p className="text-sm">{trip?.park?.fullAddress}</p>
        <p className="text-sm">Departure time</p>
        <p className="text-sm">{trip?.time}</p>
        <p className="text-sm">Date</p>
        <p className="text-sm">{trip?.date}</p>
      </div>
      <div className="">
        <p className="text-xs text-danger">Call Park</p>
        <Button
          className="rounded-full text-white hover:text-white mt-3"
          style="danger"
          // onClick={() => pushWithUserTypePrefix('/manage-trips/set-trip')}
          type="button"
        >
          {trip?.park?.parkOwner?.user?.phoneNumber}
        </Button>
      </div>
    </div>
  );
}
