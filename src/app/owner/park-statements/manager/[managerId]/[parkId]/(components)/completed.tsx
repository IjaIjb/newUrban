import MainTable from "@/app/components/tables/main.table";
import { useState } from "react";

export default function Completed({ trips, setTrips }: any) {
  const columns = [
    {
      key: "startLocation",
      header: "Departure Park",
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
      key: "tripCode",
      header: "Trip Code",
    },
    {
      key: "fare",
      header: "Fare",
    },
    {
      key: "typeOfVehicle",
      header: "Type Of Vehicle",
    },
    {
      key: "totalSeats",
      header: "Booking Status",
    },
  ];
  const [data, setData] = useState<any[]>([]);

  const Search = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = data?.filter((parkfiltername: any) =>
        parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter, "swae");
      setTrips(searchFilter);
    } else {
      setTrips(data);
    }
  };
  //handle filter
  const FilterPark = (e: any) => {
    if (e) {
      if (e.item !== "All") {
        const filteredParks = data.filter(
          (a: any) => a.vehicleType === e.value
        );
        setTrips(filteredParks);
      } else {
        setTrips(data);
      }
    } else {
      setTrips(data);
    }
  };
  const actionObject = [
    {
      label: "View Details",
      function: (row: any) => {
        // Perform edit action using the 'row' data
        console.log("View Statement action clicked for row:", row);
      },
    },
  ];
  const options = [
    { value: "bus", item: "Bus" },
    { value: "sedan", item: "Sedan" },
    { value: "van", item: "Van" },
    { value: "others", item: "Others" },
  ];
  return (
    <>
      <div className="mt-[53px]">
        {/* {
          completed && completed.length >=1 ?  <Table
          columns={columns}
          data={completed}
          action={{ viewLabel: "See Details", type: ["view"] }}
          noAction
        /> : (
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

        {trips && (
          <MainTable
            columns={columns}
            data={trips}
            identifier=""
            searchBy="Booking code"
            //  filterMenu={options}
            actionObject={actionObject}
            handleSearch={(e: any) => {
              Search(e);
            }}
            handleFilter={(e: any) => {
              FilterPark(e);
            }}
            apiSearch={() => {}}
          />
        )}
      </div>
    </>
  );
}
