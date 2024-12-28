"use client";

import SubHeader from "@/app/components/headers/sub-header";
import Button from "@/app/components/button";
import React, { useLayoutEffect, useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { convertCamelCaseToNormal } from "@/common/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";
import tripOBJs from "@/common/classes/trip.class";
import { ClipLoader } from "react-spinners";
import { EditTrip, deleteEditTrip, getEditTripById } from "@/common/db";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";

export default function Preview() {
  const cookies = parseCookies();
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [trips, setTrips] = useState<EditTrip | null>(null);

  const pathname = usePathname();
  const tripId = pathname?.split("/")[pathname?.split("/").length - 1];

  useLayoutEffect(() => {
    const fetchTrip = async () => {
      setIsLoading(true);
      const trip = await getEditTripById(tripId!);
      if (trip) {
        setTrips(trip);
      }
      setIsLoading(false);
    };
    fetchTrip();
  }, [tripId]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);

    tripOBJs
      .update(
        {
          ...trips,
          endState: trips?.arrivalState,
          endCity: trips?.arrivalCity,
          // Remove the properties you don't need
          startLocation: undefined,
          arrivalState: undefined,
          arrivalCity: undefined,
        },
        tripId!
      )
      .then((res) => {
        console.log(res, "res from create park");
        toast.success("trip updated successfully");
        deleteEditTrip(tripId!);
        pushWithUserTypePrefix("/manage-trips");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message);
        setIsLoading(false);
      });
  };

  return (
    <div className={"w-[510px]"}>
      <SubHeader
        header="Preview Trip Info"
        hideRight
        onPress={() => destroyCookie(null, "trip")}
        // inputText="Search Trips"
        // allowFilter
      />
      <ToastContainer />
      <table className="table-auto mt-8">
        <tbody>
          {trips &&
            Object.entries(trips).map(([key, value]) => (
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
          {isLoading ? <ClipLoader color="#ffffff" /> : "Update"}
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
