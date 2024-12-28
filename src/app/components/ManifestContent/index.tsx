import { IBooking } from "@/app/dispatch/page";

export const ManifestContent = ({ booking }: { booking: IBooking }) => {
  return (
    <div className=" min-h-full ">
      <div className="text-center">
        <b className="text-primary">Passenger’s Manifest</b>
      </div>

      <table className="table-auto mt-3 w-full">
        <tbody className="p-4 font-light">
          <tr>
            <td className="px-4 py-2">Departure Park:</td>
            <td className="px-4 py-2 font-semibold capitalize">
              {booking.trip.park.name}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Destination City:</td>
            <td className="px-4 py-2  font-semibold capitalize">
              {booking.destinationCity}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Passenger Name:</td>
            <td className="px-4 py-2  font-semibold capitalize">
              {booking.passengerName}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Passenger’s Next Of Kin:</td>
            <td className="px-4 py-2 font-semibold capitalize">
              {booking.nextOfKinName}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Next Of Kin Phone Number:</td>
            <td className="px-4 py-2 font-semibold capitalize">
              {booking.nextOfKinPhone}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
