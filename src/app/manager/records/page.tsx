"use client";
import Input from "@/app/components/input";
import tripOBJs from "@/common/classes/trip.class";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-tabs/style/react-tabs.css";
import SubHeader from "../../components/headers/sub-header";
import MyTabs from "../../components/tabs";
import AssignedTrips from "./(components)/assigned-trips";
import CompletedTrips from "./(components)/completedTrips";
import ScheduledTrips from "./(components)/scheduled-trip";

export default function Records() {
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);

  const [selectedPark, setSelectedPark] = useState<string>();
  const [activeOption, setActiveOption] = useState<string>("Current Month");
  const [allTrips, setAllTrips] = useState<any[]>([]);
  const [scheduledTrips, setScheduledTrips] = useState<any[]>([]);
  const [assignedTrips, setAssignedTrips] = useState<any[]>([]);
  const [completedTrips, setCompletedTrips] = useState<any[]>([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  const calculateDate = (daysOffset: number) => {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + daysOffset);
    return newDate.toISOString().split("T")[0];
  };

  const [dateRange, setDateRange] = useState<any>({
    start: formattedDate,
    end: formattedDate,
  });

  const dateRanges = {
    Today: { start: formattedDate, end: formattedDate },
    Yesterday: { start: calculateDate(-1), end: calculateDate(-1) },
    "Current Week": {
      start: calculateDate(-today.getDay()),
      end: calculateDate(6 - today.getDay()),
    },
    "Previous Week": {
      start: calculateDate(-today.getDay() - 7),
      end: calculateDate(-today.getDay() - 1),
    },
    "Current Month": {
      start: `${year}-${month < 10 ? "0" : ""}${month}-01`,
      end: formattedDate,
    },
    "Previous Month": {
      start: `${year}-${month - 1 < 10 ? "0" : ""}${month - 1}-01`,
      end: `${year}-${month - 1 < 10 ? "0" : ""}${month - 1}-${new Date(
        year,
        month - 1,
        0
      ).getDate()}`,
    },
  };

  useEffect(() => {
    if (dateRange.start && dateRange.end && activeOption) {
      tripOBJs
        .getRecords(userType, dateRange.start, dateRange.end)
        .then((res: any) => {
          setAllTrips(res);

          const tripsByStatus = {
            SCHEDULED: [] as any[],
            ASSIGNED: [] as any[],
            COMPLETED: [] as any[],
          };

          res.forEach((trip: any) => {
            if (trip.status === "scheduled") {
              tripsByStatus.SCHEDULED.push(trip);
            } else if (trip.status === "assigned") {
              tripsByStatus.ASSIGNED.push(trip);
            } else if (trip.status === "completed") {
              tripsByStatus.COMPLETED.push(trip);
            }
          });

          setScheduledTrips(tripsByStatus.SCHEDULED);
          setAssignedTrips(tripsByStatus.ASSIGNED);
          setCompletedTrips(tripsByStatus.COMPLETED);
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  }, [activeOption, dateRange.end, dateRange.start, userType]);

  const handleDateRangeChange = (option: keyof typeof dateRanges) => {
    setDateRange(dateRanges[option]);
    setActiveOption(option);

    console.log("🚀 ~ handleDateRangeChange ~ option:", {
      option,
      dateRange,
      dateRanges: dateRanges[option],
    });
  };

  return (
    <>
      <SubHeader header="Records" hideBack />
      <div className="flex py-4 gap-4">
        {Object.keys(dateRanges).map((option: string) => (
          <p
            key={option}
            className={`border-r cursor-pointer pr-4 ${
              activeOption === option
                ? "text-primary font-bold"
                : "text-gray-600"
            }`}
            onClick={() =>
              handleDateRangeChange(option as keyof typeof dateRanges)
            }
          >
            {option}
          </p>
        ))}
      </div>
      <div className="flex my-6">
        <div className="flex items-center">
          <p className="mr-6">Date From</p>
          <Input
            containerStyle={`mt-0`}
            inputStyle={` bg-gray-100 border-0 pl-10 `}
            placeholder=""
            type={"date"}
            id=""
            ignoreMinDate
            name=""
            value={dateRange.start}
            onChange={(e: any) =>
              setDateRange((a: any) => {
                return {
                  start: e.target.value,
                  end: a.end,
                };
              })
            }
          />
        </div>
        <div className="flex ml-8 items-center">
          <p className="mr-6">Date To</p>
          <Input
            containerStyle={`mt-0`}
            inputStyle={` bg-gray-100 border-0 pl-10 `}
            placeholder=""
            type={"date"}
            ignoreMinDate
            id=""
            name=""
            value={dateRange.end}
            onChange={(e: any) =>
              setDateRange((a: any) => {
                return {
                  start: a.start,
                  end: e.target.value,
                };
              })
            }
          />
        </div>
      </div>

      <div className="mt-6">
        <MyTabs
          headers={["Scheduled Trip", "Assigned Trip", "Completed Trips"]}
          components={[
            <ScheduledTrips key="1" data={scheduledTrips} />,
            <AssignedTrips key="2" data={assignedTrips} />,
            <CompletedTrips key="3" data={completedTrips} />,
          ]}
        />
      </div>
    </>
  );
}
