"use client";
import SubHeader from "@/app/components/headers/sub-header";
import React, { useState, useEffect, Suspense } from "react";
import tripOBJs from "@/common/classes/trip.class";
import MainTable from "@/app/components/tables/main.table";

export default function Records() {
  const [managerInfo, setManagerInfo] = useState<any>("");
  const [dispatch, setDispatch] = useState<any>("");
  const [Data, setData] = useState<any[]>([]);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Convert the searchParams to a plain object
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setManagerInfo(params);
  }, []);

  useEffect(() => {
    tripOBJs.getByDispatchId(managerInfo.userId).then((res) => {
      setDispatch(res);
      setData(res);
    });
  }, [managerInfo.userId]);

  const Search = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = Data?.filter((parkfiltername: any) =>
        parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter, "swae");
      setDispatch(searchFilter);
    } else {
      setDispatch(Data);
    }
  };
  const columns = [
    // {
    //   id: "passegerName",
    //   header: "Passenger Name",
    // },
    {
      key: "tripCode",
      header: "Trip Code",
    },
    {
      key: "date",
      header: "Date",
    },
    {
      key: "time",
      header: "Time",
    },
  ];
  let dataDispatch;
  if (dispatch) {
    dataDispatch = dispatch?.map((a: any, i: any) => {
      return {
        id: i,
        passegerName: "Isale Oko Sagamu",
        tripCode: a.tripCode,
        date: a.date.split("T")[0],
        time: a.time,
      };
    });
  }
  console.log(dataDispatch, "dataDispatch");
  const data = [
    {
      id: 1,
      passegerName: "Isale Oko Sagamu",
      tripCode: "ABJSAG",
      date: "09/09/2023",
      time: "09:00AM",
    },
    {
      id: 2,
      passegerName: "Isale Oko Sagamu",
      tripCode: "ABJSAG",
      date: "09/09/2023",
      time: "09:00AM",
    },
    {
      id: 3,
      passegerName: "Isale Oko Sagamu",
      tripCode: "ABJSAG",
      date: "09/09/2023",
      time: "09:00AM",
    },
  ];
  return (
    <Suspense>
      <SubHeader
        header={`${
          (managerInfo?.fullName || "").charAt(0).toUpperCase() +
          (managerInfo?.fullName || "").slice(1)
        } ${
          (managerInfo?.lastName || "").charAt(0).toUpperCase() +
          (managerInfo?.lastName || "").slice(1)
        }`}
        allowFilter
      />
      <div className="mt-[53px]">
        {/* {
          dispatch && dispatch.length >=1 ?   <Table
          columns={columns}
          data={dispatch}
          action={{ viewLabel: "View Reciept", type: ["view"] }}
          path="/park-statements/dispatcher/tade/statement"
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
        <MainTable
          columns={columns}
          data={dataDispatch}
          identifier=""
          searchBy="Booking code"
          handleSearch={(e: any) => {
            Search(e);
          }}
          handleFilter={(e: any) => {}}
          apiSearch={() => {}}
        />
      </div>
    </Suspense>
  );
}
