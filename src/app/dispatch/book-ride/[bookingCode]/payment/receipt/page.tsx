"use client";
import Button from "@/app/components/button";
import CardBg from "@/app/components/custom svg/card-bg";
import SubHeader from "@/app/components/headers/sub-header";
import tripOBJs from "@/common/classes/trip.class";
import { toIntlCurrency } from "@/common/helpers";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { format } from "date-fns";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";
import { AiOutlinePrinter, AiOutlineShareAlt } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Receipt() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [TripInfo, setTripInfo] = useState<any>();
  console.log("🚀 ~ Receipt ~ TripInfo:", TripInfo);
  const [isLoading, setIsLoading] = useState<any>(false);
  const pathname = usePathname();

  const parts = pathname?.split("/");
  const bookingCode = parts && decodeURIComponent(parts[3]);
  console.log("🚀 ~ Receipt ~ bookingCode:", bookingCode);

  const getBooking = () => {
    setIsLoading(true);

    tripOBJs
      .getBookingByCode(bookingCode!, "success")
      .then((res) => {
        setTripInfo(res);

        console.log(res, "trip booking");
        // setTripInfo((prevTripInfo: any) => ({
        //   ...prevTripInfo,
        //   bookingTime: new Date(),
        // }));
        setIsLoading(false);
        console.log(res.data.data, "res data");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.log(error);
        setIsLoading(false);
        // toast.error("Something went wrong");
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    getBooking();
  }, []);

  const FARE = TripInfo ? +TripInfo?.trip?.fare : "0";

  return (
    <Suspense>
      <SubHeader header={`Receipt`} hideRight />
      <div className="mt-[99px] w-1/2">
        <div className=" bg-primary flex justify-between items-center w-full h-[123px]">
          <CardBg height="100%" />
          <div>
            <Image
              src="/img/urban_logo.svg"
              alt="urban logo"
              width={90}
              height={18.5}
              priority
            />
            <p className="text-sm text-white">TRIP RECEIPT</p>
          </div>
          <CardBg height="100%" />
        </div>
        <table className="table-auto border w-full">
          <tbody className="p-4 font-light">
            <tr className="">
              <td className="px-4 py-2">Booking Reference:</td>
              <td className="px-4 py-2 text-primary">
                {TripInfo?.paymentReference}
              </td>
            </tr>

            <tr className="">
              <td className="px-4 py-2">Departure City:</td>
              <td className="px-4 py-2 text-primary">
                {TripInfo?.trip?.park?.city}
              </td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Departure Time:</td>
              <td className="px-4 py-2 text-primary">{TripInfo?.trip?.time}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Destination City:</td>
              <td className="px-4 py-2 text-primary">
                {TripInfo?.trip?.endCity}
              </td>
            </tr>
            <tr className="border-t border-b">
              <td className="px-4 py-2 font-semibold">Passenger Details:</td>
              <td className="px-4 py-2 text-primary"></td>
            </tr>
            {TripInfo?.passengers?.map((passenger: any, key: number) => (
              <Fragment key={key}>
                <tr className="">
                  <td className="px-4 py-2">
                    <span className="font-medium">{key + 1}.</span> Name:
                  </td>
                  <td className="px-4 py-2 text-primary">{passenger.name}</td>
                </tr>
                <tr className="">
                  <td className="px-8 py-2">Booking Code:</td>
                  <td className="px-4 py-2 text-primary">
                    {passenger.bookingCode}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-8 py-2">Phone:</td>
                  <td className="px-4 py-2 text-primary">{passenger.number}</td>
                </tr>
              </Fragment>
            ))}

            <tr className="">
              <td className="px-4 py-2">Trip Code:</td>
              <td className="px-4 py-2 text-primary">
                {TripInfo?.trip?.tripCode}
              </td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Price per seat:</td>
              <td className="px-4 py-2 text-primary">
                {toIntlCurrency(TripInfo?.trip?.fare.toString() || "0")}
              </td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Date:</td>
              <td className="px-4 py-2 text-primary">
                {TripInfo?.trip?.date &&
                  format(new Date(TripInfo.trip?.date), "MMM d, yyyy")}
              </td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Booking Time:</td>
              <td className="px-4 py-2 text-primary">
                {TripInfo?.createdAt &&
                  format(new Date(TripInfo.createdAt), "MMM d, yyyy")}
              </td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">Seat Number:</td>
              <td className="px-4 py-2 text-primary">{TripInfo?.seatNumber}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2">VAT:</td>
              <td className="px-4 py-2 text-primary">
                {toIntlCurrency((+FARE * 0.075).toString() || "0")}
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-semibold">Total Fare:</td>
              <td className="px-4 py-2 text-primary">
                {toIntlCurrency((+FARE + +FARE * 0.075).toString() || "0")}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex mt-10">
          <Button
            type="submit"
            className="w-full text-white flex items-center justify-center"
            onClick={() => pushWithUserTypePrefix("/book-ride/payment")}
          >
            Share Receipt <AiOutlineShareAlt size={24} className="ml-2" />
          </Button>
          <Button
            type="submit"
            className="w-full ml-4 flex items-center justify-center"
            style="outline"
          >
            Print Receipt <AiOutlinePrinter size={24} className="ml-2" />
          </Button>
        </div>
      </div>
    </Suspense>
  );
}
