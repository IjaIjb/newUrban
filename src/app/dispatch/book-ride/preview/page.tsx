"use client";
import Button from "@/app/components/button";
import tripOBJs from "@/common/classes/trip.class";
import { toIntlCurrency } from "@/common/helpers";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { convertDateFormat } from "@/common/utils";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import SubHeader from "../../../components/headers/sub-header";

export default function BookRide() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [TripInfo, setTripInfo] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAppSelector(selectAuthUser)!;

  const [bookingInfo, setBookingInfo] = useState<any>();

  const bookData: any =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage["book-ride-values"])
      : null;
  const selectedTrip: any =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage["selected-trip-values"])
      : null;
  const manifest: any =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage["manifest-values"])
      : null;

  const PassengerDetails: any =
    typeof window !== "undefined"
      ? JSON.parse(localStorage["passenger-details-values"]).passengers
      : null;

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  console.log("🚀 ~ BookRide ~ params:", params.entries());
  for (const [key, value] of params.entries()) {
    console.log(`${key}: ${value}`);
  }

  const passenger = PassengerDetails.map((passenger: any) => {
    return { ...passenger, phoneNumber: passenger?.phoneNumber?.toString() };
  });

  const TOTALFAREBEFOREVAT = selectedTrip?.fare * PassengerDetails.length;

  const VAT = TOTALFAREBEFOREVAT * 0.075;

  const TOTALFARE = TOTALFAREBEFOREVAT + VAT;

  const createInitialBooking = () => {
    setIsLoading(true);

    const values = {
      tripCode: selectedTrip?.tripCode,
      passenger: passenger,
      travelDate: convertDateFormat(selectedTrip?.date),
      parkId: selectedTrip?.park?.id,
      destinationCity: selectedTrip?.endCity,
      vehicleType: selectedTrip?.vehicleType,
      reference: new Date().getTime().toString(),
      nextOfKinPhone: manifest?.phoneNumber.toString(),
      nextOfKinName: manifest?.nextOfKIn,
      dispatchOfficerId: user?.id,
    };
    console.log("🚀 ~ createInitialBooking ~ values:", values);
    const bookingCode = "ABJSAGDdr";
    tripOBJs
      .book(values)
      .then((res) => {
        setIsLoading(false);
        console.log("🚀 ~ .then ~ res?.data?.booking?.bookingCode:", res?.data);

        setBookingInfo(res?.data?.data?.booking);
        toast.success(res?.data.message);
        pushWithUserTypePrefix(
          `/book-ride/${res?.data?.data[0]?.booking?.bookingCode}/payment?reference=${res?.data?.data[0]?.booking?.paymentReference}`
        );
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.log(error);
        setIsLoading(false);
        // toast.error("Something went wrong");
        setIsLoading(false);
      });
  };

  return (
    <Suspense>
      <SubHeader header="Preview Booking Info" hideRight />
      <div className="mt-10 text-primary mb-6">
        <b className="text-primary">Passenger Details</b>
      </div>

      <div className=" w-1/2">
        {TripInfo && (
          <table className="table-auto">
            {PassengerDetails.map((passenger: any, index: number) => (
              <>
                <thead className="mb-8">{index + 1}. Passenger Details</thead>
                <tbody className="text-sm font-normal text-gray-500">
                  <tr className="">
                    <td className=" px-4 py-2 ">Passenger’s Name:</td>
                    <td className=" px-4 py-2 font-bold">
                      {passenger?.firstName + " " + passenger.surname}
                    </td>
                  </tr>
                  <tr className="">
                    <td className=" px-4 py-2 ">Phone Number:</td>
                    <td className=" px-4 py-2 font-bold">
                      {passenger?.phoneNumber}
                    </td>
                  </tr>
                  <tr className="">
                    <td className=" px-4 py-2 ">Seat Number:</td>
                    <td className=" px-4 py-2 font-bold">{passenger.seat}</td>
                  </tr>
                  <tr className="">
                    <td className=" px-4 py-2 ">Extra luggage:</td>
                    <td className=" px-4 py-2 font-bold">
                      {passenger?.extraLuggage}
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        )}
        <div className="mt-10">
          <p className="font-bold text-primary">Trip Details</p>
          <div className="w-full bg-primary_light mt-4 p-6 flex justify-between rounded-xl text-sm font-normal text-gray-500">
            <table className="table-auto w-1/2">
              <tbody>
                <tr>
                  <td>Vehicle Type:</td>
                  <td className="text-primary"> {selectedTrip?.vehicleType}</td>
                </tr>
                <tr>
                  <td>Trip Code:</td>
                  <td className="text-primary">{selectedTrip?.tripCode}</td>
                </tr>
                <tr>
                  <td>Departure Time:</td>
                  <td className="text-primary">{selectedTrip?.time}</td>
                </tr>
                <tr>
                  <td>Departure Date:</td>
                  <td className="text-primary">
                    {convertDateFormat(selectedTrip?.date)}
                  </td>
                </tr>
                <tr>
                  <td>Departure City:</td>
                  <td className="text-primary">{selectedTrip?.park?.city}</td>
                </tr>
                <tr>
                  <td>Destination City:</td>
                  <td className="text-primary"> {selectedTrip?.endCity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold text-primary">Payment Details </p>
          <table className="table-auto">
            <tbody className="text-sm font-normal text-gray-500">
              <tr className="">
                <td className=" px-4 py-2 ">Number of Passenger:</td>
                <td className=" px-4 py-2 font-bold">
                  {PassengerDetails.length}
                </td>
              </tr>
              <tr className="">
                <td className=" px-4 py-2 ">Price per seats:</td>
                <td className=" px-4 py-2 font-bold">
                  {toIntlCurrency(selectedTrip?.fare)}
                </td>
              </tr>
              <tr className="">
                <td className=" px-4 py-2 ">Cost Of Extra Luggage:</td>
                <td className=" px-4 py-2 font-bold">{TripInfo.seatNo}</td>
              </tr>
              <tr className="">
                <td className=" px-4 py-2 ">VAT:</td>
                <td className=" px-4 py-2 font-bold">{VAT}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
          <p className="font-bold text-primary">Total Amount</p>
          <p className="">{toIntlCurrency(TOTALFARE.toString())}</p>
        </div>
        <div>
          <Button type="submit" className="w-full mt-6" style="outline">
            Edit info
          </Button>

          <Button
            type="submit"
            className="w-full mt-6 text-white"
            onClick={() => {
              createInitialBooking();
            }}
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "Proceed to Payment"}
          </Button>
        </div>
      </div>
    </Suspense>
  );
}
