"use client";
import Button from "@/app/components/button";
import SubHeader from "@/app/components/headers/sub-header";
import TripDetails from "@/app/components/manage/tripDetails";
import Modal from "@/app/components/modal";
import QuickAction from "@/app/components/parkowner/quick-button";
import MainTable from "@/app/components/tables/main.table";
import tripOBJs from "@/common/classes/trip.class";
import useUserTypeRouterPages from "@/common/hooks/useUserTypeRouterPages";
import { routes } from "@/common/routes";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { VehicleTypes } from "@/common/data";

export default function ManageTrips() {
  const { pushWithUserTypePrefix } = useUserTypeRouterPages();
  const [trip, setTrip] = useState<any[]>([]);
  const [tripData, setTripData] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState<any>();

  const userType: string = useSelector((a: any) => a?.authUser?.userAuthType);
  useEffect(() => {
    tripOBJs.getAll({ userType }).then((res) => {
      setTrip(res);
      setTripData(res);
    });
  }, [userType]);

  const SearchManager = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = tripData?.filter((parkfiltername: any) =>
        parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
      );
      setTrip(searchFilter);
    } else {
      setTrip(tripData);
    }
  };

  const handleFilterByVehicleType = (e: string) => {
    if (e) {
      const filterByVehicleType = tripData?.filter((vehicleType: any) => {
        return vehicleType?.vehicleType.toLowerCase() === e.toLowerCase();
      });
      setTrip(filterByVehicleType);
    } else {
      setTrip(tripData);
    }
  };

  const columns = [
    {
      key: "parkName",
      header: "Park Name",
    },
    {
      key: "startLocation",
      header: "Departure City",
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
      key: "endCity",
      header: "Arival City",
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
      header: "Available Seats",
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
          departurePark: row.park.name,
          departureCity: row.park.city,
          arrivalCity: row.arrivalCity,
          arrivalState: row.arrivalState,
          fare: row.fare,
          isPublic: `${row.isPublic}`,
          date: row.date,
          time: row.time,
          vehicleId: row.vehicleId,
          vehicleType: row.vehicleType,
          parkId: row.park.id,
          departureDate: row.date,
          tripId: row.id,
        };

        pushWithUserTypePrefix("/manage-trips/edit", {
          options: { ...query },
          as: "/owner/manage-trips/edit",
        });
      },
    },
    {
      label: "Download manifest",
      function: (row: any) => {},
    },
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
        <Link href="/owner/manage-trips/set-trip">
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
          data={trip}
          identifier=""
          actionObject={actionObject}
          searchBy="Booking Code"
          filterMenu={VehicleTypes}
          handleSearch={(e: any) => {
            SearchManager(e);
          }}
          handleFilter={(e: any) => {
            handleFilterByVehicleType(e);
          }}
          apiSearch={() => {}}
        />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TripDetails trip={selectedTrip} />
      </Modal>
    </Suspense>
  );
}
