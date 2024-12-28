import MainTable from "@/app/components/tables/main.table";
import { useState } from "react";

export default function Scheduled({ trips, setTrips }: any) {
  console.log("🚀 ~ Scheduled ~ trips:", trips);
  const columns = [
    {
      key: "endState",
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
      key: "actions",
      header: "Action",
    },
  ];

  const [Data, setData] = useState(trips);

  // useEffect(() => {
  //   tripOBJs.filter(userType, "scheduled").then((res) => {
  //     let com = res?.filter(
  //       (a: any) => a?.park?.parkManager?.id === managerInfo?.id
  //     );
  //     setsheduled(com);
  //     setData(com);
  //   });
  // }, [managerInfo?.id, userType]);

  const Search = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = Data?.filter((parkfiltername: any) =>
        parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
      );
      setTrips(searchFilter);
    } else {
      setTrips(Data);
    }
  };
  //handle filter
  const FilterPark = (e: any) => {
    if (e) {
      if (e.item !== "All") {
        const filteredParks = Data.filter(
          (a: any) => a.vehicleType === e.value
        );
        setTrips(filteredParks);
      } else {
        setTrips(Data);
      }
    } else {
      setTrips(Data);
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
          sheduled && sheduled.length >=1 ?  <Table
          columns={columns}
          data={sheduled}
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
            //  filterMenu={options}
            actionObject={actionObject}
            searchBy="Booking code"
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
