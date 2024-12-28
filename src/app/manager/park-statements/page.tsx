"use client";
import CarSideIcon from "@/app/components/custom svg/car-side";
import InfoCard from "@/app/components/dashboard/comp/infoCard";
import SubHeader from "@/app/components/headers/sub-header";
import MyTabs from "@/app/components/tabs";
import tripOBJs from "@/common/classes/trip.class";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { Suspense, useEffect, useState } from "react";
import { BiMoney } from "react-icons/bi";
import { HiCheck } from "react-icons/hi";
import { useSelector } from "react-redux";
import Completed from "./(components)/completed";
import Scheduled from "./(components)/scheduled";

export default function Records() {
  const userData = useSelector(selectAuthUser);
  const managerId = userData?.id!;
  const parkId = userData?.park?.id!;

  console.log("🚀 ~ Records ~ userData:", userData);

  const [scheduledTrips, setScheduledTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);
  useEffect(() => {
    tripOBJs
      .managerRecords({ managerId, parkId, status: "scheduled" })
      .then((res) => {
        const transformData = res?.map((a: any) => ({
          startLocation: a.park.state,
          endState: a.endState,
          time: a.time,
          date: a.date,
          tripCode: a.tripCode,
          fare: a.fare,
          typeOfVehicle: a.typeOfVehicle,
          vehicleType: a.vehicleType,
        }));

        setScheduledTrips(transformData);
      });
    tripOBJs
      .managerRecords({ managerId, parkId, status: "completed" })
      .then((res) => {
        const transformData = res?.map((a: any) => ({
          startLocation: a.park.state,
          endState: a.endState,
          time: a.time,
          date: a.date,
          tripCode: a.tripCode,
          fare: a.fare,
          typeOfVehicle: a.typeOfVehicle,
          vehicleType: a.vehicleType,
        }));

        setCompletedTrips(transformData);
      });
    // tripOBJs.getAll({ userType }).then((res) => {
    //   let com = res?.filter(
    //     (a: any) => a?.park?.parkManager?.id === params?.managerId
    //   );
    //   setTotalTrips(com.length);
    // });
  }, []);

  return (
    <Suspense>
      <SubHeader
        header="Back"
        // header={`${
        //   (managerInfo?.firstName || "").charAt(0).toUpperCase() +
        //   (managerInfo?.firstName || "").slice(1)
        // } ${
        //   (managerInfo?.lastName || "").charAt(0).toUpperCase() +
        //   (managerInfo?.lastName || "").slice(1)
        // }`}
        // allowFilter
      />
      <div className="mt-8">
        <div className="my-[53px] grid grid-cols-4 gap-8">
          <InfoCard
            title="Total Trips Set"
            num={(completedTrips?.length || 0) + (scheduledTrips?.length || 0)}
            icon={() => <CarSideIcon color="stroke-white" size={"16"} />}
          />
          <InfoCard
            title="Successful Trips"
            num={completedTrips.length}
            icon={() => <HiCheck color="white" />}
          />
          {/* <InfoCard
            title="Cancelled Trips"
            num={managerInfo?.cancelledTrip}
            icon={() => <IoMdClose color="white" />}
          /> */}
          <InfoCard
            title="Scheduled Trips"
            num={scheduledTrips.length}
            icon={() => <BiMoney color="white" />}
          />
        </div>
        <MyTabs
          headers={["Scheduled ", "Completed Trips"]}
          components={[
            <Scheduled
              key="1"
              trips={scheduledTrips}
              setTrips={setScheduledTrips}
            />,
            <Completed
              key="2"
              trips={completedTrips}
              setTrips={setCompletedTrips}
            />,
            // <Cancelled key="2" managerInfo={managerInfo}/>,
          ]}
        />
      </div>
    </Suspense>
  );
}
