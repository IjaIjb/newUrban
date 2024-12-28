import MainTable from "@/app/components/tables/main.table";
import { VehicleTypes } from "@/common/data";
import { useEffect, useState } from "react";

export default function CompletedTrips({ data }: any) {
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
      key: "endLocation",
      header: "Destination City",
    },
    {
      key: "tripCode",
      header: "Trip Code",
    },
    {
      key: "vehicleType",
      header: "Type Of Vehicle",
    },
    {
      key: "actions",
      header: "Action",
    },
  ];
  const [Data, setData] = useState<any[]>([]);
  const [trip, setTrip] = useState<any[]>([]);
  const actionObject = [
    {
      label: "View Details",
      function: (row: any) => {
        // Perform edit action using the 'row' data
        console.log("View Statement action clicked for row:", row);
      },
    },
  ];
  useEffect(() => {
    setData(data);
    setTrip(data);
  }, [data]);

  const Search = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = Data?.filter((parkfiltername: any) =>
        parkfiltername?.parkName.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter, "swae");
      setTrip(searchFilter);
    } else {
      setTrip(Data);
    }
  };
  //handle filter
  const FilterPark = (e: any) => {
    if (e) {
      if (e.item !== "All") {
        const filteredParks = Data.filter(
          (a: any) => a.vehicleType === e.value
        );
        setTrip(filteredParks);
      } else {
        setTrip(Data);
      }
    } else {
      setTrip(Data);
    }
  };
  return (
    <>
      <div className="mt-10">
        {/* {
          data && data.length >=1 ?  <Table
          columns={columns}
          data={data}
          action={{
            type: ["view"],
            viewLabel: "View Details",
          }}
          type="companyTrack"
        />:(
            <div className="flex-col gap-7">
              <div className="grid grid-cols-3 mt-[32px] gap-8">
              </div>
              <div className="mt-[10rem] text-center">
                <p className="text-xl capitalize">
                  Sorry, No Trip yet
                </p>
              </div>
            </div>
          )
        } */}
        <MainTable
          columns={columns}
          data={trip}
          identifier=""
          searchBy="Park Name"
          handleSearch={(e: any) => {
            Search(e);
          }}
          actionObject={actionObject}
          filterMenu={VehicleTypes}
          handleFilter={(e: any) => {
            FilterPark(e);
          }}
          apiSearch={() => {}}
        />
      </div>
    </>
  );
}
