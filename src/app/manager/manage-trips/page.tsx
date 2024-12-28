"use client";
import Button from "@/app/components/button";
import SubHeader from "@/app/components/headers/sub-header";
import TripDetails from "@/app/components/manage/tripDetails";
import Modal from "@/app/components/modal";
import QuickAction from "@/app/components/parkowner/quick-button";
import MainTable from "@/app/components/tables/main.table";
import tripOBJs from "@/common/classes/trip.class";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { routes } from "@/common/routes";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { VehicleTypes } from "@/common/data";
import { addEditTrip } from "@/common/db";

export default function ManageTrips() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [Trip, setTrip] = useState<any[]>([]);
  const [tripData, setTripData] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState<any>();

  const userType: string = useSelector((a: any) => a?.authUser?.userAuthType);
  useEffect(() => {
    tripOBJs.getAll({ userType }).then((res) => {
      console.log(res, "from tripps");
      setTrip(res);
      setTripData(res);
    });
  }, [userType]);

  const SearchManager = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = tripData?.filter((parkfiltername: any) =>
        parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter, "swae");
      setTrip(searchFilter);
    } else {
      setTrip(tripData);
    }
  };

  const handleFilterByVehicleType = (e: string) => {
    if (e) {
      const filterByVehicleType = tripData?.filter(
        (vehicleType: any) => {
          return vehicleType?.vehicleType.toLowerCase() === e.toLowerCase();
        }
        // parkfiltername?.vehicleType.toLowerCase().includes(e.toLowerCase())
      );
      console.log(filterByVehicleType, "swae");
      setTrip(filterByVehicleType);
    } else {
      console.log("🚀 ~ handleFilterByVehicleType ~ tripData:", tripData);

      setTrip(tripData);
    }
  };

  const columns = [
    {
      key: "endCity",
      header: "Arival City",
    },
    {
      key: "time",
      header: "Departure Time",
    },
    {
      key: "date",
      header: "Date",
    },
    {
      key: "startLocation",
      header: "Departure City",
    },
    {
      key: "tripCode",
      header: "Booking Code",
    },
    {
      key: "fare",
      header: "Fare",
    },
    {
      key: "vehicleType",
      header: "Type Of Vehicle",
    },
    {
      key: "availableSeats",
      header: "Seats Left",
    },

    {
      key: "actions",
      header: "Action",
    },
  ];

  const actionObject = [
    {
      label: "View Details",
      function: (row: any) => {
        setSelectedTrip(row);
        setIsOpen(true);
      },
    },
    {
      label: "Edit Details",
      function: (row: any) => {
        let query = {
          tripId: row.id,
          parkId: row.park.id,
          departureTime: row.time,
          departureDate: row.date,
          endLocation: row.endState,
          isPublic: row.isPublic,
          arrivalState: row.endState,
          arrivalCity: row.endCity,
          vehicleType: row.vehicleType,
          fare: row.fare,
        };
        console.log("queryquery", query);
        addEditTrip(query);
        pushWithUserTypePrefix(`/manage-trips/edit/${row.id}`);
      },
    },
    {
      label: "Request Driver",
      function: (row: any) => {
        // Perform edit action using the 'row' data
        console.log("View Statement action clicked for row:", row);
        let query = {
          tripCode: row.tripCode,
        };
        const queryString = new URLSearchParams(query).toString();
        pushWithUserTypePrefix(`/manage-trips/request-driver?${queryString}`);
      },
    },
    // {
    //   label: "Assign Driver",
    //   function: (row: any) => {
    //     // Perform edit action using the 'row' data
    //     console.log("View Statement action clicked for row:", row);
    //     let query = {
    //       tripCode: row.tripCode,
    //     };
    //     const queryString = new URLSearchParams(query).toString();
    //     pushWithUserTypePrefix(`/manage-trips/assign?${queryString}`);
    //   },
    // },
  ];
  return (
    <Suspense>
      <SubHeader header="Manage Trips" hideBack />
      <div className="grid grid-cols-3 gap-x-4 mt-8">
        {routes.TRIPS.map((trip: any, index: any) => (
          <div key={index}>
            <QuickAction
              path={`${trip.path}`}
              title={trip.title}
              iconClassName={trip.iconClassName}
              icon={trip.icon}
            />
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/manager/manage-trips/set-trip">
          <Button
            className="bg-opacity-10 w-[664.85px] text-primary hover:text-white"
            type="button"
          >
            Set Trip
          </Button>
        </Link>
      </div>
      <div className="mt-[53px]">
        <MainTable
          columns={columns}
          data={Trip}
          identifier=""
          actionObject={actionObject}
          searchBy="Booking Code"
          filterMenu={VehicleTypes}
          handleSearch={(e: any) => {
            SearchManager(e);
          }}
          handleFilter={(e: any) => {
            console.log("🚀 ~ ManageTrips ~ e:", e);
            handleFilterByVehicleType(e);
          }}
          apiSearch={() => {}}
        />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* {!hideDefaultBody && type && type === "booking" ? (
          <BookingStatus data={selected} />
        ) : type === "detailsTrack" || type === "companyTrack" ? (
        ) : null} */}
        <TripDetails trip={selectedTrip} />
      </Modal>
    </Suspense>
  );
}
