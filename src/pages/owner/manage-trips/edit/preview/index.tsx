"use client";

import Button from "@/app/components/button";
import SubHeader from "@/app/components/headers/sub-header";
import tripOBJs from "@/common/classes/trip.class";
import { deleteEditTrip } from "@/common/db";
import useUserTypeRouterPages from "@/common/hooks/useUserTypeRouterPages";
import { convertCamelCaseToNormal } from "@/common/utils";
import { destroyCookie } from "nookies";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Preview() {
  const { pushWithUserTypePrefix, goBack, query } = useUserTypeRouterPages();
  const data = query as any;
  console.log("data", data);
  const [trips, setTrips] = useState<any>(data);
  console.log("🚀 ~ Preview ~ trips:", trips);

  const tripId = data?.tripId;

  // useLayoutEffect(() => {
  //   const fetchTrip = async () => {
  //     setIsLoading(true);

  //     setTrips(data);
  //     setIsLoading(false);
  //   };
  //   fetchTrip();
  // }, [tripId]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);

    tripOBJs
      .update(
        {
          ...data,
          endState: data?.arrivalState,
          endCity: data?.arrivalCity,
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

  delete trips.tripId;
  delete trips.startLocation;

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
