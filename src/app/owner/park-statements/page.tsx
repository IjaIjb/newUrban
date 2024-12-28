"use client";
import CarSideIcon from "@/app/components/custom svg/car-side";
import InfoCard from "@/app/components/dashboard/comp/infoCard";
import SubHeader from "@/app/components/headers/sub-header";
import MyTabs from "@/app/components/tabs";
import { Suspense, useState } from "react";
import { BiMoney } from "react-icons/bi";
import { HiCheck } from "react-icons/hi";
import Completed from "./manager/[managerId]/[parkId]/(components)/completed";
import Scheduled from "./manager/[managerId]/[parkId]/(components)/scheduled";

export default function OwnerParkStatements() {
  const [scheduledTrips, setScheduledTrips] = useState<any[]>([]);
  const [completedTrips, setCompletedTrips] = useState<any[]>([]);

  return (
    <Suspense>
      <SubHeader
        hideBack
        header={"Park Statements"}
        // allowFilter
      />
      <div className="mt-8">
        <div className="my-[53px] grid grid-cols-3 gap-8">
          <InfoCard
            title="Total Trips Set"
            num={0 + 0}
            icon={() => <CarSideIcon color="stroke-white" size={"16"} />}
          />
          <InfoCard
            title="Successful Trips"
            num={0}
            icon={() => <HiCheck color="white" />}
          />
          {/* <InfoCard
            title="Cancelled Trips"
            num={managerInfo?.cancelledTrip}
            icon={() => <IoMdClose color="white" />}
          /> */}
          <InfoCard
            title="Scheduled Trips"
            num={0}
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
// hold on
