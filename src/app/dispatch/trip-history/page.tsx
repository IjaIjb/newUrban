"use client";
import MyTabs from "@/app/components/tabs";
import tripOBJs from "@/common/classes/trip.class";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import SubHeader from "../../components/headers/sub-header";
import AllTrips from "./(comp)/allTrips";
import Completed from "./(comp)/completed";

export default function TripHistory() {
  const userData = useAppSelector(selectAuthUser)!;
  const [trips, setTrips] = useState<any[]>([]);
  const [completedTrips, setCompletedTrips] = useState<any[]>([]);

  useEffect(() => {
    tripOBJs
      .getBookingByPark(userData?.parkId!)
      .then((res: any) => {
        console.log(res, "records of park");
        const transformedTrips = res.map((booking: any) => ({
          passengerName: booking.passenger.user.fullName,
          passengerEmail: booking.passenger.user.email,
          passengerPhone: "+234" + booking.passenger.user.phoneNumber,
          bookingCode: booking.bookingCode,
          status: booking.status,
          date: booking?.travelDate?.split("GMT")[0],
          ...booking,
        }));

        setTrips(transformedTrips);
        const completed = res.filter(
          (trip: any) => trip.status === "completed"
        );
        setCompletedTrips(completed);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [userData?.parkId]);

  return (
    <>
      <SubHeader header="Trip History" hideBack allowFilter />
      <div className="mt-[53px]">
        <MyTabs
          headers={["All bookings", "Completed"]}
          components={[
            <AllTrips key="allTrips" data={trips} />,
            <Completed key="completedTrips" data={completedTrips} />,
          ]}
        />
      </div>
    </>
  );
}
