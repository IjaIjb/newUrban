"use client";
import Button from "@/app/components/button";
import SubHeader from "@/app/components/headers/sub-header";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";

import LoadingCon from "@/app/components/loader";
import tripOBJs from "@/common/classes/trip.class";
import { Trip } from "@/common/types";
import { convertCurrency, formatDateToISO } from "@/common/utils";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";

export default function ContinueBooking() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userData = useAppSelector(selectAuthUser)!;

  const bookDataString: any =
    typeof window !== "undefined" && localStorage.getItem("book-ride-values");
  const bookData = JSON.parse(bookDataString);

  useEffect(() => {
    setIsLoading(true);
    tripOBJs
      .getAlByParkId({
        query: {
          fromState: userData?.park?.state?.toLowerCase(),
          toState: (bookData?.destinationState).toLowerCase(),
          vehicleType: bookData?.selectedVehicle,
          travelDate: formatDateToISO(bookData?.travelDate),
          // travelDate: formatDateToISO("2024-05-30"),
        },
        parkId: userData?.parkId,
      })
      .then((res: any) => {
        console.log(res, "records of park");
        setIsLoading(false);
        setTrips(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, "err");
      });
  }, []);

  if (isLoading) return <LoadingCon />;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubHeader header="Continue Booking" hideRight />

      <div className="mt-10 h-full">
        <div className="h-full">
          {trips && trips.length > 0 ? (
            <div>
              <b className="">Available Trips</b>

              <div className="grid mt-4 grid-cols-3 gap-10">
                {trips.map((trip, key) => (
                  <TripSelect trip={trip} key={key} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-red- justify-center items-center flex flex-col h-full">
              <Image
                alt="stars"
                width={"80"}
                height={"80"}
                src="/img/stars.svg"
              />
              <p className="text-center mt-6 w-8/12  text-lg text-slate-600">
                Sorry, no trips found. Please try again later or explore other
                options.
              </p>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}

function TripSelect({ trip }: { trip: Trip }) {
  const { pushWithUserTypePrefix } = useUserTypeRouter();

  return (
    <div className="h-[251px]  rounded-lg shadow-md ">
      <div className="h-1/2 px-8 py-4 text-white flex justify-between items-center rounded-t-lg bg-primary">
        <div>
          <p>
            <span className="text-sm">Trip code:</span> {trip.tripCode}
          </p>
          <p className="text-lg">
            {trip.park.city} to {trip.endCity}
          </p>
          <div className=" flex mt-4">
            <span className="text-xs py-1 px-3 rounded-full flex text-center justify-center text-black bg-white">
              {trip.totalSeats - trip.bookedSeats || 0} seats available
            </span>
          </div>
        </div>

        <Image
          src="/img/urbanwhitelogo.png"
          alt="urban logo"
          width="40"
          height="40"
          priority
        />
      </div>
      <div className="px-8 py-4">
        <div className="flex items-center">
          <HiLocationMarker className="text-primary" />
          <div className="ml-3">
            <p className="text-primary text-xs">Destination state</p>
            <p className="text-sm font-thin capitalize">{trip.endState}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between ">
          <Button
            type="button"
            style="outline"
            onClick={() => {
              localStorage.setItem(
                "selected-trip-values",
                JSON.stringify(trip)
              );

              pushWithUserTypePrefix("/book-ride/passenger-details");
            }}
            className="rounded-full"
          >
            Book trip
          </Button>
          <div>
            <p className="text-xs text-primary">Departure time</p>
            <p className="text-xs">{trip.time}</p>
          </div>
          <div>
            <p className="text-xs text-primary">Amount</p>
            <p className="text-xs">{convertCurrency(+trip.fare)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
