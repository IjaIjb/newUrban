"use client";

import Button from "@/app/components/button";
import SubHeader from "@/app/components/headers/sub-header";
import { convertCamelCaseToNormal } from "@/common/utils";
import { parseCookies } from "nookies";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import tripOBJs from "@/common/classes/trip.class";
import { deleteTrip } from "@/common/db";
import { toIntlCurrency } from "@/common/helpers";
import useUserTypeRouterPages from "@/common/hooks/useUserTypeRouterPages";
import { ClipLoader } from "react-spinners";

export default function Preview() {
  const cookies = parseCookies();
  const { pushWithUserTypePrefix, goBack, query } = useUserTypeRouterPages();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [trips, setTrips] = useState<ExtendedTrip>();
  const isEdit = false;
  const stored: { [s: string]: any } | ArrayLike<any> = [];
  const trips = query;
  // useLayoutEffect(() => {
  //   const test = async () => {
  //     const trip = await getAllTrips();
  //     if (trip.length >= 1) {
  //       setTrips(trip[0]);
  //     }
  //   };
  //   test();
  // }, []);

  const {
    departurePark,
    departureCity,
    arrivalCity,
    arrivalState,
    vehicleType,
    departureDate,
    ...restSubmit
  } = trips;

  const onSubmit = async () => {
    console.log(
      "🚀 ~ onSubmit",
      { trips },
      {
        ...restSubmit,
        endCity: arrivalCity,
        endState: arrivalState,
      }
    );

    setIsLoading(true);
    tripOBJs
      .create({
        ...restSubmit,
        endCity: arrivalCity,
        endState: arrivalState,
      })
      .then((res) => {
        console.log(res, "res from create park");
        toast.success("trip create successfully");
        pushWithUserTypePrefix("/manage-trips");
        deleteTrip("1");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message);
        setIsLoading(false);
      });
  };
  console.log("trips", trips);

  // delete trips.endLocation;
  // delete trips.parkId;
  // delete trips.date;
  // delete trips.isPublic;
  // delete trips.vehicleId;

  const { endLocation, parkId, date, isPublic, vehicleId, ...rest } = trips;

  return (
    <div className={"w-[510px]"}>
      <SubHeader
        header="Preview Trip Info"
        hideRight
        onPress={() => deleteTrip("1")}
        // inputText="Search Trips"
        // allowFilter
      />
      <ToastContainer />
      <table className="table-auto mt-8">
        <tbody>
          {trips &&
            Object.entries({
              ...rest,
              "Posting Type": isPublic ? "Public" : "Private",
              fare: toIntlCurrency(trips?.fare! as string),
            }).map(([key, value]) => (
              <tr key={key}>
                <td className="py-2 capitalize pr-10 text-gray-400">
                  {convertCamelCaseToNormal(key)}
                </td>
                <td className="py-2">{value as string}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={"mt-8"}>
        <Button
          type="button"
          style="solid"
          onClick={() => goBack()}
          className="w-full bg-white text-primary border-2 hover:bg-opacity-40 border-primary hover:bg-primary hover:text-white h-[67px]"
        >
          Edit Info
        </Button>{" "}
        <Button
          type="button"
          style="solid"
          onClick={() => onSubmit()}
          className="mt-6 w-full bg-primary text-white border-2 hover:bg-opacity-70 hover:bg-primary hover:text-white h-[67px]"
        >
          {isLoading ? <ClipLoader color="#ffffff" /> : "Proceed"}
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
