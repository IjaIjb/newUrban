"use client";
import SubHeader from "@/app/components/headers/sub-header";
import MainTable from "@/app/components/tables/main.table";
import manager from "@/common/classes/manager.class";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";
import { Suspense, useEffect, useState } from "react";

export default function AchivedManagers() {
  const [historyData, setHistoryData] = useState<any[]>([]);

  const userData = useAppSelector(selectAuthUser)!;

  const columns = [
    {
      key: "urbanId",
      header: "Manger id",
    },
    {
      key: "firstName",
      header: "Manager Name",
    },
    {
      key: "parkName",
      header: "Park Name",
    },

    {
      key: "createdAt",
      header: "Start Date",
    },
    {
      key: "endDate",
      header: "End Date",
    },
  ];

  useEffect(() => {
    if (userData) {
      manager
        .getParkOwnerManagerHistory()
        .then((res) => {
          setHistoryData(res);
        })
        .catch((error) => {
          console.error("Error fetching manager data:", error);
        });
    }
  }, [userData]);

  return (
    <Suspense>
      <SubHeader header="Achived Managers" />

      <div className="mt-10">
        <MainTable
          columns={columns}
          data={historyData}
          identifier=""
          searchBy="Manager id"
          handleSearch={(e: any) => {
            // SearchManager(e);
          }}
          handleFilter={() => null}
          apiSearch={() => {}}
        />
      </div>
    </Suspense>
  );
}
